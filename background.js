// background.js

// Function to handle messages from the extension popup or other parts of the extension
function handlePopupMessage(request, sender, sendResponse) {
  if (request.action === 'displayRatingPopup') {
    // Send a message to the content script to display the overlay popup
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'displayRatingPopup' });
    });
  }
}

// Function to handle messages from content script
function handleContentMessage(request, sender, sendResponse) {
  if (request.action === 'submitRating') {
    const {
      overallRating,
      websiteCategory,
      expectationMet,
      advertisementAccuracy,
      additionalFeedback
    } = request;

    // Check if all compulsory fields are filled
    if (!overallRating || !websiteCategory || !expectationMet || !advertisementAccuracy) {
      sendResponse({ error: 'All compulsory fields must be filled' });
      return; // Stop execution
    }

    // Retrieve the current tab's URL to extract the hostname
    chrome.tabs.get(sender.tab.id, function(tab) {
      const mainDomain = window.location.host;

      let currentHostname = '';
      if (tab.referrer) {
        try {
          const referrerUrl = new URL(tab.referrer);
          currentHostname = referrerUrl.hostname;
        } catch (error) {
          console.error('Error parsing referrer URL:', error);
        }
      }

      const data = {
        mainDomain,
        overallRating,
        websiteCategory,
        expectationMet,
        advertisementAccuracy,
        additionalFeedback
      };
      console.log('Data being sent:', data);

      const scriptURL = 'https://script.google.com/macros/s/AKfycbxi-gDPJhqjDT8Wl5kz8o-tI_7-YyTBlOh9PCkGbY40s8ZLZNeGOjAwcYjdzvGNnZ2usw/exec';

      fetch(scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  // Set Content-Type to JSON
        },
        body: JSON.stringify(data)  // Stringify the data object
      })
      .then(response => response.text())
      .then(text => {
        console.log(text);
        sendResponse({ success: true });
      })
      .catch(error => {
        console.error('Error appending data:', error);
        sendResponse({ error: 'Failed to save data' });
      });
    });
  }
}

// Listen for messages from the extension popup or other parts of the extension
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  handlePopupMessage(request, sender, sendResponse);
  handleContentMessage(request, sender, sendResponse);
});

// Function to check if two URLs have the same hostname
function isSameHost(url1, url2) {
  const hostname1 = new URL(url1).hostname;
  const hostname2 = new URL(url2).hostname;
  return hostname1 === hostname2;
}

// Listen for tab updates to inject content script when navigating to external sites
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'loading' && tab.active) {
    const url = tab.url;
    const referrer = tab.referrer;
    if (url && referrer && !isSameHost(url, referrer)) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"]
      });
    }
  }
});

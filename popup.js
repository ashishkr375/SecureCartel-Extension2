document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('openOverlay').addEventListener('click', function() {
      chrome.runtime.sendMessage({ action: 'displayRatingPopup' });
      window.close();
    });
  });
  
/*------------------------*/

$(function () {
    $("#clickme").click(function () {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { "message": "clicked_browser_action" });
        });
    });
});
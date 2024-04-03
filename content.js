// Function to inject CSS styles into the document
function injectStyles(styles) {
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(styles));
    document.head.appendChild(styleElement);
  }
  
  // Define CSS styles
  const customStyles = `
  
    /* Override default styles */
  #ratingPrompt {
    position: fixed !important;
    bottom: 20px !important;
    right: 20px !important;
    z-index: 9999 !important;
    background-color: #fff !important;
    border: 1px solid #ccc !important;
    padding: 10px !important;
    border-radius: 5px !important;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
    font-family: Arial, sans-serif !important;
    font-size: 14px !important;
    color: #000 !important; /* Set text color to black */
  }
  
  #thankYouMessage {
    position: fixed !important;
    bottom: 20px !important;
    right: 20px !important;
    z-index: 9999 !important;
    background-color: #fff !important;
    border: 1px solid #ccc !important;
    padding: 10px !important;
    border-radius: 5px !important;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
    font-family: Arial, sans-serif !important;
    font-size: 14px !important;
    color: #000 !important; /* Set text color to black */
  }
  
  /* Additional styles for thank you message */
  #thankYouMessage {
    display: none; /* Initially hide the thank you message */
    color: #000 !important; /* Set text color to black */
  
  }
  
  `;
  
  // Inject CSS styles into the document
  injectStyles(customStyles);
  
  // Function to create the additional options for rating
  function createAdditionalOptions() {
    const additionalOptions = document.createElement('div');
    additionalOptions.id = 'additionalOptions';
  
    additionalOptions.innerHTML = `
      <label for="overallRating">Overall Rating:( 1 : bad & 10 : Good )*</label>
      <input type="number" id="overallRating" min="1" max="10" value="5"><br><br>
      <label for="websiteCategory">Website Category:</label>
      <select id="websiteCategory">
        <option value="News">News</option>
        <option value="Advertising">Advertising</option>
        <option value="Movies">Movies</option>
        <option value="Articles">Articles</option>
        <option value="Books">Books</option>
        <option value="Shopping">Shopping</option>
        <option value="Electronics">Electronics</option>
        <option value="Health">Health</option>
        <option value="Education">Education</option>
        <option value="Social Media">Social Media</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Others">Others (Specify)</option>
      </select>
      <br><br>
      <div id="categoryInput" style="display: none;">
        <label for="specifiedCategory">Specify Category:*</label>
        <input type="text" id="specifiedCategory">
        <br><br>
      </div>
      <label for="expectationMet">Expectation Met:*</label>
      <select id="expectationMet">
        <option value="1">1 - Not at all as expected</option>
        <option value="2">2</option>
        <option value="3" selected>3</option>
        <option value="4">4</option>
        <option value="5">5 - Exactly as expected</option>
      </select>
      <br><br>
      <label for="advertisementAccuracy">Advertisement Accuracy:*</label>
      <select id="advertisementAccuracy">
        <option value="1">1 - Manipulative and False Description</option>
        <option value="2">2</option>
        <option value="3" selected>3</option>
        <option value="4">4</option>
        <option value="5">5 - Accurately Represented</option>
      </select>
      <br><br>
      <label for="additionalFeedback">Additional Feedback:</label>
      <textarea id="additionalFeedback" rows="4" cols="50"></textarea>
      <br><br>
      <button id="submitRating">Submit</button>
    `;
  
    // Event listener for changing category selection
    additionalOptions.querySelector('#websiteCategory').addEventListener('change', function() {
      const categoryInput = additionalOptions.querySelector('#categoryInput');
      if (this.value === 'Others') {
        categoryInput.style.display = 'block';
      } else {
        categoryInput.style.display = 'none';
      }
    });
  
    return additionalOptions;
  }
  
  
  // Function to create and display a thank you message popup
  function showThankYouMessage() {
    const thankYouMessage = document.createElement('div');
    thankYouMessage.innerHTML = 'Thank you for your feedback!';
    thankYouMessage.style.position = 'fixed';
    thankYouMessage.style.bottom = '20px';
    thankYouMessage.style.right = '20px';
    thankYouMessage.style.zIndex = '9999';
    thankYouMessage.style.backgroundColor = '#fff';
    thankYouMessage.style.border = '1px solid #ccc';
    thankYouMessage.style.padding = '10px';
    thankYouMessage.style.borderRadius = '5px';
    thankYouMessage.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    thankYouMessage.style.fontFamily = 'Arial, sans-serif';
    thankYouMessage.style.fontSize = '14px';
    thankYouMessage.style.color = '#000';
    
    document.body.appendChild(thankYouMessage);
  
    // Automatically close the thank you message after 2 seconds
    setTimeout(function() {
      document.body.removeChild(thankYouMessage);
    }, 2000);
  }
  
  // Create a floating div element for the rating prompt
  const ratingPrompt = document.createElement('div');
  ratingPrompt.id = 'ratingPrompt';
  ratingPrompt.innerHTML = `
    <p>Would you like to rate this website?</p>
    <button id="rateYes">Yes</button>
    <button id="rateNo">No</button>
  `;
  document.body.appendChild(ratingPrompt);
  
  // Event listener for the "Yes" button
  document.getElementById('rateYes').addEventListener('click', function() {
    // Remove the existing buttons
    ratingPrompt.removeChild(document.getElementById('rateYes'));
    ratingPrompt.removeChild(document.getElementById('rateNo'));
    
    // Create and append additional rating options
    ratingPrompt.appendChild(createAdditionalOptions());
  });
  
  // Event listener for the "No" button
  document.getElementById('rateNo').addEventListener('click', function() {
    // Remove the rating prompt
    document.body.removeChild(ratingPrompt);
  });
  
  // Event listener for the "Submit" button
  document.addEventListener('click', function(event) {
    if (event.target.id === 'submitRating') {
      // Send data to background.js
      const overallRating = document.getElementById('overallRating').value;
      const websiteCategory = document.getElementById('websiteCategory').value;
      const expectationMet = document.getElementById('expectationMet').value;
      const advertisementAccuracy = document.getElementById('advertisementAccuracy').value;
      const additionalFeedback = document.getElementById('additionalFeedback').value;
  
      chrome.runtime.sendMessage({
        action: 'submitRating',
        overallRating,
        websiteCategory,
        expectationMet,
        advertisementAccuracy,
        additionalFeedback
      });
  
      // Remove the rating prompt
      document.body.removeChild(ratingPrompt);
  
      // Display thank you message
      showThankYouMessage();
    }
  });

  /*-----------------------*/
  function isSameHost(url1, url2) {
    const hostname1 = new URL(url1).hostname;
    const hostname2 = new URL(url2).hostname;
    return hostname1 === hostname2;
  }
  
  function confirmNavigation(url) {
    if (!isSameHost(window.location.href, url)) {
      if (!confirm(`You are leaving ${window.location.hostname}. Proceed to ${url}?'`)) {
        return false;
      }
    }
    return true;
  }
  
  const links = document.getElementsByTagName("a");
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", (e) => {
      if (confirmNavigation(links[i].href)) {
        return;
      }
      e.preventDefault();
    });
  }

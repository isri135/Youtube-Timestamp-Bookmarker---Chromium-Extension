// async function loadSvgAndAppendToButton(buttonId, svgPath) {
//     const button = document.getElementsByClassName(bookmark-btn)[0];

//     if (!button) {
//       console.error('Button not found');
//       return;
//     }
  
//     try {
//       const response = await fetch(svgPath);
//       const svgText = await response.text();
  
//       // Create an SVG element from the fetched SVG text
//       const svgElement = new DOMParser().parseFromString(svgText, 'image/svg+xml').documentElement;
  
//       // Append the SVG element to the button
//       button.appendChild(svgElement);
//     } catch (error) {
//       console.error('Error fetching SVG:', error);
//     }
//   }

async function getActiveTabURL() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
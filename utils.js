// async function loadSvgAndAppendToButton(buttonId, svgPath) {
//     const button = document.getElementById("bookmark-btn");

//     if (!button) {
//       console.error('Button not found');
//       return;
//     }

//     const svg = new DOMParser().parseFromString(svgText, 'image/svg+xml').documentElement;
  
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

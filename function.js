window.function = function (
  html,
  fileName,
  format,
  zoom,
  orientation,
  margin,
  breakBefore,
  breakAfter,
  breakAvoid,
  fidelity,
  customDimensions
) {
  // FIDELITY MAPPING
  const fidelityMap = {
    low: 1,
    standard: 1.5,
    high: 2,
  };

  // DYNAMIC VALUES
  html = html.value ?? "No HTML set.";
  fileName = fileName.value ?? "file";
  format = format.value ?? "a4";
  zoom = zoom.value ?? "1";
  orientation = orientation.value ?? "portrait";
  margin = margin.value ?? "0";
  breakBefore = breakBefore.value ? breakBefore.value.split(",") : [];
  breakAfter = breakAfter.value ? breakAfter.value.split(",") : [];
  breakAvoid = breakAvoid.value ? breakAvoid.value.split(",") : [];
  quality = fidelityMap[fidelity.value] ?? 1.5;
  customDimensions = customDimensions.value
    ? customDimensions.value.split(",").map(Number)
    : null;

  // DOCUMENT DIMENSIONS
  const formatDimensions = {
    a4: [1240, 1754], // Default to A4
    // Add other formats as needed
  };

  const dimensions = customDimensions || formatDimensions[format];
  const finalDimensions = dimensions.map((dimension) =>
    Math.round(dimension / zoom)
  );

  // Custom CSS
  const customCSS = `
    body {
      margin: 0;
      font-family: Arial, sans-serif;
    }
  `;

  // HTML for the new tab
const tabHTML = `
  <html>
    <head>
      <title>${fileName}</title>
      <style>${customCSS}</style>
    </head>
    <body>
      <div id="content">${html}</div>
         </body>
  </html>
`;


  	// HTML THAT IS RETURNED AS A RENDERABLE URL
	const originalHTML = `
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
	  <style>${customCSS}</style>
	  <div class="main">
	  <div class="header">
		  </div>
	  <div id="content">${html}</div>
	  </div>
	  <script>
	  window.onload = function () {
            setTimeout(() => {
              window.print();
            }, 500); // Delay ensures rendering before print
          };
		  </script>
	  `;
	var encodedHtml = encodeURIComponent(originalHTML);
  return "data:text/html;charset=utf-8," + encodedHtml;
};

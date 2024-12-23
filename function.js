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

  // Create button functionality to open the new tab
  const originalHTML = `
    <button id="openTab">Print</button>
    <script>
      document.getElementById('openTab').addEventListener('click', function () {
        const newTab = window.open();
        if (newTab) {
          newTab.document.open();
          newTab.document.write(\`${tabHTML}\`);
          newTab.document.close();
        } else {
          alert('Please allow popups for this site.');
        }
      });
window.onload = function () {
            setTimeout(() => {
              window.print();
            }, 500); // Delay ensures rendering before print
          };
          </script>
  `;

  const encodedHtml = encodeURIComponent(originalHTML);
  return "data:text/html;charset=utf-8," + encodedHtml;
};

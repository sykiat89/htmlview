window.function = function (
  html,
  fileName
) {
  // Default values
  html = html.value ?? "<h1>No HTML provided</h1>";
  fileName = fileName.value ?? "document";

  // HTML for the new tab with auto-print
  const tabHTML = `
    <html>
      <head>
        <title>${fileName}</title>
      </head>
      <body>
        <div id="content">${html}</div>
        <script>
          // Automatically trigger print dialog
          window.onload = function() {
            setTimeout(() => {
              window.print();
            }, 500); // Slight delay to ensure rendering
          };
        </script>
      </body>
    </html>
  `;

  // Open the new tab and write the HTML
  const newTab = window.open();
  if (newTab) {
    newTab.document.open();
    newTab.document.write(tabHTML);
    newTab.document.close();
  } else {
    alert('Please allow popups for this site.');
  }
};

window.function = function (html, fileName) {
    // FIDELITY MAPPING
    const fidelityMap = {
        low: 1,
        standard: 1.5,
        high: 2,
    };

    // DYNAMIC VALUES
    html = html.value ?? "No HTML set.";
    fileName = fileName.value ?? "file";
    
    // DOCUMENT DIMENSIONS
    const formatDimensions = {
        a4: [1240, 1754],
    };
    
    // FINAL HTML TO OPEN IN NEW TAB
    const finalHTML = `
    <html>
    <head>
        <title>${fileName}</title>
        <style>
            /* Add your styling here */
            body { font-family: Arial, sans-serif; margin: 0; padding: 10px; }
            h2 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            td, th { padding: 8px; border: 1px solid #ddd; text-align: left; }
        </style>
    </head>
    <body>
        <h2>${fileName}</h2>
        <div>${html}</div>
    </body>
    </html>`;

    // Open the HTML in a new tab
    const newTab = window.open();
    if (newTab) {
        newTab.document.write(finalHTML);  // Write the HTML content to the new tab
        newTab.document.close();
    } else {
        alert('Please allow popups for this site.');
    }

    return "data:text/html;charset=utf-8," + encodeURIComponent(finalHTML);  // You can still return the data URL if needed
};

window.function = function (html, fileName) {
    // DYNAMIC VALUES
    html = html.value ?? "No HTML set.";
    fileName = fileName.value ?? "file";

    // DIRECTLY OPEN HTML IN A NEW TAB
    const buttonHTML = `
    <script>
        // Open the content in a new tab
        const newTab = window.open();
        if (newTab) {
            newTab.document.write('<html><head><title>${fileName}</title></head><body>');
            newTab.document.write('${html}');
            newTab.document.write('</body></html>');
            newTab.document.close();
        } else {
            alert('Please allow popups for this site.');
        }
    </script>`;

    return "data:text/html;charset=utf-8," + encodeURIComponent(buttonHTML);
};

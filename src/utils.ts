/**
 * Export content as a downloadable file in the browser
 */
export function exportToFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Format markdown to printable HTML structure (basic inline tags)
 */
export function markdownToBasicHtml(markdown: string, title: string): string {
  // Simple regex replacements for clean reading layouts in exporting HTML
  let html = markdown
    .replace(/^### (.*$)/gim, '<h3 style="font-family: sans-serif; color: #0f172a; margin-top: 1.5em; margin-bottom: 0.5em; font-size: 1.25rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.25rem;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-family: sans-serif; color: #0f172a; margin-top: 2em; margin-bottom: 0.75em; font-size: 1.5rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.4rem;">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="font-family: sans-serif; color: #022c22; margin-top: 0; margin-bottom: 1em; font-size: 2rem; background: #f0fdf4; padding: 1rem; border-radius: 8px; border-left: 5px solid #059669;">$1</h1>')
    .replace(/^\s*\n\*/gm, "<ul>\n*")
    .replace(/^-\s(.*$)/gim, '<li style="margin-bottom: 0.4em;">$1</li>')
    .replace(/^\*\s(.*$)/gim, '<li style="margin-bottom: 0.4em;">$1</li>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, '<code style="background-color: #f1f5f9; padding: 0.15rem 0.3rem; border-radius: 4px; font-family: monospace; font-size: 0.9em; color: #0f172a;">$1</code>')
    .replace(/\n/g, "<br>");

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          line-height: 1.6;
          color: #334155;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          background-color: #f8fafc;
        }
        .container {
          background-color: #ffffff;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
          border: 1px solid #e2e8f0;
        }
        h1, h2, h3, h4 {
          font-weight: 600;
        }
        li {
          margin-left: 20px;
        }
        hr {
          border: 0;
          border-top: 1px solid #e2e8f0;
          margin: 2rem 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        ${html}
      </div>
    </body>
    </html>
  `;
}

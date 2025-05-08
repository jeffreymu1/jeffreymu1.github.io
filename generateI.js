const fs = require('fs');
const path = require('path');

const postsDirectory = path.join(__dirname, 'posts');
const indexFilePath = path.join(postsDirectory, 'index.html');

const generateIndex = () => {
  console.log("scanning /posts for HTML files...");

  fs.readdir(postsDirectory, (err, files) => {
    if (err) {
      console.error("error reading /posts directory:", err);
      return;
    }

    
    const postFiles = files.filter(file => file.endsWith('.html'));

    
    let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Post Index</title>
    </head>
    <body>
      <ul>
    `;

    
    postFiles.forEach(file => {
      const postName = file.replace('.html', '').replace(/-/g, ' ');
      htmlContent += `<li><a href="/posts/${file}">${postName}</a></li>\n`;
    });

    
    htmlContent += `
      </ul>
    </body>
    </html>
    `;

    
    fs.writeFile(indexFilePath, htmlContent, (err) => {
      if (err) {
        console.error("error writing index.html:", err);
      } else {
        console.log(`successfully generated index.html with ${postFiles.length} posts.`);
      }
    });
  });
};

generateIndex();

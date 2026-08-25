const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace image for 12 (FlatForge AI)
html = html.replace(/(<img[^>]*src="st images\/)[^"]+("[^>]*>\s*<div[^>]*>.*<\/div>\s*<h3>12 &mdash; FlatForge AI<\/h3>)/g, '$1flatforge_new.jpg$2');

fs.writeFileSync('index.html', html);

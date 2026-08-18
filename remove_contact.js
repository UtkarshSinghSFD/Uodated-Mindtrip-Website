const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove all <div class="info-row"> ... </div> blocks
html = html.replace(/<div class="info-row">[\s\S]*?<\/div>\s*<\/div>/g, '');

fs.writeFileSync('index.html', html);
console.log('Removed info-rows');

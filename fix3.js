const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update marquee card height
html = html.replace(/height: auto !important;\s*min-height: 700px !important;/g, 'height: 580px !important;');

// Add max-height to feature list and improve scrollbar visibility
html = html.replace(/flex-grow: 1 !important;\s*scrollbar-width: thin !important;\s*scrollbar-color: rgba\(0,0,0,0\.2\) transparent !important;/g, 'flex-grow: 1 !important;\n      max-height: 95px !important;\n      scrollbar-width: thin !important;\n      scrollbar-color: rgba(255,255,255,0.3) transparent !important;');

fs.writeFileSync('index.html', html);

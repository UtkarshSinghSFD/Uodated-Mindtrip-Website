const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update card height to accommodate the fixed elements
html = html.replace(/height: 615px !important;/g, 'height: 680px !important;');

// product-badge
html = html.replace(/\.marquee-card \.product-badge \{/g, '.marquee-card .product-badge {\n      height: 48px !important;\n      display: flex !important;\n      align-items: center !important;');
html = html.replace(/margin-bottom: 1\.5rem !important;\s*border-radius: 20px/g, 'margin-bottom: 1rem !important;\n      border-radius: 20px');

// h3
html = html.replace(/\.marquee-card h3 \{/g, '.marquee-card h3 {\n      height: 32px !important;\n      white-space: nowrap !important;\n      overflow: hidden !important;\n      text-overflow: ellipsis !important;');
html = html.replace(/margin-bottom: 0\.2rem !important;/g, 'margin-bottom: 0.5rem !important;');

// h4
html = html.replace(/\.marquee-card h4 \{/g, '.marquee-card h4 {\n      height: 45px !important;\n      overflow: hidden !important;\n      display: -webkit-box !important;\n      -webkit-line-clamp: 2 !important;\n      -webkit-box-orient: vertical !important;');
html = html.replace(/margin-bottom: 1\.5rem !important;\s*font-weight: 600/g, 'margin-bottom: 1rem !important;\n      font-weight: 600');

// p
html = html.replace(/\.marquee-card p \{/g, '.marquee-card p {\n      height: 120px !important;\n      overflow: hidden !important;\n      display: -webkit-box !important;\n      -webkit-line-clamp: 5 !important;\n      -webkit-box-orient: vertical !important;');
html = html.replace(/margin-bottom: 1\.5rem !important;\s*color: var\(--color-text-light\)/g, 'margin-bottom: 1rem !important;\n      color: var(--color-text-light)');

// feature-list max-height to height
html = html.replace(/max-height: 125px !important;/g, 'height: 125px !important;');

fs.writeFileSync('index.html', html);

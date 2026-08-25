const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace image for 06
html = html.replace(/(<img[^>]*src="st images\/)connecpro\.jpg("[^>]*>\s*<div[^>]*>.*<\/div>\s*<h3>06 &mdash; ConnecPro AI<\/h3>)/g, '$1connecpro_new.jpg$2');

// Replace image for 11
html = html.replace(/(<img[^>]*src="st images\/)movemate\.jpg("[^>]*>\s*<div[^>]*>.*<\/div>\s*<h3>11 &mdash; MoveMate<\/h3>)/g, '$1movemate_new.jpg$2');

// Increase card height
html = html.replace(/height: 580px !important;/g, 'height: 615px !important;');

// Increase feature list max-height to show more points
html = html.replace(/max-height: 95px !important;/g, 'max-height: 125px !important;');

fs.writeFileSync('index.html', html);

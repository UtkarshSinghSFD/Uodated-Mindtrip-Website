const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const replacements = [
    {title: '01 &mdash; AutoFlow', img: '393079873750292730.jpg'},
    {title: '02 &mdash; HappyNest', img: 'Data Drives Decisions_ Trade with Logic.jpg'},
    {title: '03 &mdash; VideoSphere', img: 'Watch RDW Creations turn one simple idea into a..jpg'},
    {title: '04 &mdash; GigConnect', img: '689543392956902517.jpg'},
    {title: '05 &mdash; RidePulse', img: '492649954685676.jpg'},
    {title: '06 &mdash; ConnecPro AI', img: '__Your One-Stop IT Shop_ Thanks for Joining..jpg'},
    {title: '07 &mdash; StyleServe', img: 'fabio-oyXis2kALVg-unsplash.jpg'},
    {title: '08 &mdash; FocusFlow', img: '387591111704388573.jpg'},
    {title: '09 &mdash; EduFund Manager', img: '891290582523669974.jpg'},
    {title: '10 &mdash; CarFleet ERP', img: 'coding.jpg'},
    {title: '11 &mdash; MoveMate', img: 'Et si une IA laissait un message pour la prochaine..jpg'},
    {title: '12 &mdash; FlatForge AI', img: '485474034854831901.jpg'},
    {title: '13 &mdash; AgroRush', img: 'trading_.jpg'}
];

// Re-add them cleanly
replacements.forEach(r => {
    // Strip existing image from THIS specific product if it has one
    // Regex: find product card, optional img, then badge, then the title
    const regex = new RegExp(`(<div class="product-card marquee-card">\\s*)(?:<img[^>]*>\\s*)?(<div class="product-badge">[^<]*</div>\\s*<h3>${r.title}</h3>)`, 'g');
    
    content = content.replace(regex, `$1<img src="st images/${r.img}" alt="${r.title.split('&mdash; ')[1]}" style="width: 100%; border-radius: 8px; margin-bottom: 15px; height: 160px; object-fit: cover; opacity: 0.85;">\n            $2`);
});

fs.writeFileSync('index.html', content);

const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const replacements = [
    {title: '01 &mdash; AutoFlow', img: 'Digital Efficiency.jpg'},
    {title: '02 &mdash; HappyNest', img: 'trading_.jpg'},
    {title: '03 &mdash; VideoSphere', img: '21392166974708354.jpg'},
    {title: '04 &mdash; GigConnect', img: 'fabio-oyXis2kALVg-unsplash.jpg'},
    {title: '05 &mdash; RidePulse', img: '891290582523669974.jpg'},
    {title: '06 &mdash; ConnecPro AI', img: 'coding.jpg'},
    {title: '07 &mdash; StyleServe', img: 'alex-knight-2EJCSULRwC8-unsplash.jpg'},
    {title: '08 &mdash; FocusFlow', img: '11892386514169735.jpg'},
    {title: '09 &mdash; EduFund Manager', img: '387591111704388573.jpg'}
];

// First, strip out any existing images added so we start clean
content = content.replace(/<img src="st images\/[^"]+" alt="[^"]+" style="width: 100%; border-radius: 8px; margin-bottom: 15px; height: 160px; object-fit: cover; opacity: 0\.85;">\s*/g, '');

// Then add the correct images based on the H3 title
replacements.forEach(r => {
    // Escape regex specials in title just in case (though we know it's fine)
    const safeTitle = r.title.replace('&', '&amp;'); // Not needed, it is literal in HTML
    
    // Find: <div class="product-badge">...</div>
    //       <h3>0X &mdash; Title</h3>
    const regex = new RegExp(`(<div class="product-card marquee-card">\\s*)(<div class="product-badge">[^<]*</div>\\s*<h3>${r.title}</h3>)`, 'g');
    
    content = content.replace(regex, `$1<img src="st images/${r.img}" alt="${r.title.split('&mdash; ')[1]}" style="width: 100%; border-radius: 8px; margin-bottom: 15px; height: 160px; object-fit: cover; opacity: 0.85;">\n            $2`);
});

fs.writeFileSync('index.html', content);

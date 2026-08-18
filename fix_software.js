const fs = require('fs');

try {
    let sample3 = fs.readFileSync('sample/software-sample-3.html', 'utf8');
    let indexHtml = fs.readFileSync('index.html', 'utf8');
    let styleCss = fs.readFileSync('style.css', 'utf8');

    // Extract raw CSS
    let cssMatch = sample3.match(/<style>([\s\S]*?)<\/style>/);
    let rawCss = cssMatch ? cssMatch[1] : '';

    // Extract @import and move it to the top of style.css
    let importRegex = /@import url\('[^']+'\);/g;
    let imports = [];
    rawCss = rawCss.replace(importRegex, (match) => {
        imports.push(match);
        return '';
    });

    if (imports.length > 0) {
        // Prepend imports to styleCss if not already there
        for (let imp of imports) {
            if (!styleCss.includes(imp)) {
                styleCss = imp + '\n' + styleCss;
            }
        }
    }

    // Extract raw HTML body (from <section class="hero"> up to the start of footer)
    let bodyMatch = sample3.match(/<section class="hero">([\s\S]*?)<footer/);
    let rawHtml = '<section class="hero">' + (bodyMatch ? bodyMatch[1] : '');

    // List of classes to rename to avoid global conflict
    const renameMap = {
        'hero': 's3-hero',
        'wrap': 's3-wrap',
        'btn-primary': 's3-btn-primary',
        'btn-secondary': 's3-btn-secondary',
        'product': 's3-product'
    };

    // Rename classes in HTML
    let processedHtml = rawHtml.replace(/class="([^"]*)"/g, (match, classNames) => {
        let classes = classNames.split(/\s+/).map(c => renameMap[c] || c);
        return 'class="' + classes.join(' ') + '"';
    });
    
    // Also change contact id to avoid jumping bug
    processedHtml = processedHtml.replace(/id="contact"/g, 'id="software-contact"');
    processedHtml = processedHtml.replace(/href="#contact"/g, 'href="#software-contact"');

    // Process CSS
    let processedCss = rawCss;
    
    // Rename classes in CSS (exact match)
    for (let oldClass in renameMap) {
        let newClass = renameMap[oldClass];
        let regex = new RegExp('\\.' + oldClass + '(?![a-zA-Z0-9_-])', 'g');
        processedCss = processedCss.replace(regex, '.' + newClass);
    }

    // Isolate CSS to #software
    processedCss = processedCss
        .replace(/:root\s*\{/g, '#software {')
        .replace(/body\s*\{/g, '#software {')
        .replace(/body:before\s*\{/g, '#software::before {')
        .replace(/(^|\n|\}|,)\s*(h1|h2|h3|h4|a|p|img|svg|section|form|input|textarea|label|ul|li|button)\b/g, '$1 #software $2')
        .replace(/(^|\n|\}|,)\s*\*/g, '$1 #software *')
        .replace(/html\s*\{.*?\}/g, '') // remove html
        // Prefix all valid CSS classes (starts with letter, _, or - followed by letter)
        .replace(/(^|\n|\}|,)\s*\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g, '$1 #software .$2'); 

    // Override any global #software constraints from .page-section
    const cssResets = `
/* --- S3 FULL PAGE OVERRIDES --- */
#software.page-section {
    max-width: none !important;
    padding: 0 !important;
    margin: 0 !important;
    width: 100%;
    text-align: left;
}
#software .s3-hero {
    display: block;
    align-items: initial;
    max-width: none;
    margin: 0;
}
#software h1, #software h2, #software h3, #software h4, #software p {
    margin-bottom: initial;
    color: inherit;
}
#software ul {
    padding: 0;
    margin: 0;
    list-style: none;
}
#software a {
    text-decoration: none;
}
`;

    processedCss = '/* --- SOFTWARE SAMPLE 3 STYLES --- */\n' + cssResets + processedCss;

    styleCss += '\n\n' + processedCss;
    fs.writeFileSync('style.css', styleCss.trim() + '\n');
    console.log('Updated style.css with imports at the top.');

    // Build the final HTML block
    let finalHtmlBlock = `            <!-- SOFTWARE SOLUTIONS PAGE - SAMPLE 3 EXACT THEME -->
            <section id="software" class="page-section">
${processedHtml}
            </section>`;

    // Replace in index.html
    const indexRegex = /<!-- SOFTWARE SOLUTIONS PAGE[\s\S]*?<\/section>\s*(?=<!-- EVENTS PAGE -->)/;
    if (indexRegex.test(indexHtml)) {
        indexHtml = indexHtml.replace(indexRegex, finalHtmlBlock + '\n\n            ');
        fs.writeFileSync('index.html', indexHtml);
        console.log('Updated index.html');
    } else {
        console.log('Could not find software section in index.html');
    }

} catch (e) {
    console.error(e);
}

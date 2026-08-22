const fs = require('fs');
const path = require('path');

const sampleDir = path.join(__dirname, 'sample');
const comfortaaLink = '<link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet">';

fs.readdirSync(sampleDir).forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(sampleDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Add Google Font link if not present
        if (!content.includes('family=Comfortaa')) {
            const linkRegex = /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=[^"]+" rel="stylesheet">/g;
            if (linkRegex.test(content)) {
                content = content.replace(linkRegex, comfortaaLink);
            } else {
                content = content.replace('</head>', `    ${comfortaaLink}\n</head>`);
            }
        }

        // Replace CSS Variables
        content = content.replace(/(--font-(?:heading|body|primary|secondary|main)):\s*[^;]+;/g, "$1: 'Comfortaa', sans-serif;");

        // Replace direct font-family declarations using other common fonts
        content = content.replace(/font-family:\s*['"]?(?:Inter|Outfit|Roboto|Open Sans|Montserrat|Poppins)['"]?,\s*sans-serif;/gi, "font-family: 'Comfortaa', sans-serif;");

        // Replace any string like font-family: '...', sans-serif where it's specific in body {}
        // Since we don't want to replace font-awesome or phosphor icons
        content = content.replace(/font-family:\s*['"]?(?!Comfortaa|FontAwesome|Phosphor)[^'"]+['"]?,\s*sans-serif;/gi, "font-family: 'Comfortaa', sans-serif;");


        // In case the file has font-family: var(--font-body); but it wasn't defined, let's make sure it is defined in :root
        if (!content.includes('--font-body') && content.includes(':root {')) {
            content = content.replace(':root {', ":root {\n    --font-body: 'Comfortaa', sans-serif;\n    --font-heading: 'Comfortaa', sans-serif;");
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});

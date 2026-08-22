import os
import re

sample_dir = r'c:\Users\utkar\OneDrive\Desktop\MideTripE\sample'
comfortaa_link = '<link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet">'

for filename in os.listdir(sample_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(sample_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Add Google Font link if not present
        if 'family=Comfortaa' not in content:
            # Try to replace existing Google font links
            content, count = re.subn(r'<link href="https://fonts\.googleapis\.com/css2\?family=[^"]+" rel="stylesheet">', comfortaa_link, content)
            
            # If no existing google fonts link was found to replace, just insert it before </head>
            if count == 0:
                content = content.replace('</head>', f'    {comfortaa_link}\n</head>')
        
        # Replace CSS Variables
        content = re.sub(r'(--font-(?:heading|body|primary|secondary|main)):\s*[^;]+;', r"\1: 'Comfortaa', sans-serif;", content)
        
        # Replace direct font-family declarations using other common fonts
        content = re.sub(r"font-family:\s*['\"]?(?:Inter|Outfit|Roboto|Open Sans|Montserrat|Poppins)['\"]?,\s*sans-serif;", "font-family: 'Comfortaa', sans-serif;", content)
        
        # In case the file has font-family: var(--font-body); but it wasn't defined, let's make sure it is defined in :root
        if '--font-body' not in content and ':root {' in content:
            content = content.replace(':root {', ":root {\n    --font-body: 'Comfortaa', sans-serif;\n    --font-heading: 'Comfortaa', sans-serif;")

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {filename}')

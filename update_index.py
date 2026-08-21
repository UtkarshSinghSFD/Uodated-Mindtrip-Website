import re

# Read MideTripE index.html
with open('c:/Users/utkar/OneDrive/Desktop/MideTripE/index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Read Star Nexus files
with open('C:/Users/utkar/OneDrive/Desktop/Star nexus/index.html', 'r', encoding='utf-8') as f:
    sn_html = f.read()

with open('C:/Users/utkar/OneDrive/Desktop/Star nexus/style.css', 'r', encoding='utf-8') as f:
    sn_css = f.read()

with open('C:/Users/utkar/OneDrive/Desktop/Star nexus/script.js', 'r', encoding='utf-8') as f:
    sn_js = f.read()

# Extract body from sn_html
body_match = re.search(r'<body>(.*?)</body>', sn_html, re.DOTALL | re.IGNORECASE)
if body_match:
    sn_body = body_match.group(1)
else:
    sn_body = sn_html # fallback

# Scope the CSS
sn_css_scoped = sn_css.replace('body {', '#software {')
sn_css_scoped = sn_css_scoped.replace('html {', '#software {')

# Find the :root block
root_match = re.search(r':root\s*\{[^}]+\}', sn_css_scoped, re.DOTALL)
if root_match:
    root_css = root_match.group(0)
    sn_css_scoped = sn_css_scoped.replace(root_css, '')
else:
    root_css = ""

# Scope by nesting (modern browsers)
sn_css_nested = f"""
{root_css}

#software {{
  {sn_css_scoped}
}}
"""

new_section = f"""<section id="software" class="page-section">
<style>
{sn_css_nested}
</style>
{sn_body}
<script>
{sn_js}
</script>
</section>"""

lines = index_html.split('\n')
start_idx = -1
for i, line in enumerate(lines):
    if '<section id="software"' in line:
        start_idx = i
        break

if start_idx != -1:
    depth = 0
    end_idx = -1
    for i in range(start_idx, len(lines)):
        if '<section' in lines[i]:
            depth += 1
        if '</section>' in lines[i]:
            depth -= 1
            if depth == 0:
                end_idx = i
                break
    
    if end_idx != -1:
        new_lines = lines[:start_idx] + [new_section] + lines[end_idx+1:]
        with open('c:/Users/utkar/OneDrive/Desktop/MideTripE/index.html', 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_lines))
        print("Successfully updated index.html section from line", start_idx, "to", end_idx)
    else:
        print("Could not find end of section")
else:
    print("Could not find start of section")

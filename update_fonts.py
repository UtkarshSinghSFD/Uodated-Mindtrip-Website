import os
import re

files_to_check = [r"c:\Users\utkar\OneDrive\Desktop\MideTripE\style.css"]
sample_dir = r"c:\Users\utkar\OneDrive\Desktop\MideTripE\sample"
for f in os.listdir(sample_dir):
    if f.endswith('.html'):
        files_to_check.append(os.path.join(sample_dir, f))

replacements = [
    (re.compile(r'font-family:\s*["\']?Bangers["\']?[^;}]*'), r'font-family: var(--font-heading)'),
    (re.compile(r'font-family:\s*["\']?Patrick Hand["\']?[^;}]*'), r'font-family: var(--font-body)'),
    (re.compile(r'font-family:\s*["\']?Space Grotesk["\']?[^;}]*'), r'font-family: var(--font-heading)'),
    (re.compile(r'font-family:\s*["\']?Inter["\']?[^;}]*'), r'font-family: var(--font-body)'),
    (re.compile(r'font-family:\s*["\']?JetBrains Mono["\']?[^;}]*'), r'font-family: var(--font-mono)')
]

for filepath in files_to_check:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for pattern, repl in replacements:
        new_content = pattern.sub(repl, new_content)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

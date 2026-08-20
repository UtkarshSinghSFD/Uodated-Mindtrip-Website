const fs = require('fs');

const indexPath = 'c:/Users/utkar/OneDrive/Desktop/MideTripE/index.html';
const snHtmlPath = 'C:/Users/utkar/OneDrive/Desktop/Star nexus/index.html';
const snCssPath = 'C:/Users/utkar/OneDrive/Desktop/Star nexus/style.css';
const snJsPath = 'C:/Users/utkar/OneDrive/Desktop/Star nexus/script.js';

let indexHtml = fs.readFileSync(indexPath, 'utf-8');
const snHtml = fs.readFileSync(snHtmlPath, 'utf-8');
const snCss = fs.readFileSync(snCssPath, 'utf-8');
const snJs = fs.readFileSync(snJsPath, 'utf-8');

const bodyMatch = snHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let snBody = bodyMatch ? bodyMatch[1] : snHtml;

// Remove the script tag
snBody = snBody.replace(/<script src="script\.js"><\/script>/gi, '');

// Remove the Star Nexus header (so we don't have two headers)
snBody = snBody.replace(/<header class="site-header">[\s\S]*?<\/header>/gi, '');

// Update Hero Heading: Star Nexus Technologies (Big/Black) and Enterprise Automation & Software (Smaller/Teal)
snBody = snBody.replace(/<h1>Enterprise Automation & Software<\/h1>/i, `<h1 style="font-family: 'Comfortaa', sans-serif !important; font-size: 4rem; color: #000000; margin-bottom: 0.5rem; line-height: 1.1;">Star Nexus<br>Technologies</h1>\n                    <div style="color: var(--color-primary); font-family: 'Comfortaa', sans-serif !important; font-weight: 700; font-size: 1.8rem; margin-bottom: 1rem;">Enterprise Automation & Software</div>`);


let snCssScoped = snCss.replace(/body\s*\{/g, '#software {');
snCssScoped = snCssScoped.replace(/html\s*\{/g, '#software {');

const rootMatch = snCssScoped.match(/:root\s*\{[^}]+\}/);
let rootCss = '';
if (rootMatch) {
    // Scope the CSS variables to #software instead of :root
    rootCss = rootMatch[0].replace(/:root/, '#software');
    snCssScoped = snCssScoped.replace(rootMatch[0], '');
}

// Add CSS resets to prevent MideTripE global styles from bleeding into Star Nexus
const cssResets = `
  /* Resets to prevent bleed-through */
  .product-card {
      display: block !important;
      border: none !important;
  }
  .product-badge {
      border: none !important;
  }
  #contact {
      background: var(--color-bg-light) !important;
  }
  #contact::before, #contact::after {
      display: none !important;
  }
  form {
      background: transparent !important;
      border: none !important;
      padding: 0 !important;
      box-shadow: none !important;
      border-radius: 0 !important;
  }
  input, textarea {
      background: var(--color-bg-light) !important;
      border: 1px solid var(--color-border) !important;
      border-radius: var(--radius) !important;
      color: var(--color-text) !important;
      font-family: var(--font-body) !important;
  }
  input:focus, textarea:focus {
      outline: none !important;
      border-color: var(--color-primary) !important;
      box-shadow: 0 0 0 3px rgba(0,174,182,0.1) !important;
  }
  .site-footer {
      background-color: var(--color-bg-dark) !important;
  }
  .footer-bottom {
      display: block !important;
      text-align: center !important;
      border-top: none !important;
      padding-top: 0 !important;
      color: #888 !important;
  }
  .footer-brand p, .footer-contact p {
      color: var(--color-bg-light) !important;
      margin-top: 0 !important;
      font-size: 0.95rem !important;
  }
  .footer-brand h2 {
      font-size: 1.5rem !important;
      color: var(--color-bg-light) !important;
      margin-bottom: var(--spacing-xs) !important;
  }
  .footer-contact h3 {
      font-size: 1.2rem !important;
      color: var(--color-bg-light) !important;
      margin-bottom: var(--spacing-xs) !important;
  }
  .footer-contact a {
      color: var(--color-primary) !important;
  }
  h1, h2, h3, h4, h5, h6, .logo a {
      font-family: var(--font-heading) !important;
      color: var(--color-text) !important;
  }
  p, li, .val, .note {
      font-family: var(--font-body) !important;
  }
  label {
      font-family: var(--font-heading) !important;
      color: var(--color-text) !important;
      letter-spacing: normal !important;
  }
  .contact-info p, .info-row div.val {
      color: var(--color-text-light) !important;
  }
  
  /* Fix headings in dark sections (Our Services) */
  .section-dark h2, .section-dark h3, .section-dark h4 {
      color: #ffffff !important;
  }
  
  /* Fix Marquee Track Width and Speed */
  .product-marquee-track {
      width: max-content !important;
      flex-shrink: 0 !important;
      display: flex !important;
      flex-wrap: nowrap !important;
  }
  .track-left {
      animation: scrollLeft 40s linear infinite !important;
  }
  .track-right {
      animation: scrollRight 35s linear infinite !important;
  }
  .product-marquee-track:hover {
      animation-play-state: paused !important;
  }
  
  /* Star Nexus Original Style Cards */
  .marquee-card {
      min-width: 360px !important;
      max-width: 360px !important;
      height: 480px !important;
      flex-shrink: 0 !important;
      background: #ffffff !important;
      border: none !important;
      border-radius: 8px !important;
      padding: 30px !important;
      display: flex !important;
      flex-direction: column !important;
      transition: transform 0.3s ease !important;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05) !important;
  }
  .marquee-card:hover {
      transform: translateY(-8px) !important;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
  }
  .marquee-card h3 {
      font-size: 1.8rem !important;
      color: var(--color-text) !important;
      margin-bottom: 0.2rem !important;
  }
  .marquee-card h4 {
      font-size: 1rem !important;
      color: var(--color-primary) !important;
      margin-bottom: 1.5rem !important;
      font-weight: 600 !important;
  }
  .marquee-card p {
      font-size: 0.95rem !important;
      line-height: 1.6 !important;
      margin-bottom: 1.5rem !important;
      color: var(--color-text-light) !important;
  }
  .marquee-card .feature-list {
      margin-top: 0 !important;
      padding-left: 0 !important;
      list-style-type: none !important;
      overflow-y: auto !important;
      flex-grow: 1 !important;
      scrollbar-width: thin !important;
      scrollbar-color: rgba(0,0,0,0.2) transparent !important;
  }
  .marquee-card .feature-list li {
      font-size: 0.9rem !important;
      color: var(--color-text-light) !important;
      margin-bottom: 0.6rem !important;
      position: relative !important;
      padding-left: 1.5rem !important;
  }
  .marquee-card .feature-list li::before {
      content: "→" !important;
      position: absolute !important;
      left: 0 !important;
      color: var(--color-primary) !important;
  }
  .marquee-card .product-badge {
      font-size: 0.75rem !important;
      margin-bottom: 1.5rem !important;
      border-radius: 20px !important;
      padding: 6px 14px !important;
      background: var(--color-text) !important;
      color: var(--color-bg-light) !important;
      border: none !important;
      font-weight: 600 !important;
      align-self: flex-start !important;
      display: inline-block !important;
  }
  
  @media (max-width: 768px) {
      .marquee-card {
          min-width: 320px !important;
          max-width: 320px !important;
          height: 420px !important;
      }
  }
`;

snCssScoped += cssResets;

const snCssNested = `
${rootCss}

@keyframes scrollLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

@keyframes scrollRight {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
}

#software {
  ${snCssScoped}
}

/* Hide global MideTripE footer when software page is active */
body.software-active footer.footer {
    display: none !important;
}

/* Make entire navbar solid black on software page so the tab blends in */
body.software-active .navbar {
    background: #000000 !important;
    backdrop-filter: none !important;
}

/* Fix Navigation Tab for Software page to match Education (Yellow/Gold) */
body.software-active .nav-links .nav-btn.active {
    color: #eab308 !important; /* var(--accent-gold) */
    background: rgba(234, 179, 8, 0.1) !important;
    border: 1px solid rgba(234, 179, 8, 0.3) !important;
    text-shadow: 0 0 10px rgba(234, 179, 8, 0.5) !important;
}

/* Remove old MideTripE black borders from sections */
#software section {
    border: none !important;
}

/* Dropping animation for boxes */
@keyframes dropInAnim {
    0% { opacity: 0; transform: translateY(-50px); }
    100% { opacity: 1; transform: translateY(0); }
}
.animate-drop {
    animation: dropInAnim 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

/* Explicitly enforce Star Nexus fonts (Comfortaa for headings, Poppins for body) */
#software {
    font-family: 'Poppins', sans-serif !important;
}
#software h1, #software h2, #software h3, #software h4, #software h5, #software h6, #software .logo a {
    font-family: 'Comfortaa', sans-serif !important;
}
#software p, #software li, #software .val, #software .note {
    font-family: 'Poppins', sans-serif !important;
}
`;

const newSection = `<section id="software" class="page-section">
<style>
${snCssNested}
</style>
${snBody}
<script>
${snJs}

// Box dropping animation observer
document.addEventListener('DOMContentLoaded', () => {
    const dropObserver = new PoppinssectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isPoppinssecting) {
                entry.target.classList.add('animate-drop');
                dropObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const boxes = document.querySelectorAll('#software .step-card, #software .service-item, #software .integration-card');
    boxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.animationDelay = (index % 3) * 0.15 + 's';
        dropObserver.observe(box);
    });
});
</script>
</section>`;

const lines = indexHtml.split('\n');
let startIdx = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<section id="software"')) {
        startIdx = i;
        break;
    }
}

if (startIdx !== -1) {
    let depth = 0;
    let endIdx = -1;
    for (let i = startIdx; i < lines.length; i++) {
        if (lines[i].includes('<section')) {
            depth++;
        }
        if (lines[i].includes('</section>')) {
            depth--;
            if (depth === 0) {
                endIdx = i;
                break;
            }
        }
    }
    
    if (endIdx !== -1) {
        const newLines = [
            ...lines.slice(0, startIdx),
            newSection,
            ...lines.slice(endIdx + 1)
        ];
        fs.writeFileSync(indexPath, newLines.join('\n'), 'utf-8');
        console.log(`Successfully updated index.html section from line ${startIdx} to ${endIdx}`);
    } else {
        console.log('Could not find end of section');
    }
} else {
    console.log('Could not find start of section');
}

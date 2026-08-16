// Force scroll to top on reload so the hero section perfectly frames the screen
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Main Navigation Logic ---
    const navButtons = document.querySelectorAll('.nav-btn');
    const pageSections = document.querySelectorAll('.page-section');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    function updateFooterEmail() {
        const contactEmail = document.getElementById('footer-email-contact');
        const skillverseEmail = document.getElementById('footer-email-skillverse');
        const musicverseEmail = document.getElementById('footer-email-musicverse');
        
        if (!contactEmail || !skillverseEmail || !musicverseEmail) return;

        // Hide all initially
        contactEmail.style.display = 'none';
        skillverseEmail.style.display = 'none';
        musicverseEmail.style.display = 'none';

        // Check active page
        const activePage = document.querySelector('.page-section.active');
        if (activePage && activePage.id === 'education') {
            const activeSubSection = document.querySelector('.sub-section.active');
            if (activeSubSection && activeSubSection.id === 'skillverse') {
                skillverseEmail.style.display = 'block';
            } else if (activeSubSection && activeSubSection.id === 'musicverse') {
                musicverseEmail.style.display = 'block';
            } else {
                contactEmail.style.display = 'block'; // fallback
            }
        } else {
            contactEmail.style.display = 'block';
        }
    }

    function setActivePage(targetId) {
        navButtons.forEach(btn => {
            if (btn.getAttribute('data-target') === targetId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        pageSections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
                
                if (targetId === 'software') {
                    document.body.classList.add('software-active');
                } else {
                    document.body.classList.remove('software-active');
                }

                // Reset all reveal animations on the new page so they play again
                const reveals = section.querySelectorAll('.reveal');
                reveals.forEach(el => {
                    el.classList.remove('active');
                    if (window.revealObserver) {
                        window.revealObserver.observe(el);
                    }
                });

                // Initialize counters for the new page
                setTimeout(() => {
                    initCounters();
                    if (targetId === 'education' && window.moveSpaceship) {
                        // Force an immediate movement when the tab opens
                        window.moveSpaceship();
                    }
                }, 100);
            } else {
                section.classList.remove('active');
            }
        });

        // Close mobile menu if it's open
        if (navLinksContainer && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            }
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        updateFooterEmail();
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setActivePage(btn.getAttribute('data-target'));
        });
    });

    window.switchPage = function(targetId) {
        setActivePage(targetId);
    };

    // --- Mobile Menu Toggle ---
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (icon.classList.contains('ph-list')) {
                    icon.classList.remove('ph-list');
                    icon.classList.add('ph-x');
                } else {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            }
        });
    }

    // --- 2. Education Sub-navigation (Toggle) Logic ---
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const toggleBg = document.querySelector('.toggle-bg');
    const subSections = document.querySelectorAll('.sub-section');

    toggleButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            toggleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (index === 0) {
                toggleBg.style.transform = 'translateX(0)';
            } else {
                toggleBg.style.transform = 'translateX(100%)';
            }

            const targetId = btn.getAttribute('data-target');
            subSections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                    // Re-trigger reveal elements inside
                    setTimeout(() => initRevealObserver(), 50);
                } else {
                    section.classList.remove('active');
                }
            });
            
            updateFooterEmail();

            // Re-trigger the rocket animations
            const rockets = document.querySelectorAll('.rocket-left, .rocket-right');
            rockets.forEach(rocket => {
                rocket.style.animation = 'none';
                void rocket.offsetWidth; // Force a reflow
                rocket.style.animation = null; 
            });
        });
    });

    // --- 3. Custom Cursor Glow ---
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        if(cursorGlow) {
            cursorGlow.style.opacity = '1';
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        }
    });
    // Hide when leaving window
    document.addEventListener('mouseleave', () => {
        if(cursorGlow) cursorGlow.style.opacity = '0';
    });

    // --- 4. Scroll Reveal Animations (Intersection Observer) ---
    window.revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to trigger CSS animation
                entry.target.classList.add('active');
                // Stop observing once animated so it doesn't replay on every scroll up/down
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it hits the bottom
    });

    function initRevealObserver() {
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => window.revealObserver.observe(el));
    }
    // Initialize on load for the first page
    initRevealObserver();

    // --- 5. Animated Number Counters ---
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the slower

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    
                    const updateCount = () => {
                        const inc = target / speed;
                        if (count < target) {
                            count += Math.ceil(inc);
                            counter.innerText = count > target ? target : count;
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    
                    updateCount();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }
    initCounters();

    // --- 6. 3D Card Tilt Effect ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // --- 7. Hero Parallax Icons ---
    const parallaxIcons = document.querySelectorAll('.floating-icon');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        parallaxIcons.forEach((icon, index) => {
            const speed = (index + 1) * 15;
            icon.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // --- 8. Matrix Coding Shower ---
    const canvas = document.getElementById('coding-shower');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"\'#&_(),.;:?!\\|{}<>[]^~'.split('');
        const fontSize = 16;
        let drops = [];

        function drawMatrix() {
            // Check if #software is active, if not, don't draw (save CPU)
            const softwarePage = document.getElementById('software');
            if (softwarePage && !softwarePage.classList.contains('active')) return;
            
            // Dynamic resizing (fixes 0 width/height issue when tab is initially hidden)
            if (canvas.parentElement.offsetWidth > 0 && 
               (canvas.width !== canvas.parentElement.offsetWidth || canvas.height !== canvas.parentElement.offsetHeight)) {
                
                canvas.width = canvas.parentElement.offsetWidth;
                canvas.height = canvas.parentElement.offsetHeight;
                
                let expectedColumns = Math.floor(canvas.width / fontSize) + 1;
                while (drops.length < expectedColumns) {
                    drops.push(Math.random() * -100);
                }
            }

            // Only draw if we have a valid width/height
            if (canvas.width > 0 && canvas.height > 0) {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'; // Fades canvas out transparently without adding solid color
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'source-over';
                
                ctx.fillStyle = '#0ea5e9'; // Cartoonish blue
                ctx.font = 'bold ' + fontSize + 'px "Comic Neue", cursive';
                
                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    
                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
            }
        }
        
        setInterval(drawMatrix, 35);
        
        window.addEventListener('resize', () => {
            // Force redraw/recalculation on next frame by resetting width
            canvas.width = 0; 
        });
    }

    // --- 9. Fireworks Background for Events ---
    const fwCanvas = document.getElementById('fireworks-canvas');
    if (fwCanvas) {
        const fwCtx = fwCanvas.getContext('2d');
        let fireworks = [];
        let particles = [];

        function resizeFwCanvas() {
            if (fwCanvas.parentElement.offsetWidth > 0) {
                fwCanvas.width = fwCanvas.parentElement.offsetWidth;
                fwCanvas.height = fwCanvas.parentElement.offsetHeight;
            }
        }

        class Firework {
            constructor(isMega = false) {
                this.isMega = isMega;
                if (isMega) {
                    this.x = fwCanvas.width / 2; // Exact center
                    this.y = fwCanvas.height;
                    this.targetY = fwCanvas.height * 0.15; // High up behind the title
                    this.speed = 3.5; // Slow and steady
                    this.angle = -Math.PI / 2; // Straight up
                } else {
                    this.x = Math.random() * fwCanvas.width;
                    this.y = fwCanvas.height;
                    this.targetY = fwCanvas.height * 0.1 + Math.random() * (fwCanvas.height * 0.3); // Aim higher
                    this.speed = 2.5 + Math.random() * 2; // Faster initial speed to overcome low gravity
                    this.angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.4;
                }
                
                this.vx = Math.cos(this.angle) * this.speed;
                this.vy = Math.sin(this.angle) * this.speed;
                // Bright, vibrant colors fitting the gold/cyan theme
                const hues = [45, 190, 320, 10]; // gold, cyan, pink, red
                this.color = `hsl(${hues[Math.floor(Math.random() * hues.length)]}, 100%, 60%)`;
                if (isMega) this.color = `hsl(${hues[Math.floor(Math.random() * hues.length)]}, 100%, 75%)`; // Brighter for mega
                this.history = [];
            }
            update() {
                this.history.push({x: this.x, y: this.y});
                if (this.history.length > 5) this.history.shift();
                
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.008; // Much lower gravity for a high, graceful float
                
                if (this.vy >= 0 || this.y <= this.targetY) {
                    createParticles(this.x, this.y, this.color, this.isMega);
                    return false;
                }
                return true;
            }
            draw() {
                fwCtx.beginPath();
                if (this.history.length > 0) {
                    fwCtx.moveTo(this.history[0].x, this.history[0].y);
                } else {
                    fwCtx.moveTo(this.x, this.y);
                }
                fwCtx.lineTo(this.x, this.y);
                fwCtx.strokeStyle = this.color;
                fwCtx.lineWidth = this.isMega ? 4 : 2; // Mega is much thicker
                fwCtx.stroke();
            }
        }

        class Particle {
            constructor(x, y, color, isMega) {
                this.x = x;
                this.y = y;
                const angle = Math.random() * Math.PI * 2;
                // Bigger burst -> higher speed range
                const speed = isMega ? (Math.random() * 9 + 2) : (Math.random() * 6 + 1.5);
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.color = color;
                this.alpha = 1;
                // Mega particles last longer (smaller decay)
                this.decay = isMega ? (Math.random() * 0.01 + 0.008) : (Math.random() * 0.015 + 0.012);
                this.radius = isMega ? 2.5 : 2;
            }
            update() {
                this.vx *= 0.94; // air friction
                this.vy *= 0.94;
                this.vy += 0.04; // gravity
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.decay;
                return this.alpha > 0;
            }
            draw() {
                fwCtx.save();
                fwCtx.globalAlpha = this.alpha;
                fwCtx.beginPath();
                fwCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                fwCtx.fillStyle = this.color;
                fwCtx.fill();
                fwCtx.restore();
            }
        }

        function createParticles(x, y, color, isMega) {
            // Mega spawns way more particles, normal spawns slightly more than before
            const count = isMega ? (120 + Math.random() * 60) : (50 + Math.random() * 30);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(x, y, color, isMega));
            }
        }

        let lastMegaTime = Date.now();

        function drawFireworks() {
            requestAnimationFrame(drawFireworks); // ALWAYS continue loop
            
            const eventsPage = document.getElementById('events');
            if (eventsPage && !eventsPage.classList.contains('active')) return;
            
            if (fwCanvas.width !== fwCanvas.parentElement.offsetWidth || fwCanvas.height !== fwCanvas.parentElement.offsetHeight) {
                resizeFwCanvas();
            }

            if (fwCanvas.width > 0 && fwCanvas.height > 0) {
                fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height); // Ensures transparent background
                
                if (Math.random() < 0.02) { // Slightly lower chance for normal fireworks since they are slower/longer
                    fireworks.push(new Firework(false));
                }
                
                // Launch Mega firework exactly every 5 seconds
                if (Date.now() - lastMegaTime > 5000) {
                    fireworks.push(new Firework(true));
                    lastMegaTime = Date.now();
                }
                
                fireworks = fireworks.filter(fw => {
                    fw.draw();
                    return fw.update();
                });
                
                particles = particles.filter(p => {
                    p.draw();
                    return p.update();
                });
            }
        }
        
        drawFireworks();
        
        window.addEventListener('resize', () => {
            fwCanvas.width = 0; // force recalculation
        });
    }

    // --- 10. Random Spaceship and Shifter Movement ---
    const spaceship = document.querySelector('.spaceship-container');
    const shifter = document.querySelector('.floating-shifter-container');
    
    if (spaceship || shifter) {
        function moveSpaceship() {
            const educationSection = document.getElementById('education');
            if (!educationSection || !educationSection.classList.contains('active')) return;

            const sectionWidth = educationSection.offsetWidth;
            const sectionHeight = educationSection.offsetHeight;
            
            if (spaceship) {
                const randomX = Math.max(0, Math.random() * (sectionWidth - 120));
                const randomY = Math.max(0, Math.random() * (sectionHeight - 70));
                const rotate = (Math.random() - 0.5) * 40;
                const scale = Math.random() * 0.4 + 0.8;
                spaceship.style.left = randomX + 'px';
                spaceship.style.top = randomY + 'px';
                spaceship.style.transform = `rotate(${rotate}deg) scale(${scale})`;
            }

            if (shifter) {
                const randomX = Math.max(0, Math.random() * (sectionWidth - 60));
                const randomY = Math.max(0, Math.random() * (sectionHeight - 60));
                const rotate = (Math.random() - 0.5) * 60;
                const scale = Math.random() * 0.5 + 0.7;
                shifter.style.left = randomX + 'px';
                shifter.style.top = randomY + 'px';
                shifter.style.transform = `rotate(${rotate}deg) scale(${scale})`;
            }
        }
        
        window.moveSpaceship = moveSpaceship;
        setTimeout(moveSpaceship, 500);
        setInterval(moveSpaceship, 4000);
    }

    // --- 11. Icon Shifter Cycle ---
    const shifterIcon = document.getElementById('shifter-icon');
    if (shifterIcon) {
        const icons = [
            'ph-guitar',
            'ph-music-notes', // fallback for saxophone
            'ph-music-note',
            'ph-speaker-hifi', // fallback for drum
            'ph-brain',        // skill
            'ph-currency-dollar', // money
            'ph-graduation-cap', // education
            'ph-briefcase'     // business
        ];
        let currentIconIndex = 0;
        setInterval(() => {
            // Fade out
            shifterIcon.style.opacity = 0;
            setTimeout(() => {
                // Remove all possible classes
                icons.forEach(i => shifterIcon.classList.remove(i));
                // Move to next
                currentIconIndex = (currentIconIndex + 1) % icons.length;
                shifterIcon.classList.add(icons[currentIconIndex]);
                // Fade in
                shifterIcon.style.opacity = 1;
            }, 500); // Wait for fade out transition (0.5s)
        }, 3000); // Change every 3 seconds
    }

});

// --- 11. Contact Form Handler ---
async function sendEmail(event) {
    event.preventDefault();
    
    // You need to replace this with your access key from web3forms.com
    const accessKey = "5e611f90-ef70-4f5b-a5ec-585d4b3785f7";
    
    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
        alert("Oops! The form is almost ready. Please follow the AI's instructions to add your Access Key to the code.");
        return;
    }

    const name = document.getElementById('contact-name').value;
    const org = document.getElementById('contact-org').value;
    const email = document.getElementById('contact-user-email').value;
    const message = document.getElementById('contact-message').value;

    const button = event.target.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = "SENDING... <i class='ph-bold ph-spinner ph-spin'></i>";
    button.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: accessKey,
                subject: `New Inquiry from ${name} (${org || 'N/A'})`,
                from_name: name,
                replyto: email, // Allows you to hit 'Reply' and email the visitor
                Visitor_Email: email, // Shows the email clearly in the body of the message
                Organization: org || "N/A",
                Message: message,
            }),
        });

        if (response.status === 200) {
            alert("Thank you! Your message has been sent successfully.");
            event.target.reset(); // clear the form
        } else {
            alert("Sorry, something went wrong. Please try again.");
        }
    } catch (error) {
        alert("Network error. Please try again later.");
    } finally {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

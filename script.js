/* ==========================================================================
   Interactive Particles Canvas Background
   ========================================================================== */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 70;
const connectionDistance = 120;
let mouse = { x: null, y: null, radius: 150 };

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Track mouse position
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.color = Math.random() > 0.5 ? '#6366f1' : '#06b6d4';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce on boundaries
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Interact with mouse (subtle push)
        if (mouse.x !== null && mouse.y !== null) {
            let dx = this.x - mouse.x;
            let dy = this.y - mouse.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                let force = (mouse.radius - distance) / mouse.radius;
                let angle = Math.atan2(dy, dx);
                this.x += Math.cos(angle) * force * 1.5;
                this.y += Math.sin(angle) * force * 1.5;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
    }
}

// Initialize particles
function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}
initParticles();

// Connect particles
function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                // Fade line opacity based on distance
                let opacity = (1 - (distance / connectionDistance)) * 0.15;
                ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
}
animate();


/* ==========================================================================
   Terminal Simulator Logic
   ========================================================================== */
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');
const terminalBody = document.getElementById('terminalBody');
const terminalBtns = document.querySelectorAll('.terminal-btn');

// Command History
let commandHistory = [];
let historyIndex = -1;

const commands = {
    help: () => `
Available commands:
  <span class="term-highlight">about</span>       - Brief introduction of myself
  <span class="term-highlight">skills</span>      - Technical stack and core tools
  <span class="term-highlight">experience</span>  - My professional employment history
  <span class="term-highlight">projects</span>    - Showcase of engineered systems
  <span class="term-highlight">education</span>   - University and academics details
  <span class="term-highlight">contact</span>     - All contact links and info
  <span class="term-highlight">linkedin</span>    - View my LinkedIn profile
  <span class="term-highlight">github</span>      - View my GitHub repository
  <span class="term-highlight">clear</span>       - Clear terminal outputs
  <span class="term-highlight">help</span>        - Display list of commands
`,
    about: () => `
<span class="term-res-title">Varshitha G.A - Full Stack Developer</span>
Full Stack Developer with hands-on experience building scalable, production-ready web applications using Django REST, React.js, and PostgreSQL. Skilled in designing robust REST APIs, integrating AI pipelines and optimising system performance across cross-functional teams.

Location: Bengaluru, Karnataka, India
Objective: Building high-impact products with state-of-the-art technologies.
`,
    skills: () => `
<span class="term-res-title">Technical Skillset</span>
  * <span class="term-highlight">Languages:</span> Python, JavaScript, TypeScript, SQL, HTML/CSS
  * <span class="term-highlight">Frontend:</span> React.js, Next.js, Vite.js, Tailwind CSS, Vanilla CSS
  * <span class="term-highlight">Backend:</span> Django, Django REST Framework, Celery, Redis, REST APIs
  * <span class="term-highlight">Data & DevOps:</span> PostgreSQL, MySQL, SQLite, AWS, Docker, Firebase, GitHub
  * <span class="term-highlight">AI / ML Tools:</span> LangChain, Ollama (Llama 3), Pandas, NumPy, Scikit-learn, TensorFlow, PyTorch
  * <span class="term-highlight">Development Tools:</span> Postman, Git, VS Code, Cursor, Windsurf, Antigravity
`,
    experience: () => `
<span class="term-res-title">Professional Experience</span>

1. <span class="term-highlight">Python Full Stack Developer | Innovyx Tech Labs</span> (Jul 2025 – Present)
   - Developed and maintained scalable full-stack web applications using Python, Django, Django REST Framework, React.js, and Next.js in production environments.
   - Architected and integrated RESTful APIs with dynamic React/Next.js frontends, ensuring seamless user experience across workflows.
   - Implemented security best practices, PostgreSQL query optimisation, and scalable backend infrastructure in collaboration with cross-functional teams.

2. <span class="term-highlight">Full Stack Developer Intern | Edubricz Technologies</span> (Jan 2025 – Jun 2025)
   - Built end-to-end full-stack features using Django REST Framework, React.js, and MySQL for scalable web applications.
   - Designed, integrated, and tested REST APIs using Postman, ensuring reliable client-server communication and identifying edge-case failures before release.
`,
    projects: () => `
<span class="term-res-title">Featured Engineering Projects</span>

* <span class="term-highlight">ACCOSOL - AI Financial Engine:</span> ERP & Accounting Automation platform.
  Features: Automated accounting cycle, multi-level approvals, local AI document extraction via Ollama + Tesseract.js.
  Tech: React 19, TS, Vite, Tailwind CSS v4, Django REST, PostgreSQL, Ollama (Llama 3.2), Tesseract.js.

* <span class="term-highlight">AUTOSHINE - Waterless Wash Platform:</span> Multi-Role Service Operations SaaS.
  Features: Bookings & scheduling workflows, PhonePe payments, SMS alerts, Firebase notifications, SQLite offline storage.
  Tech: Django REST, React 19, TypeScript, PostgreSQL, PhonePe API, FullCalendar.

* <span class="term-highlight">MIISKY - Smart Health Food Ecosystem:</span> HealthTech Personal Diet Planner.
  Features: Connects Patients & Nutritionists, background workers for invoices & reports via Celery & Redis, role-based auth.
  Tech: Django REST, React, TS, PostgreSQL, Celery, Redis, JWT.

Type <span class="term-highlight">'projects'</span> or click cards in the "Projects" section below for interactive modals.
`,
    education: () => `
<span class="term-res-title">Academics & Qualifications</span>
  * <span class="term-highlight">Institution:</span> Dr. Ambedkar Institute of Technology
  * <span class="term-highlight">Degree:</span> BE - Computer Science and Engineering
  * <span class="term-highlight">Duration:</span> Nov 2021 – Jun 2025
  * <span class="term-highlight">Grade:</span> CGPA - 9.0
  * <span class="term-highlight">Location:</span> Bengaluru, Karnataka
`,
    contact: () => `
<span class="term-res-title">Get in Touch</span>
  * <span class="term-highlight">Email:</span> <a class="term-res-link" href="mailto:varshithaga2003@gmail.com">varshithaga2003@gmail.com</a>
  * <span class="term-highlight">Phone:</span> +91-8088785958
  * <span class="term-highlight">LinkedIn:</span> <a class="term-res-link" href="https://linkedin.com" target="_blank">linkedin.com/in/varshitha-ga</a>
  * <span class="term-highlight">GitHub:</span> <a class="term-res-link" href="https://github.com/varshithaga" target="_blank">github.com/varshithaga</a>
  * <span class="term-highlight">Location:</span> Bengaluru, Karnataka, India
`,
    linkedin: () => {
        window.open('https://linkedin.com', '_blank');
        return `Opening LinkedIn profile...`;
    },
    github: () => {
        window.open('https://github.com/varshithaga', '_blank');
        return `Opening GitHub profile...`;
    }
};

// Process Command
function handleCommand(cmdStr) {
    const trimmedCmd = cmdStr.trim().toLowerCase();
    
    // Create new line in output
    const userLine = document.createElement('div');
    userLine.className = 'terminal-line';
    userLine.innerHTML = `<span class="terminal-prompt">guest@varshitha.dev:~$</span> <span class="term-cmd-text">${cmdStr}</span>`;
    terminalOutput.appendChild(userLine);
    
    if (trimmedCmd !== '') {
        commandHistory.push(cmdStr);
        historyIndex = commandHistory.length;
    }
    
    let responseText = '';
    
    if (trimmedCmd === '') {
        responseText = '';
    } else if (trimmedCmd === 'clear') {
        terminalOutput.innerHTML = '';
        terminalInput.value = '';
        return;
    } else if (commands[trimmedCmd]) {
        responseText = commands[trimmedCmd]();
    } else {
        responseText = `bash: command not found: <span class="term-highlight">${trimmedCmd}</span>. Type <span class="term-highlight">'help'</span> for assistance.`;
    }
    
    if (responseText !== '') {
        const responseLine = document.createElement('div');
        responseLine.className = 'terminal-line system-msg';
        responseLine.innerHTML = responseText;
        terminalOutput.appendChild(responseLine);
    }
    
    terminalInput.value = '';
    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Listen to keyboard events
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleCommand(terminalInput.value);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0 && historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    }
});

// Shortcut buttons
terminalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        terminalInput.value = cmd;
        handleCommand(cmd);
        terminalInput.focus();
    });
});

// Keep input focused when clicking inside terminal
terminalBody.addEventListener('click', () => {
    terminalInput.focus();
});


/* ==========================================================================
   Project Filters Mechanism
   ========================================================================== */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active class
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.classList.remove('hidden');
                // Subtle fade in animation
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});


/* ==========================================================================
   Project Details Modal Engine
   ========================================================================== */
const projectData = {
    accosol: {
        title: "ACCOSOL",
        subtitle: "AI-Powered Financial Management Engine",
        tags: ["React 19", "TypeScript", "Vite", "Django REST", "Ollama", "Tesseract.js", "Firebase"],
        description: "ACCOSOL is an Enterprise ERP and Accounting Automation Platform designed to handle the complete accounting lifecycle—from quotations and purchase orders to final invoices and balance sheet reconciliations—within a unified, high-security dashboard.",
        techStack: [
            "React 19 & TypeScript: Built with a highly responsive, modern component architecture.",
            "Django REST Framework: Scalable, secure API backend for business workflows.",
            "Ollama (Llama 3.2): Locally hosted AI node performing document information extraction.",
            "Tesseract.js OCR: Performs client-side scans of uploaded paper invoice images.",
            "PostgreSQL: Relational storage engine with optimized approval schemas.",
            "Firebase & jsPDF: Integrates dynamic client alerts and invoice exports."
        ],
        features: [
            "Complete workflow automation (Quotations -> POs -> Invoices).",
            "Dynamic multi-level approval matrices (Accounts -> Manager -> CFO).",
            "Privacy-first OCR: Local OCR extraction with regular expression fallbacks.",
            "Real-time dashboards using high-fidelity visualization graphs.",
            "Audit trails with detailed transaction state records."
        ]
    },
    autoshine: {
        title: "AUTOSHINE",
        subtitle: "Waterless Car Wash Service Platform",
        tags: ["React 19", "Django REST", "PhonePe API", "SQLite Sync", "Fast2SMS", "FullCalendar"],
        description: "AUTOSHINE is a multi-platform SaaS product created to manage workforce operations and bookings for waterless car wash service companies. It covers unique role schedules for admins, workers, and clients.",
        techStack: [
            "React 19: Responsive client-side rendering with Tailwind CSS v4 styling.",
            "Django REST Framework (DRF): Secure user registration and token authentication.",
            "PhonePe Gateway API: Smooth checkout workflows with webhook integrations.",
            "SQLite & Sync Engine: Local database integration with online synchronization logic.",
            "Fast2SMS API & Firebase: Instant OTP checkups and operations updates."
        ],
        features: [
            "Custom dashboards for Admin, Employees, and Customers.",
            "Intelligent scheduling logic avoiding booking collisions.",
            "Recurring membership washes with automated invoicing cycles.",
            "Interactive schedule calendar integrations using FullCalendar.",
            "Low-connectivity offline storage workflows for field operators."
        ]
    },
    miisky: {
        title: "MIISKY",
        subtitle: "Smart Health Food & Nutrition Ecosystem",
        tags: ["React.js", "Django REST", "Celery", "Redis", "PostgreSQL", "JWT Authentication"],
        description: "MIISKY is a comprehensive HealthTech platform linking Patients, Nutritionists, Admins, and MicroKitchens to deliver personalized diet plans, track active meals, and coordinate food supply chains.",
        techStack: [
            "React.js & Vanilla CSS: Streamlined user interface optimized for mobile browsers.",
            "Django & REST APIs: Strict permission controls mapping multi-role behaviors.",
            "Celery & Redis: Background tasks for cron reports and notification systems.",
            "PostgreSQL: Efficient management of meal, patient, and orders schemas.",
            "JWT Authentication: Secure cross-site requests and tokens renewal."
        ],
        features: [
            "Personalized daily nutrition plans custom-configured by doctors.",
            "Automated background notifications for plan completions.",
            "Supply-chain integration connecting meals preparation kitchens.",
            "Flexible pricing and subscription payments integration.",
            "Interactive nutrition tracker graphs and metrics logging."
        ]
    }
};

const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');
const modalBackdrop = projectModal.querySelector('.modal-backdrop');

// Open modal
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project-id');
        const data = projectData[projectId];
        
        if (data) {
            renderModal(data);
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable scroll
        }
    });
});

// Close modal function
function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// Render modal details html
function renderModal(data) {
    const tagsHTML = data.tags.map(tag => `<span class="project-tag-pill">${tag}</span>`).join('');
    const techHTML = data.techStack.map(tech => `<li><i class="fa-solid fa-circle-check"></i> <span>${tech}</span></li>`).join('');
    const featuresHTML = data.features.map(feat => `<li><i class="fa-solid fa-check"></i> <span>${feat}</span></li>`).join('');
    
    modalContent.innerHTML = `
        <div class="modal-header-section">
            <div class="modal-tag-row">${tagsHTML}</div>
            <h3 class="modal-title">${data.title}</h3>
            <p class="modal-subtitle">${data.subtitle}</p>
        </div>
        <div class="modal-body-section">
            <div class="modal-details-grid">
                <div class="modal-desc-col">
                    <h4>Overview</h4>
                    <p>${data.description}</p>
                </div>
                <div class="modal-side-col">
                    <h4>Tech Stack</h4>
                    <ul class="modal-tech-list">
                        ${techHTML}
                    </ul>
                </div>
            </div>
            <div class="modal-features-section">
                <h4>Key Features & Architecture</h4>
                <ul class="modal-features-list">
                    ${featuresHTML}
                </ul>
            </div>
        </div>
    `;
}


/* ==========================================================================
   Header, Scroll Reveals & Back-to-Top Button
   ========================================================================== */
const header = document.getElementById('header');
const scrollToTopBtn = document.getElementById('scrollToTop');
const revealElements = document.querySelectorAll('.scroll-reveal');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll handler
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    
    // Toggle header opacity
    if (scrollPos > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Toggle Scroll-to-Top visibility
    if (scrollPos > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
    
    // Active navigation links update on scroll
    updateActiveNavLink(scrollPos);
});

// Scroll to top click
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null, // viewport
    threshold: 0.15, // trigger when 15% visible
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            // Unobserve once animation triggers
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Active nav indicator update
function updateActiveNavLink(scrollPos) {
    const offset = 120; // navbar heights plus buffer
    
    document.querySelectorAll('section').forEach(section => {
        const top = section.offsetTop - offset;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}


/* ==========================================================================
   Mobile Navigation Drawer
   ========================================================================== */
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileDrawer = document.querySelector('.mobile-drawer');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileNavToggle.addEventListener('click', () => {
    mobileNavToggle.classList.toggle('open');
    mobileDrawer.classList.toggle('open');
});

// Close drawer when link clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('open');
        mobileDrawer.classList.remove('open');
    });
});




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
    },
    shopflux: {
        title: "SHOPFLUX",
        subtitle: "High-Performance B2C E-Commerce Platform",
        tags: ["React.js", "Django REST", "Firebase Auth", "PostgreSQL", "Redux Toolkit"],
        description: "SHOPFLUX is a premium, robust E-Commerce web application engineered for smooth online retail operations. It implements scalable APIs for product catalogs, cart logic, orders and reviews",
        techStack: [
            "React.js & Redux Toolkit: Provides dynamic client-side rendering with global state management.",
            "Django REST Framework (DRF): Secure, transactional backend APIs powered by Python.",
            "Firebase Authentication: Social logins, OTP verification, and multi-factor security.",
            "PostgreSQL: Relational database with optimized index structures for products and categories.",
        ],
        features: [
            "Secure user signup and authentication using Firebase.",
            "Dynamic shopping cart and persistent checkout pipelines.",
            "Real-time inventory levels tracking and stock update webhooks.",
            "Full-featured Admin analytics panel displaying order histories and revenues.",
            "Advanced search indexing with sorting and price filtering."
        ]
    },
    safeguard: {
        title: "SAFEGUARD",
        subtitle: "Women's Safety Application",
        tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Twilio SMS API", "Geolocation API"],
        description: "SAFEGUARD is a full-stack emergency response system designed to help users trigger alerts and coordinate swift safety dispatch. It features automated alerts containing live locations and voice recording logging.",
        techStack: [
            "React.js, HTML5 & CSS3: Built a responsive, touch-friendly user experience for instant emergency use.",
            "Node.js & Express.js: Developed a lightweight, robust REST API backend for alert logic and database routing.",
            "MongoDB: Securely stores user profiles, emergency contacts list, event logs, and message histories.",
            "Twilio SMS API: Automatically formats and dispatches alert messages with live locations to emergency contacts.",
            "Geolocation API: Retrieves real-time GPS coordinates of the user immediately upon emergency activation.",
            "Client-Server REST APIs: Secure communication using REST APIs and JSON payload formatting."
        ],
        features: [
            "One-Click SOS triggers: Instantly launches the emergency response workflow.",
            "Live GPS Location Sharing: Automatically attaches real-time coordinates to emergency texts.",
            "Automated Audio Recording: Records background audio evidence immediately on activation.",
            "Real-time Notification Alerts: Provides visual confirmation messages and live tracking updates.",
            "Scalable full-stack design utilizing MongoDB and third-party communications APIs."
        ]
    },
    grandeur: {
        title: "GRANDEUR",
        subtitle: "Full-Stack Hotel Management System",
        tags: ["FastAPI", "SQLAlchemy 2", "PostgreSQL", "React 19", "TypeScript", "Vite", "JWT Auth"],
        description: "Grandeur is a full-stack hotel platform pairing a public guest website — room browsing, live availability, and booking requests — with an admin dashboard that manages rooms, reservations, bookings, payments, staff, work assignments and guest enquiries across 16 CRUD modules.",
        techStack: [
            "FastAPI: Async Python REST API with dependency-injected authentication and Pydantic request/response schemas.",
            "SQLAlchemy 2 & PostgreSQL: Typed ORM models, tables auto-created on startup, list queries ordered by id.",
            "React 19 & React Router 7: One SPA serving a lazy-loaded public site and token-protected admin routes.",
            "JWT (access + refresh): PBKDF2-hashed passwords, silent token refresh, client-side ProtectedRoute guards.",
            "Zero-dependency date pickers: Self-contained calendar and date-time components built from scratch."
        ],
        features: [
            "Public guest site: home, rooms & suites, availability search, spa, dining, gallery, about and contact.",
            "Live room availability check with real-time pricing on the booking flow.",
            "Admin CRUD for floors, room types, amenities, rooms, reservations, bookings, payments and reviews.",
            "Staff operations module: departments, roles, employees, work types and scheduled work assignments.",
            "Paginated, searchable admin tables with a default admin account seeded on first run.",
            "An animated SVG walkthrough embedded in the README, regenerated from the seed data."
        ]
    },
    stockwise: {
        title: "STOCKWISE",
        subtitle: "Inventory & Billing (POS) System",
        tags: ["React 19", "TypeScript", "Vite", "Django REST", "Tailwind CSS 4", "SimpleJWT", "ReportLab"],
        description: "StockWise is a multi-branch retail inventory and point-of-sale system: buy stock from suppliers, hold it per branch, sell it at a GST-compliant POS terminal, and track customer dues, loyalty points, low stock and daily revenue — all under strict 3-tier role-based access.",
        techStack: [
            "Django REST Framework: ViewSets and nested serializers for sales, purchases and stock, with page-size pagination.",
            "React 19, TypeScript & Vite: SPA with an Axios JWT interceptor and role-gated routes.",
            "Tailwind CSS 4: A custom violet-spectrum design system applied consistently across every screen.",
            "SimpleJWT: 8-hour access and 7-day rotating refresh tokens, plus optional Google sign-in.",
            "ReportLab: One-click GST invoice PDFs with a per-line CGST/SGST breakdown.",
            "Django signals: Per-branch stock kept automatically in sync with each product's cached total quantity."
        ],
        features: [
            "POS terminal with product search, per-line discounts, split payments (cash / UPI / card / credit) and held draft bills.",
            "Supplier purchase orders that stock the shelves, plus a full stock-movement audit ledger (in / out / adjustment / transfer).",
            "Customer ledger with automatic outstanding balances and loyalty points earned on completed sales.",
            "Dashboard: today's and monthly revenue, payment-mode split, low-stock alerts and top-selling products.",
            "3-tier RBAC — Admin, Store Manager and Cashier — enforced on both the API and the UI.",
            "One-command demo-data seeder, plus a walkthrough video and screenshots captured from the running app."
        ],
        gallery: [
            { src: "assets/projects/stockwise-dashboard.jpg", caption: "Dashboard" },
            { src: "assets/projects/stockwise-billing.jpg", caption: "Billing / POS terminal" }
        ],
        links: [
            { label: "Watch Video", icon: "fa-solid fa-circle-play", url: "https://github.com/varshithaga/Inventory-And-Billing--System/blob/main/docs/walkthrough.mp4" },
            { label: "Screenshots", icon: "fa-solid fa-images", url: "https://github.com/varshithaga/Inventory-And-Billing--System/tree/main/docs/screenshots" },
            { label: "Source Code", icon: "fa-brands fa-github", url: "https://github.com/varshithaga/Inventory-And-Billing--System" }
        ]
    },
    ledgerdesk: {
        title: "LEDGERDESK",
        subtitle: "Accounting, GST & Bookkeeping Suite for Indian Small Businesses",
        tags: ["FastAPI", "SQLAlchemy 2", "Alembic", "PostgreSQL", "React 19", "TypeScript", "Tailwind CSS 4"],
        description: "LedgerDesk turns bank statements into categorized, double-entry books. It also handles sales invoices, purchase bills, payments, GST (CGST / SGST / IGST with GSTR-1 and GSTR-3B export), TDS, inventory and the full set of financial reports. Every figure in every report comes from one journal, and each company's books live in a database of their own.",
        techStack: [
            "FastAPI & Pydantic 2: REST API split into routers per area, with a services layer for posting, GST, reconciliation and reports.",
            "SQLAlchemy 2 & Alembic: Typed models, versioned migrations, one PostgreSQL database per company.",
            "React 19, TypeScript & Vite: Lazy-loaded pages, Axios with silent JWT refresh and an X-Company header.",
            "Tailwind CSS 4: Light and dark themes with a home-grown component kit.",
            "pandas, openpyxl & pdfplumber: Parse CSV, Excel and PDF bank statements.",
            "Gemini / OpenAI: A read-only AI assistant that answers questions about the books."
        ],
        features: [
            "Bank statement upload with running-balance checks, continuity gaps and duplicate detection.",
            "Keyword and BAI-code auto-categorization, then Make Final to post each bank line to the journal.",
            "GST invoices and purchase bills with PDF and email, credit and debit notes, TDS and recurring invoices.",
            "Bank reconciliation with auto-match, plus period close to lock signed-off months.",
            "P&L, Balance Sheet, Trial Balance, Cash Flow, Account Ledger, aging and GSTR-1 / 3B JSON export.",
            "Custom roles with per-page View / Create / Edit / Delete rights, a full audit log and multi-company support."
        ],
        gallery: [
            { src: "assets/projects/ledgerdesk-dashboard.jpg", caption: "Dashboard" },
            { src: "assets/projects/ledgerdesk-invoices.jpg", caption: "Sales invoices" }
        ],
        links: [
            { label: "Watch Video", icon: "fa-solid fa-circle-play", url: "https://github.com/varshithaga/AccountManagement/blob/main/docs/walkthrough.mp4" },
            { label: "Screenshots", icon: "fa-solid fa-images", url: "https://github.com/varshithaga/AccountManagement/tree/main/docs/screenshots" },
            { label: "Source Code", icon: "fa-brands fa-github", url: "https://github.com/varshithaga/AccountManagement" }
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
    const linksHTML = (data.links || []).map(link =>
        `<a class="modal-link" href="${link.url}" target="_blank" rel="noopener noreferrer"><i class="${link.icon}"></i> ${link.label}</a>`).join('');
    const galleryHTML = (data.gallery || []).map(img =>
        `<figure class="modal-shot"><a href="${img.src}" target="_blank" rel="noopener"><img src="${img.src}" alt="${data.title} ${img.caption}" loading="lazy"></a><figcaption>${img.caption}</figcaption></figure>`).join('');

    modalContent.innerHTML = `
        <div class="modal-header-section">
            <div class="modal-tag-row">${tagsHTML}</div>
            <h3 class="modal-title">${data.title}</h3>
            <p class="modal-subtitle">${data.subtitle}</p>
            ${linksHTML ? `<div class="modal-links">${linksHTML}</div>` : ''}
        </div>
        ${galleryHTML ? `<div class="modal-gallery">${galleryHTML}</div>` : ''}
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




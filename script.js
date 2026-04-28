/* ============================================================
   app.js — Biplob Hosein Portfolio
   Three.js 3D Background · Testimonial Slider · Counters · Scroll
============================================================ */

// ─── TESTIMONIALS DATA ───────────────────────────────────────
const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, Glow Cosmetics",
    country: "🇺🇸 USA",
    text: "Biplob's Meta Ads strategy took our ROAS from 1.8x to 4.8x in just 6 weeks. Absolutely phenomenal results and always available for queries!",
    initials: "SC",
    stars: 5
  },
  {
    name: "Mark Rivera",
    role: "CMO, Nexify Tech",
    country: "🇨🇦 Canada",
    text: "The Google Ads campaign he ran for us cut our CPA by 44% while tripling the volume. Best digital marketer we've ever hired — period.",
    initials: "MR",
    stars: 5
  },
  {
    name: "James Okafor",
    role: "Lifestyle Brand Owner",
    country: "🇳🇬 Nigeria",
    text: "Professional, creative, and incredibly fast. Our brand reached 2.1M people in a single campaign. Biplob is a true expert in his field.",
    initials: "JO",
    stars: 5
  },
  {
    name: "Emma Watson",
    role: "Furniture Retailer",
    country: "🇦🇺 Australia",
    text: "The Android app he built for our store has 150k+ downloads and a 4.8 rating. Seamless UX, great communication throughout the project.",
    initials: "EW",
    stars: 5
  },
  {
    name: "Rajesh Kumar",
    role: "Ecom Founder",
    country: "🇮🇳 India",
    text: "Our website now scores 98% on PageSpeed and traffic grew by 215%. Biplob combines technical excellence with marketing insight — rare combo!",
    initials: "RK",
    stars: 5
  },
  {
    name: "Lisa Müller",
    role: "Brand Director",
    country: "🇩🇪 Germany",
    text: "Exceptional logo and brand identity work. He understood our vision instantly and delivered something truly memorable. 100% recommend!",
    initials: "LM",
    stars: 5
  },
  {
    name: "Carlos Mendez",
    role: "Fashion Brand Owner",
    country: "🇪🇸 Spain",
    text: "Pinterest Ads are now our top-performing channel. The creative strategy Biplob implemented doubled our traffic from Pinterest in just 2 months.",
    initials: "CM",
    stars: 5
  },
  {
    name: "Yuki Tanaka",
    role: "Tech Startup Founder",
    country: "🇯🇵 Japan",
    text: "We hired Biplob for YouTube Ads and the video campaign went viral — 3.2M views! The level of creativity and data analysis is unmatched.",
    initials: "YT",
    stars: 5
  },
  {
    name: "Maria Silva",
    role: "Home Decor Brand",
    country: "🇧🇷 Brazil",
    text: "Working with Biplob was a game-changer. His understanding of global markets and cultural nuances made our campaigns connect on a deeper level.",
    initials: "MS",
    stars: 5
  },
  {
    name: "David Cohen",
    role: "Online Education Platform",
    country: "🇮🇱 Israel",
    text: "Biplob built our entire digital presence from scratch. The results speak for themselves — 3x leads in 60 days. Highly professional and skilled.",
    initials: "DC",
    stars: 5
  },
  {
    name: "Ahmed Al Mansouri",
    role: "Financial Services",
    country: "🇦🇪 UAE",
    text: "Outstanding cyber security audit and digital marketing service combined. Very thorough, trustworthy, and delivered beyond our expectations.",
    initials: "AA",
    stars: 5
  },
  {
    name: "Sophie Laurent",
    role: "Luxury Brand Director",
    country: "🇫🇷 France",
    text: "Biplob understands luxury brand positioning perfectly. Our Instagram campaign was sophisticated, targeted, and drove premium conversions. Magnifique!",
    initials: "SL",
    stars: 5
  }
];

// ─── BUILD TESTIMONIAL CARDS ──────────────────────────────────
function buildTestimonials() {
  const track = document.getElementById('sliderTrack');
  if (!track) return;

  // Double the cards for seamless infinite scroll
  const allCards = [...testimonials, ...testimonials];
  
  allCards.forEach(t => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="review-stars">${'★'.repeat(t.stars)}</div>
      <p class="review-text">"${t.text}"</p>
      <div class="reviewer">
        <div class="reviewer-avatar">${t.initials}</div>
        <div>
          <div class="reviewer-name">${t.name}</div>
          <div class="reviewer-role">${t.role} · ${t.country}</div>
        </div>
      </div>
    `;
    track.appendChild(card);
  });
}

// ─── THREE.JS 3D BACKGROUND ───────────────────────────────────
function initThreeBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Particle geometry
  const count = 1800;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  const c1 = new THREE.Color('#00ffc3');
  const c2 = new THREE.Color('#00b8ff');
  const c3 = new THREE.Color('#003366');

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

    const mix = Math.random();
    const chosen = mix < 0.4 ? c1 : mix < 0.7 ? c2 : c3;
    colors[i * 3] = chosen.r;
    colors[i * 3 + 1] = chosen.g;
    colors[i * 3 + 2] = chosen.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Connecting lines (sparse web)
  const lineGeo = new THREE.BufferGeometry();
  const lineVerts = [];
  const lineCount = 120;
  for (let i = 0; i < lineCount; i++) {
    const ax = (Math.random() - 0.5) * 18;
    const ay = (Math.random() - 0.5) * 14;
    const az = (Math.random() - 0.5) * 6;
    const bx = ax + (Math.random() - 0.5) * 3;
    const by = ay + (Math.random() - 0.5) * 3;
    const bz = az + (Math.random() - 0.5) * 1.5;
    lineVerts.push(ax, ay, az, bx, by, bz);
  }
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: '#00ffc3',
    transparent: true,
    opacity: 0.07,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  // Mouse parallax
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
  });

  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.003;
    points.rotation.y = time * 0.07 + mouseX * 0.3;
    points.rotation.x = mouseY * 0.2;
    lines.rotation.y = time * 0.04 + mouseX * 0.15;
    lines.rotation.x = mouseY * 0.1;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ─── COUNTER ANIMATION ────────────────────────────────────────
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const start = performance.now();
    
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      counter.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = target.toLocaleString();
    }
    requestAnimationFrame(update);
  });
}

// ─── SCROLL REVEALS ───────────────────────────────────────────
function initScrollReveal() {
  // Add reveal class to target elements
  const targets = document.querySelectorAll(
    '.service-card, .project-card, .info-item, .why-list li, .social-card'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Progress bars in projects
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.bar-fill');
        if (fill) fill.style.width = fill.style.getPropertyValue('--w') || fill.dataset.w || '80%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.project-card').forEach(el => barObserver.observe(el));
}

// ─── COUNTER TRIGGER (on hero visible) ────────────────────────
function initCounterTrigger() {
  const hero = document.querySelector('.hero-stats');
  if (!hero) return;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      obs.disconnect();
    }
  }, { threshold: 0.3 });
  obs.observe(hero);
}

// ─── NAVBAR SCROLL ────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
}

// ─── ACTIVE NAV LINKS ─────────────────────────────────────────
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--cyan)' : '';
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => observer.observe(s));
}

// ─── CONTACT FORM ─────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✅ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #00ffc3, #00b8ff)';
    setTimeout(() => {
      btn.textContent = 'Send Message 🚀';
      form.reset();
    }, 3000);
  });
}

// ─── CURSOR GLOW EFFECT ───────────────────────────────────────
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,255,195,0.04) 0%, transparent 70%);
    transform: translate(-50%, -50%); transition: opacity 0.3s;
    top: 0; left: 0;
  `;
  document.body.appendChild(glow);

  let cx = 0, cy = 0;
  document.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
  });
}

// ─── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildTestimonials();
  initThreeBackground();
  initScrollReveal();
  initCounterTrigger();
  initNavbar();
  initActiveNav();
  initContactForm();
  initCursorGlow();
});

/* ═══════════════════════════════════════════════
   FoodShare — Share More. Waste Less. Feed More.
   Main JavaScript
   ═══════════════════════════════════════════════ */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── Hamburger mobile menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) navLinks.classList.remove('open');
});

/* ── Feature Tabs ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from all buttons and contents
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    // Activate clicked tab
    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.tab);
    if (target) {
      target.classList.add('active');
      // Animate cards in
      target.querySelectorAll('.feature-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.transition = 'opacity .4s ease, transform .4s ease';
          card.style.opacity   = '1';
          card.style.transform = 'translateY(0)';
        }, i * 80);
      });
    }
  });
});

/* ── Scroll-reveal (Intersection Observer) ── */
const revealTargets = document.querySelectorAll(
  '.problem-card, .feature-card, .team-card, .impact-card, .biz-card, ' +
  '.tl-card, .solution-point, .tech-layer, .flow-diagram, .hero-stats'
);

revealTargets.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => observer.observe(el));

/* ── Stagger children in grids ── */
document.querySelectorAll('.problem-grid, .feature-cards, .team-grid, .impact-grid, .biz-grid').forEach(grid => {
  grid.querySelectorAll(':scope > *').forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});

/* ── Animated number counters ── */
function animateCount(el) {
  const raw = el.textContent.trim();
  const match = raw.match(/([\d.]+)([^\d]*)/);
  if (!match) return;
  const end    = parseFloat(match[1]);
  const suffix = match[2] || '';
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 4);
    const current  = end * ease;
    el.textContent = (current >= 10 ? Math.floor(current) : current.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.impact-num, .stat-num').forEach(el => counterObserver.observe(el));

/* ── Contact form ── */
const form = document.getElementById('contactForm');
form && form.addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('🎉 Thanks! We\'ll be in touch soon.');
  form.reset();
});

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ── Smooth active nav highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAnchorList = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchorList.forEach(a => {
    a.style.background = '';
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.background = 'rgba(255,255,255,.18)';
      a.style.color = '#fff';
    }
  });
}, { passive: true });

/* ── Parallax orbs ── */
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.orb');
  const { innerWidth: w, innerHeight: h } = window;
  const dx = (e.clientX / w - 0.5) * 24;
  const dy = (e.clientY / h - 0.5) * 24;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
});

/* ── Navbar mobile: close on link click ── */
navLinks && navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

console.log('%c🍃 FoodShare — Share More. Waste Less. Feed More.', 'color:#22c55e;font-weight:800;font-size:16px;');

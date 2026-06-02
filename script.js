/* ============================================================
   Starry Night animated background — inspired by Van Gogh
   Swirling brushstrokes + glowing stars on a deep cobalt sky
   ============================================================ */

const canvas = document.getElementById('starry-bg');
const ctx = canvas.getContext('2d');

let W = 0, H = 0;
let stars = [];
let swirls = [];
let t = 0;

function resize() {
  W = canvas.width = window.innerWidth * window.devicePixelRatio;
  H = canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  init();
}

function init() {
  stars = [];
  const count = Math.floor((W * H) / 25000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.3,
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
      bright: Math.random() < 0.15
    });
  }

  swirls = [];
  const swirlCount = 6;
  for (let i = 0; i < swirlCount; i++) {
    swirls.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 120 + Math.random() * 220,
      speed: (Math.random() - 0.5) * 0.0008,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() < 0.5 ? 'cobalt' : 'gold'
    });
  }
}

function drawSky() {
  // base gradient
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#07142b');
  g.addColorStop(0.5, '#0b1e3f');
  g.addColorStop(1, '#14305c');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

function drawSwirl(s) {
  const x = s.x;
  const y = s.y;
  const r = s.r * window.devicePixelRatio;
  const phase = t * s.speed + s.phase;

  // create swirling brushstrokes as series of arcs
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(phase);

  const color = s.hue === 'gold'
    ? 'rgba(244, 196, 48, '
    : 'rgba(70, 130, 200, ';

  for (let i = 0; i < 14; i++) {
    const ang = (i / 14) * Math.PI * 2;
    const rad = r * (0.4 + 0.6 * (i / 14));
    const alpha = 0.04 + 0.05 * Math.sin(phase * 2 + i);
    ctx.beginPath();
    ctx.arc(0, 0, rad, ang, ang + 0.6);
    ctx.strokeStyle = color + Math.max(0.02, alpha) + ')';
    ctx.lineWidth = 2 * window.devicePixelRatio;
    ctx.stroke();
  }
  ctx.restore();
}

function drawStar(s) {
  s.pulse += s.speed;
  const tw = (Math.sin(s.pulse) + 1) / 2;
  const r = s.r * window.devicePixelRatio * (0.7 + tw * 0.6);
  const alpha = 0.5 + tw * 0.5;

  if (s.bright) {
    // halo for bright stars
    const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 6);
    grad.addColorStop(0, `rgba(244, 196, 48, ${alpha * 0.9})`);
    grad.addColorStop(0.3, `rgba(244, 196, 48, ${alpha * 0.2})`);
    grad.addColorStop(1, 'rgba(244, 196, 48, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(s.x, s.y, r * 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(255, 240, 200, ${alpha})`;
  } else {
    ctx.fillStyle = `rgba(230, 220, 190, ${alpha * 0.85})`;
  }
  ctx.beginPath();
  ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
  ctx.fill();
}

// (legacy loop replaced by startLoop / stopLoop below)

window.addEventListener('resize', resize);
resize();

// Respect reduced motion + pause when tab hidden (battery)
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let rafId = null;
function startLoop() {
  if (reducedMotion) {
    drawSky();
    for (const s of stars) drawStar(s);
    return;
  }
  if (rafId) return;
  function tick() { t += 1; drawSky(); ctx.globalCompositeOperation='lighter';
    for (const sw of swirls) drawSwirl(sw);
    for (const s of stars) drawStar(s);
    ctx.globalCompositeOperation='source-over';
    rafId = requestAnimationFrame(tick);
  }
  rafId = requestAnimationFrame(tick);
}
function stopLoop() { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }
document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopLoop(); else startLoop();
});
startLoop();

/* ============================================================
   Reveal on scroll
   ============================================================ */
const revealEls = document.querySelectorAll('.section, .project, .card, .vangogh-quote');
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.08 });

revealEls.forEach(el => io.observe(el));

/* ============================================================
   Stats counter animation
   ============================================================ */
const statEls = document.querySelectorAll('.stat-num');
const statIO = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(target * eased) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      statIO.unobserve(el);
    }
  }
}, { threshold: 0.5 });
statEls.forEach(el => statIO.observe(el));

/* ============================================================
   PurrfectFocus modal
   ============================================================ */
const modal = document.getElementById('modal-purrfect');
document.querySelectorAll('[data-modal="purrfect"]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    modal.hidden = false;
  });
});
modal.querySelector('.modal-close').addEventListener('click', () => modal.hidden = true);
modal.addEventListener('click', (e) => { if (e.target === modal) modal.hidden = true; });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.hidden = true; });

/* ============================================================
   Smooth highlight active nav link
   ============================================================ */
const navLinks = document.querySelectorAll('.topnav a[href^="#"]');
const sections = [...document.querySelectorAll('section[id]')];

function onScroll() {
  const y = window.scrollY + 120;
  let current = sections[0]?.id;
  for (const s of sections) {
    if (s.offsetTop <= y) current = s.id;
  }
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ============================================================
   Reading progress bar
   ============================================================ */
const progressBar = document.getElementById('read-progress');
function updateProgress() {
  const h = document.documentElement;
  const total = h.scrollHeight - h.clientHeight;
  const pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
  if (progressBar) progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

/* ============================================================
   Mobile hamburger
   ============================================================ */
const navToggle = document.querySelector('.nav-toggle');
const topnav = document.querySelector('.topnav');
if (navToggle && topnav) {
  navToggle.addEventListener('click', () => {
    const open = topnav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open);
    navToggle.setAttribute('aria-label', open ? 'Lukk meny' : 'Åpne meny');
  });
  // Close on link click
  topnav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    topnav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

/* ============================================================
   PDF / print button
   ============================================================ */
const printBtn = document.getElementById('print-btn');
if (printBtn) printBtn.addEventListener('click', () => window.print());

/* ============================================================
   KM expand / collapse all
   ============================================================ */
const kmDetails = document.querySelectorAll('.kompetanse-list details');
const expandAll = document.getElementById('expand-all');
const collapseAll = document.getElementById('collapse-all');
if (expandAll) expandAll.addEventListener('click', () => kmDetails.forEach(d => d.open = true));
if (collapseAll) collapseAll.addEventListener('click', () => kmDetails.forEach(d => d.open = false));

/* ============================================================
   Section anchor links — clickable # next to each h2
   ============================================================ */
document.querySelectorAll('section[id] .container > h2, section[id] > .container > h2').forEach(h2 => {
  const id = h2.closest('section[id]').id;
  if (!id || h2.querySelector('.anchor-link')) return;
  const a = document.createElement('a');
  a.href = '#' + id;
  a.className = 'anchor-link';
  a.setAttribute('aria-label', 'Lenke til denne seksjonen');
  a.textContent = '#';
  h2.appendChild(a);
});

/* ============================================================
   Easter egg: click stamp "6" → confetti
   ============================================================ */
const stamp = document.querySelector('.stamp-grade');
if (stamp) {
  stamp.style.cursor = 'pointer';
  stamp.setAttribute('role', 'button');
  stamp.setAttribute('tabindex', '0');
  stamp.setAttribute('aria-label', 'Klikk for overraskelse');
  const fire = (e) => {
    if (reducedMotion) return;
    const rect = stamp.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ['#f4c430', '#c97b3a', '#1e4a8c', '#f5ecd7', '#a14a2a'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.left = cx + 'px';
      p.style.top = cy + 'px';
      p.style.background = colors[i % colors.length];
      p.style.transform = `rotate(${Math.random()*360}deg)`;
      document.body.appendChild(p);
      const angle = Math.random() * Math.PI * 2;
      const speed = 200 + Math.random() * 250;
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed - 200;
      p.animate([
        { transform: p.style.transform, opacity: 1 },
        { transform: `translate(${dx}px, ${dy + 600}px) rotate(${Math.random()*720}deg)`, opacity: 0 }
      ], { duration: 1400 + Math.random()*600, easing: 'cubic-bezier(.2,.8,.4,1)' })
        .onfinish = () => p.remove();
    }
  };
  stamp.addEventListener('click', fire);
  stamp.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); } });
}

/* ============================================================
   Service worker registration (PWA)
   ============================================================ */
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

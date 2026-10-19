// ============================================
// Saraswathi Poojai – 3-in-1 Career Bundle
// JavaScript
// ============================================

// ---- Countdown Timer ----
function startCountdown() {
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('minutes');
  const secsEl = document.getElementById('seconds');

  let totalSeconds = 23 * 3600 + 59 * 60 + 59;

  const saved = localStorage.getItem('sp_countdown_end');
  if (saved) {
    const remaining = Math.floor((parseInt(saved) - Date.now()) / 1000);
    if (remaining > 0) totalSeconds = remaining;
  } else {
    localStorage.setItem('sp_countdown_end', Date.now() + totalSeconds * 1000);
  }

  function tick() {
    if (totalSeconds <= 0) { totalSeconds = 0; }
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent  = String(m).padStart(2, '0');
    secsEl.textContent  = String(s).padStart(2, '0');
    if (totalSeconds > 0) totalSeconds--;
  }
  tick();
  setInterval(tick, 1000);
}

// ---- Seats Counter (subtle random drop) ----
function initSeats() {
  const el = document.getElementById('seats-left');
  if (!el) return;
  let seats = parseInt(localStorage.getItem('sp_seats') || '23');
  el.textContent = seats;

  setInterval(() => {
    if (seats > 5 && Math.random() < 0.3) {
      seats--;
      localStorage.setItem('sp_seats', seats);
      el.textContent = seats;
      el.style.color = '#ff4444';
      setTimeout(() => el.style.color = '', 600);
    }
  }, 30000);
}

// ---- Tab Switch ----
function showTab(tabId, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  btn.classList.add('active');
}

// ---- FAQ Toggle ----
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const icon = btn.querySelector('.faq-icon');
  const isOpen = answer.classList.contains('open');

  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');

  if (!isOpen) {
    answer.classList.add('open');
    icon.textContent = '−';
  }
}

// ---- Form Submit ----
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('registerBtn');
  btn.innerHTML = '<span>⏳ Processing... Redirecting to Payment</span>';
  btn.disabled = true;
  btn.style.background = 'linear-gradient(135deg, #528FF0 0%, #3a5bc7 100%)';
  btn.style.color = '#fff';

  setTimeout(() => {
    window.open('https://rzp.io/rzp/EeFRa9b1', '_blank');
    btn.innerHTML = '<span>✅ Redirected! Complete Payment →</span>';
    btn.disabled = false;
  }, 1200);
}

// ---- Scroll to Form ----
function scrollToForm(e) {
  e.preventDefault();
  const form = document.querySelector('.hero-form-box');
  if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ---- Sticky CTA on Scroll ----
function initStickyCtA() {
  const sticky = document.getElementById('stickyCta');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      sticky.classList.add('visible');
    } else {
      sticky.classList.remove('visible');
    }
  });
}

// ---- Particle Background (Hero) ----
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.classList.add('particle');
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 10 + 8;
    const opacity = Math.random() * 0.4 + 0.1;
    p.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      background:${Math.random() > 0.5 ? '#1ad4c6' : '#FFE623'};
      border-radius:50%;
      left:${x}%;
      bottom:-10px;
      opacity:${opacity};
      animation: particle-rise ${duration}s ${delay}s linear infinite;
      pointer-events:none;
    `;
    container.appendChild(p);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes particle-rise {
      0%   { transform: translateY(0) scale(1); opacity: 0; }
      10%  { opacity: 1; }
      90%  { opacity: 0.5; }
      100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// ---- Scroll Reveal ----
function initReveal() {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll('.bundle-card, .why-item, .testimonial-card, .for-item, .curr-module');
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  initSeats();
  initStickyCtA();
  initParticles();
  initReveal();
});

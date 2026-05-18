/* ============================================================
   AMOR QUE PROTEGE — Main JavaScript
   FAQ Accordion | Smooth Scroll | Floating CTA | Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── FAQ Accordion ─────────────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Fecha todos
      faqItems.forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-answer');
        const b = i.querySelector('.faq-question');
        if (a) a.classList.remove('open');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      // Abre o clicado (se estava fechado)
      if (!isOpen) {
        item.classList.add('open');
        answer.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Floating CTA ──────────────────────────────────────── */
  const floatingCta  = document.getElementById('floating-cta');
  const heroSection  = document.getElementById('hero-section');

  function updateFloatingCta() {
    if (!floatingCta || !heroSection) return;
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateFloatingCta, { passive: true });
  updateFloatingCta();

  /* ── Intersection Observer – fade-in ───────────────────── */
  const observerOpts = { threshold: 0.12 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOpts);

  // Adiciona classe base e observa
  const animateEls = document.querySelectorAll(
    '.pain-card, .chapter-card, .bonus-card, .testimonial-card, .faq-item, .solution-inner, .guarantee-inner, .offer-box'
  );

  animateEls.forEach((el, idx) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = `opacity .5s ease ${(idx % 6) * 0.07}s, transform .5s ease ${(idx % 6) * 0.07}s`;
    observer.observe(el);
  });

  // Ao entrar na viewport
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .pain-card.visible, .chapter-card.visible, .bonus-card.visible,
      .testimonial-card.visible, .faq-item.visible,
      .solution-inner.visible, .guarantee-inner.visible, .offer-box.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    </style>
  `);

  /* ── Smooth scroll para âncoras ─────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Contagem regressiva no top bar (urgência) ─────────── */
  const topBarText = document.querySelector('.top-bar__text');
  if (topBarText) {
    // Cria um contador de 4h a partir do carregamento da página
    let totalSecs = 4 * 3600;

    function pad(n) { return String(n).padStart(2, '0'); }

    function updateTimer() {
      if (totalSecs <= 0) { clearInterval(timerInterval); return; }
      totalSecs--;
      const h = Math.floor(totalSecs / 3600);
      const m = Math.floor((totalSecs % 3600) / 60);
      const s = totalSecs % 60;
      const timerSpan = document.getElementById('topbar-timer');
      if (timerSpan) timerSpan.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
    }

    // Injeta o timer na top bar
    topBarText.insertAdjacentHTML('beforeend',
      ` • ⏱️ Oferta expira em: <strong id="topbar-timer" style="color:#ffe066">04:00:00</strong>`
    );

    const timerInterval = setInterval(updateTimer, 1000);
  }

  /* ── Highlight CTA ao scroll rápido ────────────────────── */
  let lastScroll = 0;
  const floatBtn = floatingCta ? floatingCta.querySelector('.btn') : null;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (floatBtn && currentScroll > lastScroll + 100) {
      floatBtn.style.animation = 'pulse 0.5s ease';
      setTimeout(() => { if(floatBtn) floatBtn.style.animation = ''; }, 500);
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // Animação pulse
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      @keyframes pulse {
        0%   { transform: scale(1); }
        50%  { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    </style>
  `);

});

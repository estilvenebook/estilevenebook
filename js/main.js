/* ============================================
   AMOR QUE PROTEGE — main.js
   Interatividade e animações
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. FAQ ACCORDION ── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Fecha todos
      faqItems.forEach(i => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      // Abre o clicado (toggle)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });


  /* ── 2. FLOATING CTA ── */
  const floatingCta = document.getElementById('floating-cta');
  const hero = document.getElementById('inicio');

  if (floatingCta && hero) {
    const showAfter = hero.offsetTop + hero.offsetHeight;

    window.addEventListener('scroll', () => {
      if (window.scrollY > showAfter) {
        floatingCta.classList.add('visible');
      } else {
        floatingCta.classList.remove('visible');
      }
    }, { passive: true });
  }


  /* ── 3. FADE-IN on scroll (Intersection Observer) ── */
  const animatables = document.querySelectorAll(
    '.pain-card, .chapter-card, .bonus-card, .testimonial-card, ' +
    '.transform-col, .faq-item, .solution-image, .solution-content, ' +
    '.guarantee-badge, .hero-text, .hero-visual, .offer-box, ' +
    '.bonus-total-box, .section-title, .section-subtitle'
  );

  animatables.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatables.forEach(el => observer.observe(el));


  /* ── 4. SMOOTH SCROLL para links de âncora ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80; // altura do header sticky
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── 5. HEADER SHADOW on scroll ── */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 24px rgba(233,30,140,.15)';
      } else {
        header.style.boxShadow = '0 2px 16px rgba(233,30,140,.08)';
      }
    }, { passive: true });
  }

});

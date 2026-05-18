/* ======================================================
   AMOR QUE PROTEGE — main.js
   FAQ Accordion | Scroll Animations | Floating CTA
   ====================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================
     1. FAQ ACCORDION
  ============================ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', function () {
      const isActive = item.classList.contains('active');

      // Fecha todos
      faqItems.forEach(function (el) {
        el.classList.remove('active');
        const q = el.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      // Abre o clicado (se não estava ativo)
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });


  /* ============================
     2. SCROLL ANIMATIONS (AOS)
  ============================ */
  const aosEls = document.querySelectorAll('[data-aos]');

  function checkAOS() {
    const winH = window.innerHeight;

    aosEls.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      const delay = parseInt(el.getAttribute('data-aos-delay') || 0, 10);

      if (rect.top < winH - 80 && !el.classList.contains('aos-animate')) {
        setTimeout(function () {
          el.classList.add('aos-animate');
        }, delay);
      }
    });
  }

  // Roda na carga e no scroll
  checkAOS();
  window.addEventListener('scroll', checkAOS, { passive: true });


  /* ============================
     3. FLOATING CTA
  ============================ */
  var floatingCta = document.getElementById('floatingCta');

  function toggleFloating() {
    if (!floatingCta) return;
    if (window.scrollY > 600) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleFloating, { passive: true });


  /* ============================
     4. SMOOTH SCROLL INTERNO
  ============================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ============================
     5. HEADER SCROLL SHADOW
  ============================ */
  var header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 20px rgba(233,30,140,.15)';
      } else {
        header.style.boxShadow = '0 2px 12px rgba(233,30,140,.08)';
      }
    }, { passive: true });
  }

});

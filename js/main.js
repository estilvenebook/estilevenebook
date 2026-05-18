/**
 * Amor que Protege — JavaScript Principal
 * FAQ Accordion | Floating CTA | Countdown Timer | Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', function () {

  /* =============================================
     1. FAQ ACCORDION
  ============================================= */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('active');

      // Fechar todos os outros
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Abrir/fechar este
      if (isOpen) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* =============================================
     2. FLOATING CTA (aparece após 400px de scroll)
  ============================================= */
  var floatingCta = document.getElementById('floating-cta');

  if (floatingCta) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        floatingCta.classList.add('visible');
      } else {
        floatingCta.classList.remove('visible');
      }
    });
  }

  /* =============================================
     3. CONTADOR REGRESSIVO (4 horas)
  ============================================= */
  var timerDisplay = document.getElementById('timer-display');

  if (timerDisplay) {
    // Verificar se já há um tempo salvo no sessionStorage
    var endTime = sessionStorage.getItem('countdownEnd');

    if (!endTime) {
      // Criar novo timer de 4 horas
      endTime = Date.now() + (4 * 60 * 60 * 1000);
      sessionStorage.setItem('countdownEnd', endTime);
    } else {
      endTime = parseInt(endTime, 10);
      // Se o tempo já passou, reiniciar
      if (endTime <= Date.now()) {
        endTime = Date.now() + (4 * 60 * 60 * 1000);
        sessionStorage.setItem('countdownEnd', endTime);
      }
    }

    function updateTimer() {
      var remaining = endTime - Date.now();

      if (remaining <= 0) {
        timerDisplay.textContent = '00:00:00';
        return;
      }

      var hours   = Math.floor(remaining / 3600000);
      var minutes = Math.floor((remaining % 3600000) / 60000);
      var seconds = Math.floor((remaining % 60000) / 1000);

      timerDisplay.textContent =
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  /* =============================================
     4. SMOOTH SCROLL para links âncora
  ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = document.querySelector('.site-header')
          ? document.querySelector('.site-header').offsetHeight
          : 80;

        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 20,
          behavior: 'smooth'
        });
      }
    });
  });

  /* =============================================
     5. ANIMAÇÃO DE ENTRADA (fade-in ao rolar)
  ============================================= */
  var animatableElements = document.querySelectorAll(
    '.pain-card, .chapter-card, .bonus-card, .testimonial-card, .guarantee-card, .offer-card, .faq-item'
  );

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatableElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  /* =============================================
     6. VERIFICAÇÃO DA IMAGEM DA CAPA
  ============================================= */
  var covers = document.querySelectorAll('.hero-ebook-cover, .solution-cover, .offer-cover');

  covers.forEach(function (img) {
    // Verificar se a imagem carregou corretamente
    if (img.complete && img.naturalHeight === 0) {
      // Imagem falhou ao carregar — aplicar fallback
      img.src = 'images/capa-ebook.jpg';
    }

    img.addEventListener('load', function () {
      img.style.opacity = '1';
    });

    img.addEventListener('error', function () {
      // Fallback: tentar arquivo local
      if (!this.src.includes('capa-ebook.jpg')) {
        this.src = 'images/capa-ebook.jpg';
      }
    });
  });

});

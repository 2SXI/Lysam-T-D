/* ==========================================================================
   LYSAM TURBO & DIESEL — Main JavaScript
   Production-ready, no frameworks, vanilla ES6+
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   1. NAV — scroll shadow + active page highlight
   -------------------------------------------------------------------------- */
(function initNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  // Scroll shadow
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mark current page link
  const links = nav.querySelectorAll('.nav-links a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && window.location.pathname.endsWith(href)) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();

/* --------------------------------------------------------------------------
   2. MOBILE MENU — toggle with ARIA + focus trap
   -------------------------------------------------------------------------- */
(function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const drawer = document.getElementById('mobile-nav');
  if (!toggle || !drawer) return;

  function openMenu() {
    drawer.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    drawer.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  // Close on link click
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeMenu();
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (drawer.classList.contains('is-open') &&
        !drawer.contains(e.target) &&
        !toggle.contains(e.target)) {
      closeMenu();
    }
  });
})();

/* --------------------------------------------------------------------------
   3. SCROLL REVEAL — IntersectionObserver
   -------------------------------------------------------------------------- */
(function initReveal() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* --------------------------------------------------------------------------
   4. COUNTER ANIMATION — for stat numbers
   -------------------------------------------------------------------------- */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = easeOut(progress) * target;
      el.textContent = prefix + (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
})();

/* --------------------------------------------------------------------------
   5. QUOTE FORM — validation + WhatsApp submission
   -------------------------------------------------------------------------- */
(function initQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const WA_NUMBER = '263773125505';

  function getField(id) { return document.getElementById(id); }
  function showError(id, msg) {
    const input = getField(id);
    const errEl = document.getElementById(id + '-error');
    if (input)  input.classList.add('is-error');
    if (errEl)  { errEl.textContent = msg; errEl.classList.add('visible'); }
  }
  function clearError(id) {
    const input = getField(id);
    const errEl = document.getElementById(id + '-error');
    if (input)  input.classList.remove('is-error');
    if (errEl)  errEl.classList.remove('visible');
  }

  // Live validation on blur
  ['name','phone','service'].forEach(id => {
    const el = getField(id);
    if (el) el.addEventListener('blur', () => validateField(id));
    if (el) el.addEventListener('input', () => clearError(id));
  });

  function validateField(id) {
    const val = getField(id)?.value.trim();
    if (id === 'name' && !val) { showError('name', 'Please enter your name.'); return false; }
    if (id === 'phone') {
      if (!val) { showError('phone', 'Please enter your phone number.'); return false; }
      if (!/^[+\d\s\-()]{7,}$/.test(val)) { showError('phone', 'Please enter a valid phone number.'); return false; }
    }
    if (id === 'service' && !val) { showError('service', 'Please select a service.'); return false; }
    clearError(id);
    return true;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const validName    = validateField('name');
    const validPhone   = validateField('phone');
    const validService = validateField('service');

    if (!validName || !validPhone || !validService) return;

    const name    = getField('name').value.trim();
    const phone   = getField('phone').value.trim();
    const service = getField('service').value;
    const message = getField('message')?.value.trim() || '';

    const waText = encodeURIComponent(
      `Hi Lysam Turbo & Diesel,\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Service needed: ${service}\n` +
      (message ? `Details: ${message}\n` : '') +
      `\nSent from lysamturbo.co.zw`
    );

    // Show success state
    const formFields = form.querySelector('.form-fields');
    const successEl  = form.querySelector('.form-success');
    if (formFields) formFields.style.display = 'none';
    if (successEl)  successEl.classList.add('visible');

    // Open WhatsApp
    setTimeout(() => {
      window.open(`https://wa.me/${WA_NUMBER}?text=${waText}`, '_blank', 'noopener,noreferrer');
    }, 400);
  });
})();

/* --------------------------------------------------------------------------
   6. PROCESS STEP — hover interaction
   -------------------------------------------------------------------------- */
(function initProcessSteps() {
  const steps = document.querySelectorAll('.process-step');
  steps.forEach(step => {
    step.addEventListener('mouseenter', () => {
      step.querySelector('.step-num')?.classList.add('is-active');
    });
    step.addEventListener('mouseleave', () => {
      if (!step.querySelector('.step-num.default-active')) {
        step.querySelector('.step-num')?.classList.remove('is-active');
      }
    });
  });
})();

/* --------------------------------------------------------------------------
   7. LAZY LOAD — native with fallback
   -------------------------------------------------------------------------- */
(function initLazyLoad() {
  // Modern browsers handle loading="lazy" natively.
  // This polyfills for older ones.
  if ('loading' in HTMLImageElement.prototype) return;

  const images = document.querySelectorAll('img[loading="lazy"]');
  if (!images.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        obs.unobserve(img);
      }
    });
  });
  images.forEach(img => obs.observe(img));
})();

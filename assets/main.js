document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var header = document.querySelector('header');
  var hamburger = document.getElementById('hamburgerBtn');
  var primaryNav = document.getElementById('primaryNav');

  if (hamburger && header && primaryNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('nav-locked', isOpen);
      if (!isOpen) {
        closeAllDropdowns();
      }
    });
  }

  var dropdownParents = document.querySelectorAll('.has-dropdown');

  function closeAllDropdowns(except) {
    dropdownParents.forEach(function (el) {
      if (el !== except) {
        el.classList.remove('open');
        var btn = el.querySelector('.nav-top-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var hoverCloseTimers = new WeakMap();

  dropdownParents.forEach(function (parent) {
    var btn = parent.querySelector('.nav-top-btn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isMobile = window.matchMedia('(max-width: 980px)').matches;
      if (!isMobile) return;
      var willOpen = !parent.classList.contains('open');
      closeAllDropdowns(willOpen ? parent : null);
      parent.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });

    // Desktop hover-intent: keep the menu open through brief gaps or
    // diagonal mouse movement instead of closing the instant the
    // pointer dips outside the hit area.
    parent.addEventListener('mouseenter', function () {
      if (window.matchMedia('(max-width: 980px)').matches) return;
      clearTimeout(hoverCloseTimers.get(parent));
      parent.classList.add('hover-open');
    });
    parent.addEventListener('mouseleave', function () {
      if (window.matchMedia('(max-width: 980px)').matches) return;
      var timer = setTimeout(function () {
        parent.classList.remove('hover-open');
      }, 300);
      hoverCloseTimers.set(parent, timer);
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-dropdown')) {
      closeAllDropdowns();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAllDropdowns();
      if (header) header.classList.remove('nav-open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-locked');
    }
  });

  var faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(function (btn) {
    var answer = document.getElementById(btn.getAttribute('aria-controls'));
    if (!answer) return;
    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
    });
  });
});

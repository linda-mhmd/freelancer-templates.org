/* freelancer-templates.org - main.js */

// Dark mode toggle
(function () {
  const toggle = document.getElementById('darkToggle');
  const html = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      const isDark = html.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  }
})();

// Mobile nav toggle
(function () {
  const btn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav__links');
  if (!btn || !navLinks) return;

  btn.addEventListener('click', function () {
    const open = navLinks.classList.toggle('nav__links--open');
    btn.setAttribute('aria-expanded', open);
  });

  // Close on link click
  navLinks.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('nav__links--open');
    });
  });
})();

// Mega-menu: open/close + search
(function () {
  var item = document.querySelector('.nav__item--has-mega');
  var trigger = item && item.querySelector('.nav__link--btn');
  var menu = document.getElementById('megaMenu');
  var searchInput = document.getElementById('megaSearch');
  if (!item || !trigger || !menu) return;

  function open() {
    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    if (searchInput) searchInput.focus();
  }
  function close() {
    item.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    if (searchInput) searchInput.value = '';
    resetSearch();
  }

  trigger.addEventListener('click', function () {
    item.classList.contains('is-open') ? close() : open();
  });

  // Close when clicking outside
  document.addEventListener('click', function (e) {
    if (!item.contains(e.target)) close();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  // Search - filter individual items and hide empty groups
  function resetSearch() {
    document.querySelectorAll('.mega__item').forEach(function (el) { el.classList.remove('mega__item--hidden'); });
    document.querySelectorAll('.mega__group').forEach(function (g) { g.classList.remove('mega__group--hidden'); });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var q = this.value.toLowerCase().trim();
      if (!q) { resetSearch(); return; }
      document.querySelectorAll('.mega__group').forEach(function (group) {
        var hasVisible = false;
        group.querySelectorAll('.mega__item').forEach(function (item) {
          var match = (item.dataset.label || '').includes(q);
          item.classList.toggle('mega__item--hidden', !match);
          if (match) hasVisible = true;
        });
        group.classList.toggle('mega__group--hidden', !hasVisible);
      });
    });
  }
})();

// Full library toggle
(function () {
  const btn = document.getElementById('libToggle');
  const body = document.getElementById('libBody');
  if (!btn || !body) return;

  btn.addEventListener('click', function () {
    const isOpen = !body.hidden;
    body.hidden = isOpen;
    btn.setAttribute('aria-expanded', String(!isOpen));
    const label = btn.querySelector('span');
    if (label) label.textContent = isOpen ? 'View Full Library' : 'Collapse Library';
  });
})();

// Newsletter form intercept
(function () {
  const form = document.getElementById('nlForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Subscribed!';
        btn.disabled = true;
      }
      input.value = '';
    }
  });
})();

// Video play - hover on desktop, scroll-autoplay on mobile
(function () {
  var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  function setupVideoCards(selector) {
    var cards = document.querySelectorAll(selector);
    if (!cards.length) return;

    if (isTouch) {
      // Mobile: autoplay when visible, pause when not
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var vid = entry.target.querySelector('video');
          if (!vid) return;
          if (entry.isIntersecting) {
            vid.play().catch(function () {});
          } else {
            vid.pause();
          }
        });
      }, { threshold: 0.3 });
      cards.forEach(function (card) { observer.observe(card); });
    } else {
      // Desktop: hover to play
      cards.forEach(function (card) {
        var vid = card.querySelector('video');
        if (!vid) return;
        card.addEventListener('mouseenter', function () {
          vid.play().catch(function () {});
        });
        card.addEventListener('mouseleave', function () {
          vid.pause();
          vid.currentTime = 0;
        });
      });
    }
  }

  setupVideoCards('.mock-card, .rmt-card');

  // Expose for use by other inline scripts (library, single pages)
  window.__setupVideoCards = setupVideoCards;
})();

// Lucide icons - init after DOM ready
document.addEventListener('DOMContentLoaded', function () {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

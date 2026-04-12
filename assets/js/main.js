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

  // Default to dark mode (site is designed dark-first)
  const savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
    applyTheme('dark');
  } else {
    applyTheme(savedTheme);
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

  // Close on link click (but not on mega-menu trigger)
  navLinks.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      // Don't close nav when tapping the Templates mega-menu button
      if (link.classList.contains('nav__link--btn')) return;
      navLinks.classList.remove('nav__links--open');
    });
  });
})();

// Mega-menu: open/close + search (supports multiple mega menus)
(function () {
  var megaItems = document.querySelectorAll('.nav__item--has-mega');
  if (!megaItems.length) return;

  // Close all mega menus
  function closeAll() {
    megaItems.forEach(function (item) {
      var trigger = item.querySelector('.nav__link--btn');
      var searchInput = item.querySelector('.mega__search');
      item.classList.remove('is-open');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (searchInput) searchInput.value = '';
    });
    resetSearch();
  }

  // Open a specific mega menu (and close others)
  function openMenu(item) {
    closeAll();
    var trigger = item.querySelector('.nav__link--btn');
    var searchInput = item.querySelector('.mega__search');
    item.classList.add('is-open');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    if (searchInput) searchInput.focus();
  }

  // Setup each mega menu item
  megaItems.forEach(function (item) {
    var trigger = item.querySelector('.nav__link--btn');
    if (!trigger) return;

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (item.classList.contains('is-open')) {
        closeAll();
      } else {
        openMenu(item);
      }
    });
  });

  // Close when clicking outside any mega menu
  document.addEventListener('click', function (e) {
    var clickedInside = false;
    megaItems.forEach(function (item) {
      if (item.contains(e.target)) clickedInside = true;
    });
    if (!clickedInside) closeAll();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });

  // Search - filter individual items and hide empty groups (for Templates mega menu)
  function resetSearch() {
    document.querySelectorAll('.mega__item').forEach(function (el) { el.classList.remove('mega__item--hidden'); });
    document.querySelectorAll('.mega__group').forEach(function (g) { g.classList.remove('mega__group--hidden'); });
  }

  var searchInput = document.getElementById('megaSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var q = this.value.toLowerCase().trim();
      if (!q) { resetSearch(); return; }
      // Only filter within the Templates mega menu (megaMenu)
      var megaMenu = document.getElementById('megaMenu');
      if (!megaMenu) return;
      megaMenu.querySelectorAll('.mega__group').forEach(function (group) {
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

// Tips video player - play/pause controls for hero and embedded videos
(function() {
  'use strict';

  function initTipsVideos() {
    // Handle .tips-video containers
    var videos = document.querySelectorAll('.tips-video');
    videos.forEach(function(container) {
      initVideoContainer(container, '.tips-video__player', '.tips-video__play-btn');
    });
    
    // Handle .tips-hero__player containers (hero videos)
    var heroVideos = document.querySelectorAll('.tips-hero__player');
    heroVideos.forEach(function(container) {
      initVideoContainer(container, '.tips-hero__video-player', '.tips-hero__play-btn');
    });
  }

  function initVideoContainer(container, videoSelector, playBtnSelector) {
    var video = container.querySelector(videoSelector);
    var playBtn = container.querySelector(playBtnSelector);
    
    if (!video) return;

    // Play button click
    if (playBtn) {
      playBtn.addEventListener('click', function() {
        if (video.paused) {
          video.play();
          container.classList.add('is-playing');
        } else {
          video.pause();
          container.classList.remove('is-playing');
        }
      });
    }

    // Video click to toggle
    video.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        container.classList.add('is-playing');
      } else {
        video.pause();
        container.classList.remove('is-playing');
      }
    });

    // Update state on video events
    video.addEventListener('play', function() { container.classList.add('is-playing'); });
    video.addEventListener('pause', function() { container.classList.remove('is-playing'); });
    video.addEventListener('ended', function() { container.classList.remove('is-playing'); });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTipsVideos);
  } else {
    initTipsVideos();
  }
})();

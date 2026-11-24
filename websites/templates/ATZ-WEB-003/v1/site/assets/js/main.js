// ATREZZO — Shared navigation for independent static pages.
(() => {
  const button = document.querySelector('[data-mobile-toggle]');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('mobile-menu-icon');
  const close = () => {
    if (!button || !menu) return;
    menu.classList.add('hidden');
    button.setAttribute('aria-expanded', 'false');
    if (icon) { icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars'); }
  };
  if (button && menu) {
    button.addEventListener('click', () => {
      const opening = menu.classList.contains('hidden');
      menu.classList.toggle('hidden', !opening);
      button.setAttribute('aria-expanded', String(opening));
      if (icon) {
        icon.classList.toggle('fa-xmark', opening);
        icon.classList.toggle('fa-bars', !opening);
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
        close(); button.focus();
      }
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click',close));
  }
})();


// ATREZZO SMART STICKY HEADER 1.0 — Home desktop only (>=1024px).
// Hide on sustained downward scroll and return promptly when scrolling up.
// Keep nav visible at the page top, while hovered/focused or on reduced motion.
// No scroll interception, no change to mobile/tablet or cinematic chapters.
(() => {
  const header = document.getElementById('site-header');
  if (!header || !document.querySelector('.approach-cinema') || !window.matchMedia ||
      typeof window.requestAnimationFrame !== 'function') return;

  const desktop = window.matchMedia('(min-width: 1024px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let previousY = Math.max(0, window.scrollY || 0);
  let directionDistance = 0;
  let queued = false;

  const show = () => {
    header.classList.remove('is-scroll-hidden');
    document.documentElement.classList.remove('at-cinema-header-hidden');
  };
  const hide = () => {
    header.classList.add('is-scroll-hidden');
    document.documentElement.classList.add('at-cinema-header-hidden');
  };
  const isUsingMenu = () => header.matches(':hover') || header.contains(document.activeElement);

  const check = () => {
    queued = false;
    const y = Math.max(0, window.scrollY || 0);
    const delta = y - previousY;
    previousY = y;

    if (!desktop.matches || reduced.matches || y <= Math.max(140, header.offsetHeight + 35)) {
      directionDistance = 0;
      show();
      return;
    }
    if (isUsingMenu()) {
      directionDistance = 0;
      show();
      return;
    }
    if (Math.abs(delta) < 1) return;
    if (directionDistance !== 0 && Math.sign(delta) !== Math.sign(directionDistance)) {
      directionDistance = 0;
    }
    directionDistance = Math.max(-50, Math.min(50, directionDistance + delta));

    if (directionDistance <= -7) {
      show();
      directionDistance = 0;
    } else if (directionDistance >= 16) {
      hide();
      directionDistance = 0;
    }
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(check);
  };
  const reset = () => {
    previousY = Math.max(0, window.scrollY || 0);
    directionDistance = 0;
    show();
  };

  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', reset, {passive:true});
  header.addEventListener('focusin', reset);
  header.addEventListener('mouseenter', reset);
  desktop.addEventListener?.('change', reset);
  reduced.addEventListener?.('change', reset);
  reset();
})();


// Real staging form submit, with a third-party email relay (FormSubmit.co).
// 200/OK means provider accepted the request, NOT proof of Gmail delivery.
// Never pretend submission succeeded on failure.
(() => {
  document.querySelectorAll('form[data-atrezzo-test-form]').forEach(form => {
    form.addEventListener('submit', async (event) => {
      if (!form.checkValidity()) return;
      event.preventDefault();
      const submit = form.querySelector('button[type="submit"]');
      const status = form.querySelector('[data-form-status]');
      if (!submit || !status) return;
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
      status.textContent = 'Sending test request…';
      status.classList.remove('text-red-700','text-green-800');
      try {
        status.classList.add('text-green-800');
        status.textContent = 'Demo validation complete. No information was sent or stored.';
        form.reset();
      } finally {
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
      }
    });
  });
})();


// ATREZZO HOME — mobile and tablet callback dialog (2026-10-26)
// Use ONE existing callback form. It remains inline on desktop (>=1024px).
// On tablet/mobile with working JavaScript, move that same form panel into a native
// <dialog> (focus containment, Escape, backdrop); without JS it stays inline.
(() => {
  const wrap = document.getElementById('callback-form');
  const trigger = document.querySelector('.hero-form-link[href="#callback-form"]');
  const panel = wrap && wrap.querySelector('.form-outer');
  if (!wrap || !trigger || !panel || !window.matchMedia) return;

  const modal = document.createElement('dialog');
  if (typeof modal.showModal !== 'function') return;
  modal.id = 'home-callback-dialog';
  modal.className = 'hero-callback-dialog';
  modal.setAttribute('aria-label', 'Request a Callback');

  const toolbar = document.createElement('div');
  toolbar.className = 'hero-dialog-toolbar';
  const title = document.createElement('strong');
  title.textContent = 'Request a Callback';
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'hero-dialog-close';
  closeButton.setAttribute('aria-label', 'Close callback form');
  closeButton.innerHTML = '<svg class="mc-ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  toolbar.append(title, closeButton);

  const mount = document.createElement('div');
  mount.className = 'hero-dialog-content';
  modal.append(toolbar, mount);
  document.body.appendChild(modal);

  // Match the layout breakpoint, not the handset hardware.
  const mobile = window.matchMedia('(max-width: 1023px)');
  let openTrigger = null;

  const close = () => { if (modal.open) modal.close(); };
  const syncLayout = () => {
    if (mobile.matches) {
      if (panel.parentNode !== mount) mount.appendChild(panel);
      document.documentElement.classList.add('hero-popup-ready');
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-controls', modal.id);
    } else {
      close();
      if (panel.parentNode !== wrap) wrap.appendChild(panel);
      document.documentElement.classList.remove('hero-popup-ready');
      trigger.removeAttribute('aria-haspopup');
      trigger.removeAttribute('aria-controls');
    }
  };

  trigger.addEventListener('click', event => {
    if (!mobile.matches || panel.parentNode !== mount) return;
    event.preventDefault();
    openTrigger = trigger;
    modal.showModal();
    document.body.classList.add('hero-dialog-open');
    document.dispatchEvent(new Event('atrezzocallbackchange'));
    closeButton.focus();
  });

  closeButton.addEventListener('click', close);
  modal.addEventListener('click', event => {
    if (event.target === modal) close();
  });
  modal.addEventListener('close', () => {
    document.body.classList.remove('hero-dialog-open');
    document.dispatchEvent(new Event('atrezzocallbackchange'));
    if (mobile.matches && openTrigger && openTrigger.isConnected) {
      openTrigger.focus();
    }
    openTrigger = null;
  });

  if (typeof mobile.addEventListener === 'function') {
    mobile.addEventListener('change', syncLayout);
  } else if (typeof mobile.addListener === 'function') {
    mobile.addListener(syncLayout);
  }

  syncLayout();
})();


// ATREZZO HOME — licensed residential plumbing cinematic, all sizes.
// New illustrated footage: Stepan SK / Pexels #7584858 (kitchen faucet repair).
// The existing CSS photo is the fallback. Video only loads with movement
// allowed and adequate network settings. Reduced-motion and Save-Data win.
(() => {
  const hero = document.querySelector('.hero');
  const video = hero && hero.querySelector('video.hero-video');
  const toggle = hero && hero.querySelector('.hero-video-toggle');
  if (!hero || !video || !toggle || !window.matchMedia) return;

  const small = window.matchMedia('(max-width: 767px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const base = 'https://videos.pexels.com/video-files/7584858/';
  const mobileFiles = [
    base + '7584858-sd_640_360_25fps.mp4',
    base + '7584858-hd_1280_720_25fps.mp4'
  ];
  const largeFiles = [
    base + '7584858-hd_1280_720_25fps.mp4',
    base + '7584858-hd_1920_1080_25fps.mp4'
  ];

  let nextSource = 0;
  let currentFiles = [];
  let activeProfile = null;
  let mediaActive = false;
  let inView = true;
  let hasFrame = false;
  let userPaused = false;

  const profile = () => small.matches ? 'mobile' : 'large';
  const mediaAllowed = () => !reduced.matches &&
    !(connection && (
      connection.saveData ||
      /^(slow-2g|2g)$/.test(connection.effectiveType || '') ||
      (small.matches && connection.effectiveType === '3g')
    ));
  const visibleToUser = () => !document.hidden && inView &&
    !document.body.classList.contains('hero-dialog-open');

  const syncButton = () => {
    toggle.hidden = !(mediaAllowed() && mediaActive && hasFrame && inView);
    toggle.textContent = userPaused ? 'Play video' : 'Pause video';
    toggle.setAttribute('aria-label', userPaused ? 'Play background video' : 'Pause background video');
  };

  const stop = () => {
    video.pause();
    hero.classList.remove('hero-video-playing');
    syncButton();
  };

  const reset = () => {
    stop();
    video.removeAttribute('src');
    video.load();
    mediaActive = false;
    hasFrame = false;
    currentFiles = [];
    activeProfile = null;
    nextSource = 0;
    userPaused = false;
    toggle.hidden = true;
  };

  const attemptPlay = () => {
    if (!mediaAllowed() || !visibleToUser() || userPaused) return;
    const result = video.play();
    if (result && typeof result.catch === 'function') {
      result.catch(() => {
        if (!hasFrame) hero.classList.remove('hero-video-playing');
        syncButton();
      });
    }
  };

  const loadSource = () => {
    if (!mediaAllowed() || nextSource >= currentFiles.length) return;
    video.src = currentFiles[nextSource++];
    video.load();
    attemptPlay();
  };

  video.addEventListener('playing', () => {
    if (!mediaAllowed() || !visibleToUser()) { stop(); return; }
    hasFrame = true;
    hero.classList.add('hero-video-playing');
    syncButton();
  });

  video.addEventListener('error', () => {
    hero.classList.remove('hero-video-playing');
    hasFrame = false;
    toggle.hidden = true;
    if (mediaAllowed() && nextSource < currentFiles.length) loadSource();
    // If all remote formats fail, leave the static CSS image visible.
  });

  toggle.addEventListener('click', () => {
    if (!mediaAllowed() || !hasFrame) return;
    userPaused = !userPaused;
    if (userPaused) video.pause();
    else attemptPlay();
    syncButton();
  });

  const sync = () => {
    if (!mediaAllowed()) {
      if (mediaActive) reset();
      return;
    }
    const wantedProfile = profile();
    if (mediaActive && activeProfile !== wantedProfile) reset();
    if (!visibleToUser()) {
      stop();
      return;
    }
    if (!mediaActive) {
      mediaActive = true;
      activeProfile = wantedProfile;
      currentFiles = wantedProfile === 'mobile' ? mobileFiles : largeFiles;
      nextSource = 0;
      loadSource();
    } else if (!userPaused) {
      attemptPlay();
    } else if (hasFrame) {
      hero.classList.add('hero-video-playing');
    }
    syncButton();
  };

  if (typeof small.addEventListener === 'function') small.addEventListener('change', sync);
  else if (typeof small.addListener === 'function') small.addListener(sync);
  if (typeof reduced.addEventListener === 'function') reduced.addEventListener('change', sync);
  else if (typeof reduced.addListener === 'function') reduced.addListener(sync);
  if (connection && typeof connection.addEventListener === 'function') connection.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  document.addEventListener('atrezzocallbackchange', sync);

  if (window.IntersectionObserver) {
    const visibilityObserver = new IntersectionObserver(entries => {
      if (!entries.length) return;
      inView = entries[0].isIntersecting;
      sync();
    }, {threshold: 0.06});
    visibilityObserver.observe(hero);
  }
  sync();
})();

// Restrained scroll reveals, inspired by editorial timing, not copied effects.
// Progressive enhancement: content is always visible without IntersectionObserver.
(() => {
  if (!window.IntersectionObserver || !window.matchMedia ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 767px)').matches) return;
  const selectors = [
    '.intro .intro-grid > div',
    '.services .section-heading > div',
    '.services .section-heading > p',
    '.family .family-heading',
    '.approach .approach-left',
    '.approach .value-line',
    '.reviews-section .reviews-heading > div',
    '.reviews-section .review-quote',
    '.end-cta .end-grid > div'
  ];
  const targets = [...document.querySelectorAll(selectors.join(','))];
  if (!targets.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {threshold:0.08, rootMargin:'0px 0px -7% 0px'});

  targets.forEach((el, index) => {
    el.classList.add('atrezzo-reveal');
    // Subtle delay on review excerpts; family portraits have a dedicated sequence.
    if (el.classList.contains('review-quote')) {
      const groupIndex = [...el.parentNode.children].indexOf(el);
      el.style.setProperty('--reveal-delay', (groupIndex * 80) + 'ms');
    }
    observer.observe(el);
  });
})();


// ATREZZO SERVICE SCENES 2.0 — natural scroll chapter emphasis.
// Every card is a normal link. JS never traps wheel/touch input or navigation.
(() => {
  const story = document.querySelector('.services-story');
  if (!story) return;
  const scenes = [...story.querySelectorAll('.service-scene')];
  if (scenes.length !== 6) return;

  scenes.forEach(scene => {
    scene.addEventListener('pointerenter', () => {
      if (window.matchMedia('(hover:hover)').matches) {
        scenes.forEach(s => s.classList.toggle('is-scene-current', s === scene));
      }
    });
    scene.addEventListener('focus', () => {
      scenes.forEach(s => s.classList.toggle('is-scene-current', s === scene));
    });
    const image = scene.querySelector('.service-scene-photo');
    if (image) image.addEventListener('error', () => {
      image.style.opacity = '0';
      scene.classList.add('is-scene-image-fallback');
    });
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isMobile = window.matchMedia('(max-width: 640px)');
  let queued = false;
  const syncMobileScene = () => {
    queued = false;
    if (!isMobile.matches || reduced.matches) return;
    const stage = story.getBoundingClientRect();
    if (stage.bottom < 0 || stage.top > window.innerHeight) return;
    const focalTop = 85;
    let active = scenes[0];
    // The last sticky card to reach the upper scene edge is the visible one.
    scenes.forEach(scene => {
      const box = scene.getBoundingClientRect();
      if (box.top <= focalTop + 65 && box.bottom > focalTop) active = scene;
    });
    scenes.forEach(scene => scene.classList.toggle('is-scene-current', scene === active));
  };
  const requestSync = () => {
    if (queued || !isMobile.matches || reduced.matches) return;
    queued = true;
    window.requestAnimationFrame(syncMobileScene);
  };
  document.addEventListener('scroll', requestSync, {passive:true});
  window.addEventListener('resize', requestSync, {passive:true});
  isMobile.addEventListener?.('change', requestSync);
  reduced.addEventListener?.('change', requestSync);
  requestSync();
})();

// ATREZZO FAMILY LEGACY 2.0 — progressive photo sequence.
// Wide screens: Jasper, then Michael Sr., then Michael II reveal in one staggered
// gallery entrance. Mobile: reveal each portrait as it enters the viewport.
// If IntersectionObserver or motion permission is absent, photos stay visible.
(() => {
  const gallery = document.querySelector('.family-gallery[data-family-sequence]');
  if (!gallery || !('IntersectionObserver' in window) ||
      !window.matchMedia ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const portraits = [...gallery.querySelectorAll('.family-person')];
  if (portraits.length !== 3) return;
  const mobile = window.matchMedia('(max-width: 640px)');
  let observer = null;

  const prepare = () => {
    if (observer) observer.disconnect();
    gallery.classList.remove('is-family-revealed');
    portraits.forEach(person => {
      person.classList.remove('is-family-revealed', 'atrezzo-reveal', 'is-visible', 'is-family-current');
      person.style.removeProperty('--reveal-delay');
    });

    if (mobile.matches) {
      gallery.classList.add('family-reveal-ready');
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-family-revealed');
          observer.unobserve(entry.target);
        });
      }, {threshold:0.1, rootMargin:'0px 0px -7% 0px'});
      portraits.forEach(person => observer.observe(person));
    } else {
      gallery.classList.add('family-reveal-ready');
      observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        gallery.classList.add('is-family-revealed');
        observer.disconnect();
      }, {threshold:0.08, rootMargin:'0px 0px -6% 0px'});
      observer.observe(gallery);
    }
  };
  prepare();
  mobile.addEventListener?.('change', prepare);
})();

// ATREZZO OUR APPROACH CINEMA 3.1 — responsive scroll-linked chapters.
// >=768px: existing four-stage horizontal pinned story (unchanged).
// <=767px: each separate full-width image scene enters from the right as
// vertical scrolling progresses; subtle photo zoom without pinning the page.
// No wheel interception, no timers, and static content without JS/reduced motion.
(() => {
  const story = document.querySelector('.approach-cinema .approach-story');
  if (!story) return;
  const stage = story.querySelector('.approach-stage');
  const scenes = [...story.querySelectorAll('[data-approach-scene]')];
  if (!stage || scenes.length !== 4 || !window.matchMedia) return;

  const wide = window.matchMedia('(min-width: 768px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const supportsFrame = typeof window.requestAnimationFrame === 'function';
  const clamp = (value, lower, upper) => Math.min(upper, Math.max(lower, value));
  let queued = false;

  scenes.forEach(scene => {
    const image = scene.querySelector('.approach-scene-photo');
    if (image) image.addEventListener('error', () => {
      image.style.opacity = '0';
      scene.classList.add('approach-photo-unavailable');
    });
  });

  const syncDesktop = () => {
    const region = story.getBoundingClientRect();
    if (region.bottom < -10 || region.top > window.innerHeight + 10) return;
    const travel = Math.max(1, story.offsetHeight - stage.offsetHeight);
    const progress = clamp(-region.top / travel, 0, 1);
    const phase = progress * 3;

    scenes.forEach((scene, i) => {
      const local = i === 0 ? 1 : clamp((phase - (i - 1) - 0.28) / 0.72, 0, 1);
      scene.style.setProperty('--approach-x', ((1 - local) * 100).toFixed(2) + '%');
      const zoom = i === 0 ? 1.08 - .055 * clamp(phase, 0, 1) : 1.11 - .08 * local;
      scene.style.setProperty('--approach-scale', zoom.toFixed(3));
    });
  };

  // The full movement happens over roughly 38% of the mobile viewport:
  // visible in a normal swipe, yet finished by the time the title is central.
  const syncMobile = () => {
    const viewportHeight = Math.max(1, window.innerHeight || document.documentElement.clientHeight);
    const start = viewportHeight * 0.86;
    const travel = Math.max(170, viewportHeight * 0.38);
    const maxOffset = Math.min(window.innerWidth * 0.72, 360);

    scenes.forEach(scene => {
      const box = scene.getBoundingClientRect();
      // Avoid unnecessary work for chapters far from the visible viewport.
      if (box.bottom < -viewportHeight || box.top > viewportHeight * 1.4) return;
      const progress = clamp((start - box.top) / travel, 0, 1);
      const position = maxOffset * (1 - progress);
      const zoom = 1.16 - (0.14 * progress);
      scene.style.setProperty('--approach-mobile-x', position.toFixed(1) + 'px');
      scene.style.setProperty('--approach-mobile-scale', zoom.toFixed(3));
    });
  };

  const sync = () => {
    queued = false;
    if (reduced.matches) return;
    if (wide.matches && story.classList.contains('is-cinema-ready')) syncDesktop();
    else if (!wide.matches && supportsFrame) syncMobile();
  };
  const requestSync = () => {
    if (queued || reduced.matches || !supportsFrame) return;
    queued = true;
    window.requestAnimationFrame(sync);
  };

  const configure = () => {
    const enableDesktop = wide.matches && !reduced.matches && supportsFrame;
    const enableMobile = !wide.matches && !reduced.matches && supportsFrame;
    story.classList.toggle('is-cinema-ready', enableDesktop);

    scenes.forEach(scene => {
      scene.classList.toggle('is-mobile-scroll-ready', enableMobile);
      if (!enableDesktop) {
        scene.style.removeProperty('--approach-x');
        scene.style.removeProperty('--approach-scale');
      }
      if (!enableMobile) {
        scene.style.removeProperty('--approach-mobile-x');
        scene.style.removeProperty('--approach-mobile-scale');
      }
    });
    requestSync();
  };

  window.addEventListener('scroll', requestSync, {passive:true});
  window.addEventListener('resize', requestSync, {passive:true});
  wide.addEventListener?.('change', configure);
  reduced.addEventListener?.('change', configure);
  configure();
})();


// ATREZZO SERVICES JOURNEY 4.0 — read-only desktop/tablet scene state.
// CSS sticky chapters naturally advance/retreat as visitors scroll. No scroll
// interception, snapping, timed changes or wheel event listeners.
// The already-approved mobile experience stays untouched.
(() => {
  const story = document.querySelector('.services-story');
  if (!story) return;
  const scenes = [...story.querySelectorAll('.service-scene')];
  if (scenes.length !== 6) return;

  const desktop = window.matchMedia('(min-width: 641px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scheduled = false;

  const update = () => {
    scheduled = false;
    if (!desktop.matches || reduced.matches) return;
    const bounds = story.getBoundingClientRect();
    if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;

    const stickyTop = window.innerWidth < 1024 ? 88 : 104;
    let active = scenes[0];
    scenes.forEach(scene => {
      const rect = scene.getBoundingClientRect();
      // Later scenes are layered above earlier scenes when reaching the top.
      if (rect.top <= stickyTop + 32 && rect.bottom > stickyTop + 3) active = scene;
    });
    scenes.forEach(scene => scene.classList.toggle('is-scene-current', scene === active));
  };
  const requestUpdate = () => {
    if (!desktop.matches || reduced.matches || scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', requestUpdate, { passive:true });
  window.addEventListener('resize', requestUpdate, { passive:true });
  desktop.addEventListener?.('change', requestUpdate);
  reduced.addEventListener?.('change', requestUpdate);
  story.addEventListener('focusin', event => {
    const card = event.target.closest('.service-scene');
    if (desktop.matches && card && story.contains(card)) {
      scenes.forEach(scene => scene.classList.toggle('is-scene-current', scene === card));
    }
  });
  requestUpdate();
})();

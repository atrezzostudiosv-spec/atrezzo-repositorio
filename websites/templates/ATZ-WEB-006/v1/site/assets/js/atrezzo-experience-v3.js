/* ATREZZO — Elegant Massage, editorial behavior V3.
 * Scroll native. No wheel/touch interception, no page lock, no fake service data.
 */
(() => {
  'use strict';
  const doc = document;
  const header = doc.querySelector('.site-header');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const bookingSource = doc.querySelector('.header-cta[href*="setmore"]');

  // Mobile conversion: repeat the EXISTING, verified booking URL. No form
  // submission and no new external provider. Header CTA remains fallback.
  if (bookingSource && !doc.querySelector('.em-mobile-booking')) {
    const booking = doc.createElement('a');
    booking.className = 'em-mobile-booking';
    booking.href = bookingSource.href;
    booking.target = '_blank';
    booking.rel = 'noopener noreferrer';
    booking.setAttribute('aria-label', 'Book an appointment with Elegant Massage');
    booking.innerHTML = 'Book an Appointment ';
    doc.body.append(booking);
  }

  // Elegant unobtrusive header: reappears when scrolling back up.
  // Never hide mobile navigation or keyboard-focused header.
  let previousY = Math.max(0, window.scrollY);
  const updateHeader = () => {
    const currentY = Math.max(0, window.scrollY);
    const change = currentY - previousY;
    const isDesktop = window.matchMedia('(min-width:871px)').matches;
    const menuIsOpen = header?.classList.contains('menu-open');
    const headerHasFocus = !!header?.contains(doc.activeElement);
    if (header && (!isDesktop || currentY < 200 || menuIsOpen || headerHasFocus || prefersReducedMotion.matches)) {
      header.classList.remove('em-header-hidden');
    } else if (header && Math.abs(change) > 6) {
      header.classList.toggle('em-header-hidden', change > 0);
    }
    previousY = currentY;
  };
  window.addEventListener('scroll', updateHeader, {passive:true});
  window.addEventListener('resize', updateHeader, {passive:true});
  doc.addEventListener('focusin', event => {
    if (header?.contains(event.target)) header.classList.remove('em-header-hidden');
  });
  updateHeader();

  // Only the 2 panoramic treatment photographs receive a subtle native-scroll
  // settling zoom; the text, document and navigation stay in normal flow.
  if (!doc.querySelector('.em-cinema') && !prefersReducedMotion.matches && doc.body.classList.contains('elegant-home')) {
    const photos = Array.from(doc.querySelectorAll(
      '.em-treatment-feature--body .em-treatment-feature__image, .em-treatment-feature--combination .em-treatment-feature__image'
    ));
    let frame = 0;
    const updatePhotos = () => {
      frame = 0;
      if (document.hidden || window.innerWidth <= 640) return;
      const h = window.innerHeight || 900;
      for (const photo of photos) {
        const bounds = photo.parentElement.getBoundingClientRect();
        if (bounds.bottom < -h*.2 || bounds.top > h*1.3) continue;
        const progress = Math.max(0,Math.min(1,(h-bounds.top)/(h+bounds.height)));
        photo.style.setProperty('--em-photo-scale',(1.02+progress*.045).toFixed(4));
      }
    };
    const queue = () => {if (!frame) frame = requestAnimationFrame(updatePhotos)};
    window.addEventListener('scroll',queue,{passive:true});
    window.addEventListener('resize',queue,{passive:true});
    queue();
  }
})();
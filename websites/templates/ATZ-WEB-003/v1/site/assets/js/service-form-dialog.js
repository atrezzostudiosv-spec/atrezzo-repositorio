/* ATREZZO — One service-request modal for all viewport sizes.
   Reuse the existing form; never clone it or intercept the form submission.
   Without JavaScript/native dialog support, the inline form and Contact Us link remain. */
(() => {
  const hero = document.querySelector('.detail-hero');
  const grid = hero?.querySelector('.service-hero-grid');
  const copy = grid?.querySelector('.service-hero-copy');
  const panel = grid?.querySelector('.hero-contact-panel');
  const contact = copy?.querySelector('a[href*="/contact-us/index.html"]');
  const heading = panel?.querySelector('.hero-contact-heading');
  const form = panel?.querySelector('form[data-atrezzo-test-form]');
  if (!grid || !copy || !panel || !contact || !heading || !form ||
      typeof HTMLDialogElement === 'undefined' ||
      typeof HTMLDialogElement.prototype.showModal !== 'function') return;

  const marker = document.createComment('Service form original position');
  grid.insertBefore(marker, panel);

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'at-service-popup-trigger';
  trigger.textContent = 'Request Service';
  trigger.hidden = true;
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-expanded', 'false');

  const dialog = document.createElement('dialog');
  dialog.id = 'at-service-form-dialog';
  dialog.className = 'at-service-form-dialog';
  dialog.setAttribute('aria-labelledby', heading.id);
  trigger.setAttribute('aria-controls', dialog.id);

  const toolbar = document.createElement('div');
  toolbar.className = 'at-service-form-dialog-toolbar';
  const label = document.createElement('strong');
  label.textContent = 'Service inquiry / Atrezzo demo';
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'at-service-form-dialog-close';
  closeButton.setAttribute('aria-label', 'Close service request form');
  closeButton.innerHTML = '<svg class="mc-ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  toolbar.append(label, closeButton);
  dialog.appendChild(toolbar);
  document.body.appendChild(dialog);

  // Keep the Contact Us link for the no-JS or unsupported-dialog fallback.
  contact.classList.add('at-service-original-contact');
  contact.parentElement.insertBefore(trigger, contact);

  const close = () => { if (dialog.open) dialog.close(); };
  trigger.addEventListener('click', () => {
    try {
      dialog.showModal();
      document.documentElement.classList.add('at-service-dialog-open');
      trigger.setAttribute('aria-expanded', 'true');
      closeButton.focus({preventScroll:true});
    } catch (error) {
      document.documentElement.classList.remove('at-service-dialog-open', 'at-service-popup-ready');
      if (dialog.open) close();
      if (marker.parentNode && panel.parentNode !== grid) marker.parentNode.insertBefore(panel, marker.nextSibling);
      trigger.hidden = true;
      contact.classList.remove('at-service-original-contact');
    }
  });
  closeButton.addEventListener('click', close);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('at-service-dialog-open');
    trigger.setAttribute('aria-expanded', 'false');
    if (!trigger.hidden) trigger.focus({preventScroll:true});
  });

  // Enhance only after the modal and trigger are ready, to avoid an empty hero.
  dialog.appendChild(panel);
  trigger.hidden = false;
  document.documentElement.classList.add('at-service-popup-ready');
})();

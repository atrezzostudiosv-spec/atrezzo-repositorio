// ATREZZO — McBride Services navigation. The full Services label is a disclosure.
(() => {
  const header = document.querySelector('.at-site-nav');
  if (!header) return;
  const group = header.querySelector('[data-services-menu]');
  const trigger = group?.querySelector('.at-services-parent');
  const panel = group?.querySelector('.at-services-panel');
  const mobileTrigger = header.querySelector('.at-mobile-services-toggle');
  const mobilePanel = header.querySelector('.at-mobile-services-list');
  if (!group || !trigger || !panel || !mobileTrigger || !mobilePanel) return;

  const desktopOpen = () => trigger.getAttribute('aria-expanded') === 'true';
  const setDesktop = (open) => {
    group.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };
  const setMobile = (open) => {
    mobilePanel.hidden = !open;
    mobileTrigger.setAttribute('aria-expanded', String(open));
  };

  trigger.addEventListener('click', () => setDesktop(true));
  group.addEventListener('pointerenter', e => {
    if (e.pointerType === 'mouse' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) setDesktop(true);
  });
  group.addEventListener('pointerleave', e => {
    if (e.pointerType === 'mouse' && !group.contains(document.activeElement)) setDesktop(false);
  });
  group.addEventListener('focusout', event => {
    if (!group.contains(event.relatedTarget)) setDesktop(false);
  });
  group.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      setDesktop(false);
      trigger.focus();
    }
  });
  document.addEventListener('pointerdown', event => {
    if (!group.contains(event.target)) setDesktop(false);
  });
  panel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setDesktop(false)));

  mobileTrigger.addEventListener('click', () => setMobile(mobilePanel.hidden));
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobilePanel.hidden) {
      setMobile(false);
      mobileTrigger.focus();
    }
  });
  mobilePanel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMobile(false)));
  header.querySelector('[data-mobile-toggle]')?.addEventListener('click', () => setMobile(false));

  const desktopViewport = window.matchMedia('(min-width: 901px)');
  desktopViewport.addEventListener?.('change', () => {
    setDesktop(false);
    setMobile(false);
  });
})();

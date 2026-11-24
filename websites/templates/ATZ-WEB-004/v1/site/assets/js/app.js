// Initialize Lucide icons
        if (window.lucide?.createIcons) window.lucide.createIcons();

const SEO_VIEWS = {"home":["HOME | Construction Studio","ATREZZO demonstration — illustrative construction website template."],"services":["SERVICES | Construction Studio","ATREZZO demonstration — illustrative construction website template."],"projects":["PROJECTS | Construction Studio","ATREZZO demonstration — illustrative construction website template."],"unt":["UNT | Construction Studio","ATREZZO demonstration — illustrative construction website template."],"twu":["TWU | Construction Studio","ATREZZO demonstration — illustrative construction website template."],"plano":["PLANO | Construction Studio","ATREZZO demonstration — illustrative construction website template."],"mep":["MEP | Construction Studio","ATREZZO demonstration — illustrative construction website template."],"about":["ABOUT | Construction Studio","ATREZZO demonstration — illustrative construction website template."],"careers":["CAREERS | Construction Studio","ATREZZO demonstration — illustrative construction website template."],"contact":["CONTACT | Construction Studio","ATREZZO demonstration — illustrative construction website template."],"policy":["POLICY | Construction Studio","ATREZZO demonstration — illustrative construction website template."]};
const SEO_ROOT = location.origin + location.pathname;
function updatePageMetadata(pageId) {
 const [title,description] = SEO_VIEWS[pageId] || SEO_VIEWS.home;
 const url = SEO_ROOT + (pageId === 'home' ? '' : '?view=' + encodeURIComponent(pageId));
 document.title = title;
 const tags = [['name','description',description],['property','og:title',title],['property','og:description',description],['property','og:url',url],['name','twitter:title',title],['name','twitter:description',description]];
 for (const [attr,key,value] of tags) {
   const element=document.querySelector('meta['+attr+'="'+key+'"]');
   if(element)element.setAttribute('content',value);
 }
 const canonical=document.querySelector('link[rel="canonical"]');
 if(canonical)canonical.href=url;
}

        // Multi-page Router Function
        function navigateTo(pageId, updateHistory = true) {
            // Hide all pages
            const pages = document.querySelectorAll('.page-view');
            pages.forEach(p => p.classList.add('hidden-page'));

            // Show selected page
            const target = document.getElementById(`page-${pageId}`);
            if (target) {
                target.classList.remove('hidden-page');
                // Do not keep the decorative hero video playing behind other views.
                const heroVideo = document.querySelector('.home-v2 .hero-bg-video');
                if (heroVideo && heroVideo.querySelector('source')?.src) {
                  if (pageId === 'home' && !document.hidden) {
                    const playback = heroVideo.play();
                    if (playback && typeof playback.catch === 'function') playback.catch(() => {});
                  } else heroVideo.pause();
                }
                if (updateHistory) history.pushState({pageId}, '', pageId === 'home' ? location.pathname : location.pathname + '?view=' + encodeURIComponent(pageId));
                updatePageMetadata(pageId);
                document.querySelectorAll('.nav-link').forEach(link=>{
                  const selected=link.dataset.page===pageId || (link.dataset.page==='projects' && ['unt','twu','plano','mep'].includes(pageId));
                  if(selected)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
                });
                document.getElementById('projectsNavGroup')?.classList.remove('is-open');
                document.getElementById('projectsNavToggle')?.setAttribute('aria-expanded','false');
                window.scrollTo({ top: 0, behavior: 'auto' });
            }

            // Update active state in nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('data-page') === pageId) {
                    link.classList.add('text-brand-teal');
                } else {
                    link.classList.remove('text-brand-teal');
                }
            });
        }

        // Mobile menu and keyboard-accessible Projects dropdown
        function toggleMobileMenu(forceOpen) {
            const menu=document.getElementById('mobileMenu');if(!menu)return;
            const open=typeof forceOpen==='boolean'?forceOpen:menu.classList.contains('hidden');
            menu.classList.toggle('hidden',!open);menu.classList.toggle('flex',open);
            document.body.classList.toggle('mobile-menu-open',open);
            const trigger=document.getElementById('mobileMenuToggle');
            trigger?.setAttribute('aria-expanded',String(open));
            if(open)menu.querySelector('button[aria-label="Close navigation"]')?.focus();
            else if(menu.contains(document.activeElement))trigger?.focus();
        }
        function initProjectsDropdown() {
            const group=document.getElementById('projectsNavGroup');
            const toggle=document.getElementById('projectsNavToggle');
            if(!group||!toggle)return;
            const close=()=>{group.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');};
            toggle.addEventListener('click',e=>{e.stopPropagation();const open=!group.classList.contains('is-open');group.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));});
            document.addEventListener('click',e=>{if(!group.contains(e.target))close();});
            group.addEventListener('keydown',e=>{if(e.key==='Escape'){close();toggle.focus();}});
            document.addEventListener('keydown',e=>{
              if(e.key!=='Escape')return;close();
              if(document.getElementById('mobileMenu')?.classList.contains('flex'))toggleMobileMenu(false);
            });
        }
        document.addEventListener('DOMContentLoaded',initProjectsDropdown);

        // Toggle Assistant Panel
        function toggleAssistant() {
            const panel = document.getElementById('assistantPanel');
            panel.classList.toggle('hidden');
        }

        // Assistant Demo Query Handling (Verification-based answers)
        function appendAssistantMessage(message, isUser) {
  const chat = document.getElementById('assistantChat');
  const item = document.createElement('div');
  item.className = isUser
    ? 'bg-brand-teal/20 border border-brand-teal/40 p-2.5 rounded text-white text-right text-xs'
    : 'bg-brand-gray/40 p-2.5 rounded text-gray-300 border border-white/10 text-xs';
  item.textContent = message;
  chat.appendChild(item);
  chat.scrollTop = chat.scrollHeight;
}
function handleAssistantSubmit(e) {
            e.preventDefault();
            const input = document.getElementById('assistantInput');
            const query = input.value.trim().toLowerCase();
            if (!query) return;

            const chat = document.getElementById('assistantChat');
            
            // Append User Question
            appendAssistantMessage(input.value, true);
            input.value = '';

            let reply = /service/.test(query) ? 'Explore the example planning, construction and management services.' : 'Local demonstration only. Project, contact and business information require verification. No request is sent.';
            setTimeout(() => {
                appendAssistantMessage(reply, false);
                chat.scrollTop = chat.scrollHeight;
            }, 400);
        }

        // Handle Demo Form Submissions
        function handleDemoSubmit(e, formName) {
            e.preventDefault();
            alert(`Preview only: ${formName} was not sent. No information has been stored or transmitted.`);
            e.target.reset();
        }

        // Default Load First Page
        window.addEventListener('popstate', () => {
  const pageId = new URLSearchParams(location.search).get('view') || 'home';
  navigateTo(document.getElementById('page-' + pageId) ? pageId : 'home', false);
});
document.addEventListener('DOMContentLoaded', () => {
  const pageId = new URLSearchParams(location.search).get('view') || 'home';
  navigateTo(document.getElementById('page-' + pageId) ? pageId : 'home', false);
});
/* Cinematic scene reveals: enhancement only, never required for legibility. */
function initCinematicScenes() {
  const items = document.querySelectorAll('.home-v2 [data-reveal], .services-v2 [data-reveal], .portfolio-page [data-reveal], .portfolio-story [data-reveal], .about-v3 [data-reveal]');
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', initCinematicScenes);

/* Muted decorative hero video. Motion and data-saving preferences take priority.
   A photo remains visible underneath when playback fails or is disabled. */
function initHomeConstructionVideo() {
  const video = document.querySelector('.home-v2 .hero-bg-video');
  if (!video) return;
  const motion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const compact = window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
  const saveData = navigator.connection && navigator.connection.saveData === true;
  if (motion || compact || saveData) return;

  const source = video.querySelector('source[data-src]');
  if (!source) return;
  video.addEventListener('playing', () => video.classList.add('is-playing'));
  video.addEventListener('pause', () => video.classList.remove('is-playing'));
  video.addEventListener('error', () => video.classList.remove('is-playing'));
  source.src = source.dataset.src;
  video.load();
  const tryStart = () => {
    if (document.hidden) return;
    const result = video.play();
    if (result && typeof result.catch === 'function') result.catch(() => {
      video.classList.remove('is-playing');
    });
  };
  tryStart();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else if (document.querySelector('#page-home') && !document.querySelector('#page-home').classList.contains('hidden-page')) tryStart();
  });
}
document.addEventListener('DOMContentLoaded', initHomeConstructionVideo);


/* HOME / SERVICES: natural pinned chapters + subtle photographic movement.
   The next rising chapter controls outgoing image zoom; sticky remains pure CSS.
   No wheel interception, scroll snapping, pointer overlays or forced navigation. */
function initHomeServiceSequence() {
  const home = document.getElementById('page-home');
  const sequence = home?.querySelector('[data-scene-sequence]');
  if (!home || !sequence || !window.matchMedia || !window.requestAnimationFrame) return;

  const scenes = [...sequence.querySelectorAll('[data-scene]')];
  if (scenes.length !== 3) return;

  const sceneMotion = window.matchMedia(
    '(min-height: 560px) and (prefers-reduced-motion: no-preference)'
  );
  const clamp = value => Math.max(0, Math.min(1, value));
  let scheduled = false;

  function draw() {
    scheduled = false;
    if (!sceneMotion.matches || home.classList.contains('hidden-page')) return;

    const height = Math.max(1, window.innerHeight);
    const sequenceRect = sequence.getBoundingClientRect();
    // Nothing to animate when chapters are fully outside the viewport.
    if (sequenceRect.top > height || sequenceRect.bottom < -height) return;

    scenes.forEach((scene, index) => {
      const sceneTop = scene.getBoundingClientRect().top;
      const entrance = index === 0 ? 1 : clamp((height - sceneTop) / height);
      // A sticky scene's top stops changing at zero; the next scene keeps moving.
      const nextTop = index < scenes.length - 1
        ? scenes[index + 1].getBoundingClientRect().top
        : sequenceRect.bottom;
      const exit = clamp((height - nextTop) / height);

      // A small zoom-out as a photo enters, then zoom-in while pinned.
      // Range approximately 1.04–1.105, deliberately below dramatic parallax.
      const compact = window.innerWidth < 768;
      // Touch screens: gentler scale and pan, with no expensive image clipping.
      const zoom = compact
        ? 1.045 + (1 - entrance) * 0.012 + exit * 0.06
        : 1.025 + (1 - entrance) * 0.045 + exit * 0.095;
      const pan = compact
        ? Math.round((1 - entrance) * 4 - exit * 8)
        : Math.round((1 - entrance) * 12 - exit * 20);
      const mask = index === 0 || compact ? 0 : Math.round((1 - entrance) * 16);

      scene.style.setProperty('--scene-scale', zoom.toFixed(4));
      scene.style.setProperty('--scene-pan', pan + 'px');
      scene.style.setProperty('--scene-mask', mask + '%');
    });
  }

  function requestDraw() {
    if (!sceneMotion.matches || scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(draw);
  }

  function updateMode() {
    document.documentElement.classList.toggle('scene-motion', sceneMotion.matches);
    if (!sceneMotion.matches) {
      scenes.forEach(scene => {
        scene.style.removeProperty('--scene-scale');
        scene.style.removeProperty('--scene-pan');
        scene.style.removeProperty('--scene-mask');
      });
    } else requestDraw();
  }

  window.addEventListener('scroll', requestDraw, {passive: true});
  window.addEventListener('resize', requestDraw, {passive: true});
  window.addEventListener('popstate', requestDraw);
  if (typeof sceneMotion.addEventListener === 'function') {
    sceneMotion.addEventListener('change', updateMode);
  } else if (typeof sceneMotion.addListener === 'function') {
    sceneMotion.addListener(updateMode);
  }
  updateMode();
}
document.addEventListener('DOMContentLoaded', initHomeServiceSequence);


/* SERVICES 2.0: the same natural sticky scroll rhythm as the approved Home.
   Each photo gently zooms while the next scene slides over it.
   No wheel interception, scroll lock, fake timers or custom touch behavior. */
function initServicesScrollSequence() {
  const page = document.getElementById('page-services');
  const sequence = page?.querySelector('[data-sv-sequence]');
  if (!page || !sequence || !window.matchMedia || !window.requestAnimationFrame) return;
  const scenes = [...sequence.querySelectorAll('[data-sv-scene]')];
  if (scenes.length !== 3) return;
  const allowed = window.matchMedia('(min-height:560px) and (prefers-reduced-motion:no-preference)');
  let scheduled = false;
  const clamp = value => Math.max(0, Math.min(1, value));

  function draw() {
    scheduled = false;
    if (!allowed.matches || page.classList.contains('hidden-page')) return;
    const height = Math.max(1,window.innerHeight);
    const sequenceBox = sequence.getBoundingClientRect();
    if (sequenceBox.top > height || sequenceBox.bottom < -height) return;
    const compact = window.innerWidth < 768;
    scenes.forEach((scene,index) => {
      const top = scene.getBoundingClientRect().top;
      const entrance = index === 0 ? 1 : clamp((height - top)/height);
      const nextTop = index < scenes.length - 1
        ? scenes[index+1].getBoundingClientRect().top
        : sequenceBox.bottom;
      const exit = clamp((height - nextTop)/height);
      const scale = compact
        ? 1.035 + (1 - entrance)*0.012 + exit*0.065
        : 1.025 + (1 - entrance)*0.026 + exit*0.088;
      const shift = compact
        ? Math.round((1 - entrance)*5 - exit*10)
        : Math.round((1 - entrance)*11 - exit*17);
      scene.style.setProperty('--sv-image-zoom', scale.toFixed(4));
      scene.style.setProperty('--sv-image-shift', shift+'px');
    });
  }
  function queue() {
    if (!allowed.matches || scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(draw);
  }
  function updateMode() {
    document.documentElement.classList.toggle('sv-scene-motion',allowed.matches);
    if (!allowed.matches) {
      scenes.forEach(scene => {
        scene.style.removeProperty('--sv-image-zoom');
        scene.style.removeProperty('--sv-image-shift');
      });
    } else queue();
  }
  window.addEventListener('scroll',queue,{passive:true});
  window.addEventListener('resize',queue,{passive:true});
  window.addEventListener('popstate',queue);
  if (typeof allowed.addEventListener === 'function') allowed.addEventListener('change',updateMode);
  else if (typeof allowed.addListener === 'function') allowed.addListener(updateMode);
  updateMode();
}
document.addEventListener('DOMContentLoaded',initServicesScrollSequence);


/* Careers application — safe client-side UX for the independent design preview.
   Transport activates ONLY after an employer-authorized HTTPS Formspree endpoint
   has been connected. No files leave the browser when data-submission-endpoint is empty.
   The form intentionally does NOT collect ID or sensitive identity documents. */
function initCareersApplication() {
  const form = document.getElementById('career-application-form');
  if (!form) return;

  const submitButton = document.getElementById('career-form-submit');
  const submitText = submitButton?.querySelector('span');
  const status = document.getElementById('career-form-status');
  const position = document.getElementById('career-position');
  const maxBytes = 10 * 1024 * 1024;
  const fileInputs = [...form.querySelectorAll('input[type="file"]')];
  const verifiedReceiver = false;
  const validExtension = /\.(pdf|doc|docx)$/i;
  const allowedMimes = new Set([
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/octet-stream',
    ''
  ]);

  function setStatus(message, state = '') {
    if (!status) return;
    status.textContent = message;
    if (state) status.dataset.state = state;
    else status.removeAttribute('data-state');
  }
  function fileValidity(input) {
    const file = input.files && input.files[0];
    if (!file) return input.required ? (input.id === 'career-letter' ? 'Please attach your cover letter before continuing.' : 'Please attach your résumé before continuing.') : '';
    if (!validExtension.test(file.name) || !allowedMimes.has(file.type)) {
      return 'Upload a PDF, DOC or DOCX document.';
    }
    if (file.size > maxBytes) return 'Each file must be 10 MB or smaller.';
    if (file.size === 0) return 'The selected file is empty. Choose a different document.';
    return '';
  }
  function updateFile(input) {
    const file = input.files && input.files[0];
    const name = document.getElementById(input.id + '-name');
    const error = fileValidity(input);
    if (name) {
      name.textContent = file ? (error ? error : file.name + ' · ' + Math.max(1, Math.ceil(file.size/1024)) + ' KB') : 'NO FILE SELECTED';
      name.style.color = error ? '#9d3838' : '';
    }
    // Required-file error is shown on submission; untouched inputs are not red.
    input.setCustomValidity(file ? error : '');
    if (file && error) setStatus(error,'error');
    else if (file) setStatus('File selected locally. No document has been uploaded or transmitted.','');
  }

  fileInputs.forEach(input => {
    input.addEventListener('change', () => updateFile(input));
    const zone = input.closest('[data-career-dropzone]');
    if (!zone) return;
    ['dragenter','dragover'].forEach(name => zone.addEventListener(name, event => {
      event.preventDefault();
      zone.classList.add('is-dragover');
    }));
    ['dragleave','dragend'].forEach(name => zone.addEventListener(name, event => {
      event.preventDefault();
      if (!zone.contains(event.relatedTarget)) zone.classList.remove('is-dragover');
    }));
    zone.addEventListener('drop', event => {
      event.preventDefault();
      zone.classList.remove('is-dragover');
      const file = event.dataTransfer?.files?.[0];
      if (!file) return;
      try {
        const transfer = new DataTransfer();
        transfer.items.add(file);
        input.files = transfer.files;
        updateFile(input);
      } catch {
        setStatus('Drag and drop is not supported by this browser. Choose a file using the upload control.','error');
      }
    });
  });

  document.querySelectorAll('.careers-v3 [data-career-role]').forEach(link => {
    link.addEventListener('click', () => {
      const title = link.closest('.career-role')?.querySelector('.career-role-heading strong')?.textContent?.trim();
      if (!title || !position) return;
      const available = [...position.options].find(option => option.textContent.trim().toLowerCase() === title.toLowerCase());
      if (available) {
        position.value = available.value;
        setStatus('Position selected: ' + title + '. Complete the application details below.');
      }
    });
  });

  if (verifiedReceiver) {
    if (submitText) submitText.textContent = 'SEND APPLICATION';
    setStatus('Secure submission endpoint configured. Applications are sent only when you submit this form.');
  } else {
    if (submitText) submitText.textContent = 'CHECK APPLICATION · PREVIEW ONLY';
    setStatus('Preview only: a secure company-approved receiver has not been connected. Selecting files does not upload or transmit them.');
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    // Clear previous errors before native validity check.
    fileInputs.forEach(input => input.setCustomValidity(fileValidity(input)));
    if (!form.reportValidity()) {
      setStatus('Complete the required fields and attach your résumé and cover letter (PDF, DOC or DOCX, max 10 MB each).','error');
      return;
    }
    const error = fileInputs.map(fileValidity).find(Boolean);
    if (error) {
      setStatus(error,'error');
      return;
    }
    if (!verifiedReceiver) {
      setStatus('Application fields and files checked. PREVIEW ONLY: no information or attachments were transmitted. A secure, authorized submission service must be connected before this can receive applications.','');
      return;
    }
  });
}
document.addEventListener('DOMContentLoaded',initCareersApplication);


/* Contact enquiries on this design preview go to Atrezzo Studios through
   local demo. Initial recipient email confirmation is required; provider
   acceptance alone is not proof of inbox delivery. */
function initContactInquiryForm() {
 const form=document.getElementById('contact-inquiry-form');
 if(!form)return;
 const status=document.getElementById('ct-form-status');
 form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity()){status.textContent='Complete the required fields.';status.dataset.state='error';return;}
  if(form.querySelector('[name="_honey"]')?.value)return;
  form.reset();status.textContent='Demo validation complete. No information was sent or stored.';status.dataset.state='success';
 });
}
document.addEventListener('DOMContentLoaded',initContactInquiryForm);

/* Gentle entrance movement on static interior pages; motion is optional
   and does not gate content without IntersectionObserver. */
function initPremiumReveals() {
 if(!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const nodes=document.querySelectorAll('.ct-method, .ct-inquiry-intro, .ct-form-shell, .ct-location-photo, .ct-location-copy, .career-role, .career-application-heading, .career-application-aside, .policy-chapter');
 nodes.forEach(node=>node.classList.add('premium-reveal'));
 const observer=new IntersectionObserver((entries,obs)=>{
   entries.forEach(entry=>{
     if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}
   });
 },{threshold:0.05,rootMargin:'0px 0px -5% 0px'});
 nodes.forEach(node=>observer.observe(node));
}
document.addEventListener('DOMContentLoaded',initPremiumReveals);

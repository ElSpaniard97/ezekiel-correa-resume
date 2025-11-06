(() => {
  // Elements
  const desktopNav = document.getElementById('desktopNav');
  const mobileNav  = document.getElementById('mobileNav');
  const hamburger  = document.getElementById('hamburger');
  const modeBtn    = document.getElementById('modeToggle');

  const tabs = document.querySelectorAll('.tab-content');

  // Activate a tab by id
  function activateTab(id) {
    // hide all tabs
    tabs.forEach(t => t.classList.remove('active'));
    // remove active from all links
    document.querySelectorAll('[data-tab]').forEach(a => a.classList.remove('active'));

    // show selected tab
    const tab = document.getElementById(id);
    if (tab) tab.classList.add('active');

    // set active on corresponding links (both navs)
    document.querySelectorAll(`[data-tab="${id}"]`).forEach(a => a.classList.add('active'));

    // update hash (nice UX) without scrolling
    if (history.replaceState) history.replaceState(null, '', `#${id}`);

    // close mobile menu after navigation
    if (mobileNav) mobileNav.classList.remove('show');
    document.body.classList.remove('nav-open');

    // scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Click handling for both navs (event delegation)
  function navClickHandler(e) {
    const link = e.target.closest('[data-tab]');
    if (!link) return;
    e.preventDefault();
    const id = link.getAttribute('data-tab');
    if (id) activateTab(id);
  }

  if (desktopNav) desktopNav.addEventListener('click', navClickHandler);
  if (mobileNav)  mobileNav.addEventListener('click', navClickHandler);

  // Restore tab based on hash (if present), else default to summary
  function initTabFromHash() {
    const id = (location.hash || '#summary').replace('#', '');
    const exists = document.getElementById(id);
    activateTab(exists ? id : 'summary');
  }

  // Dark / Light Mode
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      modeBtn.textContent = isLight ? '🌞' : '🌙';
      localStorage.setItem('resume-mode', isLight ? 'light' : 'dark');
    });

    // load saved theme
    if (localStorage.getItem('resume-mode') === 'light') {
      document.body.classList.add('light');
      modeBtn.textContent = '🌞';
    }
  }

  // Hamburger toggle (mobile)
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const willShow = !mobileNav.classList.contains('show');
      document.body.classList.toggle('nav-open', willShow);
      mobileNav.classList.toggle('show', willShow);
      hamburger.setAttribute('aria-expanded', willShow ? 'true' : 'false');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      const clickInside = e.target.closest('#mobileNav') || e.target.closest('#hamburger');
      if (!clickInside && mobileNav.classList.contains('show')) {
        mobileNav.classList.remove('show');
        document.body.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('show')) {
        mobileNav.classList.remove('show');
        document.body.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Logo fallback for tools (replace broken logos with text)
  document.querySelectorAll('.tool img').forEach(img => {
    img.onerror = () => {
      const parent = img.parentElement;
      if (!parent) return;
      parent.removeChild(img);
      const text = document.createElement('span');
      text.textContent = parent.getAttribute('data-name') || 'Tool';
      parent.appendChild(text);
    };
  });

  // Initialize
  window.addEventListener('DOMContentLoaded', initTabFromHash);
})();

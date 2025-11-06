(() => {
  const desktopNav = document.getElementById('desktopNav');
  const mobileNav = document.getElementById('mobileNav');
  const hamburger = document.getElementById('hamburger');
  const modeBtn = document.getElementById('modeToggle');
  const tabs = document.querySelectorAll('.tab-content');

  function activateTab(id) {
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('[data-tab]').forEach(a => a.classList.remove('active'));

    const tab = document.getElementById(id);
    if (tab) tab.classList.add('active');

    document.querySelectorAll(`[data-tab="${id}"]`).forEach(a => a.classList.add('active'));

    if (history.replaceState) history.replaceState(null, '', `#${id}`);
    mobileNav.classList.remove('show');
    document.body.classList.remove('nav-open');
  }

  function handleNavClick(e) {
    const link = e.target.closest('[data-tab]');
    if (!link) return;
    e.preventDefault();
    activateTab(link.dataset.tab);
  }

  desktopNav.addEventListener('click', handleNavClick);
  mobileNav.addEventListener('click', handleNavClick);

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const show = !mobileNav.classList.contains('show');
      mobileNav.classList.toggle('show', show);
      document.body.classList.toggle('nav-open', show);
      hamburger.setAttribute('aria-expanded', show);
    });
  }

  // Dark/Light mode toggle
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      modeBtn.textContent = isLight ? '🌞' : '🌙';
      localStorage.setItem('resume-theme', isLight ? 'light' : 'dark');
    });

    if (localStorage.getItem('resume-theme') === 'light') {
      document.body.classList.add('light');
      modeBtn.textContent = '🌞';
    }
  }

  // Initialize
  window.addEventListener('DOMContentLoaded', () => {
    const id = (location.hash || '#summary').replace('#', '');
    const exists = document.getElementById(id);
    activateTab(exists ? id : 'summary');
  });
})();

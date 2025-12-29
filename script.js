(() => {
  const desktopNav = document.getElementById('desktopNav');
  const modeBtn = document.getElementById('modeToggle');
  const tabs = document.querySelectorAll('.tab-content');

  // --- Tab Navigation ---
  function activateTab(id) {
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('[data-tab]').forEach(link => link.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) target.classList.add('active');

    document.querySelectorAll(`[data-tab="${id}"]`).forEach(link => link.classList.add('active'));

    if (history.replaceState) history.replaceState(null, '', `#${id}`);
  }

  function handleNavClick(e) {
    const link = e.target.closest('[data-tab]');
    if (!link) return;
    e.preventDefault();
    activateTab(link.dataset.tab);
  }

  if (desktopNav) desktopNav.addEventListener('click', handleNavClick);

  // --- Dark/Light Mode Toggle ---
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      modeBtn.textContent = isLight ? '🌞' : '🌙';
      localStorage.setItem('resume-theme', isLight ? 'light' : 'dark');
    });

    // Restore saved theme
    if (localStorage.getItem('resume-theme') === 'light') {
      document.body.classList.add('light');
      modeBtn.textContent = '🌞';
    }
  }

  // --- PDF Preview Toggle (CSP-safe: no inline handlers) ---
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-toggle]');
    if (!btn) return;

    const targetId = btn.getAttribute('data-toggle');
    const panel = document.getElementById(targetId);
    if (!panel) return;

    panel.classList.toggle('active');
  });

  // --- Load Tab Based on URL Hash ---
  window.addEventListener('DOMContentLoaded', () => {
    const id = (location.hash || '#summary').replace('#', '');
    const exists = document.getElementById(id);
    activateTab(exists ? id : 'summary');
  });
})();

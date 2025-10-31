(() => {
  // Tab navigation
  const links = document.querySelectorAll('.nav-links a');
  const tabs = document.querySelectorAll('.tab-content');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('data-tab');
      if (!id) return;

      // Remove active states
      links.forEach(l => l.classList.remove('active'));
      tabs.forEach(t => t.classList.remove('active'));

      // Activate selected tab + nav link
      link.classList.add('active');
      document.getElementById(id).classList.add('active');

      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Dark/light mode toggle
  const modeBtn = document.getElementById('modeToggle');
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      modeBtn.textContent = isLight ? '🌞' : '🌙';
      localStorage.setItem('resume-mode', isLight ? 'light' : 'dark');
    });
  }

  // Load saved theme preference
  if (localStorage.getItem('resume-mode') === 'light') {
    document.body.classList.add('light');
    if (modeBtn) modeBtn.textContent = '🌞';
  }

  // Logo fallback (replace missing images with text)
  document.querySelectorAll('.tool img').forEach(img => {
    img.onerror = () => {
      const parent = img.parentElement;
      parent.removeChild(img);
      const text = document.createElement('span');
      text.textContent = parent.dataset.name;
      parent.appendChild(text);
    };
  });
})();

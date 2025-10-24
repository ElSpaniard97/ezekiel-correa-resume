(() => {
  // Tab navigation
  const links = document.querySelectorAll('.nav-links a');
  const tabs = document.querySelectorAll('.tab-content');
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('data-tab');
      if (!id) return;
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      tabs.forEach(t => t.classList.remove('active'));
      document.getElementById(id).classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Light/dark toggle
  const modeBtn = document.getElementById('modeToggle');
  modeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    modeBtn.textContent = isLight ? '🌞' : '🌙';
    localStorage.setItem('resume-mode', isLight ? 'light' : 'dark');
  });
  if (localStorage.getItem('resume-mode') === 'light') {
    document.body.classList.add('light');
    modeBtn.textContent = '🌞';
  }

  // Download CV (safe print)
  const downloadBtn = document.getElementById('downloadCV');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', e => {
      e.preventDefault();
      window.print();
    });
  }

  // Logo fallback
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

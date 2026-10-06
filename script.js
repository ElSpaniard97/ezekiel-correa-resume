(() => {
  const links = [...document.querySelectorAll('nav a')];
  const sections = [...document.querySelectorAll('main > section')];
  const legacy = {summary: 'home', education: 'about', skills: 'about'};
  function activate(id) {
    id = legacy[id] || id;
    if (!sections.some(section => section.id === id)) id = 'home';
    sections.forEach(section => {
      const selected = section.id === id;
      section.classList.toggle('active', selected);
      section.hidden = !selected;
    });
    links.forEach(link => {
      if (link.hash === '#' + id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    window.scrollTo({top: 0, behavior: 'instant'});
    return id;
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const id = link.hash.slice(1);
    if (!sections.some(section => section.id === id) && !legacy[id]) return;
    event.preventDefault();
    const selected = activate(id);
    if (location.hash !== '#' + selected) history.pushState(null, '', '#' + selected);
  });
  window.addEventListener('hashchange', () => activate(location.hash.slice(1)));
  window.addEventListener('popstate', () => activate(location.hash.slice(1)));
  const selected = activate(location.hash.slice(1));
  if (location.hash && location.hash !== '#' + selected) history.replaceState(null, '', '#' + selected);
})();

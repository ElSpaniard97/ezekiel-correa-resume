(() => {
  const links = [...document.querySelectorAll('nav a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  function setActive(id) {
    links.forEach(link => {
      if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }
  // Preserve links shared from the previous tabbed resume.
  const legacy = {summary: 'home', education: 'about', skills: 'about'};
  const oldId = location.hash.slice(1);
  if (legacy[oldId]) location.replace('#' + legacy[oldId]);
  links.forEach(link => link.addEventListener('click', () => setActive(link.hash.slice(1))));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, {rootMargin: '-20% 0px -60% 0px', threshold: 0});
    sections.forEach(section => observer.observe(section));
  }
})();

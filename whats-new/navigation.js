(() => {
  const copy = {en: 'All updates', ru: 'Все обновления', pl: 'Wszystkie aktualizacje'};
  const main = document.querySelector('main');
  if (!main) return;
  const nav = document.createElement('nav');
  nav.className = 'release-nav';
  const link = document.createElement('a');
  nav.append(link);
  main.prepend(nav);
  function update() {
    const lang = document.documentElement.lang || 'en';
    const theme = document.documentElement.dataset.theme || 'light';
    nav.setAttribute('aria-label', copy[lang] || copy.en);
    link.href = `../?lang=${encodeURIComponent(lang)}&theme=${encodeURIComponent(theme)}`;
    link.textContent = copy[lang] || copy.en;
  }
  new MutationObserver(update).observe(document.documentElement, {
    attributes: true, attributeFilter: ['lang', 'data-theme']
  });
  update();
})();

(() => {
  const copy = {en: 'All updates', ru: 'Все обновления', pl: 'Wszystkie aktualizacje'};
  const main = document.querySelector('main');
  if (!main) return;
  const nav = document.createElement('nav');
  nav.className = 'release-nav';
  const link = document.createElement('a');
  nav.append(link);
  main.prepend(nav);
  if (window.releaseContext.appVersion(location.search)) {
    document.documentElement.classList.add('in-app');
    const version = main.querySelector('.release-line');
    const language = document.querySelector('.brand-bar .language');
    if (version) nav.append(version);
    if (language) nav.append(language);
  }
  function update() {
    const lang = document.documentElement.lang || 'en';
    const theme = document.documentElement.dataset.theme || 'light';
    nav.setAttribute('aria-label', copy[lang] || copy.en);
    link.href = '../' + window.releaseContext.query(lang, theme, location.search);
    link.textContent = copy[lang] || copy.en;
  }
  new MutationObserver(update).observe(document.documentElement, {
    attributes: true, attributeFilter: ['lang', 'data-theme']
  });
  update();
})();

(() => {
  const state = window.releaseState;
  const media = matchMedia('(prefers-color-scheme: dark)');
  function render() {
    const copy = window.releaseCopy[state.lang];
    const theme = state.explicitTheme || (media.matches ? 'dark' : 'light');
    document.documentElement.lang = state.lang;
    document.documentElement.dataset.theme = theme;
    document.title = copy.title;
    document.querySelector('meta[name="description"]').content = copy.intro;
    ['eyebrow', 'headline', 'intro', 'caption', 'also'].forEach(id => { document.getElementById(id).textContent = copy[id]; });
    document.getElementById('footer-note').textContent = copy.footer;
    document.getElementById('language-label').textContent = copy.language;
    document.querySelector('.brand').setAttribute('aria-label', copy.support);
    document.getElementById('language').value = state.lang;
    const screenshot = document.getElementById('screenshot');
    screenshot.alt = copy.alt;
    screenshot.src = `assets/appearance-${state.lang}-${theme}.png`;
  }
  document.getElementById('language').addEventListener('change', event => {
    state.lang = event.target.value;
    const url = new URL(location.href);
    url.searchParams.set('lang', state.lang);
    history.replaceState(null, '', url);
    render();
  });
  media.addEventListener('change', render);
  render();
})();

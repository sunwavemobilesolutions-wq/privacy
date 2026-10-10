(() => {
  const release = document.querySelector('meta[name="release-version"]')?.content;
  const context = window.releaseContext;
  const main = document.querySelector('main');
  if (!context || !main) return;
  const copy = {
    en: {available: version => `Available in version ${version}`, update: 'Update in App Store', open: 'Open in App Store'},
    ru: {available: version => `Доступно в версии ${version}`, update: 'Обновить в App Store', open: 'Открыть в App Store'},
    pl: {available: version => `Dostępne w wersji ${version}`, update: 'Uaktualnij w App Store', open: 'Otwórz w App Store'}
  };
  const panel = document.createElement('aside');
  panel.className = 'release-update';
  panel.hidden = true;
  const label = document.createElement('p');
  const link = document.createElement('a');
  link.href = 'https://apps.apple.com/app/id6746383628';
  panel.append(label, link);
  const intro = main.querySelector('.intro');
  if (intro) intro.after(panel); else main.append(panel);
  function update() {
    const strings = copy[document.documentElement.lang] || copy.en;
    const available = window.releaseAvailability?.[release]?.availableInAppStore;
    const action = context.action(context.appVersion(location.search), release, available);
    panel.hidden = action === 'hidden';
    label.hidden = action !== 'update';
    label.textContent = action === 'update' ? strings.available(release) : '';
    link.textContent = action === 'update' ? strings.update : strings.open;
  }
  new MutationObserver(update).observe(document.documentElement, {
    attributes: true, attributeFilter: ['lang']
  });
  update();
})();

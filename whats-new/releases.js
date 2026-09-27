const copy = {
  en: {title: 'All updates', appearance: '18 app icons · Light and dark themes'},
  ru: {title: 'Все обновления', appearance: '18 иконок · Светлая и тёмная темы'},
  pl: {title: 'Wszystkie aktualizacje', appearance: '18 ikon · Jasny i ciemny motyw'}
};
function render() {
  base();
  const c = copy[lang];
  document.getElementById('title').textContent = c.title;
  document.getElementById('appearance-copy').textContent = c.appearance;
  document.title = c.title + ' · Photo Paranoid';
  document.getElementById('old').href = '1.1.9/' + query();
}
render();

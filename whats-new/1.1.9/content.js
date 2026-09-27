/* One release, three complete locales. No remote dependencies or tracking. */
window.releaseCopy = {
  en: {
    title: "What's new in 1.1.9 · Photo Paranoid", eyebrow: "What's new", headline: 'Make it yours.',
    intro: '18 app icons. Light, dark or system appearance. Your choice.', caption: 'Settings → Appearance',
    also: 'Plus, improvements to stability and browsing your photos and videos.',
    footer: 'A little more you.', language: 'Language', support: 'Photo Paranoid support',
    alt: 'Appearance settings with theme choices and 18 app icons'
  },
  ru: {
    title: 'Новое в 1.1.9 · Photo Paranoid', eyebrow: 'Что нового', headline: 'Оформление на ваш вкус.',
    intro: '18 иконок приложения. Светлая, тёмная или системная тема. Выбирайте свою.', caption: 'Настройки → Оформление',
    also: 'Также улучшили стабильность и удобство просмотра фото и видео.',
    footer: 'Ещё немного вашего стиля.', language: 'Язык', support: 'Поддержка Photo Paranoid',
    alt: 'Настройки оформления: выбор темы и 18 иконок приложения'
  },
  pl: {
    title: 'Nowości w 1.1.9 · Photo Paranoid', eyebrow: 'Co nowego', headline: 'Wygląd w Twoim stylu.',
    intro: '18 ikon aplikacji. Jasny, ciemny lub systemowy motyw. Wybór należy do Ciebie.', caption: 'Ustawienia → Wygląd',
    also: 'Poprawiliśmy też stabilność oraz wygodę przeglądania zdjęć i filmów.',
    footer: 'Jeszcze bardziej po Twojemu.', language: 'Język', support: 'Pomoc Photo Paranoid',
    alt: 'Ustawienia wyglądu z wyborem motywu i 18 ikonami aplikacji'
  }
};
(() => {
  const query = new URLSearchParams(location.search);
  const preferred = query.get('lang') || navigator.language || 'en';
  const code = preferred.toLowerCase().split(/[-_]/)[0];
  const lang = Object.hasOwn(window.releaseCopy, code) ? code : 'en';
  const theme = query.get('theme');
  window.releaseState = { lang, explicitTheme: theme === 'dark' || theme === 'light' ? theme : null };
  document.documentElement.lang = lang;
  document.documentElement.dataset.theme = window.releaseState.explicitTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
})();

(() => {
const params = new URLSearchParams(location.search);
const locales = ['en','ru','pl'];
const preferred = (params.get('lang') || navigator.language || 'en').split(/[-_]/)[0].toLowerCase();
let lang = locales.includes(preferred) ? preferred : 'en';
const media = matchMedia('(prefers-color-scheme: dark)');
const explicit = ['light','dark'].includes(params.get('theme')) ? params.get('theme') : null;
if (window.releaseContext.appVersion(location.search)) {
 document.documentElement.classList.add('in-app');
 document.addEventListener('contextmenu', event => {
  if (!event.target.closest('.release-update a')) event.preventDefault();
 });
 document.addEventListener('dragstart', event => event.preventDefault());
 document.addEventListener('selectstart', event => {
  if (!event.target.closest('.release-update a')) event.preventDefault();
 });
}
function render(){
 document.documentElement.lang = lang;
 document.documentElement.dataset.theme = explicit || (media.matches ? 'dark' : 'light');
 document.querySelectorAll('img[data-source-dark]').forEach(img => {img.src = document.documentElement.dataset.theme === 'dark' ? img.dataset.sourceDark : img.dataset.sourceLight;});
 document.querySelectorAll('[data-locale]').forEach(el => el.hidden = el.dataset.locale !== lang);
 document.getElementById('language').value = lang;
 document.getElementById('language-label').textContent = {en:'Language',ru:'Язык',pl:'Język'}[lang];
 document.getElementById('eyebrow').textContent = {en:"What's new",ru:'Что нового',pl:'Co nowego'}[lang];
 document.title = document.getElementById('eyebrow').textContent + ' ' + document.querySelector('meta[name=release-version]').content + ' · Photo Paranoid';
}
document.getElementById('language').addEventListener('change', e=>{lang=e.target.value;const u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u);render();});
media.addEventListener('change',render);render();
})();

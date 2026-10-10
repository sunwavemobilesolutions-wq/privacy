(() => {
const params = new URLSearchParams(location.search);
const locales = ['en','ru','pl'];
const preferred = (params.get('lang') || navigator.language || 'en').split(/[-_]/)[0].toLowerCase();
let lang = locales.includes(preferred) ? preferred : 'en';
const media = matchMedia('(prefers-color-scheme: dark)');
const explicit = ['light','dark'].includes(params.get('theme')) ? params.get('theme') : null;
function render(){
 document.documentElement.lang = lang;
 document.documentElement.dataset.theme = explicit || (media.matches ? 'dark' : 'light');
 document.querySelectorAll('[data-locale]').forEach(el => el.hidden = el.dataset.locale !== lang);
 document.getElementById('language').value = lang;
 document.getElementById('language-label').textContent = {en:'Language',ru:'Язык',pl:'Język'}[lang];
 document.getElementById('eyebrow').textContent = {en:"What's new",ru:'Что нового',pl:'Co nowego'}[lang];
 document.title = document.getElementById('eyebrow').textContent + ' ' + document.querySelector('meta[name=release-version]').content + ' · Photo Paranoid';
 document.querySelector('.intro').replaceChildren(document.getElementById('intro-' + lang).content.cloneNode(true));
}
document.getElementById('language').addEventListener('change', e=>{lang=e.target.value;const u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u);render();});
media.addEventListener('change',render);render();
})();

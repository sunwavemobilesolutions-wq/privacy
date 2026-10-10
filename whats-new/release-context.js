/* Shared by release pages and history. Unknown versions never imply an update. */
(function (root) {
  'use strict';
  function parseVersion(value) {
    if (typeof value !== 'string' || !/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){0,2}$/.test(value)) return null;
    const parts = value.split('.').map(Number);
    if (!parts.every(Number.isSafeInteger)) return null;
    while (parts.length < 3) parts.push(0);
    return parts;
  }
  function appVersion(search) {
    const values = new URLSearchParams(search).getAll('appVersion');
    return values.length === 1 && parseVersion(values[0]) ? values[0] : null;
  }
  function compare(a, b) {
    const left = parseVersion(a), right = parseVersion(b);
    if (!left || !right) return null;
    for (let i = 0; i < 3; i++) {
      if (left[i] !== right[i]) return left[i] < right[i] ? -1 : 1;
    }
    return 0;
  }
  function query(lang, theme, search) {
    const params = new URLSearchParams({lang, theme});
    const version = appVersion(search);
    if (version) params.set('appVersion', version);
    return '?' + params.toString();
  }
  function action(version, release, available) {
    if (available !== true || !parseVersion(release)) return 'hidden';
    const order = compare(version, release);
    return order === null ? 'open' : order < 0 ? 'update' : 'hidden';
  }
  const api = {parseVersion, appVersion, compare, query, action};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.releaseContext = api;
})(typeof window !== 'undefined' ? window : globalThis);

(function () {
  // The trace axis starts Jan 2018 and spans 108 months; month index = months since then.
  const now = new Date();
  const nowIdx = (now.getFullYear() - 2018) * 12 + now.getMonth();
  const idx = s => s === 'now' ? nowIdx : (+s.slice(0, 4) - 2018) * 12 + (+s.slice(5, 7) - 1);

  const live = document.querySelector('[data-live]');
  if (live) live.style.setProperty('--e', Math.min(nowIdx, 108));

  function fmt(months) {
    const t = k => window.__i18n ? window.__i18n.t(k) : (k === 'dur.y' ? 'a' : 'm');
    const y = Math.floor(months / 12), m = months % 12;
    return [y && y + t('dur.y'), m && m + t('dur.m')].filter(Boolean).join(' ') || '0' + t('dur.m');
  }
  function renderDurations() {
    document.querySelectorAll('.dur[data-from]').forEach(el => {
      el.textContent = fmt(idx(el.dataset.to) - idx(el.dataset.from));
    });
    const total = document.querySelector('[data-dur-total]');
    if (total) total.textContent = fmt(nowIdx - idx('2018-03'));
  }
  renderDurations();
  document.addEventListener('langchange', renderDurations);

  document.getElementById('theme-toggle').addEventListener('click', function () {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  const copy = document.getElementById('copy-mail');
  copy.addEventListener('click', function () {
    if (!navigator.clipboard) { location.href = 'mailto:remo.yukoff@gmail.com'; return; }
    navigator.clipboard.writeText('remo.yukoff@gmail.com').then(() => {
      copy.textContent = window.__i18n.t('contact.copied');
      setTimeout(() => { copy.textContent = window.__i18n.t('contact.copy'); }, 2000);
    });
  });
})();

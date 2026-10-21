(() => {
  function setLanguage(language) {
    const lang = language === 'th' ? 'th' : 'en';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-th]').forEach(element => { element.textContent = element.dataset[lang]; });
    document.querySelectorAll('[data-aria-th]').forEach(element => { element.setAttribute('aria-label', element.dataset[lang === 'th' ? 'ariaTh' : 'ariaEn']); });
    document.querySelectorAll('[data-locale]').forEach(element => { element.hidden = element.dataset.locale !== lang; });
    document.querySelectorAll('[data-lang]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.lang === lang)); });
    document.querySelectorAll('[data-entry-target]').forEach(link => { link.href = '#' + link.dataset.entryTarget + '-' + lang; });
    try { localStorage.setItem('pitinach-portfolio-v2-language-english-default', lang); } catch (_) { }
  }
  let initial = 'en';
  try { initial = localStorage.getItem('pitinach-portfolio-v2-language-english-default') || 'en'; } catch (_) { }
  setLanguage(initial);
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  const photoDialog = document.querySelector('.photo-dialog');
  document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
    const image = photoDialog.querySelector('img');
    image.src = button.dataset.photo;
    image.alt = button.querySelector('img').alt;
    photoDialog.showModal();
  }));
  photoDialog.querySelector('.close-photo').addEventListener('click', () => photoDialog.close());
  photoDialog.addEventListener('click', event => { if (event.target === photoDialog) photoDialog.close(); });
  document.querySelectorAll('.page-guide a').forEach(link => link.addEventListener('click', () => { document.querySelector('.page-guide').open = false; }));
})();

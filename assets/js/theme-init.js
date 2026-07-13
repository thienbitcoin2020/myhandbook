(function applyInitialTheme() {
  const savedTheme = localStorage.getItem('nt_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.lang = localStorage.getItem('nt_lang') === 'vi' ? 'vi' : 'en';
})();

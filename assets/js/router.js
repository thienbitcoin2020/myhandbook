/**
 * router.js — Hash-based SPA router for Handbook
 * Loads page fragments from /pages/*.html into the shell
 */

const ROUTES = {
  'deployment': 'pages/deployment.html',
  'handbook':   'pages/handbook.html',
  'ba':         'pages/ba.html',
  'pm':         'pages/pm.html',
};

let _pageStyle  = null;
let _pageScript = null;
let _currentPage = null;

async function navigate(hash) {
  const page = (hash || '').replace(/^#/, '') || 'deployment';
  const url  = ROUTES[page] || ROUTES['deployment'];

  if (page === _currentPage) return;
  _currentPage = page;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const html = await res.text();
    const doc  = new DOMParser().parseFromString(html, 'text/html');

    // ── Sidebar ──────────────────────────────────────────────
    const sidebarDest = document.getElementById('sidebar');
    const sidebarSrc  = doc.getElementById('sidebar-inner');
    if (sidebarDest && sidebarSrc) {
      sidebarDest.innerHTML = sidebarSrc.innerHTML;
    }

    // ── Main content ─────────────────────────────────────────
    const app         = document.getElementById('app');
    const contentSrc  = doc.getElementById('page-content');
    if (app && contentSrc) {
      app.innerHTML = contentSrc.innerHTML;
    }

    // ── Page title ───────────────────────────────────────────
    const titleEl = doc.querySelector('title');
    if (titleEl) document.title = titleEl.textContent;

    // ── Page-specific styles ─────────────────────────────────
    if (_pageStyle) { _pageStyle.remove(); _pageStyle = null; }
    const styleSrc = doc.getElementById('page-style');
    if (styleSrc) {
      _pageStyle = document.createElement('style');
      _pageStyle.id = 'page-style-active';
      _pageStyle.textContent = styleSrc.textContent;
      document.head.appendChild(_pageStyle);
    }

    // ── Page-specific scripts ─────────────────────────────────
    if (_pageScript) { _pageScript.remove(); _pageScript = null; }
    const scriptSrc = doc.getElementById('page-script');
    if (scriptSrc) {
      _pageScript = document.createElement('script');
      _pageScript.textContent = scriptSrc.textContent;
      document.body.appendChild(_pageScript);
    }

    // ── Re-run shared initialisations ─────────────────────────
    if (typeof _injectThemeToggle === 'function') _injectThemeToggle();
    if (typeof syncAuthState      === 'function') syncAuthState();
    if (typeof applyGrids         === 'function') applyGrids();

    // ── DoD keyboard listeners (deployment page) ──────────────
    document.querySelectorAll('.dod-item').forEach(item => {
      item.addEventListener('keydown', e => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          if (typeof toggleDod === 'function') toggleDod(item);
        }
      });
    });

    // ── Scroll-spy for deployment page ────────────────────────
    if (page === 'deployment') _setupScrollSpy();

    window.scrollTo(0, 0);

  } catch (err) {
    console.error('[Router] Failed to load', url, err);
  }
}

function _setupScrollSpy() {
  const navMap = {
    'section-governance': 'nav-governance',
    'section-phase1':     'nav-phase1',
    'section-phase2':     'nav-phase2',
    'section-phase3':     'nav-phase3',
    'section-phase4':     'nav-phase4',
  };
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const navId = navMap[entry.target.id];
          if (navId) {
            document.querySelectorAll('#sidebar-nav a').forEach(a => a.classList.remove('active'));
            const el = document.getElementById(navId);
            if (el) el.classList.add('active');
          }
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );
  Object.keys(navMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

window.addEventListener('hashchange', () => {
  _currentPage = null;
  navigate(location.hash);
});
document.addEventListener('DOMContentLoaded', () => navigate(location.hash));

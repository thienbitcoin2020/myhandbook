/**
 * router.js — Hash-based SPA router for Handbook
 * Loads page fragments from /pages/*.html into the shell
 */

const ROUTES = {
  'home':       'pages/home.html',
  'deployment': 'pages/deployment.html',
  'handbook':   'pages/handbook.html',
  'ba':         'pages/ba.html',
  'pm':         'pages/pm.html',
  'qc':         'pages/qc.html',
  'po':         'pages/po.html',
  'sa':         'pages/sa.html',
  'sec':        'pages/sec.html',
  'ops':        'pages/ops.html',
  'sm':         'pages/sm.html',
  'ux':         'pages/ux.html',
  'pmo':        'pages/pmo.html',
};

let _pageStyle  = null;
let _pageScript = null;
let _currentPage = null;
let _scrollObserver = null;

async function navigate(hash) {
  const page = (hash || '').replace(/^#/, '') || 'home';
  const url  = ROUTES[page] || ROUTES['home'];

  if (page === _currentPage) return;
  _currentPage = page;

  // Self-hosted i18n: Vietnamese fragments live in pages/vi/<page>.html.
  // If a page has no VI version yet, fall back to English with a notice.
  const wantVi = (typeof _getLang === 'function' && _getLang() === 'vi');
  let viFellBack = false;

  try {
    let res;
    if (wantVi) {
      res = await fetch(url.replace('pages/', 'pages/vi/'));
      if (!res.ok) { viFellBack = true; res = await fetch(url); }
    } else {
      res = await fetch(url);
    }
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
      if (viFellBack) {
        const note = document.createElement('div');
        note.className = 'vi-fallback-note';
        note.innerHTML = '🇻🇳 Bản dịch tiếng Việt cho trang này đang được biên soạn — nội dung tạm hiển thị bằng tiếng Anh.';
        app.insertBefore(note, app.firstChild);
      }
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
    if (typeof _injectLangToggle  === 'function') _injectLangToggle();
    if (typeof _enhanceSidebarDetails === 'function') _enhanceSidebarDetails();
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

    // ── Initialise DoD progress bar (deployment page) ─────────
    if (typeof updateDod === 'function') updateDod();

    // ── Scroll-spy for every page that exposes in-page sections ─
    _setupScrollSpy();

    window.scrollTo(0, 0);

  } catch (err) {
    console.error('[Router] Failed to load', url, err);
    _renderError(page, url, err);
  }
}

/** Render a user-facing error state when a page fragment fails to load */
function _renderError(page, url, err) {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = `
    <div class="router-error" role="alert">
      <div class="router-error-icon">⚠️</div>
      <h1>Couldn't load this page</h1>
      <p>The section <code>#${page}</code> failed to load
         (<code>${url}</code> — ${err && err.message ? err.message : 'unknown error'}).</p>
      <p>Check your connection and try again.</p>
      <button type="button" class="router-error-btn"
              onclick="_currentPage=null; navigate(location.hash)">Retry</button>
    </div>`;
}

function _setupScrollSpy() {
  if (_scrollObserver) {
    _scrollObserver.disconnect();
    _scrollObserver = null;
  }

  const links = Array.from(document.querySelectorAll('#sidebar a[href^="#"], #hb-sidebar a[href^="#"]'));
  const navMap = new Map();
  links.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const target = id && document.getElementById(id);
    if (target) navMap.set(target, link);
  });
  if (!navMap.size) return;

  const setActiveSection = link => {
    links.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  };

  _scrollObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = navMap.get(entry.target);
          if (link) setActiveSection(link);
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );
  navMap.forEach((link, target) => _scrollObserver.observe(target));

  // Give each page a clear initial navigation state before the observer fires.
  const firstLink = navMap.values().next().value;
  if (firstLink) setActiveSection(firstLink);
}

window.addEventListener('hashchange', () => {
  const page = location.hash.replace(/^#/, '');

  // In-page anchor (e.g. #section-p2 inside a role page): NOT a route.
  // Just scroll to it — do NOT re-route (previously this fell back to the
  // default route and wiped the current page) and do NOT reload in VI mode.
  if (page && !ROUTES[page]) {
    const el = document.getElementById(page);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  _currentPage = null;
  navigate(location.hash);
});

// Keep route hashes stable when navigating inside the current handbook.
// This preserves the active route across refreshes and language changes while
// still providing smooth, accessible in-page navigation.
document.addEventListener('click', event => {
  const link = event.target.closest && event.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href').slice(1);
  if (!id || ROUTES[id]) return;
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/** Re-render the current route (used by the language toggle — no reload). */
function _rerenderCurrentPage() {
  const route = (_currentPage && ROUTES[_currentPage])
    ? _currentPage
    : (ROUTES[location.hash.replace(/^#/, '')] ? location.hash.replace(/^#/, '') : 'home');
  _currentPage = null;
  navigate('#' + route);
}
document.addEventListener('DOMContentLoaded', () => navigate(location.hash));

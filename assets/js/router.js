/**
 * router.js — Hash-based SPA router for Handbook
 * Loads page fragments from /pages/*.html into the shell
 */

const ROUTES = {
  'home':       'pages/handbook.html',
  'deployment': 'pages/deployment.html',
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

// The former #handbook route is kept only as a compatibility alias. Home is
// now the single canonical entry point for the Implementation Handbook.
const ROUTE_ALIASES = {
  'handbook': 'home',
};

// The overview information architecture was consolidated from four switcher
// views into two. Preserve former section hashes and short keys so bookmarks,
// cached markup, and shared search links still open the correct parent view.
const HOME_SECTION_HASHES = {
  'sec-landing':  { parent: 'landing', target: 'sec-landing' },
  'sec-secmap':   { parent: 'landing', target: 'sec-secmap' },
  'sec-secxwalk': { parent: 'secxwalk', target: 'sec-secxwalk' },
  'sec-secmodel': { parent: 'secxwalk', target: 'sec-secmodel' },
  'landing':      { parent: 'landing', target: 'sec-landing' },
  'secmap':       { parent: 'landing', target: 'sec-secmap' },
  'secxwalk':     { parent: 'secxwalk', target: 'sec-secxwalk' },
  'secmodel':     { parent: 'secxwalk', target: 'sec-secmodel' },
};

// Keep the public address clean without relying on a redirect (which would
// reload the SPA). Preserve query parameters and every existing hash so route
// links, in-page anchors, and search-result deep links continue to work.
function _canonicalizeShellUrl() {
  const url = new URL(window.location.href);
  const canonicalPath = url.pathname.replace(/\/index\.html$/i, '/');
  const canonicalHash = url.hash || '#home';

  if (canonicalPath !== url.pathname || canonicalHash !== url.hash) {
    history.replaceState(
      history.state,
      '',
      canonicalPath + url.search + canonicalHash
    );
  }
}

_canonicalizeShellUrl();

let _pageStyle  = null;
let _currentPage = null;
let _scrollObserver = null;

function _replaceWithTrustedFragment(destination, source) {
  // Fragments are fetched only from the fixed same-origin ROUTES allowlist.
  const nodes = Array.from(source.childNodes, node => document.importNode(node, true));
  destination.replaceChildren(...nodes);
}

async function navigate(hash) {
  const requestedPage = (hash || '').replace(/^#/, '') || 'home';
  const homeSectionRequest = HOME_SECTION_HASHES[requestedPage] || null;
  const requestedRoute = homeSectionRequest ? 'home' : requestedPage;
  const page = ROUTE_ALIASES[requestedRoute]
    || (ROUTES[requestedRoute] ? requestedRoute : 'home');
  const url = ROUTES[page];

  if (requestedPage !== page && ROUTE_ALIASES[requestedPage]) {
    history.replaceState(null, '', '#home');
  }

  if (page === _currentPage) return;
  _currentPage = page;

  // Self-hosted i18n: Vietnamese fragments live in pages/vi/<page>.html.
  // If a page has no VI version yet, fall back to English with a notice.
  const wantVi = (typeof _getLang === 'function' && _getLang() === 'vi');
  let viFellBack = false;
  if (typeof _syncSharedLanguage === 'function') _syncSharedLanguage(wantVi ? 'vi' : 'en');

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
      _replaceWithTrustedFragment(sidebarDest, sidebarSrc);
    }

    // ── Main content ─────────────────────────────────────────
    const app         = document.getElementById('app');
    const contentSrc  = doc.getElementById('page-content');
    if (app && contentSrc) {
      _replaceWithTrustedFragment(app, contentSrc);
      if (viFellBack) {
        const note = document.createElement('div');
        note.className = 'vi-fallback-note';
        note.textContent = '🇻🇳 Bản dịch tiếng Việt cho trang này đang được biên soạn — nội dung tạm hiển thị bằng tiếng Anh.';
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

    // ── Re-run shared initialisations ─────────────────────────
    if (typeof _injectThemeToggle === 'function') _injectThemeToggle();
    if (typeof _injectLangToggle  === 'function') _injectLangToggle();
    if (typeof _enhanceSidebarDetails === 'function') _enhanceSidebarDetails();
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

    if (homeSectionRequest) _revealHomeSection(homeSectionRequest);
    else window.scrollTo(0, 0);

    // Consumers such as global search need a deterministic signal that the
    // requested fragment has been injected and all page UI is ready.
    document.dispatchEvent(new CustomEvent('handbook:page-ready', {
      detail: {
        page,
        lang: wantVi && !viFellBack ? 'vi' : 'en',
      },
    }));

  } catch (err) {
    console.error('[Router] Failed to load', url, err);
    _renderError(page, url, err);
  }
}

/** Render a user-facing error state when a page fragment fails to load */
function _renderError(page, url, err) {
  const app = document.getElementById('app');
  if (!app) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'router-error';
  wrapper.setAttribute('role', 'alert');

  const icon = document.createElement('div');
  icon.className = 'router-error-icon';
  icon.textContent = '⚠️';

  const heading = document.createElement('h1');
  heading.textContent = typeof getSharedUiText === 'function'
    ? getSharedUiText('errorHeading')
    : "Couldn't load this page";

  const details = document.createElement('p');
  const pageCode = document.createElement('code');
  pageCode.textContent = '#' + page;
  const urlCode = document.createElement('code');
  urlCode.textContent = url;
  const prefix = typeof getSharedUiText === 'function' ? getSharedUiText('errorSectionPrefix') : 'Section ';
  const suffix = typeof getSharedUiText === 'function' ? getSharedUiText('errorSectionSuffix') : ' could not be loaded (';
  const unknownError = typeof getSharedUiText === 'function' ? getSharedUiText('unknownError') : 'unknown error';
  details.append(prefix, pageCode, suffix, urlCode, ' — ');
  details.append(document.createTextNode(err && err.message ? err.message : unknownError));
  details.append(').');

  const guidance = document.createElement('p');
  guidance.textContent = typeof getSharedUiText === 'function'
    ? getSharedUiText('errorGuidance')
    : 'Check your connection and try again.';

  const retry = document.createElement('button');
  retry.type = 'button';
  retry.className = 'router-error-btn';
  retry.textContent = typeof getSharedUiText === 'function' ? getSharedUiText('retry') : 'Retry';
  retry.addEventListener('click', () => {
    _currentPage = null;
    navigate(location.hash);
  });

  wrapper.append(icon, heading, details, guidance, retry);
  app.replaceChildren(wrapper);
}

function _revealHomeSection(request) {
  if (!request) return;

  if (typeof showSec === 'function') {
    const navLink = document.querySelector(`.sb-nav a[data-sec="${request.parent}"]`);
    showSec(request.parent, navLink, { scroll: false });
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const target = document.getElementById(request.target);
      if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  });
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
  const route = ROUTE_ALIASES[page] || page;
  const homeSectionRequest = HOME_SECTION_HASHES[page];

  if (homeSectionRequest) {
    if (_currentPage === 'home' && document.getElementById(homeSectionRequest.target)) {
      _revealHomeSection(homeSectionRequest);
    } else {
      _currentPage = null;
      navigate(location.hash);
    }
    return;
  }

  // In-page anchor (e.g. #section-p2 inside a role page): NOT a route.
  // Just scroll to it — do NOT re-route (previously this fell back to the
  // default route and wiped the current page) and do NOT reload in VI mode.
  if (page && !ROUTES[route]) {
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
  const requestedRoute = location.hash.replace(/^#/, '');
  if (HOME_SECTION_HASHES[requestedRoute]) {
    _currentPage = null;
    navigate('#' + requestedRoute);
    return;
  }
  const canonicalRoute = ROUTE_ALIASES[requestedRoute] || requestedRoute;
  const route = (_currentPage && ROUTES[_currentPage])
    ? _currentPage
    : (ROUTES[canonicalRoute] ? canonicalRoute : 'home');
  _currentPage = null;
  navigate('#' + route);
}
document.addEventListener('DOMContentLoaded', () => navigate(location.hash));

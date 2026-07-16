/**
 * main.js - Handbook deployment pages
 * Handles: theme, language, sidebar navigation, accordion, role tabs, DoD checklist
 */

// ============================================================
// THEME — Dark / Light mode
// Runs immediately to prevent flash of wrong theme (FOUC)
// ============================================================
(function initTheme() {
  const saved = localStorage.getItem('nt_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  _syncThemeColor(saved);
  // Enable transitions only after initial paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.add('theme-ready');
    });
  });
})();

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('nt_theme', theme);
  _syncThemeColor(theme);
  _updateThemeBtns(theme);
}

function _syncThemeColor(theme) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#1B1B1B' : '#DA2128');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  setTheme(current === 'dark' ? 'light' : 'dark');
}

function _updateThemeBtns(theme) {
  const darkBtn  = document.getElementById('ts-dark');
  const lightBtn = document.getElementById('ts-light');
  if (!darkBtn || !lightBtn) return;
  darkBtn.classList.toggle('active',  theme === 'dark');
  lightBtn.classList.toggle('active', theme === 'light');
  darkBtn.setAttribute('aria-pressed', String(theme === 'dark'));
  lightBtn.setAttribute('aria-pressed', String(theme === 'light'));
}

function _injectThemeToggle() {
  if (document.getElementById('theme-toggle-wrap')) return;
  const sidebar = document.getElementById('sidebar') || document.getElementById('hb-sidebar');
  if (!sidebar) return;

  const wrap = document.createElement('div');
  wrap.className = 'theme-toggle-wrap';
  wrap.id = 'theme-toggle-wrap';
  const segment = document.createElement('div');
  segment.className = 'theme-seg';

  const darkButton = document.createElement('button');
  darkButton.className = 'ts-btn';
  darkButton.id = 'ts-dark';
  darkButton.type = 'button';
  darkButton.append(Object.assign(document.createElement('span'), { textContent: '☽' }));
  const darkLabel = Object.assign(document.createElement('span'), { textContent: 'Dark' });
  darkLabel.className = 'theme-label';
  darkButton.append(darkLabel);
  darkButton.addEventListener('click', () => setTheme('dark'));

  const lightButton = document.createElement('button');
  lightButton.className = 'ts-btn';
  lightButton.id = 'ts-light';
  lightButton.type = 'button';
  lightButton.append(Object.assign(document.createElement('span'), { textContent: '☀' }));
  const lightLabel = Object.assign(document.createElement('span'), { textContent: 'Light' });
  lightLabel.className = 'theme-label';
  lightButton.append(lightLabel);
  lightButton.addEventListener('click', () => setTheme('light'));

  segment.append(darkButton, lightButton);
  wrap.append(segment);

  const header = sidebar.querySelector('.sidebar-top, .sb-top');
  if (header) header.insertAdjacentElement('afterend', wrap);
  else sidebar.insertBefore(wrap, sidebar.firstChild);

  _updateThemeBtns(document.documentElement.getAttribute('data-theme') || 'light');
  if (typeof _syncSharedLanguage === 'function') _syncSharedLanguage(_getLang());
}

document.addEventListener('DOMContentLoaded', _injectThemeToggle);

// ============================================================
// LANGUAGE — English / Vietnamese (self-hosted translations)
// VI pages live in pages/vi/*.html (human-reviewed; standard
// domain terms intentionally stay in English). No Google widget,
// no reload — the router just fetches the matching fragment.
// ============================================================
function _getLang() {
  return localStorage.getItem('nt_lang') === 'vi' ? 'vi' : 'en';
}

const SHARED_UI_COPY = {
  en: {
    appTitle: 'Project Handbook',
    internalUse: 'Internal use',
    brandHome: 'Power Home Handbook home',
    toggleNavigation: 'Toggle navigation',
    dark: 'Dark',
    light: 'Light',
    switchEnglish: 'Switch to English',
    switchVietnamese: 'Switch to Vietnamese',
    complete: 'complete',
    errorHeading: "Couldn't load this page",
    errorSectionPrefix: 'Section ',
    errorSectionSuffix: ' could not be loaded (',
    unknownError: 'unknown error',
    errorGuidance: 'Check your connection and try again.',
    retry: 'Retry',
  },
  vi: {
    appTitle: 'Cẩm nang Dự án',
    internalUse: 'Sử dụng nội bộ',
    brandHome: 'Trang chủ Cẩm nang Power Home',
    toggleNavigation: 'Mở hoặc đóng điều hướng',
    dark: 'Tối',
    light: 'Sáng',
    switchEnglish: 'Chuyển sang tiếng Anh',
    switchVietnamese: 'Chuyển sang tiếng Việt',
    complete: 'hoàn thành',
    errorHeading: 'Không thể tải trang này',
    errorSectionPrefix: 'Không thể tải mục ',
    errorSectionSuffix: ' (',
    unknownError: 'lỗi không xác định',
    errorGuidance: 'Kiểm tra kết nối rồi thử lại.',
    retry: 'Thử lại',
  },
};

function getSharedUiText(key, lang = _getLang()) {
  const dictionary = SHARED_UI_COPY[lang] || SHARED_UI_COPY.en;
  return dictionary[key] || SHARED_UI_COPY.en[key] || key;
}

function _syncSharedLanguage(lang = _getLang()) {
  lang = lang === 'vi' ? 'vi' : 'en';
  document.documentElement.lang = lang;

  const appTitle = document.querySelector('.app-context-title');
  const appBadge = document.querySelector('.app-context-badge');
  const brand = document.querySelector('.app-brand');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  if (appTitle) appTitle.textContent = getSharedUiText('appTitle', lang);
  if (appBadge) appBadge.textContent = getSharedUiText('internalUse', lang);
  if (brand) brand.setAttribute('aria-label', getSharedUiText('brandHome', lang));
  if (sidebarToggle) sidebarToggle.setAttribute('aria-label', getSharedUiText('toggleNavigation', lang));

  const darkLabel = document.querySelector('#ts-dark .theme-label');
  const lightLabel = document.querySelector('#ts-light .theme-label');
  if (darkLabel) darkLabel.textContent = getSharedUiText('dark', lang);
  if (lightLabel) lightLabel.textContent = getSharedUiText('light', lang);

  const englishButton = document.getElementById('lng-en');
  const vietnameseButton = document.getElementById('lng-vi');
  if (englishButton) englishButton.setAttribute('aria-label', getSharedUiText('switchEnglish', lang));
  if (vietnameseButton) vietnameseButton.setAttribute('aria-label', getSharedUiText('switchVietnamese', lang));
}

function setLang(lang) {
  lang = (lang === 'vi') ? 'vi' : 'en';
  if (lang === _getLang()) {
    _updateLangBtns(lang);
    _syncSharedLanguage(lang);
    return;
  }
  localStorage.setItem('nt_lang', lang);
  _updateLangBtns(lang);
  _syncSharedLanguage(lang);
  // Instant re-render of the current route in the new language
  if (typeof _rerenderCurrentPage === 'function') _rerenderCurrentPage();
}

function _updateLangBtns(lang) {
  const en = document.getElementById('lng-en');
  const vi = document.getElementById('lng-vi');
  if (!en || !vi) return;
  en.classList.toggle('active', lang !== 'vi');
  vi.classList.toggle('active', lang === 'vi');
  en.setAttribute('aria-pressed', String(lang !== 'vi'));
  vi.setAttribute('aria-pressed', String(lang === 'vi'));
}

function _injectLangToggle() {
  if (document.getElementById('lang-toggle-wrap')) return;
  const sidebar = document.getElementById('sidebar') || document.getElementById('hb-sidebar');
  if (!sidebar) return;

  const wrap = document.createElement('div');
  wrap.className = 'lang-toggle-wrap notranslate';
  wrap.id = 'lang-toggle-wrap';
  wrap.setAttribute('translate', 'no');
  const segment = document.createElement('div');
  segment.className = 'lang-seg';

  const englishButton = document.createElement('button');
  englishButton.className = 'lang-btn';
  englishButton.id = 'lng-en';
  englishButton.type = 'button';
  englishButton.textContent = 'EN';
  englishButton.addEventListener('click', () => setLang('en'));

  const vietnameseButton = document.createElement('button');
  vietnameseButton.className = 'lang-btn';
  vietnameseButton.id = 'lng-vi';
  vietnameseButton.type = 'button';
  vietnameseButton.textContent = 'VI';
  vietnameseButton.addEventListener('click', () => setLang('vi'));

  segment.append(englishButton, vietnameseButton);
  wrap.append(segment);

  const themeWrap = document.getElementById('theme-toggle-wrap');
  if (themeWrap) {
    themeWrap.insertAdjacentElement('afterend', wrap);
  } else {
    const header = sidebar.querySelector('.sidebar-top, .sb-top');
    if (header) header.insertAdjacentElement('afterend', wrap);
    else sidebar.insertBefore(wrap, sidebar.firstChild);
  }
  _updateLangBtns(_getLang());
  _syncSharedLanguage(_getLang());
}

document.addEventListener('DOMContentLoaded', _injectLangToggle);
document.addEventListener('DOMContentLoaded', () => _syncSharedLanguage(_getLang()));

// ============================================================
// SIDEBAR - Mobile toggle
// ============================================================
let _focusContentAfterNavigation = false;

function _setSidebarOpen(open, options = {}) {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebar-toggle');
  if (!sidebar) return;

  sidebar.classList.toggle('open', open);
  if (document.body) {
    document.body.classList.toggle('sidebar-open', open && window.innerWidth <= 900);
  }
  if (toggle) {
    toggle.setAttribute('aria-controls', 'sidebar');
    toggle.setAttribute('aria-expanded', String(open));
    if (!open && options.restoreFocus === true) toggle.focus({ preventScroll: true });
  }
}

function _closeSidebar(options = {}) {
  _setSidebarOpen(false, options);
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  _setSidebarOpen(!sidebar.classList.contains('open'));
}

document.addEventListener('DOMContentLoaded', () => _setSidebarOpen(false));

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function (e) {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebar-toggle');
  if (
    window.innerWidth <= 900 &&
    sidebar &&
    sidebar.classList.contains('open') &&
    !sidebar.contains(e.target) &&
    (!toggle || !toggle.contains(e.target))
  ) {
    _closeSidebar();
  }
});

document.addEventListener('keydown', event => {
  const sidebar = document.getElementById('sidebar');
  if (event.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
    _closeSidebar({ restoreFocus: true });
  }
});

document.addEventListener('handbook:page-ready', () => {
  if (!_focusContentAfterNavigation) return;
  _focusContentAfterNavigation = false;

  const content = document.getElementById('main-content')
    || document.getElementById('page-content')
    || document.getElementById('app');
  if (!content) return;
  if (!content.hasAttribute('tabindex')) content.setAttribute('tabindex', '-1');
  content.focus({ preventScroll: true });
});

// ============================================================
// SIDEBAR NAV - Active link on click
// ============================================================
function setActive(el) {
  document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
  el.classList.add('active');
  if (window.innerWidth <= 900) {
    _closeSidebar();
  }
}

// NOTE: Scroll-spy is owned by router.js (_setupScrollSpy), which re-binds
// the IntersectionObserver every time it injects new page content. Binding it
// here at load time would attach to elements that don't exist yet, so it lives
// in the router instead.

// ============================================================
// ACCORDION - Expand / collapse
// ============================================================
function toggleAccordion(btn) {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  btn.nextElementSibling.classList.toggle('open', !expanded);
}

// The former Map and Delivery Model views now live inside two consolidated
// parent views. Keep these aliases so cached fragments and legacy triggers do
// not leave users on a blank section.
const HANDBOOK_SECTION_ALIASES = {
  secmap: { parent: 'landing', anchor: 'sec-secmap' },
  secmodel: { parent: 'secxwalk', anchor: 'sec-secmodel' },
};

// Implementation Handbook section switcher. This lives in the shared bundle
// so fragments never need to execute dynamically injected scripts.
function showSec(id, link, options = {}) {
  const requestedId = String(id || '').replace(/^sec-/, '');
  const alias = HANDBOOK_SECTION_ALIASES[requestedId];
  const requestedTarget = document.getElementById('sec-' + requestedId);
  const requestedStandalone = requestedTarget && requestedTarget.classList.contains('section')
    ? requestedTarget
    : null;
  const aliasParent = alias ? document.getElementById('sec-' + alias.parent) : null;
  const target = requestedStandalone
    || aliasParent
    || (requestedTarget && requestedTarget.closest('.section'))
    || requestedTarget;
  if (!target) return;

  const parentId = requestedStandalone ? requestedId : (aliasParent ? alias.parent : requestedId);

  document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
  target.classList.add('active');

  document.querySelectorAll('.sb-nav a').forEach(item => {
    item.classList.remove('active');
    item.removeAttribute('aria-current');
  });

  const suppliedLink = link && link.isConnected && link.matches('.sb-nav a') ? link : null;
  const navLink = suppliedLink
    || document.querySelector(`.sb-nav a[data-sec="${parentId}"]`)
    || document.querySelector(`.sb-nav a[data-sec="${requestedId}"]`);
  if (navLink) {
    navLink.classList.add('active');
    navLink.setAttribute('aria-current', 'page');
  }

  const sidebar = document.getElementById('sidebar');
  if (sidebar) _closeSidebar();

  if (options.scroll === false) return;

  const scrollTarget = alias
    ? (requestedTarget || document.getElementById(alias.anchor) || target)
    : target;
  requestAnimationFrame(() => {
    scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function toggleAcc(btn) {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  if (btn.nextElementSibling) btn.nextElementSibling.classList.toggle('open', !expanded);
}

function handleSearch(query) {
  const normalized = query.toLowerCase().trim();
  document.querySelectorAll('.sb-nav a[data-sec]').forEach(link => {
    if (!normalized) {
      link.style.display = '';
      return;
    }
    const section = document.getElementById('sec-' + link.dataset.sec);
    const searchData = (section ? section.getAttribute('data-search') : '') + (link.textContent || '');
    link.style.display = searchData.toLowerCase().includes(normalized) ? '' : 'none';
  });
}

function filterRaci() {
  const phaseControl = document.getElementById('raci-phase');
  const roleControl = document.getElementById('raci-role');
  if (!phaseControl || !roleControl) return;

  const phase = phaseControl.value;
  const role = roleControl.value;
  const rows = document.querySelectorAll('#raci-table tbody tr');
  const headers = document.querySelectorAll('#raci-table thead th[data-role]');

  headers.forEach(header => {
    const columnIndex = Array.prototype.indexOf.call(header.parentNode.children, header);
    const show = !role || header.dataset.role === role;
    header.style.display = show ? '' : 'none';
    rows.forEach(row => {
      if (row.children[columnIndex]) row.children[columnIndex].style.display = show ? '' : 'none';
    });
  });

  rows.forEach(row => {
    const rowPhase = row.children[1] ? row.children[1].textContent : '';
    row.style.display = !phase || rowPhase.includes(phase) ? '' : 'none';
  });
}

// ============================================================
// ROLE TABS - Switch perspective panels
// ============================================================
function switchRole(role, options = {}) {
  const tab = document.getElementById('tab-' + role);
  const panel = document.getElementById('panel-' + role);
  if (!tab || !panel) return;

  document.querySelectorAll('.role-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
    t.setAttribute('tabindex', '-1');
  });

  document.querySelectorAll('.role-panel').forEach(p => {
    p.classList.remove('active');
    p.setAttribute('aria-hidden', 'true');
  });

  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  tab.setAttribute('tabindex', '0');
  panel.classList.add('active');
  panel.setAttribute('aria-hidden', 'false');
  if (!panel.hasAttribute('role')) panel.setAttribute('role', 'tabpanel');
  if (!panel.hasAttribute('aria-labelledby')) panel.setAttribute('aria-labelledby', tab.id);

  if (options.focus !== false && document.activeElement !== tab) {
    tab.focus({ preventScroll: true });
  }
}

document.addEventListener('keydown', event => {
  const currentTab = event.target.closest && event.target.closest('.role-tab[role="tab"]');
  if (!currentTab) return;

  const tabList = currentTab.closest('[role="tablist"]');
  if (!tabList) return;
  const tabs = Array.from(tabList.querySelectorAll('.role-tab[role="tab"]'))
    .filter(tabItem => !tabItem.disabled);
  const currentIndex = tabs.indexOf(currentTab);
  if (currentIndex < 0) return;

  let nextIndex = null;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    nextIndex = (currentIndex + 1) % tabs.length;
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  } else if (event.key === 'Home') {
    nextIndex = 0;
  } else if (event.key === 'End') {
    nextIndex = tabs.length - 1;
  }

  if (nextIndex === null) return;
  event.preventDefault();
  const nextTab = tabs[nextIndex];
  switchRole(nextTab.dataset.roleTarget, { focus: false });
  nextTab.focus({ preventScroll: true });
});

// ============================================================
// DOD CHECKLIST - Toggle items & update progress bar
// ============================================================
function toggleDod(item) {
  item.classList.toggle('checked');
  item.setAttribute('aria-checked', String(item.classList.contains('checked')));
  updateDod();
}

// NOTE: DoD keyboard listeners are (re)bound by router.js after content is
// injected — see the .dod-item loop there. Binding here at load time is a
// no-op because the items don't exist until a page fragment is fetched.

function updateDod() {
  const total = document.querySelectorAll('.dod-item').length;
  if (!total) return; // page has no DoD checklist (e.g. non-deployment routes)

  const checked = document.querySelectorAll('.dod-item.checked').length;
  const pct = Math.round((checked / total) * 100);

  const countEl = document.getElementById('dod-count');
  const barEl = document.getElementById('dod-bar');
  const banner = document.getElementById('dod-complete-banner');

  if (countEl) countEl.textContent = `${checked} / ${total} ${getSharedUiText('complete')}`;
  if (barEl) barEl.style.width = `${pct}%`;
  if (banner) banner.classList.toggle('show', checked === total);
}

// One delegated interaction layer replaces hundreds of inline event handlers
// across the static fragments, allowing a strict script-src 'self' CSP.
document.addEventListener('click', event => {
  const target = event.target.closest && event.target.closest('*');
  if (!target) return;

  const sidebarLink = target.closest('#sidebar a[href]');
  if (sidebarLink) {
    const href = sidebarLink.getAttribute('href') || '';
    const isRouteNavigation = href.startsWith('#')
      && href.length > 1
      && !sidebarLink.matches('[data-section-target]')
      && href !== location.hash;
    if (isRouteNavigation) _focusContentAfterNavigation = true;
    if (window.innerWidth <= 900) _closeSidebar();
  }

  const sidebarToggle = target.closest('#sidebar-toggle');
  if (sidebarToggle) {
    toggleSidebar();
    return;
  }

  const sectionTrigger = target.closest('[data-section-target]');
  if (sectionTrigger) {
    event.preventDefault();
    showSec(sectionTrigger.dataset.sectionTarget, sectionTrigger.matches('.sb-nav a') ? sectionTrigger : null);
    return;
  }

  const routeTrigger = target.closest('[data-route-target]');
  if (routeTrigger) {
    const routeHash = '#' + routeTrigger.dataset.routeTarget;
    if (routeHash !== location.hash) _focusContentAfterNavigation = true;
    if (window.innerWidth <= 900) _closeSidebar();
    location.hash = routeHash;
    return;
  }

  const roleTrigger = target.closest('[data-role-target]');
  if (roleTrigger) {
    switchRole(roleTrigger.dataset.roleTarget);
    return;
  }

  const accordionTrigger = target.closest('.accordion-trigger');
  if (accordionTrigger) {
    toggleAccordion(accordionTrigger);
    return;
  }

  const compactAccordionTrigger = target.closest('.acc-trigger');
  if (compactAccordionTrigger) {
    toggleAcc(compactAccordionTrigger);
    return;
  }

  const dodItem = target.closest('.dod-item');
  if (dodItem) {
    toggleDod(dodItem);
    return;
  }

  const navLink = target.closest('[data-nav-active]');
  if (navLink) setActive(navLink);
});

document.addEventListener('input', event => {
  if (event.target.id === 'hb-search') handleSearch(event.target.value);
});

document.addEventListener('change', event => {
  if (event.target.id === 'raci-phase' || event.target.id === 'raci-role') filterRaci();
});

// ============================================================
// SIDEBAR DETAILS — PowerHome cards for compliance & metadata
// Page fragments intentionally keep their original content. This enhancer
// turns the repeated raw sidebar text into consistent, scannable UI cards
// after every route/language render.
// ============================================================
function _enhanceSidebarDetails() {
  const sidebar = document.getElementById('sidebar') || document.getElementById('hb-sidebar');
  if (!sidebar) return;

  const isVi = typeof _getLang === 'function' && _getLang() === 'vi';
  const complianceLabel = isVi ? 'Tuân thủ & tiêu chuẩn' : 'Compliance & standards';

  sidebar.querySelectorAll('.sidebar-compliance').forEach(panel => {
    panel.classList.add('sidebar-compliance-panel');
    panel.setAttribute('aria-label', complianceLabel);

    let label = panel.previousElementSibling;
    if (!label || !label.classList.contains('sidebar-section-label')) {
      label = document.createElement('div');
      label.className = 'sidebar-section-label sidebar-compliance-label';
      label.textContent = complianceLabel;
      panel.insertAdjacentElement('beforebegin', label);
    } else {
      label.classList.add('sidebar-compliance-label');
    }
  });

  sidebar.querySelectorAll('.sidebar-meta, .sb-footer').forEach(meta => {
    if (meta.dataset.enhanced === 'true') return;

    const originalNodes = Array.from(meta.childNodes);
    const fragment = document.createDocumentFragment();
    let currentCard = null;
    let currentBody = null;

    const createCard = titleText => {
      const card = document.createElement('section');
      card.className = 'sidebar-detail-card';

      const title = document.createElement('div');
      title.className = 'sidebar-detail-title';
      title.textContent = titleText;

      const body = document.createElement('div');
      body.className = 'sidebar-detail-body';

      card.append(title, body);
      fragment.appendChild(card);
      currentCard = card;
      currentBody = body;
      return card;
    };

    originalNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE && node.matches('strong')) {
        createCard(node.textContent.trim());
        return;
      }

      const isWhitespace = node.nodeType === Node.TEXT_NODE && !node.textContent.trim();
      if (!currentBody && isWhitespace) return;
      if (!currentBody) createCard(isVi ? 'Thông tin' : 'Details');
      currentBody.appendChild(node);
    });

    fragment.querySelectorAll('.sidebar-detail-body').forEach(body => {
      const isEmptyEdge = node =>
        (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) ||
        (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR');

      while (body.firstChild && isEmptyEdge(body.firstChild)) body.firstChild.remove();
      while (body.lastChild && isEmptyEdge(body.lastChild)) body.lastChild.remove();

      body.querySelectorAll('span').forEach(span => span.classList.add('sidebar-status'));
      if (body.querySelector('a')) body.parentElement.classList.add('is-quick-links');
    });

    fragment.querySelectorAll('.sidebar-detail-card').forEach(card => {
      const title = card.querySelector('.sidebar-detail-title').textContent;
      if (/document control|kiểm soát tài liệu/i.test(title)) {
        card.classList.add('is-document-control');
      }
    });

    meta.replaceChildren(fragment);
    meta.dataset.enhanced = 'true';
    meta.classList.add('sidebar-details-enhanced');
    const detailTitles = Array.from(meta.querySelectorAll('.sidebar-detail-title'))
      .map(title => title.textContent.trim())
      .join(' · ');
    if (/release/i.test(detailTitles) && /environment|môi trường/i.test(detailTitles) && /cab/i.test(detailTitles)) {
      meta.classList.add('has-summary-grid');
    }
  });
}

// ============================================================
// RESPONSIVE - 2-column grid fallback for narrow viewports
// ============================================================
function applyGrids() {
  document.querySelectorAll('.grid-2col').forEach(g => {
    g.style.gridTemplateColumns = window.innerWidth < 720 ? '1fr' : '1fr 1fr';
  });
}

applyGrids();
window.addEventListener('resize', applyGrids);

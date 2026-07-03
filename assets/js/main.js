/**
 * main.js - Handbook deployment pages
 * Handles: authentication, theme, sidebar navigation, accordion, role tabs, DoD checklist
 */

// ============================================================
// THEME — Dark / Light mode
// Runs immediately to prevent flash of wrong theme (FOUC)
// ============================================================
(function initTheme() {
  const saved = localStorage.getItem('nt_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
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
  _updateThemeBtns(theme);
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
}

function _injectThemeToggle() {
  if (document.getElementById('theme-toggle-wrap')) return;
  const sidebar = document.getElementById('sidebar') || document.getElementById('hb-sidebar');
  if (!sidebar) return;

  const wrap = document.createElement('div');
  wrap.className = 'theme-toggle-wrap';
  wrap.id = 'theme-toggle-wrap';
  wrap.innerHTML = `
    <div class="theme-seg">
      <button class="ts-btn" id="ts-dark"  onclick="setTheme('dark')">
        <span>☽</span><span>Dark</span>
      </button>
      <button class="ts-btn" id="ts-light" onclick="setTheme('light')">
        <span>☀</span><span>Light</span>
      </button>
    </div>`;

  const header = sidebar.querySelector('.sidebar-top, .sb-top');
  if (header) header.insertAdjacentElement('afterend', wrap);
  else sidebar.insertBefore(wrap, sidebar.firstChild);

  _updateThemeBtns(document.documentElement.getAttribute('data-theme') || 'dark');
}

document.addEventListener('DOMContentLoaded', _injectThemeToggle);

// ============================================================
// AUTHENTICATION
// Credentials are intentionally client-side for this static
// internal tool. Not suitable for high-security prod systems.
// ============================================================
const AUTH_KEY = 'handbook_auth';
const AUTH_USER = 'admin';
const AUTH_PASS = 'Admin@!23';
const AUTH_TTL_MS = 24 * 60 * 60 * 1000;

function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

function getAuthRecord() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    clearAuth();
    return null;
  }
}

function isAuthenticated() {
  const record = getAuthRecord();
  if (!record || record.status !== 'authenticated' || typeof record.authenticatedAt !== 'number') {
    clearAuth();
    return false;
  }

  if (Date.now() - record.authenticatedAt > AUTH_TTL_MS) {
    clearAuth();
    return false;
  }

  return true;
}

function persistAuth() {
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({
      status: 'authenticated',
      authenticatedAt: Date.now(),
    })
  );
}

function syncAuthState() {
  const overlay = document.getElementById('login-overlay');

  if (isAuthenticated()) {
    document.body.classList.remove('locked');
    if (overlay) overlay.classList.add('hidden');
    return;
  }

  document.body.classList.add('locked');
  if (overlay) overlay.classList.remove('hidden');
}

/** Check auth state on every page load */
(function initAuth() {
  syncAuthState();
})();

/** Handle login form submit */
function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const errorBox = document.getElementById('login-error');
  const submitBtn = document.getElementById('login-submit');

  submitBtn.disabled = true;
  submitBtn.classList.add('loading');
  errorBox.classList.remove('show');

  setTimeout(() => {
    if (username === AUTH_USER && password === AUTH_PASS) {
      persistAuth();
      syncAuthState();
    } else {
      errorBox.textContent = 'Incorrect username or password. Please try again.';
      errorBox.classList.add('show');
      document.getElementById('login-password').value = '';
      document.getElementById('login-password').focus();
    }

    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
  }, 400);
}

/** Handle logout */
function handleLogout() {
  clearAuth();
  syncAuthState();
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('login-error').classList.remove('show');
}

/** Toggle password visibility */
function togglePw() {
  const input = document.getElementById('login-password');
  const toggle = document.querySelector('.pw-toggle');
  const nowVisible = input.type === 'password';
  input.type = nowVisible ? 'text' : 'password';
  // Keep the icon consistent with the initial 👁 glyph in index.html
  toggle.textContent = nowVisible ? '🙈' : '👁';
  toggle.setAttribute('aria-label', nowVisible ? 'Hide password' : 'Show password');
}

// ============================================================
// SIDEBAR - Mobile toggle
// ============================================================
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function (e) {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebar-toggle');
  if (
    window.innerWidth <= 900 &&
    sidebar.classList.contains('open') &&
    !sidebar.contains(e.target) &&
    !toggle.contains(e.target)
  ) {
    sidebar.classList.remove('open');
  }
});

// ============================================================
// SIDEBAR NAV - Active link on click
// ============================================================
function setActive(el) {
  document.querySelectorAll('#sidebar-nav a').forEach(a => a.classList.remove('active'));
  el.classList.add('active');
  if (window.innerWidth <= 900) {
    document.getElementById('sidebar').classList.remove('open');
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

// ============================================================
// ROLE TABS - Switch perspective panels
// ============================================================
function switchRole(role) {
  document.querySelectorAll('.role-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });

  document.querySelectorAll('.role-panel').forEach(p => p.classList.remove('active'));

  const tab = document.getElementById('tab-' + role);
  const panel = document.getElementById('panel-' + role);
  if (tab) {
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
  }
  if (panel) panel.classList.add('active');
}

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

  if (countEl) countEl.textContent = `${checked} / ${total} complete`;
  if (barEl) barEl.style.width = `${pct}%`;
  if (banner) banner.classList.toggle('show', checked === total);
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
window.addEventListener('storage', e => {
  if (e.key === AUTH_KEY) syncAuthState();
});

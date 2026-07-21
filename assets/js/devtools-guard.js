/**
 * devtools-guard.js — best-effort deterrent against opening the browser
 * developer tools on the published handbook.
 *
 * SCOPE — this is a DETERRENT, not an access control. The handbook is a static
 * site: every page reaches the browser in plaintext and can still be read with
 * `curl`, "View Source", a proxy, or by opening devtools before this script
 * runs. Real confidentiality depends on the hosting access control tracked in
 * SECURITY.md. This layer only discourages casual inspection (F12,
 * Ctrl+Shift+I, view-source) and covers the page while docked devtools is
 * detected. It turns itself OFF on localhost so development and owner debugging
 * are never blocked (owners can also set localStorage nt_devtools_guard=off).
 *
 * Concept adapted from the open-source "disable-devtool" project by theajack;
 * re-implemented from scratch to stay CSP-safe and dependency-free — no HTML
 * injection, no dynamic code, no external requests. All DOM is built with
 * createElement/textContent, so it passes the repository security gate.
 */
(function initDevtoolsGuard() {
  'use strict';

  var CONFIG = {
    blockShortcuts: true,    // F12, Ctrl/Cmd+Shift+I/J/C, Ctrl+U (view-source)
    blockContextMenu: false, // readers still need right-click / copy
    pauseThresholdMs: 120,   // execution stall that indicates a devtools pause
    pollMs: 1000
  };

  var COPY = {
    en: {
      title: 'Developer tools detected',
      body: 'This handbook is CONFIDENTIAL and for internal use only. Please close developer tools to keep reading.'
    },
    vi: {
      title: 'Đã phát hiện Developer Tools',
      body: 'Cẩm nang này là tài liệu MẬT, chỉ dùng nội bộ. Vui lòng đóng developer tools để tiếp tục đọc.'
    }
  };

  function ownerBypass() {
    try { return localStorage.getItem('nt_devtools_guard') === 'off'; }
    catch (e) { return false; }
  }

  var host = location.hostname;
  var disabled = host === 'localhost' || host === '127.0.0.1' || host === ''
    || location.protocol === 'file:' || ownerBypass();

  var overlay = null;
  var titleEl = null;
  var bodyEl = null;
  var shownNow = false;
  var positives = 0;

  function currentLang() {
    if (document.documentElement.lang === 'vi') return 'vi';
    try { if (localStorage.getItem('nt_lang') === 'vi') return 'vi'; } catch (e) { /* ignore */ }
    return 'en';
  }

  function buildOverlay() {
    var el = document.createElement('div');
    el.id = 'devtools-guard-overlay';
    el.setAttribute('role', 'alertdialog');
    el.setAttribute('aria-modal', 'true');
    el.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:2147483647',
      'display:flex', 'flex-direction:column', 'align-items:center',
      'justify-content:center', 'gap:16px', 'padding:32px',
      'box-sizing:border-box', 'text-align:center',
      'background:rgba(10,10,12,0.97)', 'color:#f5f5f5',
      'font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif',
      'user-select:none', '-webkit-user-select:none'
    ].join(';');

    var icon = document.createElement('div');
    icon.textContent = '🔒';
    icon.style.cssText = 'font-size:44px;line-height:1';

    titleEl = document.createElement('h2');
    titleEl.style.cssText = 'margin:0;font-size:22px;font-weight:800';

    bodyEl = document.createElement('p');
    bodyEl.style.cssText = 'margin:0;max-width:38rem;font-size:15px;line-height:1.6;color:#c9c9c9';

    el.appendChild(icon);
    el.appendChild(titleEl);
    el.appendChild(bodyEl);
    return el;
  }

  function setOpen(open) {
    open = !!open;
    if (open === shownNow) return;
    shownNow = open;
    if (open) {
      if (!document.body) return;
      if (!overlay) overlay = buildOverlay();
      var copy = COPY[currentLang()];
      titleEl.textContent = copy.title;
      bodyEl.textContent = copy.body;
      if (!overlay.parentNode) document.body.appendChild(overlay);
      overlay.style.display = 'flex';
    } else if (overlay) {
      overlay.style.display = 'none';
    }
  }

  // Detection via execution-pause timing. A `debugger` statement is a no-op
  // unless developer tools are open with breakpoints active, in which case it
  // pauses execution here; timing that pause is independent of window geometry,
  // so split-screen / embedded / zoomed viewports never false-positive the way
  // an outerWidth-innerWidth check does (verified: with no devtools attached
  // this returns in ~1ms). Undocked windows with breakpoints deactivated are
  // out of scope for a deterrent.
  function looksOpen() {
    var clock = (window.performance && performance.now)
      ? performance : { now: function () { return Date.now(); } };
    var t0 = clock.now();
    debugger; // eslint-disable-line no-debugger
    return clock.now() - t0 > CONFIG.pauseThresholdMs;
  }

  // Require two consecutive positive samples before covering the page, so a
  // one-off GC/scheduling stall can never blank content for a real reader.
  function check() {
    positives = looksOpen() ? positives + 1 : 0;
    setOpen(positives >= 2);
  }

  // Read-only status + a manual preview control. Exposing setOpen carries no
  // security weight: anyone with a console could remove any overlay anyway —
  // the guard is a deterrent, and this lets QA/the owner preview it on demand.
  window.__devtoolsGuard = { enabled: !disabled, host: host, setOpen: setOpen };

  if (disabled) return;

  if (CONFIG.blockShortcuts) {
    document.addEventListener('keydown', function (e) {
      var k = (e.key || '').toLowerCase();
      var hit = e.key === 'F12'
        || ((e.ctrlKey || e.metaKey) && e.shiftKey && (k === 'i' || k === 'j' || k === 'c'))
        || ((e.ctrlKey || e.metaKey) && k === 'u');
      if (hit) { e.preventDefault(); e.stopPropagation(); }
    }, true);
  }

  if (CONFIG.blockContextMenu) {
    document.addEventListener('contextmenu', function (e) { e.preventDefault(); }, true);
  }

  function start() { check(); window.setInterval(check, CONFIG.pollMs); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

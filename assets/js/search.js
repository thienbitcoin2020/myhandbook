/**
 * search.js — dependency-free, current-language full-text search.
 *
 * The index is built in the browser from the same fixed, same-origin page
 * fragments used by the router. Search never sends handbook text or queries
 * to a third party.
 */
(function initGlobalSearchModule() {
  'use strict';

  const ROUTES = [
    { id: 'home', file: 'handbook.html' },
    { id: 'deployment', file: 'deployment.html' },
    { id: 'ba', file: 'ba.html' },
    { id: 'pm', file: 'pm.html' },
    { id: 'qc', file: 'qc.html' },
    { id: 'po', file: 'po.html' },
    { id: 'sa', file: 'sa.html' },
    { id: 'sec', file: 'sec.html' },
    { id: 'ops', file: 'ops.html' },
    { id: 'sm', file: 'sm.html' },
    { id: 'ux', file: 'ux.html' },
    { id: 'pmo', file: 'pmo.html' },
  ];

  // A text node is assigned to its nearest meaningful block. This captures
  // headings, prose, cards, lists and table rows without indexing sidebar
  // duplicates. The same collector is used when locating a result after the
  // router renders its page, making target ordinals deterministic.
  const SEARCH_BLOCK_SELECTOR = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'li', 'tr', 'pre', 'blockquote',
    '.card-title', '.section-title', '.tile-title', '.tile-desc',
    '.hc-title', '.hc-desc', '.metric-title', '.metric-value',
    '.alert', '.callout', '.header-pill', '.chip',
    '.accordion-trigger', '.acc-trigger', '.dod-item', 'button',
  ].join(',');

  const TITLE_SELECTOR = [
    'h1', 'h2', 'h3', 'h4',
    '.card-title', '.section-title', '.tile-title', '.hc-title',
    '.metric-title', '.accordion-trigger', '.acc-trigger',
  ].join(',');

  const SECTION_HEADING_SELECTOR = [
    ':scope > .sec-head h2', ':scope > .section-header h2',
    ':scope > .section-header h3', ':scope > h2', ':scope > h3',
    '.sec-head h2', '.section-header h2', '.section-header h3',
    'h2', 'h3', '.section-title',
  ].join(',');

  const SEARCH_COPY = {
    en: {
      open: 'Open search',
      close: 'Close search',
      cancel: 'Cancel',
      closeResults: 'Close search results',
      clear: 'Clear search',
      label: 'Search the entire handbook',
      placeholder: 'Search the entire handbook...',
      resultsLabel: 'Search results',
      minimum: 'Type at least 2 characters to search all handbook pages.',
      loading: 'Building the handbook search index…',
      noResults: 'No results found for “{query}”. Try a broader phrase.',
      oneResult: '1 result for “{query}”',
      manyResults: '{count} results for “{query}”',
      showingResults: 'Showing {shown} of {count} results for “{query}”',
      unavailable: 'Search could not load the handbook pages. Please try again.',
      sectionFallback: 'Page overview',
      navigate: 'Navigate',
      openResult: 'Open',
      closeHint: 'Close',
      navigating: 'Opening {title}',
    },
    vi: {
      open: 'Mở tìm kiếm',
      close: 'Đóng tìm kiếm',
      cancel: 'Đóng',
      closeResults: 'Đóng kết quả tìm kiếm',
      clear: 'Xóa nội dung tìm kiếm',
      label: 'Tìm kiếm toàn bộ cẩm nang',
      placeholder: 'Tìm kiếm toàn bộ cẩm nang...',
      resultsLabel: 'Kết quả tìm kiếm',
      minimum: 'Nhập ít nhất 2 ký tự để tìm trong toàn bộ cẩm nang.',
      loading: 'Đang tạo chỉ mục tìm kiếm cẩm nang…',
      noResults: 'Không tìm thấy kết quả cho “{query}”. Hãy thử cụm từ rộng hơn.',
      oneResult: '1 kết quả cho “{query}”',
      manyResults: '{count} kết quả cho “{query}”',
      showingResults: 'Đang hiển thị {shown}/{count} kết quả cho “{query}”',
      unavailable: 'Không thể tải các trang cẩm nang để tìm kiếm. Vui lòng thử lại.',
      sectionFallback: 'Tổng quan trang',
      navigate: 'Di chuyển',
      openResult: 'Mở',
      closeHint: 'Đóng',
      navigating: 'Đang mở {title}',
    },
  };

  const MAX_RESULTS = 12;
  const MIN_QUERY_LENGTH = 2;
  const DEBOUNCE_MS = 180;
  const indexCache = new Map();

  const state = {
    activeIndex: -1,
    currentPage: null,
    debounceTimer: null,
    highlightTimer: null,
    pendingTarget: null,
    querySerial: 0,
    results: [],
    totalMatches: 0,
  };

  const ui = {};

  function currentLanguage() {
    if (typeof _getLang === 'function') return _getLang();
    return document.documentElement.lang === 'vi' ? 'vi' : 'en';
  }

  function copy(key, replacements) {
    const lang = currentLanguage();
    let value = (SEARCH_COPY[lang] || SEARCH_COPY.en)[key] || SEARCH_COPY.en[key] || key;
    Object.entries(replacements || {}).forEach(([name, replacement]) => {
      value = value.replace(`{${name}}`, String(replacement));
    });
    return value;
  }

  function normalizeText(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLocaleLowerCase('en')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function cleanText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function blockText(node) {
    if (node?.matches?.('tr')) {
      return Array.from(node.cells || [])
        .map(cell => cleanText(cell.textContent))
        .filter(Boolean)
        .join(' · ');
    }
    return cleanText(node?.textContent);
  }

  function wordTokens(value) {
    return normalizeText(value).split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  }

  function fieldContainsTerm(value, tokenSet, term) {
    return term.length <= 2 ? tokenSet.has(term) : value.includes(term);
  }

  function hasMeaningfulText(value) {
    return value.length >= 2 && /[\p{L}\p{N}]/u.test(value);
  }

  function collectSearchBlocks(root) {
    if (!root) return [];

    const blocks = new Map();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let textNode = walker.nextNode();

    while (textNode) {
      const parent = textNode.parentElement;
      const rawText = cleanText(textNode.nodeValue);
      const ignored = !parent
        || parent.closest('style, script, noscript, svg, footer, [aria-hidden="true"]')
        || !hasMeaningfulText(rawText);

      if (!ignored) {
        const preferred = parent.closest(SEARCH_BLOCK_SELECTOR);
        const target = preferred && root.contains(preferred) ? preferred : parent;
        if (!blocks.has(target)) blocks.set(target, blocks.size);
      }

      textNode = walker.nextNode();
    }

    return Array.from(blocks.keys());
  }

  function pageTitleFromDocument(doc, route) {
    const rawTitle = cleanText(doc.querySelector('title')?.textContent);
    if (rawTitle) return rawTitle.split('|')[0].trim();
    return route.id.toUpperCase();
  }

  function findSectionRoot(node, contentRoot) {
    const section = node.closest('.section[id], section[id], [id^="section-"]');
    return section && contentRoot.contains(section) ? section : contentRoot;
  }

  function contextualTitle(node, sectionRoot, pageTitle) {
    const readableTitle = element => {
      if (!element) return '';
      const nestedHeading = element.matches('.accordion-trigger, .acc-trigger, .section-header, .sec-head')
        ? element.querySelector('h2, h3, h4, .card-title, .section-title')
        : null;
      return cleanText((nestedHeading || element).textContent);
    };

    if (node.matches(TITLE_SELECTOR)) {
      const ownTitle = readableTitle(node);
      if (ownTitle.length <= 180) return ownTitle;
    }

    const container = node.closest(
      '.card, .accordion-item, .acc-item, .tile, .hub-card, .metric-card, .pipeline-card, .ceremony-card'
    );
    const containerTitle = container?.querySelector(TITLE_SELECTOR);
    if (containerTitle) {
      const value = readableTitle(containerTitle);
      if (value && value.length <= 180) return value;
    }

    const sectionTitle = sectionRoot?.querySelector(SECTION_HEADING_SELECTOR);
    if (sectionTitle) {
      const value = readableTitle(sectionTitle);
      if (value && value.length <= 180) return value;
    }

    const ownText = cleanText(node.textContent);
    return ownText.length <= 120 ? ownText : pageTitle;
  }

  function sectionTitleFromRoot(sectionRoot, contentRoot, pageTitle) {
    if (!sectionRoot || sectionRoot === contentRoot) return copy('sectionFallback');
    const heading = sectionRoot.querySelector(SECTION_HEADING_SELECTOR);
    const title = cleanText(heading?.textContent);
    return title || pageTitle;
  }

  async function indexRoute(route, lang) {
    const path = lang === 'vi'
      ? `pages/vi/${route.file}`
      : `pages/${route.file}`;
    const response = await fetch(path, { credentials: 'same-origin' });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${path}`);

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const contentRoot = doc.getElementById('page-content');
    if (!contentRoot) throw new Error(`Missing #page-content: ${path}`);

    const pageTitle = pageTitleFromDocument(doc, route);
    const blocks = collectSearchBlocks(contentRoot);
    const seen = new Set();
    const entries = [];

    blocks.forEach((node, ordinal) => {
      const text = blockText(node);
      const normalized = normalizeText(text);
      if (!hasMeaningfulText(text) || normalized.length < 2) return;

      const sectionRoot = findSectionRoot(node, contentRoot);
      const sectionTitle = sectionTitleFromRoot(sectionRoot, contentRoot, pageTitle);
      const title = contextualTitle(node, sectionRoot, pageTitle);
      const dedupeKey = `${sectionRoot.id || 'page'}|${normalized}`;
      if (seen.has(dedupeKey)) return;
      seen.add(dedupeKey);

      const normalizedTitle = normalizeText(title);
      const normalizedSection = normalizeText(sectionTitle);
      const normalizedPage = normalizeText(pageTitle);
      const haystack = `${normalizedTitle} ${normalizedSection} ${normalizedPage} ${normalized}`;

      entries.push({
        route: route.id,
        pageTitle,
        sectionTitle,
        title,
        text,
        normalizedText: normalized,
        haystack,
        haystackTokens: new Set(wordTokens(haystack)),
        textTokens: new Set(wordTokens(normalized)),
        normalizedTitle,
        normalizedSection,
        normalizedPage,
        ordinal,
        sectionId: sectionRoot.id || '',
        signature: normalized.slice(0, 220),
        textLength: normalized.length,
      });
    });

    return entries;
  }

  function buildIndex(lang) {
    if (indexCache.has(lang)) return indexCache.get(lang);

    const indexPromise = Promise.allSettled(ROUTES.map(route => indexRoute(route, lang)))
      .then(outcomes => {
        const entries = [];
        outcomes.forEach(outcome => {
          if (outcome.status === 'fulfilled') entries.push(...outcome.value);
          else console.warn('[Search] A handbook page was not indexed:', outcome.reason);
        });
        if (!entries.length) {
          const firstFailure = outcomes.find(outcome => outcome.status === 'rejected');
          throw firstFailure?.reason || new Error('No handbook pages could be indexed.');
        }
        return entries;
      })
      .catch(error => {
        indexCache.delete(lang);
        throw error;
      });

    indexCache.set(lang, indexPromise);
    return indexPromise;
  }

  function scoreEntry(entry, normalizedQuery, terms) {
    if (!terms.every(term => fieldContainsTerm(entry.haystack, entry.haystackTokens, term))) return -1;

    let score = 0;
    if (entry.normalizedTitle === normalizedQuery) score += 280;
    else if (entry.normalizedTitle.startsWith(normalizedQuery)) score += 190;
    else if (entry.normalizedTitle.includes(normalizedQuery)) score += 145;

    if (entry.normalizedSection === normalizedQuery) score += 150;
    else if (entry.normalizedSection.includes(normalizedQuery)) score += 100;
    if (entry.normalizedPage.includes(normalizedQuery)) score += 75;
    if (entry.normalizedText.includes(normalizedQuery)) score += 120;

    terms.forEach(term => {
      if (entry.normalizedTitle.includes(term)) score += 38;
      if (entry.normalizedSection.includes(term)) score += 24;
      if (entry.normalizedText.includes(term)) score += 16;
      const firstPosition = entry.haystack.indexOf(term);
      score += Math.max(0, 16 - Math.floor(firstPosition / 120));
    });

    // Prefer focused blocks over very large containers when relevance ties.
    score += Math.max(0, 12 - Math.floor(entry.normalizedText.length / 180));
    return score;
  }

  function searchIndex(index, query) {
    const normalizedQuery = normalizeText(query);
    const terms = Array.from(new Set(normalizedQuery.split(' ').filter(Boolean)));
    const ranked = [];

    index.forEach(entry => {
      const score = scoreEntry(entry, normalizedQuery, terms);
      if (score >= 0) ranked.push({ entry, score });
    });

    ranked.sort((a, b) =>
      b.score - a.score
      || a.entry.route.localeCompare(b.entry.route)
      || a.entry.ordinal - b.entry.ordinal
    );

    const deduped = [];
    const seen = new Set();
    const seenContextSections = new Set();
    const sectionKeyFor = entry => `${entry.route}|${entry.sectionId || entry.normalizedSection}`;
    const hasDirectTermMatch = entry => terms.every(term =>
      fieldContainsTerm(entry.normalizedText, entry.textTokens, term)
    );
    const sectionsWithDirectMatches = new Set(
      ranked.filter(candidate => hasDirectTermMatch(candidate.entry))
        .map(candidate => sectionKeyFor(candidate.entry))
    );

    for (const candidate of ranked) {
      const entry = candidate.entry;
      const directTermMatch = hasDirectTermMatch(entry);
      if (!directTermMatch) {
        const contextKey = sectionKeyFor(entry);
        if (sectionsWithDirectMatches.has(contextKey)) continue;
        if (seenContextSections.has(contextKey)) continue;
        seenContextSections.add(contextKey);
      }
      const key = `${entry.route}|${entry.normalizedTitle}|${entry.normalizedText.slice(0, 180)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(entry);
    }

    return deduped;
  }

  function openPanel() {
    ui.panel.hidden = false;
    ui.input.setAttribute('aria-expanded', 'true');
  }

  function closePanel() {
    ui.panel.hidden = true;
    ui.input.setAttribute('aria-expanded', 'false');
    ui.input.removeAttribute('aria-activedescendant');
    state.activeIndex = -1;
    updateActiveOption();
  }

  function openMobileSearch() {
    ui.root.classList.add('is-mobile-open');
    ui.mobileTrigger.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => ui.input.focus());
  }

  function closeMobileSearch() {
    closePanel();
    ui.root.classList.remove('is-mobile-open');
    ui.mobileTrigger.setAttribute('aria-expanded', 'false');
    ui.mobileTrigger.focus();
  }

  function setStatus(text) {
    ui.status.textContent = text;
  }

  function clearResultList() {
    ui.results.replaceChildren();
    state.results = [];
    state.activeIndex = -1;
    ui.input.removeAttribute('aria-activedescendant');
  }

  function renderMessage(message) {
    clearResultList();
    const item = document.createElement('li');
    item.className = 'global-search-message';
    item.setAttribute('role', 'presentation');
    item.textContent = message;
    ui.results.append(item);
  }

  function snippetFor(entry, query) {
    const text = entry.text;
    const normalized = entry.normalizedText;
    const normalizedQuery = normalizeText(query);
    const terms = normalizedQuery.split(' ').filter(Boolean);

    let hit = normalized.indexOf(normalizedQuery);
    if (hit < 0) {
      const positions = terms
        .map(term => normalized.indexOf(term))
        .filter(position => position >= 0);
      hit = positions.length ? Math.min(...positions) : 0;
    }

    const radiusBefore = 70;
    const desiredStart = Math.max(0, hit - radiusBefore);
    let start = desiredStart;
    let end = Math.min(text.length, Math.max(hit + normalizedQuery.length + 92, start + 170));

    if (start > 0) {
      const nextSpace = text.indexOf(' ', start);
      if (nextSpace >= 0 && nextSpace - start < 24) start = nextSpace + 1;
    }
    if (end < text.length) {
      const previousSpace = text.lastIndexOf(' ', end);
      if (previousSpace > start + 80) end = previousSpace;
    }

    const snippetText = text.slice(start, end);
    const normalizedSnippet = normalizeText(snippetText);
    const highlightTerms = normalizedSnippet.includes(normalizedQuery)
      ? [normalizedQuery]
      : terms.filter(term => term.length >= 3);

    return {
      text: snippetText,
      before: start > 0,
      after: end < text.length,
      terms: highlightTerms,
    };
  }

  function appendHighlightedText(container, snippet) {
    if (snippet.before) container.append(document.createTextNode('…'));

    const source = snippet.text;
    const normalizedSource = normalizeText(source);
    const terms = Array.from(new Set(snippet.terms)).sort((a, b) => b.length - a.length);
    const ranges = [];

    terms.forEach(term => {
      let from = 0;
      let position = normalizedSource.indexOf(term, from);
      while (position >= 0) {
        ranges.push([position, position + term.length]);
        from = position + Math.max(1, term.length);
        position = normalizedSource.indexOf(term, from);
      }
    });

    ranges.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
    const merged = [];
    ranges.forEach(range => {
      const previous = merged[merged.length - 1];
      if (previous && range[0] <= previous[1]) previous[1] = Math.max(previous[1], range[1]);
      else merged.push(range.slice());
    });

    let cursor = 0;
    merged.forEach(([start, end]) => {
      if (start > cursor) container.append(document.createTextNode(source.slice(cursor, start)));
      const mark = document.createElement('mark');
      mark.textContent = source.slice(start, end);
      container.append(mark);
      cursor = end;
    });
    if (cursor < source.length) container.append(document.createTextNode(source.slice(cursor)));
    if (snippet.after) container.append(document.createTextNode('…'));
  }

  function createResultOption(entry, index, query) {
    const option = document.createElement('li');
    option.className = 'global-search-option';
    option.id = `global-search-option-${index}`;
    option.dataset.resultIndex = String(index);
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', 'false');

    const breadcrumb = document.createElement('div');
    breadcrumb.className = 'global-search-breadcrumb';
    const page = document.createElement('span');
    page.className = 'global-search-breadcrumb-page';
    page.textContent = entry.pageTitle;
    const separator = document.createElement('span');
    separator.setAttribute('aria-hidden', 'true');
    separator.textContent = '›';
    const section = document.createElement('span');
    section.textContent = entry.sectionTitle;
    breadcrumb.append(page, separator, section);

    const title = document.createElement('div');
    title.className = 'global-search-result-title';
    title.textContent = entry.title;

    const snippet = document.createElement('p');
    snippet.className = 'global-search-snippet';
    appendHighlightedText(snippet, snippetFor(entry, query));

    option.append(breadcrumb, title, snippet);
    return option;
  }

  function renderResults(allResults, query) {
    clearResultList();
    state.totalMatches = allResults.length;
    state.results = allResults.slice(0, MAX_RESULTS);

    if (!state.results.length) {
      const message = copy('noResults', { query });
      setStatus(message);
      renderMessage(message);
      openPanel();
      return;
    }

    const fragment = document.createDocumentFragment();
    state.results.forEach((entry, index) => {
      fragment.append(createResultOption(entry, index, query));
    });
    ui.results.append(fragment);

    if (allResults.length === 1) {
      setStatus(copy('oneResult', { query }));
    } else if (allResults.length > MAX_RESULTS) {
      setStatus(copy('showingResults', {
        shown: MAX_RESULTS,
        count: allResults.length,
        query,
      }));
    } else {
      setStatus(copy('manyResults', { count: allResults.length, query }));
    }

    openPanel();
  }

  async function performSearch(query) {
    const cleanQuery = cleanText(query);
    const serial = ++state.querySerial;
    if (normalizeText(cleanQuery).length < MIN_QUERY_LENGTH) {
      setStatus(copy('minimum'));
      renderMessage(copy('minimum'));
      openPanel();
      return;
    }

    setStatus(copy('loading'));
    renderMessage(copy('loading'));
    openPanel();

    try {
      const index = await buildIndex(currentLanguage());
      if (serial !== state.querySerial || cleanText(ui.input.value) !== cleanQuery) return;
      renderResults(searchIndex(index, cleanQuery), cleanQuery);
    } catch (error) {
      console.error('[Search] Failed to build index:', error);
      if (serial !== state.querySerial) return;
      setStatus(copy('unavailable'));
      renderMessage(copy('unavailable'));
      openPanel();
    }
  }

  function scheduleSearch() {
    clearTimeout(state.debounceTimer);
    const query = ui.input.value;
    ui.clear.hidden = !query;
    state.debounceTimer = setTimeout(() => performSearch(query), DEBOUNCE_MS);
  }

  function updateActiveOption() {
    const options = Array.from(ui.results.querySelectorAll('.global-search-option'));
    options.forEach((option, index) => {
      option.setAttribute('aria-selected', String(index === state.activeIndex));
    });

    const active = options[state.activeIndex];
    if (active) {
      ui.input.setAttribute('aria-activedescendant', active.id);
      active.scrollIntoView({ block: 'nearest' });
    } else {
      ui.input.removeAttribute('aria-activedescendant');
    }
  }

  function moveActiveOption(delta) {
    if (!state.results.length) return;
    openPanel();
    if (state.activeIndex < 0) {
      state.activeIndex = delta > 0 ? 0 : state.results.length - 1;
    } else {
      state.activeIndex = (state.activeIndex + delta + state.results.length) % state.results.length;
    }
    updateActiveOption();
  }

  function removePreviousHighlight() {
    document.querySelectorAll('.global-search-hit').forEach(element => {
      element.classList.remove('global-search-hit');
      if (element.dataset.searchTemporaryTabindex === 'true') {
        element.removeAttribute('tabindex');
        delete element.dataset.searchTemporaryTabindex;
      }
    });
    clearTimeout(state.highlightTimer);
  }

  function resolveRenderedTarget(entry) {
    const app = document.getElementById('app');
    const blocks = collectSearchBlocks(app);
    const ordinalTarget = blocks[entry.ordinal];

    if (ordinalTarget) {
      const normalized = normalizeText(blockText(ordinalTarget));
      if (normalized.length === entry.textLength && normalized.startsWith(entry.signature)) {
        return ordinalTarget;
      }
    }

    // The signature fallback protects navigation if a harmless fragment edit
    // changes earlier block ordinals while an already-built index is cached.
    return blocks.find(block => {
      const normalized = normalizeText(blockText(block));
      return normalized.length === entry.textLength && normalized.startsWith(entry.signature);
    }) || (entry.sectionId ? document.getElementById(entry.sectionId) : app);
  }

  function revealHiddenAncestors(target) {
    const handbookSection = target.closest('.section[id^="sec-"]');
    if (handbookSection && typeof showSec === 'function') {
      const sectionKey = handbookSection.id.slice(4);
      const navLink = document.querySelector(`.sb-nav a[data-sec="${sectionKey}"]`);
      showSec(sectionKey, navLink);
    }

    let ancestor = target.parentElement;
    while (ancestor && ancestor !== document.body) {
      if (ancestor.matches('.accordion-body, .acc-body')) {
        ancestor.classList.add('open');
        const trigger = ancestor.previousElementSibling;
        if (trigger?.matches('.accordion-trigger, .acc-trigger, button')) {
          trigger.setAttribute('aria-expanded', 'true');
        }
      }
      ancestor = ancestor.parentElement;
    }

    const rolePanel = target.closest('.role-panel[id^="panel-"]');
    if (rolePanel && typeof switchRole === 'function') {
      switchRole(rolePanel.id.slice('panel-'.length));
    }
  }

  function revealSearchTarget(entry) {
    const target = resolveRenderedTarget(entry);
    if (!target) return;

    revealHiddenAncestors(target);
    removePreviousHighlight();
    target.classList.add('global-search-hit');

    const naturallyFocusable = target.matches('a, button, input, select, textarea, [tabindex]');
    if (!naturallyFocusable) {
      target.setAttribute('tabindex', '-1');
      target.dataset.searchTemporaryTabindex = 'true';
    }

    // Let newly-opened handbook sections/accordions participate in layout
    // before calculating the final scroll position.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.focus({ preventScroll: true });
      });
    });

    state.highlightTimer = setTimeout(removePreviousHighlight, 4200);
  }

  function openResult(entry) {
    if (!entry) return;
    state.pendingTarget = entry;
    setStatus(copy('navigating', { title: entry.title }));
    closePanel();
    if (ui.root.classList.contains('is-mobile-open')) {
      ui.root.classList.remove('is-mobile-open');
      ui.mobileTrigger.setAttribute('aria-expanded', 'false');
    }

    if (state.currentPage === entry.route) {
      state.pendingTarget = null;
      revealSearchTarget(entry);
    } else {
      location.hash = `#${entry.route}`;
    }
  }

  function localizeSearchUi() {
    ui.mobileTrigger.setAttribute('aria-label', copy('open'));
    ui.mobileClose.setAttribute('aria-label', copy('close'));
    ui.mobileClose.textContent = copy('cancel');
    ui.closeResults.setAttribute('aria-label', copy('closeResults'));
    ui.clear.setAttribute('aria-label', copy('clear'));
    ui.label.textContent = copy('label');
    ui.input.setAttribute('placeholder', copy('placeholder'));
    ui.results.setAttribute('aria-label', copy('resultsLabel'));
  }

  function handleInputKeydown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveActiveOption(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveActiveOption(-1);
    } else if (event.key === 'Enter' && state.results.length) {
      event.preventDefault();
      const index = state.activeIndex >= 0 ? state.activeIndex : 0;
      openResult(state.results[index]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      if (ui.root.classList.contains('is-mobile-open')) closeMobileSearch();
      else closePanel();
    }
  }

  function handleGlobalShortcut(event) {
    const target = event.target;
    const editing = target?.matches('input, textarea, select, [contenteditable="true"]');
    const commandK = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
    const slash = event.key === '/' && !editing && !event.ctrlKey && !event.metaKey && !event.altKey;
    if (!commandK && !slash) return;

    event.preventDefault();
    if (window.matchMedia('(max-width: 900px)').matches) openMobileSearch();
    else ui.input.focus();
  }

  function bindEvents() {
    ui.input.addEventListener('input', scheduleSearch);
    ui.input.addEventListener('keydown', handleInputKeydown);
    ui.input.addEventListener('focus', () => {
      if (cleanText(ui.input.value).length >= MIN_QUERY_LENGTH) performSearch(ui.input.value);
    });

    ui.clear.addEventListener('click', () => {
      clearTimeout(state.debounceTimer);
      state.querySerial += 1;
      ui.input.value = '';
      ui.clear.hidden = true;
      setStatus(copy('minimum'));
      renderMessage(copy('minimum'));
      openPanel();
      ui.input.focus();
    });

    ui.mobileTrigger.addEventListener('click', openMobileSearch);
    ui.mobileClose.addEventListener('click', closeMobileSearch);
    ui.closeResults.addEventListener('click', () => {
      closePanel();
      ui.input.focus();
    });

    ui.results.addEventListener('mousemove', event => {
      const option = event.target.closest('.global-search-option');
      if (!option) return;
      state.activeIndex = Number(option.dataset.resultIndex);
      updateActiveOption();
    });
    ui.results.addEventListener('click', event => {
      const option = event.target.closest('.global-search-option');
      if (!option) return;
      openResult(state.results[Number(option.dataset.resultIndex)]);
    });

    document.addEventListener('click', event => {
      if (!ui.root.contains(event.target)) closePanel();
    });
    document.addEventListener('keydown', handleGlobalShortcut);

    document.addEventListener('handbook:page-ready', event => {
      state.currentPage = event.detail?.page || null;
      localizeSearchUi();

      if (state.pendingTarget && state.pendingTarget.route === state.currentPage) {
        const target = state.pendingTarget;
        state.pendingTarget = null;
        revealSearchTarget(target);
      }

      if (!ui.panel.hidden && cleanText(ui.input.value).length >= MIN_QUERY_LENGTH) {
        performSearch(ui.input.value);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && ui.root.classList.contains('is-mobile-open')) {
        ui.root.classList.remove('is-mobile-open');
        ui.mobileTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function init() {
    ui.root = document.getElementById('global-search');
    ui.mobileTrigger = document.getElementById('global-search-mobile-trigger');
    ui.popover = document.getElementById('global-search-popover');
    ui.label = ui.popover?.querySelector('label[for="global-search-input"]');
    ui.input = document.getElementById('global-search-input');
    ui.clear = document.getElementById('global-search-clear');
    ui.mobileClose = document.getElementById('global-search-mobile-close');
    ui.panel = document.getElementById('global-search-panel');
    ui.status = document.getElementById('global-search-status');
    ui.closeResults = document.getElementById('global-search-close-results');
    ui.results = document.getElementById('global-search-results');

    if (Object.values(ui).some(element => !element)) {
      console.error('[Search] Required search UI is missing.');
      return;
    }

    localizeSearchUi();
    bindEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();

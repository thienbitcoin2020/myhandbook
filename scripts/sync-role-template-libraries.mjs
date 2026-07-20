#!/usr/bin/env node
/** Materialize the reviewed template registry into each EN/VI role fragment. */

import fs from 'node:fs';
import path from 'node:path';
import { GENERATED_ROLE_TEMPLATE_GROUPS } from './role-template-manifest.mjs';

const root = process.cwd();
const startMarker = '<!-- GENERATED ROLE TEMPLATE LIBRARY: START -->';
const endMarker = '<!-- GENERATED ROLE TEMPLATE LIBRARY: END -->';

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function renderCard(group, document, lang, index) {
  const vi = lang === 'vi';
  const id = `${group.role}-generated-template-${index + 1}`;
  return `        <article class="template-card" role="listitem" aria-labelledby="${id}">
          <div class="template-card__top"><span class="template-card__format">DOCX</span><span class="template-card__owner">${vi ? 'Chủ quản' : 'Owner'} · ${escapeHtml(group.owner)}</span></div>
          <h3 class="template-card__title" id="${id}">${escapeHtml(document.title[lang])}</h3>
          <p class="template-card__description">${escapeHtml(document.description[lang])}</p>
          <dl class="template-card__meta"><div><dt>${vi ? 'Phối hợp' : 'Supports'}</dt><dd>${escapeHtml(group.supports)}</dd></div></dl>
          <a class="template-card__action" href="${document.preview}" data-template-preview="${document.path}" aria-label="${vi ? 'Đọc' : 'Read'} ${escapeHtml(document.title[lang])} ${vi ? 'ngay trên trình duyệt' : 'in the browser'}"><span>${vi ? 'Đọc tài liệu' : 'Read document'}</span><span class="template-card__action-mark" aria-hidden="true">→</span></a>
        </article>`;
}

function renderSection(group, lang) {
  const vi = lang === 'vi';
  const cards = group.documents.map((document, index) => renderCard(group, document, lang, index)).join('\n');
  return `${startMarker}
    <div class="section-divider"></div>
    <section class="section-block" id="section-generated-templates">
      <div class="section-header"><div class="section-icon">📥</div><div><div class="section-number">${vi ? 'Thư viện' : 'Library'}</div><h2>${escapeHtml(group.title[lang])}</h2><div class="sec-sub">${escapeHtml(group.subtitle[lang])}</div></div></div>
      <div class="template-library" role="list">
${cards}
      </div>
    </section>
${endMarker}

  `;
}

function syncFile(group, lang) {
  const relative = path.join('pages', lang === 'vi' ? 'vi' : '', `${group.role}.html`);
  const absolute = path.join(root, relative);
  let html = fs.readFileSync(absolute, 'utf8');
  const markerPattern = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}\\s*`, 'g');
  html = html.replace(markerPattern, '');
  const insertion = html.lastIndexOf('</main>');
  if (insertion < 0) throw new Error(`${relative}: </main> not found`);
  html = html.slice(0, insertion) + renderSection(group, lang) + html.slice(insertion);
  fs.writeFileSync(absolute, html, 'utf8');
  console.log(`[OK] ${relative}`);
}

for (const group of GENERATED_ROLE_TEMPLATE_GROUPS) {
  syncFile(group, 'en');
  syncFile(group, 'vi');
}

// Renders the project cards on the work page and switches them between the
// recipe view and the spec view.
//
// work.html already contains the recipe view as plain HTML so the page still
// reads with JavaScript off. This replaces it on load and turns on the toggle.

import { projects } from './data/projects.js';

const VIEWS = ['recipe', 'spec'];

let currentView = 'recipe';

// Shorthand for the create/set-class/set-text pattern, used all over this file.
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  if (text) {
    node.textContent = text;
  }
  return node;
}

function buildListBlock(heading, items, ordered) {
  const block = el('div', 'card-block');
  block.append(el('h4', 'card-block-heading', heading));

  const list = el(ordered ? 'ol' : 'ul', 'card-list');
  items.forEach((item) => {
    list.append(el('li', null, item));
  });

  block.append(list);
  return block;
}

function buildYieldBlock(entries) {
  const block = el('div', 'card-block');
  block.append(el('h4', 'card-block-heading', 'Yield'));

  const list = el('ul', 'yield-list');
  entries.forEach((entry) => {
    const item = el('li', 'yield-item');
    item.append(el('span', 'yield-label', entry.label));
    item.append(el('span', 'yield-detail', entry.detail));
    list.append(item);
  });

  block.append(list);
  return block;
}

// The spec view is the same data as a definition list instead of three columns.
function buildSpecBlock(rows) {
  const list = el('dl', 'spec-list');
  rows.forEach(([term, description]) => {
    list.append(el('dt', 'spec-term', term));
    list.append(el('dd', 'spec-description', description));
  });
  return list;
}

function buildFigure(image) {
  const figure = el('figure', 'card-figure');
  const img = el('img');
  img.src = image.src;
  img.alt = image.alt;
  img.loading = 'lazy';
  figure.append(img);
  figure.append(el('figcaption', 'card-caption', image.caption));
  return figure;
}

function buildCard(project) {
  const card = el('article', 'project-card');
  card.id = project.id;

  const header = el('header', 'card-header');
  header.append(el('h3', 'card-title', project.title));
  header.append(el('p', 'card-subtitle', project.subtitle));

  const meta =
    currentView === 'recipe'
      ? `${project.dates} — serves ${project.serves}`
      : `${project.dates} — ${project.role}`;
  header.append(el('p', 'card-meta', meta));
  card.append(header);

  if (currentView === 'recipe') {
    const body = el('div', 'card-body');
    body.append(buildListBlock('Ingredients', project.ingredients, false));
    body.append(buildListBlock('Method', project.method, true));
    body.append(buildYieldBlock(project.yield));
    card.append(body);
  } else {
    card.append(buildSpecBlock(project.spec));
  }

  if (project.image) {
    card.append(buildFigure(project.image));
  }

  if (project.links.length > 0) {
    const footer = el('footer', 'card-footer');
    project.links.forEach((link) => {
      const anchor = el('a', 'card-link', link.label);
      anchor.href = link.href;
      anchor.rel = 'noopener';
      footer.append(anchor);
    });
    card.append(footer);
  }

  return card;
}

function render(container) {
  container.replaceChildren(...projects.map(buildCard));
}

export function initProjects() {
  const container = document.querySelector('.project-list');
  const buttons = document.querySelectorAll('.view-toggle button');

  if (!container || buttons.length === 0) {
    return;
  }

  render(container);

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const requested = button.dataset.view;

      if (!VIEWS.includes(requested) || requested === currentView) {
        return;
      }

      currentView = requested;
      render(container);

      // aria-pressed tells a screen reader which view is active.
      buttons.forEach((other) => {
        other.setAttribute('aria-pressed', String(other.dataset.view === currentView));
      });
    });
  });
}

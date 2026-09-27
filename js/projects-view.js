/**
 * Renders the project cards on the work page and switches them between two
 * presentations of the same data: "recipe" and "spec".
 *
 * This is the original interactive component of the site. The markup in
 * work.html contains a plain-HTML recipe view so the page is readable with
 * JavaScript disabled; on load this module replaces it with the rendered
 * version and enables the toggle.
 */

import { projects } from './data/projects.js';

const VIEWS = ['recipe', 'spec'];

let currentView = 'recipe';

/**
 * Builds an element, optionally with a class and text content.
 *
 * @param {string} tag Tag name.
 * @param {string} [className] Class attribute value.
 * @param {string} [text] Text content.
 * @returns {HTMLElement} The new element.
 */
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

/**
 * Builds a labelled list block, e.g. the Ingredients column.
 *
 * @param {string} heading Column heading.
 * @param {string[]} items List items.
 * @param {boolean} ordered Whether the list is a sequence.
 * @returns {HTMLElement} The column element.
 */
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

/**
 * Builds the outcome block, where each entry carries a short supporting detail.
 *
 * @param {{label: string, detail: string}[]} entries Outcomes.
 * @returns {HTMLElement} The column element.
 */
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

/**
 * Builds the dense technical view as a definition list.
 *
 * @param {string[][]} rows Term and description pairs.
 * @returns {HTMLElement} The definition list.
 */
function buildSpecBlock(rows) {
  const list = el('dl', 'spec-list');
  rows.forEach(([term, description]) => {
    list.append(el('dt', 'spec-term', term));
    list.append(el('dd', 'spec-description', description));
  });
  return list;
}

/**
 * Builds the figure for a project that has an image.
 *
 * @param {{src: string, alt: string, caption: string}} image Image data.
 * @returns {HTMLElement} The figure element.
 */
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

/**
 * Builds one project card in the current view.
 *
 * @param {object} project A project from the data module.
 * @returns {HTMLElement} The article element for this project.
 */
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

/**
 * Clears the container and renders every project in the current view.
 *
 * @param {HTMLElement} container The element that holds the cards.
 */
function render(container) {
  container.replaceChildren(...projects.map(buildCard));
}

/**
 * Wires up the toggle buttons and renders the initial view.
 */
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

      buttons.forEach((other) => {
        other.setAttribute('aria-pressed', String(other.dataset.view === currentView));
      });
    });
  });
}

// Opens and closes the collapsed navigation menu below 720px.

export function initNav() {
  const button = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  if (!button || !menu) {
    return;
  }

  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('is-open', !open);
  });

  menu.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      button.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    }
  });
}

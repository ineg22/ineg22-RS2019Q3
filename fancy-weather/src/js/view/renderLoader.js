export default function renderLoader() {
  const { body } = document;
  body.innerHTML = '';

  const loader = document.createElement('div');
  loader.classList.add('loader');

  const dots = document.createElement('div');
  dots.classList.add('dots');

  loader.appendChild(dots);
  body.appendChild(loader);
}

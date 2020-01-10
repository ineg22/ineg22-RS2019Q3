import shortcutChangeHandler from './shortcutChangeHandler.js';

export default function() {
  document.querySelector('.cheatsheet').classList.remove('hidden');

  document.addEventListener('click', shortcutChangeHandler);

  document.querySelector('.cheatsheet__close').addEventListener('click', () => {
    document.removeEventListener('click', shortcutChangeHandler);
    document.querySelector('.cheatsheet').classList.add('hidden');
  });
}

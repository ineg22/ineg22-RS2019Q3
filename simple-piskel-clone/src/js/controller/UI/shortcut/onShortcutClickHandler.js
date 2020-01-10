import shortcutChangeHandler from './shortcutChangeHandler.js';

export default function onShortcutClickHandler() {
  const cheatsheet = document.querySelector('.cheatsheet');

  function onEscPressHandler(e) {
    const ESC_KEYCODE = 27;

    if (e.keyCode === ESC_KEYCODE && !cheatsheet.classList.contains('hidden')) {
      cheatsheet.classList.add('hidden');
      window.removeEventListener('keyup', onEscPressHandler);
      document.removeEventListener('click', shortcutChangeHandler);
    }
  }

  cheatsheet.classList.remove('hidden');

  document.addEventListener('click', shortcutChangeHandler);

  document.querySelector('.cheatsheet__close').addEventListener('click', () => {
    cheatsheet.classList.add('hidden');
    window.removeEventListener('keyup', onEscPressHandler);
    document.removeEventListener('click', shortcutChangeHandler);
  });

  window.addEventListener('keyup', onEscPressHandler);
}

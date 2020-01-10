/* eslint-disable no-alert */

export default function shortcutChangeHandler(e) {
  const { target } = e;

  if (!target.classList.contains('cheatsheet__short')) return;
  const currentShortcuts = JSON.parse(localStorage.getItem('shortcuts'));
  const newKeyClass = target
    .closest('.cheatsheet__list-item ')
    .classList[1].replace('-shortcut', '');
  let newKey;

  function keyPressWait(evt) {
    document.removeEventListener('keypress', keyPressWait);
    target.classList.remove('over');
    newKey = evt.code;
    const newText = newKey.toUpperCase().slice(-1);
    target.textContent = newText;

    Object.keys(currentShortcuts).forEach(key => {
      const pressedEl = target.closest('.cheatsheet__list-item');
      const currEl = document.querySelector(`.${key}-shortcut`);

      if (currentShortcuts[key] === newKey && pressedEl !== currEl) {
        const repeatedEl = document
          .querySelector(`.${key}-shortcut`)
          .querySelector('.cheatsheet__short');

        repeatedEl.textContent = '';
        currentShortcuts[key] = '';
      }
    });

    currentShortcuts[newKeyClass] = newKey;
    localStorage.setItem('shortcuts', JSON.stringify(currentShortcuts));
  }

  target.classList.add('over');

  document.addEventListener('keypress', keyPressWait);
}

export default function initShortcutsView() {
  const shortcuts = JSON.parse(localStorage.getItem('shortcuts'));

  const shortcutElementsArray = document.querySelectorAll(
    '.cheatsheet__list-item'
  );

  shortcutElementsArray.forEach(el => {
    const currentClass = el.classList[1].replace('-shortcut', '');
    const currentShortElement = el.querySelector('.cheatsheet__short');

    currentShortElement.textContent = shortcuts[currentClass].slice(-1);
  });
}

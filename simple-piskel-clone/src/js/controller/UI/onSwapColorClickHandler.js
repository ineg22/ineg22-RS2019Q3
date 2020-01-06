export default function onSwapColorClickHandler() {
  const currentColor = localStorage.getItem('currentColor');
  const prevColor = localStorage.getItem('prevColor');

  document.querySelector('.current-color').style.background = prevColor;
  document.querySelector('.prev-color').style.background = currentColor;

  localStorage.setItem('currentColor', prevColor);
  localStorage.setItem('prevColor', currentColor);
}

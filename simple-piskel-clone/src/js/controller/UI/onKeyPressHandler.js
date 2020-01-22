export default function onKeyPressHandler(e) {
  const shortcuts = JSON.parse(localStorage.getItem('shortcuts'));
  const currentFrame = localStorage.getItem('currentFrame');

  Object.keys(shortcuts).forEach(key => {
    if (shortcuts[key] === e.code) {
      let element = document.querySelector(`.${key}`);

      if (key === 'mini-frame__delete') {
        element = document
          .querySelector(`.mini-frame-${currentFrame}`)
          .querySelector('.mini-frame__delete');
      }

      if (key === 'mini-frame__clone') {
        element = document
          .querySelector(`.mini-frame-${currentFrame}`)
          .querySelector('.mini-frame__clone');
      }
      element.click();
    }
  });
}

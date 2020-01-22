export default function fullScreenHandler() {
  const {
    fullscreenEnabled,
    webkitFullscreenEnabled,
    mozFullScreenEnabled,
    msFullscreenEnabled,
  } = document;

  if (
    !fullscreenEnabled &&
    !webkitFullscreenEnabled &&
    !mozFullScreenEnabled &&
    !msFullscreenEnabled
  ) {
    throw new Error("User doesn't allow full screen");
  }
  const element = document.querySelector('#preview-canvas');
  const {
    requestFullscreen,
    webkitRequestFullscreen,
    mozRequestFullScreen,
    msRequestFullscreen,
  } = element;

  if (requestFullscreen) {
    element.requestFullscreen();
  } else if (webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

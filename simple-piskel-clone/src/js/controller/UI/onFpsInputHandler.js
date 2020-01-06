export default function onFpsInputHandler(e) {
  const newFps = e.target.value;
  localStorage.setItem('fps', newFps);
  document.querySelector('#fps-display').textContent = `${newFps} FPS`;
}

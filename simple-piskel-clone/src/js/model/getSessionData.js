export default function getSessionData() {
  if (!localStorage.getItem('currentTool')) {
    const canvas = document.querySelector('#main-frame');

    localStorage.setItem('canvasData', canvas.toDataURL());
    localStorage.setItem('frames', JSON.stringify([]));
    localStorage.setItem('prevColor', 'rgb(255, 215, 0)');
    localStorage.setItem('currentColor', 'rgb(0, 0, 1)');
    localStorage.setItem('currentTool', 'pen');
    localStorage.setItem('resolution', '64');
    localStorage.setItem('fps', '4');
    localStorage.setItem('penSize', '2');
    localStorage.setItem('currentFrame', '1');
  }

  const session = {
    currentTool: localStorage.getItem('currentTool'),
    penSize: localStorage.getItem('penSize'),
    currentColor: localStorage.getItem('currentColor'),
    prevColor: localStorage.getItem('prevColor'),
    resolution: localStorage.getItem('resolution'),
    fps: localStorage.getItem('fps'),
    canvasData: localStorage.getItem('canvasData'),
    frames: JSON.parse(localStorage.getItem('frames')),
    currentFrame: localStorage.getItem('currentFrame'),
  };

  return session;
}

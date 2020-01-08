export default function getSessionData() {
  // const DEFAULT_CANVAS_SIZE = 512;

  if (!localStorage.getItem('currentTool')) {
    const canvas = document.querySelector('#main-frame');
    // const ctx = canvas.getContext('2d');
    // ctx.fillStyle = 'rgb(0, 0, 0)';
    // ctx.fillRect(0, 0, DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE);

    localStorage.setItem('canvasData', JSON.stringify(canvas.toDataURL()));
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
    canvasData: JSON.parse(localStorage.getItem('canvasData')),
    frames: JSON.parse(localStorage.getItem('frames')),
    currentFrame: localStorage.getItem('currentFrame'),
  };

  return session;
}

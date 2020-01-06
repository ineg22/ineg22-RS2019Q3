export default function getSession() {
  if (!localStorage.getItem('currentTool')) {
    localStorage.setItem('currentTool', 'pen');
    localStorage.setItem('penSize', '2');
    localStorage.setItem('currentColor', 'rgb(0, 0, 0)');
    localStorage.setItem('prevColor', 'rgb(255, 215, 0)');
    localStorage.setItem('resolution', '64');
    localStorage.setItem('fps', '4');
  }

  const session = {
    currentTool: localStorage.getItem('currentTool'),
    penSize: localStorage.getItem('penSize'),
    currentColor: localStorage.getItem('currentColor'),
    prevColor: localStorage.getItem('prevColor'),
    resolution: localStorage.getItem('resolution'),
    fps: localStorage.getItem('fps'),
    // frames: localStorage.getItem('frames'),
  };

  console.log('getSession');
  return session;
}

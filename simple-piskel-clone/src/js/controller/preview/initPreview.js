function drawPreviewFrame(currentFrame) {
  const DEFAULT_CANVAS_SIZE = 512;
  const previewCanvas = document.querySelector('#preview-canvas');
  const previewCtx = previewCanvas.getContext('2d');
  const sourceFrame = document.querySelector(`.mini-frame-${currentFrame + 1}`);
  if (!sourceFrame) return;
  const sourceCanvas = sourceFrame.querySelector('.mini-frame__canvas');
  const sourceCtx = sourceCanvas.getContext('2d');

  const sourceData = sourceCtx.getImageData(
    0,
    0,
    DEFAULT_CANVAS_SIZE,
    DEFAULT_CANVAS_SIZE
  );

  previewCtx.putImageData(sourceData, 0, 0);
}

export default function initPreview() {
  const currentFps = localStorage.getItem('fps');

  const tempIntervalID = localStorage.getItem('intervalID');
  const tempFrame = localStorage.getItem('tempFrame');

  if (tempIntervalID) {
    clearInterval(Number(tempIntervalID));
  }
  if (!tempFrame) {
    localStorage.setItem('tempFrame', 0);
  }

  const intervalID = setInterval(() => {
    const framesCount = JSON.parse(localStorage.getItem('frames')).length;
    let currTempFrame = Number(localStorage.getItem('tempFrame'));

    if (currTempFrame === framesCount || currTempFrame > framesCount) {
      currTempFrame = 0;
    }

    drawPreviewFrame(currTempFrame);

    localStorage.setItem('tempFrame', currTempFrame + 1);
  }, 1000 / currentFps);

  localStorage.setItem('intervalID', intervalID);
}

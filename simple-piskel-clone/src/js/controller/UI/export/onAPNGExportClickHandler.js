import UPNG from 'upng-js';
import download from 'downloadjs';

export default function onAPNGExportClickHandler() {
  const DEFAULT_CANVAS_SIZE = 512;
  const elementsArray = document.querySelectorAll('.mini-frame__canvas');
  const currentFps = Number(localStorage.getItem('fps'));

  const dataArray = [];
  const delayArray = [];
  elementsArray.forEach(el => {
    const ctx = el.getContext('2d');
    const currentElementData = ctx.getImageData(
      0,
      0,
      DEFAULT_CANVAS_SIZE,
      DEFAULT_CANVAS_SIZE
    ).data.buffer;
    dataArray.push(currentElementData);
    delayArray.push(1000 / currentFps);
  });

  const result = UPNG.encode(
    dataArray,
    DEFAULT_CANVAS_SIZE,
    DEFAULT_CANVAS_SIZE,
    0,
    delayArray
  );

  download(result, 'result.apng', 'apng');
}

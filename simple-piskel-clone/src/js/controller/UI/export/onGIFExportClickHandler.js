import GifEncoder from 'gif.js-upgrade';
import download from 'downloadjs';

export default function onGIFExportClickHandler() {
  const DEFAULT_CANVAS_SIZE = 512;
  const elementsArray = document.querySelectorAll('.mini-frame__canvas');
  const currentFps = Number(localStorage.getItem('fps'));

  const encoder = new GifEncoder({
    workers: 4,
    workerScript: './gif.worker.js',
    width: DEFAULT_CANVAS_SIZE,
    height: DEFAULT_CANVAS_SIZE,
  });

  elementsArray.forEach(el => {
    encoder.addFrame(el, { delay: 1000 / currentFps });
  });

  encoder.on('finished', function cb(blob) {
    download(blob, 'result.gif', 'image/gif');
  });

  encoder.render();
}

export default function selectFrame(number) {
  const DEFAULT_CANVAS_SIZE = 512;
  const prevFrame = localStorage.getItem('currentFrame');
  const frames = JSON.parse(localStorage.getItem('frames'));

  const prevFrameElement = document.querySelector(`.mini-frame-${prevFrame}`);
  const newFrameElement = document.querySelector(`.mini-frame-${number}`);

  const canvas = document.querySelector('#main-frame');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE);

  const frameData = frames[number - 1];
  const img = new Image();
  img.src = frameData;
  img.addEventListener('load', () => {
    ctx.drawImage(img, 0, 0);
  });

  prevFrameElement.classList.toggle('selected');
  newFrameElement.classList.toggle('selected');

  localStorage.setItem('currentFrame', number);
}

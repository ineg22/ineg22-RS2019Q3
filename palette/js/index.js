const pencil = document.querySelector('#pencil');
const picker = document.querySelector('#picker');
const bucket = document.querySelector('#bucket');
const colorInput = document.querySelector('#input-color');
const pixelInput = document.querySelector('#pixel-size');
const fillDefault = document.querySelector('#default');
const colorTools = document.querySelector('.color-tools__list');
const canvas = document.querySelector('#canvas');

const ctx = canvas.getContext('2d');

function canvasToDefault() {
  fetch('../data/4x4.json')
    .then(
      res => res.json(),
      rej => {
        throw new Error(rej);
      }
    )
    .then(colors => {
      for (let i = 0; i < 4; i += 1) {
        for (let j = 0; j < 4; j += 1) {
          ctx.fillStyle = `#${colors[i][j]}`;
          ctx.fillRect((i * canvas.width) / 4, (j * canvas.height) / 4, canvas.width / 4, canvas.height / 4);
        }
      }
    });
}

canvasToDefault();

let pixelSize = pixelInput.value;
let isBucket = true;
let isPicker = false;
let isPencil = false;
let currentColor = 'rgb(173, 255, 47)';
let previousColor = 'rgb(128, 128, 128)';
document.querySelector('.color--current').style.background = currentColor;
document.querySelector('.color--prev').style.background = previousColor;
document.querySelector('.predefined-first').style.background = '#f07f7f';
document.querySelector('.predefined-second').style.background = '#add8e6';

function drawLine(e) {
  let lastX = e.offsetX;
  let lastY = e.offsetY;
  ctx.fillStyle = currentColor;
  ctx.fillRect(Math.floor(lastX / pixelSize) * pixelSize, Math.floor(lastY / pixelSize) * pixelSize, pixelSize, pixelSize);

  function drawing(evt) {
    const currX = evt.offsetX;
    const currY = evt.offsetY;

    const deltaX = Math.abs(currX - lastX);
    const deltaY = Math.abs(currY - lastY);

    const sx = lastX < currX ? 1 : -1;
    const sy = lastY < currY ? 1 : -1;
    let err = deltaX - deltaY;

    while (!(lastX === currX && lastY === currY)) {
      const e2 = 2 * err;
      if (e2 > -deltaY) {
        err -= deltaY;
        lastX += sx;
      }
      if (e2 < deltaX) {
        err += deltaX;
        lastY += sy;
      }
      ctx.fillRect(Math.floor(lastX / pixelSize) * pixelSize, Math.floor(lastY / pixelSize) * pixelSize, pixelSize, pixelSize);
    }
  }

  function clearListeners() {
    canvas.removeEventListener('mousemove', drawing);
    canvas.removeEventListener('mouseout', clearListeners);
    canvas.removeEventListener('mouseup', clearListeners);
  }

  canvas.addEventListener('mousemove', drawing);
  canvas.addEventListener('mouseout', clearListeners);
  canvas.addEventListener('mouseup', clearListeners);
}

function selectColorFromList(e) {
  const newColor = e.target.closest('.color-tools__item').firstElementChild.style.background;
  if (newColor !== currentColor) {
    previousColor = currentColor;
    currentColor = newColor;
    document.querySelector('.color--current').style.background = currentColor;
    document.querySelector('.color--prev').style.background = previousColor;
  }
}

function selectColorFromCanvas(e) {
  const color = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  const newColor = `rgb(${color[0]},${color[1]},${color[2]},${color[3]})`;
  if (newColor !== currentColor) {
    previousColor = currentColor;
    currentColor = newColor;
    document.querySelector('.color--current').style.background = currentColor;
    document.querySelector('.color--prev').style.background = previousColor;
  }
}

function fillArea(e) {
  console.log(e);
  ctx.fillStyle = currentColor;
  ctx.fillRect(0, 0, 512, 512);
}

function selectPencil() {
  pencil.classList.add('selected');
  bucket.classList.remove('selected');
  picker.classList.remove('selected');
  isPencil = true;
  isBucket = false;
  isPicker = false;
  canvas.addEventListener('mousedown', drawLine);
  canvas.removeEventListener('click', selectColorFromCanvas);
  canvas.removeEventListener('click', fillArea);
  colorTools.removeEventListener('click', selectColorFromList);
}

function selectPicker() {
  picker.classList.add('selected');
  bucket.classList.remove('selected');
  pencil.classList.remove('selected');
  isPencil = false;
  isBucket = false;
  isPicker = true;
  canvas.removeEventListener('mousedown', drawLine);
  canvas.addEventListener('click', selectColorFromCanvas);
  canvas.removeEventListener('click', fillArea);
  colorTools.addEventListener('click', selectColorFromList);
}

function selectBucket() {
  bucket.classList.add('selected');
  pencil.classList.remove('selected');
  picker.classList.remove('selected');
  isPencil = false;
  isBucket = true;
  isPicker = false;
  canvas.removeEventListener('mousedown', drawLine);
  canvas.removeEventListener('click', selectColorFromCanvas);
  canvas.addEventListener('click', fillArea);
  colorTools.removeEventListener('click', selectColorFromList);
}

pencil.addEventListener('click', selectPencil);

bucket.addEventListener('click', selectBucket);

picker.addEventListener('click', selectPicker);

fillDefault.addEventListener('click', canvasToDefault);

colorInput.addEventListener('input', () => {
  if (colorInput.value !== currentColor) previousColor = currentColor;
  currentColor = colorInput.value;
  colorTools.querySelector('.color--current').style.background = currentColor;
  colorTools.querySelector('.color--prev').style.background = previousColor;
});

pixelInput.addEventListener('change', () => {
  pixelSize = pixelInput.value;
});

if (isPencil) selectPencil();
if (isPicker) selectPicker();
if (isBucket) selectBucket();

document.addEventListener('keypress', e => {
  switch (e.keyCode) {
    case 98:
      selectBucket();
      break;
    case 99:
      selectPicker();
      break;
    case 112:
      selectPencil();
      break;
    default:
      break;
  }
});

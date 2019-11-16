const pencil = document.querySelector('#pencil');
const picker = document.querySelector('#picker');
const bucket = document.querySelector('#bucket');
const colorInput = document.querySelector('#input-color');
const canvasSizeInput = document.querySelector('#canvas-size');
const fillDefault = document.querySelector('#default');
const colorTools = document.querySelector('.color-tools__list');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let isBucket = localStorage.getItem('isFull') ? JSON.parse(localStorage.getItem('isBucket')) : false;
let isPicker = localStorage.getItem('isFull') ? JSON.parse(localStorage.getItem('isPicker')) : false;
let isPencil = localStorage.getItem('isFull') ? JSON.parse(localStorage.getItem('isPencil')) : true;
let currentColor = localStorage.getItem('isFull') ? localStorage.getItem('currentColor') : 'rgb(173, 255, 47)';
let previousColor = localStorage.getItem('isFull') ? localStorage.getItem('previousColor') : 'rgb(128, 128, 128)';
let pixelSize = localStorage.getItem('isFull') ? +localStorage.getItem('pixelSize') : 4;
document.querySelector('.color--current').style.background = currentColor;
document.querySelector('.color--prev').style.background = previousColor;
document.querySelector('.predefined-first').style.background = 'rgb(240, 127, 127)';
document.querySelector('.predefined-second').style.background = 'rgb(173, 216, 230)';

function clearCanvas() {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 512, 512);
}

function canvasToDefault() {
  const url = 'https://a.wattpad.com/cover/84608722-352-k886345.jpg';
  // const url = 'https://media3.s-nbcnews.com/j/newscms/2019_41/3047866/191010-japan-stalker-mc-1121_06b4c20bbf96a51dc8663f334404a899.fit-760w.JPG';
  let size;
  switch (canvasSizeInput.value) {
    case '1':
      size = 128;
      pixelSize = 4;
      break;
    case '2':
      size = 256;
      pixelSize = 2;
      break;
    case '3':
      size = 512;
      pixelSize = 1;
      break;
    default:
      size = 128;
      pixelSize = 4;
      break;
  }
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 512, 512);
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = url;
  img.addEventListener('load', () => {
    let { width, height } = img;
    let posX = 0;
    let posY = 0;
    if (height > width && height > size) {
      width = Math.floor(width * (size / height));
      posX = Math.floor((size - width) / 2);
      height = size;
    } else if (width > height && width > size) {
      height = Math.floor(height * (size / width));
      posY = Math.floor((size - height) / 2);
      width = size;
    }

    const buffer = document.createElement('canvas');
    buffer.width = size;
    buffer.height = size;
    buffer.style.imageRendering = 'pixelated';
    const bufferCtx = buffer.getContext('2d');
    bufferCtx.imageSmoothingEnabled = false;
    bufferCtx.drawImage(img, posX, posY, width, height);
    const bufferImgURL = buffer.toDataURL();

    const bufferImg = new Image();
    bufferImg.src = bufferImgURL;
    bufferImg.addEventListener('load', () => {
      ctx.drawImage(bufferImg, 0, 0, 512, 512);
    });
  });
}

if (localStorage.getItem('isFull')) {
  const dataURL = localStorage.getItem('canvasData');
  const img = new Image();
  img.src = dataURL;
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };
} else {
  canvasToDefault();
}

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
  const newColor = `rgb(${color[0]}, ${color[1]}, ${color[2]}`;
  if (newColor !== currentColor) {
    previousColor = currentColor;
    currentColor = newColor;
    document.querySelector('.color--current').style.background = currentColor;
    document.querySelector('.color--prev').style.background = previousColor;
  }
}

function fillArea(e) {
  const targetColorArr = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  const targetColor = `rgb(${targetColorArr[0]}, ${targetColorArr[1]}, ${targetColorArr[2]})`;
  ctx.fillStyle = currentColor;

  if (targetColor === currentColor) return;

  const lastX = e.offsetX;
  const lastY = e.offsetY;

  function floodFill(x, y) {
    const newPointColorArray = ctx.getImageData(x, y, 1, 1).data;
    const newPointColor = `rgb(${newPointColorArray[0]}, ${newPointColorArray[1]}, ${newPointColorArray[2]})`;
    if (targetColor !== newPointColor) return;

    ctx.fillRect(x, y, pixelSize, pixelSize);
    if (x > 0) {
      floodFill(x - pixelSize, y);
    }
    if (y > 0) {
      floodFill(x, y - pixelSize);
    }
    if (x < 512) {
      floodFill(x + +pixelSize, y);
    }
    if (y < 512) {
      floodFill(x, y + +pixelSize);
    }
  }

  floodFill(Math.floor(lastX / pixelSize) * pixelSize, Math.floor(lastY / pixelSize) * pixelSize);
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
}

pencil.addEventListener('click', selectPencil);

bucket.addEventListener('click', selectBucket);

picker.addEventListener('click', selectPicker);

fillDefault.addEventListener('click', clearCanvas);

colorTools.addEventListener('click', selectColorFromList);

canvasSizeInput.addEventListener('change', canvasToDefault);

colorInput.addEventListener('input', () => {
  if (colorInput.value !== currentColor) previousColor = currentColor;
  currentColor = window.convertHex(colorInput.value);
  colorTools.querySelector('.color--current').style.background = currentColor;
  colorTools.querySelector('.color--prev').style.background = previousColor;
});

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

window.addEventListener('beforeunload', () => {
  localStorage.setItem('isFull', true);
  localStorage.setItem('isPencil', isPencil);
  localStorage.setItem('isPicker', isPicker);
  localStorage.setItem('isBucket', isBucket);
  localStorage.setItem('currentColor', currentColor);
  localStorage.setItem('previousColor', previousColor);
  localStorage.setItem('pixelSize', pixelSize);
  localStorage.setItem('canvasData', canvas.toDataURL());
});
if (isPencil) selectPencil();
if (isPicker) selectPicker();
if (isBucket) selectBucket();

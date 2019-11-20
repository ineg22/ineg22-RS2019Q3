import convertHex from './helper.js';

const pencil = document.querySelector('#pencil');
const picker = document.querySelector('#picker');
const bucket = document.querySelector('#bucket');
const colorInput = document.querySelector('#input-color');
const canvasSizeInput = document.querySelector('#canvas-size');
const fillDefault = document.querySelector('#default');
const colorTools = document.querySelector('.color-tools__list');
const loader = document.querySelector('#load-image');
const grayscale = document.querySelector('#image-grayscale');
const searchRequest = document.querySelector('#image-search');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

let isImageLoaded = localStorage.getItem('isFull') ? JSON.parse(localStorage.getItem('isImageLoaded')) : false;
let isBucket = localStorage.getItem('isFull') ? JSON.parse(localStorage.getItem('isBucket')) : false;
let isPicker = localStorage.getItem('isFull') ? JSON.parse(localStorage.getItem('isPicker')) : false;
let isPencil = localStorage.getItem('isFull') ? JSON.parse(localStorage.getItem('isPencil')) : true;
let currentColor = localStorage.getItem('isFull') ? localStorage.getItem('currentColor') : 'rgb(173, 255, 47)';
let previousColor = localStorage.getItem('isFull') ? localStorage.getItem('previousColor') : 'rgb(128, 128, 128)';
let pixelSize = localStorage.getItem('isFull') ? +localStorage.getItem('pixelSize') : 1;
let canvasSizeValue = localStorage.getItem('isFull') ? +localStorage.getItem('canvasSizeValue') : 3;
let canvasSize = localStorage.getItem('isFull') ? +localStorage.getItem('canvasSize') : 512;
canvasSizeInput.value = canvasSizeValue;
let searchValue = localStorage.getItem('isFull') ? localStorage.getItem('searchValue') : searchRequest.value;
searchRequest.value = searchValue;
document.querySelector('.color--current').style.background = currentColor;
document.querySelector('.color--prev').style.background = previousColor;

function renderCanvasOnSwitchSize() {
  const buffer = document.createElement('canvas');
  buffer.width = canvasSize;
  buffer.height = canvasSize;
  buffer.style.imageRendering = 'pixelated';
  const bufferCtx = buffer.getContext('2d');
  bufferCtx.imageSmoothingEnabled = false;
  let bufferDataURL = canvas.toDataURL();

  const img = new Image();
  img.src = bufferDataURL;
  img.addEventListener('load', () => {
    bufferCtx.drawImage(img, 0, 0, canvasSize, canvasSize);
    bufferDataURL = buffer.toDataURL();

    const newImg = new Image();
    newImg.src = bufferDataURL;
    newImg.addEventListener('load', () => {
      ctx.drawImage(newImg, 0, 0, 512, 512);
    });
  });
}

function canvasSwitchSize() {
  canvasSizeValue = canvasSizeInput.value;
  switch (canvasSizeValue) {
    case '1':
      pixelSize = 4;
      canvasSize = 128;
      break;
    case '2':
      pixelSize = 2;
      canvasSize = 256;
      break;
    case '3':
      pixelSize = 1;
      canvasSize = 512;
      break;
    default:
      pixelSize = 4;
      canvasSize = 512;
      break;
  }
}

function clearCanvas() {
  isImageLoaded = false;
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, 512, 512);
}

async function loadImage() {
  clearCanvas();
  searchValue = searchRequest.value;
  const accessKey = 'cac4a2afa1112aa460191f5729f405c16fd86321d76f9112b94e31e6ce94b7ba';
  const url = `https://api.unsplash.com/photos/random?query=town,${searchValue}&client_id=${accessKey}`;

  const img = new Image();
  img.crossOrigin = 'Anonymous';
  const imgURL = await fetch(url)
    .then(res => res.json())
    .then(data => data.urls.regular);

  img.src = imgURL;
  img.addEventListener('load', () => {
    isImageLoaded = true;
    let { width, height } = img;
    let posX = 0;
    let posY = 0;
    if (height > width && height > 512) {
      width = Math.floor(width * (512 / height));
      posX = Math.floor((512 - width) / 2);
      height = 512;
    } else if (width > height && width > 512) {
      height = Math.floor(height * (512 / width));
      posY = Math.floor((512 - height) / 2);
      width = 512;
    } else if (width === height && width > 512) {
      height = 512;
      width = 512;
    }

    canvasSizeInput.value = 3;
    canvasSwitchSize();
    ctx.drawImage(img, posX, posY, width, height);
  });
}

function grayscaleImage() {
  if (!isImageLoaded) {
    alert('Please, load image before!');
    return;
  }
  const imgData = ctx.getImageData(0, 0, 512, 512);
  const pixels = imgData.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const lightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3, 10);

    pixels[i] = lightness;
    pixels[i + 1] = lightness;
    pixels[i + 2] = lightness;
  }
  ctx.putImageData(imgData, 0, 0);
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
  const pickedElem = e.target.closest('.color-tools__item').firstElementChild;
  const pickedColor = window.getComputedStyle(pickedElem).backgroundColor;
  if (pickedColor !== currentColor) {
    previousColor = currentColor;
    currentColor = pickedColor;
    document.querySelector('.color--current').style.backgroundColor = currentColor;
    document.querySelector('.color--prev').style.backgroundColor = previousColor;
  }
}

function selectColorFromCanvas(e) {
  const color = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  const newColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  if (newColor !== currentColor) {
    previousColor = currentColor;
    currentColor = newColor;
    document.querySelector('.color--current').style.backgroundColor = currentColor;
    document.querySelector('.color--prev').style.backgroundColor = previousColor;
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

if (localStorage.getItem('isFull')) {
  const dataURL = localStorage.getItem('canvasData');
  const img = new Image();
  img.src = dataURL;
  img.addEventListener('load', () => {
    ctx.drawImage(img, 0, 0);
  });
} else {
  clearCanvas();
}

grayscale.addEventListener('click', grayscaleImage);

loader.addEventListener('click', loadImage);

pencil.addEventListener('click', selectPencil);

bucket.addEventListener('click', selectBucket);

picker.addEventListener('click', selectPicker);

fillDefault.addEventListener('click', clearCanvas);

colorTools.addEventListener('click', selectColorFromList);

canvasSizeInput.addEventListener('change', () => {
  canvasSwitchSize();
  renderCanvasOnSwitchSize();
});

colorInput.addEventListener('input', () => {
  if (colorInput.value !== currentColor) previousColor = currentColor;
  currentColor = convertHex(colorInput.value);
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
    case 13:
      if (e.target === searchRequest) {
        searchValue = searchRequest.value;
        loadImage();
      }
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
  localStorage.setItem('isImageLoaded', isImageLoaded);
  localStorage.setItem('currentColor', currentColor);
  localStorage.setItem('previousColor', previousColor);
  localStorage.setItem('pixelSize', pixelSize);
  localStorage.setItem('canvasData', canvas.toDataURL());
  localStorage.setItem('canvasSizeValue', canvasSizeInput.value);
  localStorage.setItem('canvasSize', canvasSize);
  localStorage.setItem('searchValue', searchValue);
});
if (isPencil) selectPencil();
if (isPicker) selectPicker();
if (isBucket) selectBucket();

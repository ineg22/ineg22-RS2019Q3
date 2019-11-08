const pencil = document.querySelector('#pencil');
const picker = document.querySelector('#picker');
const bucket = document.querySelector('#bucket');
const colorInput = document.querySelector('#input-color');
const canvas = document.querySelector('#canvas');

const ctx = canvas.getContext('2d');

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

let isBucket = false;
let isPicker = false;
let isPencil = true;
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
  ctx.lineJoin = 'round';
  ctx.fillRect(lastX, lastY, 1, 1);

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
      ctx.fillRect(lastX, lastY, 1, 1);
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

function selectPencil() {
  pencil.classList.add('selected');
  bucket.classList.remove('selected');
  picker.classList.remove('selected');
  isPencil = true;
  isBucket = false;
  isPicker = false;
  if (!colorInput.classList.contains('hidden')) {
    colorInput.classList.add('hidden');
  }
  document.querySelector('.color-tools__list').removeEventListener('click', selectColorFromList);
  canvas.addEventListener('mousedown', drawLine);
}

function selectPicker() {
  picker.classList.add('selected');
  bucket.classList.remove('selected');
  pencil.classList.remove('selected');
  isPencil = false;
  isBucket = false;
  isPicker = true;
  if (colorInput.classList.contains('hidden')) {
    colorInput.classList.remove('hidden');
  }
  canvas.removeEventListener('mousedown', drawLine);
  document.querySelector('.color-tools__list').addEventListener('click', selectColorFromList);
}

function selectBucket() {
  bucket.classList.add('selected');
  pencil.classList.remove('selected');
  picker.classList.remove('selected');
  isPencil = false;
  isBucket = true;
  isPicker = false;
  if (!colorInput.classList.contains('hidden')) {
    colorInput.classList.add('hidden');
  }
  canvas.removeEventListener('mousedown', drawLine);
  document.querySelector('.color-tools__list').removeEventListener('click', selectColorFromList);
}

pencil.addEventListener('click', selectPencil);

bucket.addEventListener('click', selectBucket);

picker.addEventListener('click', selectPicker);

colorInput.addEventListener('input', () => {
  if (previousColor !== currentColor) previousColor = currentColor;
  currentColor = colorInput.value;
  document.querySelector('.color--current').style.background = currentColor;
  document.querySelector('.color--prev').style.background = previousColor;
});

if (isPencil) selectPencil();
if (isPicker) selectPicker();
if (isBucket) selectBucket();

export function convertHex(hex) {
  if (!hex || typeof hex !== 'string' || hex.length !== 7) {
    throw new Error('invalid arguments');
  }

  const newHex = hex.replace('#', '');
  const red = parseInt(newHex.substring(0, 2), 16);
  const green = parseInt(newHex.substring(2, 4), 16);
  const blue = parseInt(newHex.substring(4, 6), 16);

  return `rgb(${red}, ${green}, ${blue})`;
}

export function setPixelSize() {
  const penSize = localStorage.getItem('penSize');
  const resolution = localStorage.getItem('resolution');

  const DEFAULT_CANVAS_SIZE = 512;

  const pixelSize = (DEFAULT_CANVAS_SIZE / resolution) * 2 ** (penSize - 1);

  localStorage.setItem('pixelSize', pixelSize);
}

export default function convertHex(hex) {
  const newHex = hex.replace('#', '');
  const red = parseInt(newHex.substring(0, 2), 16);
  const green = parseInt(newHex.substring(2, 4), 16);
  const blue = parseInt(newHex.substring(4, 6), 16);

  return `rgb(${red}, ${green}, ${blue})`;
}

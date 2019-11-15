const convertHex = require('../js/helper.js');

test('convert color string with hex to string with rgb', () => {
  expect(convertHex('#adff2f')).toBe('rgb(173, 255, 47)');
});

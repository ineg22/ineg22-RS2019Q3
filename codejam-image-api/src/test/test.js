import convertHex from '../js/helper.js';

test('should properly convert color string with hex to string with rgb', () => {
  expect(convertHex('#adff2f')).toBe('rgb(173, 255, 47)');
});

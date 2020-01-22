import { convertHex } from '../js/utils.js';

describe('convertHex', () => {
  it('should properly convert color string with hex to string with rgb', () => {
    expect(convertHex('#adff2f')).toBe('rgb(173, 255, 47)');
  });
  it('should work only with strings like "#bada55"', () => {
    expect(() => {
      convertHex('#adff2');
    }).toThrow('invalid arguments');
    expect(() => {
      convertHex(666);
    }).toThrow('invalid arguments');
    expect(() => {
      convertHex();
    }).toThrow('invalid arguments');
  });
});

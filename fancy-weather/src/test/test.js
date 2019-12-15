import {
  getRandomNumber,
  toFahrenheit,
  getDateTime,
  getTags,
} from '../js/utils.js';

describe('getRandomNumber', () => {
  it('should throw Error when accept not a number or negative', () => {
    expect(() => {
      getRandomNumber();
    }).toThrow('invalid arguments');
    expect(() => {
      getRandomNumber('10');
    }).toThrow('invalid arguments');
    expect(() => {
      getRandomNumber(-10);
    }).toThrow('invalid arguments');
  });

  it('should return random number from 0 to arg', () => {
    expect(getRandomNumber(10)).toBeGreaterThan(-1);
    expect(getRandomNumber(10)).toBeLessThan(10);
  });
});

describe('toFahrenheit', () => {
  it('should throw Error when accept not a number', () => {
    expect(() => {
      toFahrenheit();
    }).toThrow('invalid arguments');
    expect(() => {
      toFahrenheit('10');
    }).toThrow('invalid arguments');
  });

  it('should return correct value', () => {
    expect(toFahrenheit(10)).toEqual(50);
    expect(toFahrenheit(-10)).toEqual(14);
  });
});

describe('getDateTime', () => {
  const date = new Date();
  const dateString = getDateTime('ru', 10800)
    .split(' ')
    .filter(el => el !== '');

  it('should throw Error when accept wrong arguments', () => {
    expect(() => {
      getDateTime('ru', '10800');
    }).toThrow('invalid arguments');
  });

  it('should return correct type', () => {
    expect(typeof getDateTime('ru', 10800)).toEqual('string');
  });

  it('should return correct Date', () => {
    expect(parseInt(dateString[1], 10)).toEqual(date.getDate());
  });
});

describe('getTags', () => {
  const date = new Date();
  date.setHours(10);
  date.setMonth(6);
  const time = Math.round(date.valueOf() / 1000);

  const tags = getTags({ time, icon: 'rain' });

  it('should throw Error when accept wrong arguments', () => {
    expect(() => {
      getTags('10');
    }).toThrow('invalid arguments');
    expect(() => {
      getTags({});
    }).toThrow('invalid arguments');
    expect(() => {
      getTags({ curr: '10', icon: 10 });
    }).toThrow('invalid arguments');
  });

  it('should return correct type', () => {
    expect(tags instanceof Array).toEqual(true);
    expect(typeof tags[1]).toEqual('string');
  });

  it('should return correct values', () => {
    expect(tags[0]).toEqual('summer');
    expect(tags[1]).toEqual('sky');
    expect(tags[2]).toEqual('rain');
  });
});

import MAP from './MAP.js';
import SkyconsContructor from '../../node_modules/skycons/skycons.js';

export function getRandomNumber(num) {
  if (!num || typeof num !== 'number' || num < 0) {
    throw new Error('invalid arguments');
  }

  return Math.floor(Math.random() * num);
}

export function toFahrenheit(val) {
  if (!val || typeof val !== 'number') {
    throw new Error('invalid arguments');
  }

  return Math.round((val * 9) / 5 + 32);
}

export function getDateTime(lang, gmtOffset = 10800) {
  if (typeof gmtOffset !== 'number' || typeof lang !== 'string') {
    throw new Error('invalid arguments');
  }
  const offset = (gmtOffset - 10800) * 1000;
  const langArr = MAP[lang];

  const fakeDate = new Date();
  const ms = fakeDate.valueOf() + offset;
  const date = new Date(ms);

  const weekDay = langArr.short[date.getDay()];
  const day = date.getDate();
  const month = langArr.month[date.getMonth()];

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;

  const dateTime = `${weekDay} ${day} ${month}        ${h}:${m}:${s}`;

  return dateTime;
}

export function getTags(curr) {
  if (
    !(curr instanceof Object) ||
    !curr.time ||
    !curr.icon ||
    typeof curr.time !== 'number' ||
    typeof curr.icon !== 'string'
  ) {
    throw new Error('invalid arguments');
  }

  const { time, icon } = curr;

  const date = new Date(time * 1000);
  const month = date.getMonth();
  const hours = date.getHours();

  const weather = MAP.icon[icon];

  let dayTime;
  if (hours >= 6 && hours <= 9) {
    dayTime = 'morning';
  } else if (hours >= 10 && hours <= 17) {
    dayTime = 'day';
  } else if (hours >= 18 && hours <= 20) {
    dayTime = 'evening';
  } else {
    dayTime = 'night';
  }

  let yearTime;
  if (month >= 2 && month <= 4) {
    yearTime = 'spring';
  } else if (month >= 5 && month <= 7) {
    yearTime = 'summer';
  } else if (month >= 8 && month <= 10) {
    yearTime = 'autumn';
  } else {
    yearTime = 'winter';
  }

  return [yearTime, dayTime, weather];
}

export function showBG(url) {
  document.body.style.background = `url("${url}") center / cover no-repeat`;
}

export function convertDDToDMS(deg) {
  if (typeof deg !== 'number') {
    throw new Error('invalid arguments');
  }

  let dir = '';
  if (deg < 0) {
    dir = '-';
  }

  let d = parseInt(deg, 10);
  const minFloat = Math.abs((deg - d) * 60);
  let m = Math.floor(minFloat);
  const secFloat = (minFloat - m) * 60;
  let s = Math.round(secFloat);
  d = Math.abs(d);

  if (s === 60) {
    m += 1;
    s = 0;
  }
  if (m === 60) {
    d += 1;
    m = 0;
  }

  return `${dir}${d}° ${m}' ${s}"`;
}

export function setAnimatedIcons(forecast) {
  const Skycons = SkyconsContructor(window);
  const skycons = new Skycons({ color: 'white', resizeClear: true });

  skycons.add('icon-main', forecast.currently.icon);
  skycons.add(
    document.querySelector('.icon-daily-0'),
    forecast.daily.data[0].icon
  );
  skycons.add(
    document.querySelector('.icon-daily-1'),
    forecast.daily.data[1].icon
  );
  skycons.add(
    document.querySelector('.icon-daily-2'),
    forecast.daily.data[2].icon
  );
  skycons.play();
}

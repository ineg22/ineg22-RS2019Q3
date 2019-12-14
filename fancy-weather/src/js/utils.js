import MAP from './MAP.js';

export function getRandomNumber(num) {
  return Math.floor(Math.random() * num);
}

export function toFahrenheit(val) {
  return Math.round((val * 9) / 5 + 32);
}

export function getDateTime(gmtOffset = 10800) {
  const offset = (gmtOffset - 10800) * 1000;
  const lang = document.querySelector('.lang-select').value.toLowerCase();
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
  const { time, icon } = curr;

  const date = new Date(time * 1000);
  const month = date.getMonth();
  const hours = date.getHours();

  const weather = MAP.icon[icon][1];

  let dayTime;
  if (hours >= 8 && hours <= 20) {
    dayTime = 'sky';
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

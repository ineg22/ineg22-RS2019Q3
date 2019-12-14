import MAP from './MAP.js';

export default function getRandomNumber(num) {
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

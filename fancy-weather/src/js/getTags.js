import MAP from './MAP.js';

export default function getTags(curr) {
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

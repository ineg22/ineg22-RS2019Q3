import MAP from '../MAP.js';
import { getGeocode } from '../api/getMap.js';
import getBelarusianGeocode from '../api/getBelarusianGeocode.js';
import { toFahrenheit } from '../utils.js';

export default async function renderWeather(
  forecastData,
  location,
  lang,
  meas
) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const langArray = MAP[lang];

  const { currently, daily } = forecastData;

  let currTemp;
  let apparentTemp;
  switch (meas) {
    case 'C':
      currTemp = Math.round(currently.temperature);
      apparentTemp = Math.round(Math.round(currently.apparentTemperature));
      break;
    case 'F':
      currTemp = toFahrenheit(currently.temperature);
      apparentTemp = toFahrenheit(currently.apparentTemperature);
      break;
    default:
      break;
  }

  const { latitude, longitude } = location;
  let locality;
  if (lang !== 'be') {
    const geo = await getGeocode([latitude, longitude], lang);
    locality = geo.geoObjects.get(0).properties.getAll().balloonContentBody;
  } else {
    locality = await getBelarusianGeocode(`${latitude},${longitude}`);
  }

  const forecastWrapper = document.createElement('div');
  forecastWrapper.classList.add('forecast-wrapper');

  const locationEl = document.createElement('div');
  locationEl.classList.add('location');
  locationEl.innerHTML = locality;

  const dateTime = document.createElement('div');
  dateTime.classList.value = 'date-time dots';

  const forecastShort = document.createElement('span');
  forecastShort.classList.add('forecast-short');
  forecastShort.textContent = langArray.weather[currently.icon];

  const mainIcon = document.createElement('i');
  const mainIconName = MAP.icon[currently.icon][0];
  mainIcon.classList.value = `wi ${mainIconName} icon-main`;

  const forecastCurrent = document.createElement('div');
  forecastCurrent.classList.add('forecast-current');

  const tempSpan = document.createElement('span');
  tempSpan.classList.add('forecast-current__temp');
  tempSpan.textContent = `${currTemp}°`;

  forecastCurrent.append(tempSpan, mainIcon);

  const feelsSpan = document.createElement('span');
  feelsSpan.classList.add('forecast-detail__feels');
  feelsSpan.textContent = `${langArray.other[4]} ${apparentTemp}°`;

  const windSpan = document.createElement('span');
  windSpan.classList.add('forecast-detail__wind');
  windSpan.textContent = `${langArray.other[5]} ${Math.round(
    currently.windSpeed
  )}${langArray.other[6]}`;

  const humiditySpan = document.createElement('span');
  humiditySpan.classList.add('forecast-detail__humidity');
  humiditySpan.textContent = `${langArray.other[7]} ${Math.round(
    currently.humidity
  )}%`;

  const forecastDetail = document.createElement('div');
  forecastDetail.classList.add('forecast-detail');
  forecastDetail.append(feelsSpan, windSpan, humiditySpan);

  // ------------------
  const { week } = MAP[lang];

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 3; i += 1) {
    const el = document.createElement('div');
    el.classList.add('forecast-daily__day');

    let day = dayOfWeek + i + 1;
    let temperatureHigh;
    let temperatureLow;

    if (day > 6) {
      day -= 7;
    }

    switch (meas) {
      case 'C':
        temperatureHigh = Math.round(daily.data[i].temperatureHigh);
        temperatureLow = Math.round(daily.data[i].temperatureLow);
        break;
      case 'F':
        temperatureHigh = toFahrenheit(daily.data[i].temperatureHigh);
        temperatureLow = toFahrenheit(daily.data[i].temperatureLow);
        break;
      default:
        break;
    }

    const spanDay = document.createElement('p');
    spanDay.classList.add('forecast-daily__week-day');
    spanDay.textContent = week[day];

    const spanTempHight = document.createElement('span');
    spanTempHight.classList.add('forecast-daily__temp-hight');
    spanTempHight.textContent = `${temperatureHigh}°`;

    const spanTempLow = document.createElement('span');
    spanTempLow.classList.add('forecast-daily__temp-low');
    spanTempLow.textContent = `${temperatureLow}°`;

    const icon = document.createElement('i');
    const iconName = MAP.icon[daily.data[i].icon][0];
    icon.classList.value = `wi ${iconName} forecast-daily__icon`;

    el.append(spanDay, icon, spanTempHight, spanTempLow);
    fragment.appendChild(el);
  }

  // ------------------
  const forecastDaily = document.createElement('div');
  forecastDaily.classList.add('forecast-daily');

  forecastDaily.appendChild(fragment);

  forecastWrapper.append(
    locationEl,
    dateTime,
    forecastShort,
    forecastCurrent,
    forecastDetail,
    forecastDaily
  );

  return forecastWrapper;
}

import refreshHandler from './refreshHandler.js';
import searchHandler from './searchHandler.js';
import micHandler from './micHandler.js';

function measCHandler() {
  const meas = 'C';

  localStorage.setItem('meas', meas);
  document.location.reload();
}

function measFHandler() {
  const meas = 'F';

  localStorage.setItem('meas', meas);
  document.location.reload();
}

function langHandler() {
  const lang = document.querySelector('.lang-select').value.toLowerCase();

  localStorage.setItem('lang', lang);
  document.location.reload();
}

export default function initControls(tags, map, meas, timeInterval) {
  const buttonRefresh = document.querySelector('.button-refresh');
  const buttonSearch = document.querySelector('.button-search');
  const buttonMic = document.querySelector('.button-mic');
  const langSelect = document.querySelector('.lang-select');
  const measureC = document.querySelector('.measure-c');
  const measureF = document.querySelector('.measure-f');
  let newInterval = timeInterval;
  let newTags = tags;

  buttonRefresh.addEventListener('click', () => {
    refreshHandler(newTags);
  });

  buttonSearch.addEventListener('click', e => {
    searchHandler(e, map, meas, newInterval, tags).then(res => {
      newInterval = res.newInterval;
      newTags = res.newTags;
    });
  });

  langSelect.addEventListener('change', langHandler);

  measureC.addEventListener('click', measCHandler);

  measureF.addEventListener('click', measFHandler);

  buttonMic.addEventListener('mousedown', micHandler);
}

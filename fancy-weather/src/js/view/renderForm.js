import '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

import MAP from '../MAP.js';

export default function renderForm(lang = 'en', meas = 'C') {
  const [search, placeholder] = MAP[lang].other;

  const formWrapper = document.createElement('form');
  formWrapper.classList.add('form-wrapper');

  const refreshBtn = document.createElement('button');
  refreshBtn.setAttribute('type', 'button');
  refreshBtn.setAttribute('title', 'refresh background');
  refreshBtn.classList.value = 'btn btn-secondary button-refresh';

  const refreshIcon = document.createElement('i');
  refreshIcon.classList.value = 'fas fa-redo-alt icon-refresh';
  refreshBtn.appendChild(refreshIcon);

  const langSelect = document.createElement('select');
  langSelect.classList.value = 'form-control lang-select';

  const langEn = document.createElement('option');
  langEn.classList.add('lang-en');
  langEn.textContent = 'En';

  const langRu = document.createElement('option');
  langRu.classList.add('lang-ru');
  langRu.textContent = 'Ru';

  const langBe = document.createElement('option');
  langBe.classList.add('lang-be');
  langBe.textContent = 'Be';

  langSelect.append(langEn, langRu, langBe);

  const measureC = document.createElement('button');
  measureC.setAttribute('type', 'button');
  measureC.classList.value = 'btn btn-secondary measure-c';
  measureC.textContent = '°C';

  const measureF = document.createElement('button');
  measureF.setAttribute('type', 'button');
  measureF.classList.value = 'btn btn-secondary measure-f';
  measureF.textContent = '°F';

  const micEl = document.createElement('i');
  micEl.classList.value = 'fas fa-microphone-alt';

  const micButton = document.createElement('button');
  micButton.classList.value = 'button-mic';
  micButton.setAttribute('type', 'button');
  micButton.appendChild(micEl);

  const searchButton = document.createElement('button');
  searchButton.classList.value = 'btn btn-secondary button-search';
  searchButton.textContent = search;

  const inputGroupAppend = document.createElement('div');
  inputGroupAppend.classList.add('input-group-append');
  inputGroupAppend.append(micButton, searchButton);

  const inputText = document.createElement('input');
  inputText.classList.value = 'form-control input-search';
  inputText.setAttribute('type', 'text');
  inputText.setAttribute('placeholder', placeholder);

  const inputGroup = document.createElement('div');
  inputGroup.classList.value = 'input-group input-wrapper';

  const controlWrapper = document.createElement('div');
  controlWrapper.classList.add('control-wrapper');

  switch (lang) {
    case 'en':
      langEn.setAttribute('selected', true);
      break;
    case 'ru':
      langRu.setAttribute('selected', true);
      break;
    case 'be':
      langBe.setAttribute('selected', true);
      break;
    default:
      break;
  }

  switch (meas) {
    case 'C':
      measureC.classList.add('selected');
      break;
    case 'F':
      measureF.classList.add('selected');
      break;
    default:
      break;
  }

  controlWrapper.append(refreshBtn, langSelect, measureC, measureF);
  inputGroup.append(inputText, inputGroupAppend);
  formWrapper.append(controlWrapper, inputGroup);

  return formWrapper;
}

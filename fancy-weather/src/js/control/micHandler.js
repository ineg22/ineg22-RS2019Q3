export default function micHandler() {
  // eslint-disable-next-line
  const recognizer = new webkitSpeechRecognition();
  const lang = document.querySelector('.lang-select').value.toLowerCase();
  let langFormatted;

  switch (lang) {
    case 'en':
      langFormatted = 'en-US';
      break;
    case 'ru':
      langFormatted = 'ru-RU';
      break;
    case 'be':
      langFormatted = 'ru-RU';
      break;
    default:
      break;
  }

  recognizer.lang = langFormatted;

  function onRecognizeHandler(e) {
    const result = e.results[e.resultIndex];
    document.querySelector('.input-search').value = result[0].transcript;
    document.querySelector('.button-search').click();
  }
  recognizer.onresult = onRecognizeHandler;

  recognizer.start();
}

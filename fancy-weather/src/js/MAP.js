const MAP = {
  ru: {
    week: [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
    month: [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ],
    short: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    other: [
      'Найти',
      'Найти город',
      'Широта: ',
      'Долгота: ',
      'Ощущается как ',
      'Скорость ветра: ',
      ' м/с',
      'Влажность: ',
    ],
    weather: {
      'clear-day': 'безоблачно',
      'clear-night': 'безоблачно',
      'partly-cloudy-day': 'частичная облачность',
      'partly-cloudy-night': 'частичная облачность',
      rain: 'дождь',
      snow: 'снег',
      sleet: 'дождь со снегом',
      wind: 'ветренно',
      fog: 'туман',
      cloudy: 'облачно',
    },
  },
  en: {
    week: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    month: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    other: [
      'Search',
      'Search city',
      'Latitude: ',
      'Longitude: ',
      'Feels like: ',
      'Wind speed: ',
      ' m/s',
      'Humidity: ',
    ],
    weather: {
      'clear-day': 'cloudless',
      'clear-night': 'cloudless',
      'partly-cloudy-day': 'partial cloud cover',
      'partly-cloudy-night': 'partial cloud cover',
      rain: 'rain',
      snow: 'snow',
      sleet: 'sleet',
      wind: 'wind',
      fog: 'fog',
      cloudy: 'cloudy',
    },
  },
  be: {
    week: [
      'Нядзеля',
      'Панядзелак',
      'Аўторак',
      'Серада',
      'Чацвер',
      'Пятніца',
      'Субота',
    ],
    month: [
      'студзеня',
      'лютага',
      'сакавіка',
      'красавіка',
      'траўня',
      'чэрвеня',
      'ліпеня',
      'жніўня',
      'верасня',
      'кастрычніка',
      'лістапада',
      'снежня',
    ],
    short: ['Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб', 'Нядзеля'],
    other: [
      'Знайсці',
      'Пошук горада',
      'Шырата: ',
      'Даўгата: ',
      'Адчуваецца як: ',
      'Хуткасць ветра: ',
      ' м/с',
      'Вільготнасць: ',
    ],
    weather: {
      'clear-day': 'бясхмарна',
      'clear-night': 'бясхмарна',
      'partly-cloudy-day': 'часткова воблачна',
      'partly-cloudy-night': 'часткова воблачна',
      rain: 'дождж',
      snow: 'снег',
      sleet: 'мокры снег',
      wind: 'вецер',
      fog: 'мгла',
      cloudy: 'воблачна',
    },
  },
  icon: {
    'clear-day': ['wi-day-sunny', 'clear'],
    'clear-night': ['wi-night-clear', 'clear,sky'],
    'partly-cloudy-day': ['wi-day-cloudy', 'sky'],
    'partly-cloudy-night': ['wi-night-partly-cloudy', 'sky,cloud'],
    rain: ['wi-rain', 'rain'],
    snow: ['wi-snow', 'snowing'],
    sleet: ['wi-sleet', 'sleet'],
    wind: ['wi-windy', 'windy'],
    fog: ['wi-fog', 'foggy'],
    cloudy: ['wi-cloudy', 'cloud'],
  },
};

export default MAP;
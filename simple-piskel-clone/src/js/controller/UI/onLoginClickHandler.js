import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAq-Rdw-3csIsBwWwEpwsorGOH1tHpTaRA',
  authDomain: 'simple-piskel-cl-1578690335062.firebaseapp.com',
  databaseURL: 'https://simple-piskel-cl-1578690335062.firebaseio.com',
  projectId: 'simple-piskel-cl-1578690335062',
  storageBucket: 'simple-piskel-cl-1578690335062.appspot.com',
  messagingSenderId: '546963642760',
  appId: '1:546963642760:web:c1e5c1ae63914d7e68023d',
  measurementId: 'G-5F173TJ7H2',
};

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

export default function onLoginClickHandler() {
  const userInfoElement = document.querySelector('.user-info');
  const loginBtn = document.querySelector('.login');
  const userPhotoElement = document.querySelector('.user-info__photo');
  const userNameElement = document.querySelector('.user-info__user-name');

  if (userInfoElement.classList.contains('hidden')) {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;

        userInfoElement.classList.remove('hidden');
        loginBtn.textContent = 'log out';

        userPhotoElement.style.backgroundImage = `url('${photoURL}')`;
        userNameElement.textContent = displayName;
        userInfoElement.setAttribute('title', email);
      })
      .catch(err => {
        throw new Error(err);
      });
  } else {
    userInfoElement.classList.add('hidden');
    loginBtn.textContent = 'log in';
  }
}

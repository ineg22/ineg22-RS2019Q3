/* eslint-disable no-undef */
/* eslint-disable new-cap */
const loginEl = document.querySelector('#login');
const logoutEl = document.querySelector('#logout');
const loginOutput = document.querySelector('#login-output');
const userAvatar = document.querySelector('#user-avatar');
const userAcc = document.querySelector('#user-acc');
const userName = document.querySelector('#user-name');

async function loginSuccess(token) {
  const userData = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  }).then(res => res.json());

  loginEl.classList.add('hidden');
  loginOutput.classList.remove('hidden');
  userAvatar.style.backgroundImage = `url("${userData.avatar_url}")`;
  userAcc.setAttribute('href', userData.html_url);
  userName.innerText = userData.login;
}

function loginHandler(e) {
  e.preventDefault();
  const authenticator = new netlify.default({});
  authenticator.authenticate({ provider: 'github', scope: 'user' }, (err, data) => {
    if (err) {
      throw new Error('Authenticating error');
    } else {
      loginSuccess(data.token);
    }
  });
}

function logoutHandler() {
  loginEl.classList.remove('hidden');
  loginOutput.classList.add('hidden');
}

loginEl.addEventListener('click', loginHandler);
logoutEl.addEventListener('click', logoutHandler);

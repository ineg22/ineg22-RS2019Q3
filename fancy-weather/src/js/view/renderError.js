function errorButtonHandler(e) {
  if (e.keyCode === 13 || e.type === 'click') {
    document.querySelector('.fake').remove();
    window.removeEventListener('keypress', errorButtonHandler);
  }
}

export default function renderError({ name, message }) {
  const errorName = document.createElement('h5');
  errorName.classList.value = 'error-name modal-title';
  errorName.textContent = name;

  const errorHeader = document.createElement('div');
  errorHeader.classList.value = 'error-header modal-header';
  errorHeader.appendChild(errorName);

  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = message;

  const errorBody = document.createElement('div');
  errorBody.classList.value = 'error-body modal-body';
  errorBody.appendChild(errorMessage);

  const errorButton = document.createElement('button');
  errorButton.classList.value = 'btn btn-secondary error-button';
  errorButton.setAttribute('type', 'button');
  errorButton.textContent = 'Okay ;(';
  errorButton.addEventListener('click', errorButtonHandler);
  window.addEventListener('keypress', errorButtonHandler);

  const errorFooter = document.createElement('div');
  errorFooter.classList.value = 'error-footer modal-footer';
  errorFooter.appendChild(errorButton);

  const errorWrap = document.createElement('div');
  errorWrap.classList.add('error-wrapper');
  errorWrap.append(errorHeader, errorBody, errorFooter);

  const fake = document.createElement('div');
  fake.classList.add('fake');
  fake.appendChild(errorWrap);

  document.body.appendChild(fake);
}

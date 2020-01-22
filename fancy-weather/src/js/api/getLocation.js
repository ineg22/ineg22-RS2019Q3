import renderError from '../view/renderError.js';

function getCurrentPosition() {
  const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export default async function getUserLocation() {
  try {
    const { coords } = await getCurrentPosition();
    return coords;
  } catch (err) {
    err.name = 'Geolocation Error';
    renderError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}

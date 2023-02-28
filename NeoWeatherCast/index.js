const container = document.querySelector('.container');
const input = document.querySelector('.search-box input');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelectorAll('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
  const APIKey = '4dfbd2afa6bd5548734879c99369c6fb';
  const city = document.querySelector('.search-box input').value;

  if (city === '') return;
  getResponse(APIKey, city);
});

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById('search-btn').click();
  }
});

async function getResponse(APIKey, city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  );
  const json = await response.json();
  container.style.height = 'auto';

  if (json.cod === '404') {
    weatherBox.style.display = 'none';
    weatherDetails.forEach((el) => {
      el.style.display = 'none';
    });
    error404.style.display = 'block';
    error404.classList.add('fadeIn');
    return;
  }

  error404.style.display = 'none';
  error404.classList.remove('fadeIn');

  const image = document.querySelector('.weather-box img');
  const temperature = document.querySelector('.weather-box .temperature');
  const description = document.querySelector('.weather-box .description');
  const humidity = document.querySelector('.weather-details .humidity span');
  const wind = document.querySelector('.weather-details .wind span');
  const feelsLike = document.querySelector('.weather-details .feels-like span');
  const pressure = document.querySelector('.weather-details .pressure span');

  switch (json.weather[0].main) {
    case 'Clear':
      image.src = 'images/clear.png';
      break;

    case 'Rain':
      image.src = 'images/rain.png';
      break;

    case 'Snow':
      image.src = 'images/snow.png';
      break;

    case 'Clouds':
      image.src = 'images/cloud.png';
      break;

    case 'Haze':
      image.src = 'images/mist.png';
      break;

    default:
      image.src = '';
  }

  temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
  description.innerHTML = `${json.weather[0].description}`;
  humidity.innerHTML = `${json.main.humidity}%`;
  wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
  feelsLike.innerHTML = `${parseInt(json.main.feels_like)}°C`;
  pressure.innerHTML = `${parseInt(json.main.pressure)}hPa`;

  weatherBox.style.display = '';
  weatherDetails.forEach((el) => {
    el.style.display = '';
    el.classList.add('fadeIn');
  });
  weatherBox.classList.add('fadeIn');
}

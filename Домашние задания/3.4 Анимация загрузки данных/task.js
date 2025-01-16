const apiEndpoint = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';

const fetchCourses = async () => {
  try {
    const response = await fetch(apiEndpoint);
    const { response: { Valute: currencyData } } = await response.json();
    return Object.keys(currencyData).map(key => {
      const { CharCode: code, Name: currency, Value: value } = currencyData[key];
      return { code, value, currency };
    });
  } catch (error) {
    throw new Error('Ошибка при получении курсов: ' + error.message);
  }
};

const createItemElement = ({ code, value, currency }) => {
  const itemsContainer = document.getElementById('items');
  const itemElement = document.createElement('div');
  itemElement.classList.add('item');

  itemElement.innerHTML = `
    <div class="item__code">${code}</div>
    <div class="item__value">${value}</div>
    <div class="item__currency">${currency}</div>
  `;

  itemsContainer.appendChild(itemElement);
};

document.addEventListener('DOMContentLoaded', async () => {
  const loaderElement = document.getElementById('loader');
  loaderElement.classList.add('loader_active');

  try {
    const courses = await fetchCourses();
    courses.forEach(createItemElement);
  } catch (error) {
    alert(error.message);
  } finally {
    loaderElement.classList.remove('loader_active');
  }
});

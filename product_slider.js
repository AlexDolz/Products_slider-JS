// ************************ Task ****************************************

// Задана ссылка на источник:
// let url = "https://dummyjson.com/products"

// Цель задачи -  реализовать страницу с переключением товаров. К работе выдвинуты следующие требования:

// Структура страницы должна приблизительно соответствовать макету (см ниже). Стилизация элементов может быть произвольной
// Должны быть реализованы следующие функции: fetch, render, rating и события для кнопок.
// В момент загрузки страницы должен отображаться первый товар (id = 1)
// После наступления события должен формироваться новый запрос, получающий id следующего/предыдущего товара.
// Предусмотрите возможность ограничить переключение на несуществующие товары (id которых меньше 1 или больше 30)

let url = 'https://dummyjson.com/products';
const root = document.querySelector('#root');

// fetch function
function getProducts(id) {
  fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(data => renderProduct(data));
}

// render function
const productContainer = document.createElement('div');
productContainer.className = 'product_container';

function renderProduct({ images, title, price, rating }) {
  productContainer.innerHTML = '';

  const productCard = document.createElement('div');
  productCard.className = 'product_card';

  const productImg = document.createElement('img');
  productImg.className = 'product_img';
  productImg.src = images[0];
  productImg.alt = 'img of product';

  const productTitle = document.createElement('p');
  productTitle.className = 'product_text';
  productTitle.innerText = `Title: ${title}`;

  const productPrice = document.createElement('p');
  productPrice.className = 'product_text';
  productPrice.innerText = `Price: ${price}$`;

  productCard.append(productImg, productTitle, productPrice, getRating(rating));
  productContainer.append(productCard);
  root.append(productContainer);
}

// rating function

function getRating(rating) {
  const stars = Math.round(rating);
  const ratingContainer = document.createElement('div');
  ratingContainer.className = 'rating_container';

  for (let i = 0; i < 5; i++) {
    const spanElem = document.createElement('span');
    if (stars > i) {
      spanElem.className = 'fa fa-star active';
    } else {
      spanElem.className = 'fa fa-star';
    }
    ratingContainer.append(spanElem);
  }
  return ratingContainer;
}

// Buttons addEventListener

let n = 1;

const [prevBtn, nextBtn] = document.querySelectorAll('button');

function changeProduct(n) {
  fetch(`https://dummyjson.com/products/${n}`)
    .then(res => res.json())
    .then(data => renderProduct(data));
}

prevBtn.addEventListener('click', () => {
  if (n === 1) {
    n = 31;
  }
  changeProduct(--n);
});
nextBtn.addEventListener('click', () => {
  if (n === 30) {
    n = 0;
  }
  changeProduct(++n);
});

getProducts(1);

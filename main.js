// const pizzaList = document.querySelector('.pizza-list');
// const menuButtons = document.querySelectorAll('.menu-item');
// const cartButton = document.querySelector('.cart-button');
// const cartItems = [];
// const sortSelect = document.getElementById('sort'); 

// document.addEventListener('DOMContentLoaded', () => {
//     fetch('db.json')
//         .then(response => response.json())
//         .then(data => {

//             function renderPizzas(pizzas) {
//                 pizzaList.innerHTML = '';
//                 pizzas.forEach(pizza => {
//                     const pizzaItem = document.createElement('div');
//                     pizzaItem.classList.add('pizza-item');
//                     pizzaItem.innerHTML = `
//                         <img src="${pizza.img}" alt="${pizza.name}" class="pizza-img">
//                         <h3>${pizza.name}</h3>
//                         <div class="options">
//                             ${pizza.crusts.map(crust => `<span>${crust}</span>`).join('')}
//                             ${pizza.sizes.map(size => `<span>${size}</span>`).join('')}
//                         </div>
//                         <p class="price">${pizza.price} ₽</p>
//                         <button class="add-button" id="button-${pizza.name}">
//                             <span>+</span> Добавить
//                         </button>
//                     `;
//                     pizzaList.appendChild(pizzaItem);

//                     const button = pizzaItem.querySelector('.add-button');
//                     button.addEventListener('click', () => {
//                         let zakaz = prompt(`${pizza.name} - Pitsa nechta zakaz qilmoqchisiz?`);
//                         zakaz = parseInt(zakaz);
//                         let total;

//                         if (isNaN(zakaz) || zakaz <= 0) {
//                             alert("Zakaz keram emasmi.. afsus");
//                         } else {
//                             total = pizza.price * zakaz;
//                             alert(`Umumiy narx: ${total} ₽. Zakaz qabul qilindi.`);
//                             alert('Zakasingiz qabul qilindi, iltimos 5 daqiqa kutib turing.');

//                             cartItems.push({
//                                 name: pizza.name,
//                                 quantity: zakaz,
//                                 price: pizza.price
//                             });

//                             localStorage.setItem('cart', JSON.stringify(cartItems));

//                             const cartCount = document.querySelector('.cart-count');
//                             cartCount.textContent = cartItems.length;

//                             window.location.href = 'user.html';
//                         }
//                     });
//                 });
//             }

//             renderPizzas(data.pizzas);

//             menuButtons.forEach(button => {
//                 button.addEventListener('click', () => {
//                     menuButtons.forEach(btn => btn.classList.remove('active'));
//                     button.classList.add('active');

//                     const category = button.getAttribute('data-category');
//                     let filteredPizzas;

//                     if (category === 'all') {
//                         filteredPizzas = data.pizzas;
//                     } else {
//                         filteredPizzas = data.pizzas.filter(pizza => pizza.category === category);
//                     }

//                     renderPizzas(filteredPizzas);
//                 });
//             });

//             sortSelect.addEventListener('change', () => {
//                 const sortValue = sortSelect.value;
//                 let sortedPizzas = [...data.pizzas];

//                 switch (sortValue) {
//                     case 'popularity':
//                         break;
//                     case 'price':
//                         sortedPizzas.sort((a, b) => a.price - b.price);
//                         break;
//                     case 'alphabet':
//                         sortedPizzas.sort((a, b) => a.name.localeCompare(b.name));
//                         break;
//                     default:
//                         break;
//                 }

//                 renderPizzas(sortedPizzas);
//             });

//             cartButton.addEventListener('click', () => {
//                 window.location.href = 'user.html';
//             });

//         })
//         .catch(error => console.error('Error loading pizzas:', error));

//     if (window.location.pathname.endsWith('user.html')) {
//         const cartData = JSON.parse(localStorage.getItem('cart')) || [];

//         const cartContainer = document.querySelector('.cart-container');
//         cartContainer.innerHTML = '';

//         if (cartData.length === 0) {
//             cartContainer.innerHTML = '<p>Sizning kartangiz bo\'sh.</p>';
//         } else {
//             cartData.forEach(item => {
//                 const cartItem = document.createElement('div');
//                 cartItem.classList.add('cart-item');
//                 cartItem.innerHTML = `
//                     <p>Pizza: ${item.name}</p>
//                     <p>Quantity: ${item.quantity}</p>
//                     <p>Total Price: ${item.price * item.quantity} ₽</p>
//                 `;
//                 cartContainer.appendChild(cartItem);
//             });
//         }
//     }
// });
const pizzaList = document.querySelector('.pizza-list');
const menuButtons = document.querySelectorAll('.menu-item');
const cartButton = document.querySelector('.cart-button');
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const sortSelect = document.getElementById('sort'); 

document.addEventListener('DOMContentLoaded', () => {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {

            function renderPizzas(pizzas) {
                pizzaList.innerHTML = '';
                pizzas.forEach(pizza => {
                    const pizzaItem = document.createElement('div');
                    pizzaItem.classList.add('pizza-item');
                    pizzaItem.innerHTML = `
                        <img src="${pizza.img}" alt="${pizza.name}" class="pizza-img">
                        <h3>${pizza.name}</h3>
                        <div class="options">
                            ${pizza.crusts.map(crust => `<span>${crust}</span>`).join('')}
                            ${pizza.sizes.map(size => `<span>${size}</span>`).join('')}
                        </div>
                        <p class="price">${pizza.price}</p>  <!-- Показываем цену как есть -->
                        <button class="add-button" id="button-${pizza.name}">
                            <span>+</span> Добавить
                        </button>
                    `;
                    pizzaList.appendChild(pizzaItem);

                    const button = pizzaItem.querySelector('.add-button');
                    button.addEventListener('click', () => {
                        let zakaz = prompt(`${pizza.name} - Pitsa nechta zakaz qilmoqchisiz?`);
                        zakaz = parseInt(zakaz);
                        if (isNaN(zakaz) || zakaz <= 0) {
                            alert("Zakaz keram emasmi.. afsus");
                        } else {
                            const price = parseInt(pizza.price.replace(/[^\d]/g, '')); // Извлекаем только число из цены
                            const total = price * zakaz;

                            alert(`Umumiy narx: ${total} ₽. Zakaz qabul qilindi.`);
                            alert('Zakasingiz qabul qilindi, iltimos 5 daqiqa kutib turing.');

                            // Проверяем, есть ли такая пицца в корзине
                            let existingPizza = cartItems.find(item => item.name === pizza.name);
                            if (existingPizza) {
                                existingPizza.quantity += zakaz;  // Увеличиваем количество
                            } else {
                                cartItems.push({
                                    name: pizza.name,
                                    quantity: zakaz,
                                    price: price
                                });
                            }

                            localStorage.setItem('cart', JSON.stringify(cartItems));

                            // Обновляем счетчик в корзине
                            const cartCount = document.querySelector('.cart-count');
                            cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0); // Считаем общее количество товаров

                            // Не переходим на корзину
                        }
                    });
                });
            }

            renderPizzas(data.pizzas);

            menuButtons.forEach(button => {
                button.addEventListener('click', () => {
                    menuButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    const category = button.getAttribute('data-category');
                    let filteredPizzas;

                    if (category === 'all') {
                        filteredPizzas = data.pizzas;
                    } else {
                        filteredPizzas = data.pizzas.filter(pizza => pizza.category === category);
                    }

                    renderPizzas(filteredPizzas);
                });
            });

            sortSelect.addEventListener('change', () => {
                const sortValue = sortSelect.value;
                let sortedPizzas = [...data.pizzas];

                switch (sortValue) {
                    case 'popularity':
                        break;
                    case 'price':
                        sortedPizzas.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')));
                        break;
                    case 'alphabet':
                        sortedPizzas.sort((a, b) => a.name.localeCompare(b.name));
                        break;
                    default:
                        break;
                }

                renderPizzas(sortedPizzas);
            });

            cartButton.addEventListener('click', () => {
                window.location.href = 'cart.html'; // Перенаправление на страницу корзины
            });

        })
        .catch(error => console.error('Error loading pizzas:', error));
});


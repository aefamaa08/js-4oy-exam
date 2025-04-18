const cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cart-container");

if (cart.length === 0) {
    container.innerHTML = "<p style='font-size:20px; text-align:center; margin-top: 40px;'>🧺 Корзина пуста</p>";
} else {
    let html = "<ul style='list-style:none; padding:0;'>";
    let total = 0;  // Общая сумма
    let totalItems = 0;  // Общее количество товаров

    cart.forEach((pizza, index) => {
        const pizzaTotal = pizza.price * pizza.quantity;  // Стоимость всех пицц одного типа
        total += pizzaTotal;  // Добавляем стоимость этого типа пиццы в общую сумму
        totalItems += pizza.quantity;  // Добавляем количество пицц в общий итог

        html += `<li style="display:flex; justify-content:space-between; margin-bottom:10px; background:#fff; padding:10px; border-radius:8px;">
            <div>${pizza.name} — ${pizza.price} ₽ × ${pizza.quantity} шт = ${pizzaTotal} ₽</div>
            <button onclick="removeItem(${index})" class="add-btn">Удалить</button>
        </li>`;
    });

    html += "</ul>";
    html += `<p><strong>Итого:</strong> ${total} ₽ (${totalItems} шт.)</p>`;  // Отображаем общую сумму и количество товаров
    html += `<button onclick="clearCart()" class="add-btn">Очистить корзину</button>`;
    container.innerHTML = html;
}

function removeItem(index) {
    cart.splice(index, 1);  // Удаляем товар из корзины
    localStorage.setItem("cart", JSON.stringify(cart));  // Сохраняем изменения в localStorage
    location.reload();  // Перезагружаем страницу для обновления данных
}

function clearCart() {
    localStorage.removeItem("cart");  // Очищаем корзину в localStorage
    location.reload();  // Перезагружаем страницу для обновления данных
}

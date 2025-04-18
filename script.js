const pizzaList = document.getElementById('pizza-list');
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartBtn = document.getElementById('cart-btn');
    const totalPrice = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');
    const cart = {};

    async function fetchPizzas() {
        const res = await fetch('db.json');
        const json = await res.json();
        const data = json.pizzas;        
      const data = await res.json();
      renderPizzas(data);
    }

    function renderPizzas(pizzas) {
      pizzaList.innerHTML = '';
      pizzas.forEach(pizza => {
        const div = document.createElement('div');
        div.className = 'pizza-item';
        div.innerHTML = `
          <img src="${pizza.imageUrl}" alt="${pizza.title}" />
          <h3>${pizza.title}</h3>
          <p>от ${pizza.price} ₽</p>
          <button onclick='addToCart(${JSON.stringify(pizza)})'>+ Добавить</button>
        `;
        pizzaList.appendChild(div);
      });
    }

    function addToCart(pizza) {
      const id = pizza.id;
      if (!cart[id]) {
        cart[id] = { ...pizza, count: 1 };
      } else {
        cart[id].count++;
      }
      updateCart();
    }

    function updateCart() {
      const items = Object.values(cart);
      cartItems.innerHTML = '';
      let total = 0;
      let count = 0;
      items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.title} x${item.count} — ${item.price * item.count} ₽`;
        cartItems.appendChild(li);
        total += item.price * item.count;
        count += item.count;
      });
      cartTotal.textContent = `${total} ₽`;
      totalPrice.textContent = `${total} ₽`;
      cartCount.textContent = count;
    }

    function checkout() {
      alert('Заказ оформлен!');
    }

    function closeCart() {
      cartModal.classList.add('hidden');
    }

    cartBtn.onclick = () => {
      cartModal.classList.toggle('hidden');
    };

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.onclick = async () => {
        const category = btn.dataset.category;
        const res = await fetch('http://localhost:3000/pizzas');
        let data = await res.json();
        if (category !== 'all') {
          data = data.filter(p => p.category == category);
        }
        renderPizzas(data);
      };
    });

    fetchPizzas();ч
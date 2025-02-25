const cart = {};

        function updateCart() {
            const cartList = document.getElementById("cart");
            cartList.innerHTML = "";
            Object.entries(cart).forEach(([id, product]) => {
                const li = document.createElement("li");
                li.className = "product";
                li.innerHTML = `
                <div>
                        <p><strong>${product.name}</strong></p>
                        <p>R$ ${product.price.toFixed(2)}</p>
                    </div>
                    <div class="buttons">
                        <button onclick="removeFromCart('${id}')">-</button>
                        <span>${product.quantity}</span>
                        <button onclick="addToCart('${id}', '${product.name}', ${product.price})">+</button>
                    </div>
                `;
                cartList.appendChild(li);
            });
        }

        function addToCart(id, name, price) {
            if (cart[id]) {
                cart[id].quantity += 1;
            } else {
                cart[id] = { name, price, quantity: 1 };
            }
            updateCart();
        }

        function removeFromCart(id) {
            if (cart[id]) {
                cart[id].quantity -= 1;
                if (cart[id].quantity === 0) {
                    delete cart[id];
                }
            }
            updateCart();
        }
document.addEventListener("DOMContentLoaded", function () {
    // Carrega o carrinho do localStorage ou inicia vazio
    let cart = JSON.parse(localStorage.getItem("carrinho")) || {};
    console.log("Página carregada. Carrinho inicial do localStorage:", cart);

    updateCart();

    // Função para adicionar ao carrinho
    window.addToCart = function (id, name, price) {
        console.log("Adicionando ao carrinho:", { id, name, price });
        if (cart[id]) {
            cart[id].quantity += 1;
        } else {
            cart[id] = { name, price, quantity: 1 };
        }
        salvarCarrinho();
        updateCart();
    };

    // Função para remover do carrinho
    window.removeFromCart = function (id) {
        if (cart[id]) {
            cart[id].quantity -= 1;
            if (cart[id].quantity === 0) {
                delete cart[id];
                console.log("Item removido completamente:", id);
            }
            salvarCarrinho();
            updateCart();
        }
    };

    // Salva o carrinho no localStorage
    function salvarCarrinho() {
        localStorage.setItem("carrinho", JSON.stringify(cart));
        console.log("Carrinho salvo no localStorage:", cart);
    };

    // Atualiza a exibição do carrinho na sidebar
    function updateCart() {
        const cartList = document.getElementById("cart");
        if (!cartList) {
            console.error("Elemento #cart não encontrado.");
            return;
        }
        cartList.innerHTML = "";
        if (Object.keys(cart).length === 0) {
            cartList.innerHTML = "<li>Carrinho vazio</li>";
        } else {
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
    }

    // Exibe a seção de checkout
    function exibirCheckout() {
        const checkoutSection = document.getElementById("checkout-section");
        const checkoutList = document.getElementById("checkout-list");
        const totalElement = document.getElementById("checkout-total");

        if (!checkoutSection || !checkoutList || !totalElement) {
            console.error("Elementos de checkout não encontrados.");
            return;
        }

        checkoutList.innerHTML = "";
        if (Object.keys(cart).length === 0) {
            checkoutList.innerHTML = "<li>Carrinho vazio</li>";
            totalElement.textContent = "Total: R$ 0,00";
            console.log("Carrinho está vazio.");
        } else {
            Object.entries(cart).forEach(([id, product]) => {
                console.log("Adicionando item à lista de checkout:", product);
                const li = document.createElement("li");
                li.textContent = `${product.name} - R$${product.price.toFixed(2)} x ${product.quantity}`;
                checkoutList.appendChild(li);
            });
            const total = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
            totalElement.textContent = `Total: R$${total.toFixed(2)}`;
            console.log("Total calculado:", total);
        }

        checkoutSection.style.display = "block";
        document.querySelector(".container").style.display = "none"; // Oculta o conteúdo principal
    }

    // Fecha a seção de checkout
    function fecharCheckout() {
        const checkoutSection = document.getElementById("checkout-section");
        if (checkoutSection) {
            checkoutSection.style.display = "none";
            document.querySelector(".container").style.display = "flex"; // Restaura o conteúdo principal
        }
    }

    // Evento para o botão "Finalizar Compra"
    const finalizarCompraBtn = document.getElementById("finalizar-compra");
    if (finalizarCompraBtn) {
        console.log("Botão #finalizar-compra encontrado.");
        finalizarCompraBtn.addEventListener("click", function () {
            if (Object.keys(cart).length > 0) {
                console.log("Exibindo checkout com carrinho:", cart);
                exibirCheckout();
            } else {
                alert("Adicione itens ao carrinho antes de finalizar a compra!");
            }
        });
    } else {
        console.error("Botão #finalizar-compra não encontrado.");
    }

    // Evento para o botão "Fechar"
    const fecharCheckoutBtn = document.getElementById("fechar-checkout");
    if (fecharCheckoutBtn) {
        fecharCheckoutBtn.addEventListener("click", fecharCheckout);
    } else {
        console.error("Botão #fechar-checkout não encontrado.");
    }

    // Evento para o botão "Confirmar Pedido"
    const botaoFinalizar = document.querySelector(".botao-finalizar");
    if (botaoFinalizar) {
        botaoFinalizar.addEventListener("click", function () {
            console.log("Compra finalizada. Limpando carrinho.");
            alert("Compra finalizada com sucesso!");
            localStorage.removeItem("carrinho");
            cart = {};
            updateCart();
            fecharCheckout();
        });
    } else {
        console.error("Botão .botao-finalizar não encontrado.");
    }
});
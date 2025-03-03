document.addEventListener("DOMContentLoaded", function () {
    // Carrega o carrinho do localStorage ou inicia vazio
    let cart = JSON.parse(localStorage.getItem("carrinho")) || {};
    console.log("Página carregada. Carrinho inicial do localStorage:", cart);

    updateCheckout(); // Atualiza diretamente o checkout, pois é a única página agora

    // Função para atualizar o checkout (substitui updateCart para o contexto do checkout)
    function updateCheckout() {
        const checkoutList = document.getElementById("checkout-list");
        const totalElement = document.getElementById("checkout-total");

        if (!checkoutList || !totalElement) {
            console.error("Elementos #checkout-list ou #checkout-total não encontrados.");
            return;
        }

        checkoutList.innerHTML = "";
        if (Object.keys(cart).length === 0) {
            checkoutList.innerHTML = "<li class='checkout-empty'>Carrinho vazio</li>";
            totalElement.textContent = "Total: R$ 0,00";
            console.log("Carrinho está vazio.");
        } else {
            Object.entries(cart).forEach(([id, product]) => {
                console.log("Adicionando item à lista de checkout:", product);
                const li = document.createElement("li");
                li.innerHTML = `
                    <span class="checkout-item-name">${product.name}</span>
                    <span class="checkout-item-details">R$${product.price.toFixed(2)} x ${product.quantity}</span>
                `;
                checkoutList.appendChild(li);
            });
            const total = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
            totalElement.textContent = `Total: R$${total.toFixed(2)}`;
            console.log("Total calculado:", total);
        }
    }

    // Função para salvar o carrinho no localStorage
    function salvarCarrinho() {
        localStorage.setItem("carrinho", JSON.stringify(cart));
        console.log("Carrinho salvo no localStorage:", cart);
    }

    // Evento para o botão "Confirmar Pedido"
    const botaoFinalizar = document.querySelector(".botao-finalizar");
    if (botaoFinalizar) {
        botaoFinalizar.addEventListener("click", function () {
            console.log("Compra finalizada. Limpando carrinho, mas sem redirecionamento automático.");
            alert("Compra finalizada com sucesso!");
            localStorage.removeItem("carrinho");
            cart = {}; // Limpa o carrinho local
            updateCheckout(); // Atualiza a exibição após limpar
        });
    } else {
        console.error("Botão .botao-finalizar não encontrado.");
    }

    // Removidas funções não usadas no checkout (addToCart, removeFromCart, exibirCheckout, fecharCheckout)
    // Pois o checkout não precisa adicionar ou remover itens, apenas exibir e finalizar
});
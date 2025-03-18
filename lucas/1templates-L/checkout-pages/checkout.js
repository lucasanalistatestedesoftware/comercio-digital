// Mapeamento de IDs de produtos para caminhos de imagem, com nomes reais das imagens
const productImages = {
    'airpods': '../../img-L/produtos/airpods pro 3.png', // Ajustado para o caminho relativo correto
    'smartwatch_m7': '../../img-L/produtos/Smart Watch Smartband M7.png',
    'smartwatch_d20': '../../img-L/produtos/smartwatchd20.jpg',
    'garrafa_termica': '../../img-L/produtos/garrafater.png',
    'fone_bluetooth': '../../img-L/produtos/fones.png',
    'smartband_m4': '../../img-L/produtos/smartband (1).jpg',
    'moletom_jordan': 'https://m.media-amazon.com/images/I/41BauTo6uzL._AC_SX679_.jpg',
    'moletom_neon': 'https://m.media-amazon.com/images/I/51jdjDv4ZEL.__AC_SY445_SX342_QL70_ML2_.jpg',
    'moletom_hiphop': 'https://m.media-amazon.com/images/I/51-QeDJjfXL._AC_SX679_.jpg',
    'moletom_colorblock': 'https://m.media-amazon.com/images/I/61nrMv5qHSL.__AC_SY445_SX342_QL70_ML2_.jpg',
    'moletom_zipper': 'https://m.media-amazon.com/images/I/61DVwMmbZNL.__AC_SY445_SX342_QL70_ML2_.jpg',
    'moletom_graffiti': 'https://m.media-amazon.com/images/I/51uiOnZKDeL._AC_SX522_.jpg',
    'smartwatch_d20_sup': 'https://blog.probiotica.com.br/wp-content/uploads/2016/05/Probiotica2016-PRO-Massa3200-3Kg-Morango-full.png',
    'whey_max': 'https://lojamaxtitanium.vtexassets.com/assets/vtex/assets-builder/lojamaxtitanium.theme/1.4.74-beta.0/placeholders/rewards1___0d25d87cfcf0696f48dc655a289f49ff.png',
    'massa_3200': 'https://static.netshoes.com.br/produtos/creatine-turbo-300g-black-skull/01/G54-4177-001/G54-4177-001_zoom1.jpg?ts=1650625727&ims=544x',
    'whey_black': 'https://static.netshoes.com.br/produtos/whey-100-hd-refil-900g-black-skull/99/G54-6388-799/G54-6388-799_zoom1.jpg?ts=1663172399&',
    'creatina_hardcore': 'https://static.netshoes.com.br/produtos/creatina-monohidratada-hardcore-reload-300-gr-integralmedica/01/252-0831-001/252-0831-001_zoom1.jpg?ts=1587553967&ims=544x',
    'whey_gold': 'https://www.gsuplementos.com.br/upload/growth-layout-personalizado/produto/185/produto-selo-topo-new-v3.png'
};

// Função para gerar detalhes fictícios com base no nome do produto
function getProductDetails(productName) {
    switch (productName.toLowerCase()) {
        case 'garrafa térmica 500 ml':
            return `
                <p><strong>Descrição:</strong> Garrafa térmica com termômetro display LED, capacidade de 500 ml, cor branca. Mantém líquidos quentes ou frios por até 12 horas.</p>
                <p><strong>Especificações:</strong> Material: Inox; Dimensões: 25cm x 7cm; Peso: 300g.</p>
                <p><strong>Garantia:</strong> 1 ano contra defeitos de fabricação.</p>
            `;
        case 'airpods pro 2023 3ª geração - réplica premium':
            return `
                <p><strong>Descrição:</strong> AirPods Pro 2023 réplica premium, 3ª geração, com cancelamento de ruído ativo e carregamento sem fio.</p>
                <p><strong>Especificações:</strong> Bateria: até 6h de uso; Conexão: Bluetooth 5.0; Peso: 45g.</p>
                <p><strong>Garantia:</strong> 6 meses contra defeitos de fabricação.</p>
            `;
        case 'smart watch smartband m7 relógio inteligente android ios':
            return `
                <p><strong>Descrição:</strong> Smart Watch Smartband M7, compatível com Android e iOS, com monitoramento de frequência cardíaca e passos.</p>
                <p><strong>Especificações:</strong> Tela: 1.54" TFT; Bateria: até 7 dias; Conexão: Bluetooth 4.2.</p>
                <p><strong>Garantia:</strong> 1 ano contra defeitos de fabricação.</p>
            `;
        case 'smartwatch d20':
            return `
                <p><strong>Descrição:</strong> Relógio Smartwatch Android Ios Inteligente D20 Bluetooth, com monitoramento de atividades e notificações.</p>
                <p><strong>Especificações:</strong> Tela: 1.3" TFT; Bateria: até 5 dias; Conexão: Bluetooth 4.0.</p>
                <p><strong>Garantia:</strong> 1 ano contra defeitos de fabricação.</p>
            `;
        default:
            return `
                <p><strong>Descrição:</strong> Produto de alta qualidade com entrega rápida e suporte ao cliente.</p>
                <p><strong>Especificações:</strong> Consulte o vendedor para mais detalhes.</p>
                <p><strong>Garantia:</strong> 6 meses contra defeitos de fabricação.</p>
            `;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Carrega o carrinho do localStorage ou inicia vazio
    let cart = JSON.parse(localStorage.getItem("carrinho")) || {};
    console.log("Página carregada. Carrinho inicial do localStorage:", cart);

    updateCheckout();

    // Exibe o popup de endereço ao carregar a página
    showAddressPopup();

    // Função para atualizar o checkout
    function updateCheckout() {
        const checkoutList = document.getElementById("checkout-list");
        const subtotalElement = document.getElementById("subtotal");
        const freteElement = document.getElementById("frete");
        const totalEstimadoElement = document.getElementById("total-estimado");
        const impostosElement = document.getElementById("impostos");

        if (!checkoutList || !subtotalElement || !freteElement || !totalEstimadoElement || !impostosElement) {
            console.error("Elementos de checkout não encontrados.");
            return;
        }

        checkoutList.innerHTML = ""; // Limpa o checkout para re-renderizar
        if (Object.keys(cart).length === 0) {
            checkoutList.innerHTML = "<li class='checkout-empty'>Carrinho vazio</li>";
            subtotalElement.textContent = "R$ 0,00";
            freteElement.textContent = "R$ 28,10";
            totalEstimadoElement.textContent = "R$ 0,00";
            impostosElement.textContent = "R$ 15,04";
            console.log("Carrinho está vazio.");
        } else {
            // Atualiza o título "Carrinho (X)" dinamicamente
            const cartCount = Object.keys(cart).length;
            document.querySelector(".checkout-title").textContent = `Carrinho (${cartCount})`;

            // Verifica se o formato do cart no localStorage está correto
            Object.entries(cart).forEach(([id, product]) => {
                console.log("Item no carrinho:", { id, product });
                if (!product || !product.name || !product.price || !product.quantity) {
                    console.error("Formato inválido no carrinho para o ID:", id, "Produto:", product);
                    return; // Pula itens inválidos
                }

                const li = document.createElement("li");
                const imageSrc = productImages[id] || '../../img-L/produtos/default.png'; // Imagem padrão ajustada
                li.innerHTML = `
                    <div class="cart-item" data-id="${id}">
                        <img src="${imageSrc}" alt="${product.name}" class="cart-item-image" onerror="this.src='../../img-L/2.png';">
                        <span class="checkout-item-name">${product.name}</span>
                        <div class="cart-item-actions">
                            <button class="remove-btn" onclick="adjustQuantity('${id}', -1)">-</button>
                            <span class="quantity">${product.quantity}</span>
                            <button class="add-btn" onclick="adjustQuantity('${id}', 1)">+</button>
                        </div>
                        <span class="checkout-item-price">R$${product.price.toFixed(2)}</span>
                        <button class="details-btn">Ver Detalhes</button>
                        <div class="product-details" style="display: none;">
                            ${getProductDetails(product.name)}
                        </div>
                    </div>
                `;
                checkoutList.appendChild(li);
            });
            updateTotals();

            // Adiciona eventos para os botões "Ver Detalhes"
            document.querySelectorAll(".details-btn").forEach(btn => {
                btn.addEventListener("click", function () {
                    const cartItem = this.closest(".cart-item");
                    const details = cartItem.querySelector(".product-details");
                    if (details.style.display === "none") {
                        details.style.display = "block";
                        cartItem.classList.add("expanded");
                        btn.textContent = "Ocultar Detalhes";
                    } else {
                        details.style.display = "none";
                        cartItem.classList.remove("expanded");
                        btn.textContent = "Ver Detalhes";
                    }
                });
            });
        }
    }

    // Função para ajustar a quantidade e atualizar os totais
    window.adjustQuantity = function (id, change) {
        console.log("Ajustando quantidade para o ID:", id, "Mudança:", change);
        if (cart[id]) {
            cart[id].quantity = Math.max(1, cart[id].quantity + change); // Garante que a quantidade não seja menor que 1
            if (cart[id].quantity === 0) {
                delete cart[id]; // Remove o item se a quantidade chegar a 0
                console.log("Item removido completamente:", id);
            }
            salvarCarrinho();
            updateCheckout();
        } else {
            console.error("Produto não encontrado no carrinho:", id);
        }
    };

    // Função para atualizar os totais (subtotal, frete, total estimado, impostos)
    function updateTotals() {
        const subtotalElement = document.getElementById("subtotal");
        const freteElement = document.getElementById("frete");
        const totalEstimadoElement = document.getElementById("total-estimado");
        const impostosElement = document.getElementById("impostos");

        const subtotal = Object.values(cart).reduce((acc, item) => {
            if (item && item.price && item.quantity) {
                return acc + item.price * item.quantity;
            }
            return acc;
        }, 0);
        const frete = 28.10; // Valor fixo de frete, como no print
        const impostos = 15.04; // Valor fixo de impostos, como no print
        const totalEstimado = subtotal + frete + impostos;

        subtotalElement.textContent = `R$${subtotal.toFixed(2)}`;
        freteElement.textContent = `R$${frete.toFixed(2)}`;
        totalEstimadoElement.textContent = `R$${totalEstimado.toFixed(2)}`;
        impostosElement.textContent = `R$${impostos.toFixed(2)}`;
        console.log("Total calculado:", { subtotal, frete, totalEstimado, impostos });
    }

    // Função para salvar o carrinho no localStorage
    function salvarCarrinho() {
        localStorage.setItem("carrinho", JSON.stringify(cart));
        console.log("Carrinho salvo no localStorage:", cart);
    }

    // Função para exibir o popup de endereço
    function showAddressPopup() {
        const popup = document.createElement("div");
        popup.id = "address-popup";
        popup.innerHTML = `
            <h2>Endereço Necessário</h2>
            <p>Para prosseguir com o checkout, por favor cadastre seu endereço.</p>
            <button id="add-address-btn">Adicione um Endereço</button>
        `;

        const overlay = document.createElement("div");
        overlay.id = "popup-overlay";

        document.body.appendChild(overlay);
        document.body.appendChild(popup);

        const addAddressBtn = document.getElementById("add-address-btn");
        addAddressBtn.addEventListener("click", function () {
            console.log("Redirecionando para a página de endereços...");
            window.location.href = "../enderecos/enderecos.html";
            document.body.removeChild(popup);
            document.body.removeChild(overlay);
        });
    }

    // Evento para o botão "Continuar"
    const botaoContinuar = document.querySelector(".botao-continuar");
    if (botaoContinuar) {
        botaoContinuar.addEventListener("click", function () {
            console.log("Prosseguindo para a próxima etapa do checkout.");
            alert("Prosseguindo para a próxima etapa do pagamento!");
            // Aqui você pode redirecionar para uma página de pagamento ou manter como está
            // Por exemplo: window.location.href = "pagamento.html";
        });
    } else {
        console.error("Botão .botao-continuar não encontrado.");
    }
});
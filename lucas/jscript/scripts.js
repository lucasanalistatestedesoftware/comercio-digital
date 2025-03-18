// Definindo os infoprodutos
const infoprodutos = [
    { id: "marketing_digital", nome: "Marketing Digital para Infoprodutores: Além das Fórmulas e Métodos...", preco: 19.90, img: "https://m.media-amazon.com/images/I/71+ESogMqXL._AC_UL320_.jpg", link: "#" },
    { id: "formula_lancamento", nome: "A fórmula do lançamento", preco: 56.97, img: "https://m.media-amazon.com/images/I/71DvY8PIuxL._AC_UL320_.jpg", link: "#" },
    { id: "gestao_digital", nome: "Gestão digital: O guia essencial para alcançar o sucesso no mercado on-line", preco: 19.90, img: "https://m.media-amazon.com/images/I/513AyRmzGyL._AC_UL320_.jpg", link: "#" },
    { id: "apaixone_se_problema", nome: "Apaixone-se Pelo Problema, Não Pela Solução: Como Ganhar Dinheiro Online", preco: 45.90, img: "https://m.media-amazon.com/images/I/81LQ5Mr3cAL._SL1500_.jpg", link: "#" },
    { id: "ai_superpowers", nome: "AI Superpowers: China, Vale do Silício e a Nova Ordem Mundial", preco: 46.16, img: "https://m.media-amazon.com/images/I/81LVeClECoL._SL1500_.jpg", link: "#" }
];

// Variável global para o carrinho
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM carregado, iniciando scripts...");
    console.log("Carrinho inicial:", carrinho);

    // Renderiza os infoprodutos sem "Ver Mais/Ver Menos"
    const container = document.getElementById("infoprodutos");
    if (container) {
        console.log("Renderizando infoprodutos...");
        container.innerHTML = ""; // Limpa o conteúdo estático
        infoprodutos.forEach(produto => {
            const card = document.createElement("div");
            card.className = "anuncio infoproduto";
            card.innerHTML = `
                <img class="suple" src="${produto.img}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p class="preco">R$${produto.preco.toFixed(2)}</p>
                <span class="rating">★★★★★ (50+ vendidos)</span>
                <a href="${produto.link}" class="infosaiba-mais" data-id="${produto.id}" data-nome="${produto.nome}" data-preco="${produto.preco}">Saiba Mais</a>
                <a href="#" class="botao-adicionar infocomprar" data-id="${produto.id}" data-nome="${produto.nome}" data-preco="${produto.preco}">Adicionar ao Carrinho</a>
            `;
            container.appendChild(card);
        });
        console.log("Infoprodutos renderizados:", infoprodutos.length, "itens");
    } else {
        console.error("Elemento #infoprodutos não encontrado!");
    }

    // Configura o slider-2 (mantém sua lógica original)
    function iniciarSegundoSlider() {
        const slides2 = document.querySelector(".slides-2");
        let slideIndex = 0;

        if (!slides2) {
            console.error("Elemento .slides-2 não encontrado para o segundo slider.");
            return;
        }

        function moveSlide() {
            slideIndex = (slideIndex + 1) % 3;
            slides2.style.transform = `translateX(-${slideIndex * 33.33}%)`;
        }

        setInterval(moveSlide, 3000);
    }

    iniciarSegundoSlider();

    // Carrossel
    const carousel = document.querySelector(".carousel");
    const items = document.querySelectorAll(".carousel-item");
    let indexCarousel = 0;
    const itemWidth = items[0]?.offsetWidth + 20 || 0; // Adiciona margem
    const totalItems = items.length;

    function updateCarousel() {
        if (carousel) {
            carousel.style.transform = `translateX(${-indexCarousel * itemWidth}px)`;
        }
    }

    function nextCarousel() {
        indexCarousel = (indexCarousel + 1) % totalItems;
        updateCarousel();
    }

    if (carousel && items.length > 0) {
        setInterval(nextCarousel, 3000);
    }

    // Mini Slide e Frases Dinâmicas (unificado)
    const frases = [
        "Neo-Commerce Brasil",
        "Frete Grátis para todo o Brasil!",
        "Descontos imperdíveis, aproveite agora!",
        "Parcelamos suas compras em até 12x sem juros!",
        "Ganhe brindes em compras acima de R$ 199!"
    ];

    let indexFrase = 0;
    const fraseElemento = document.querySelector(".mini-slide-text");

    function trocarFrase() {
        const slides = document.querySelectorAll(".mini-slide-text");
        slides.forEach(slide => slide.classList.remove("active"));
        indexFrase = (indexFrase + 1) % frases.length;
        slides[indexFrase % slides.length].textContent = frases[indexFrase];
        slides[indexFrase % slides.length].classList.add("active");
    }

    if (fraseElemento) {
        fraseElemento.textContent = frases[0];
        fraseElemento.classList.add("active");
        setInterval(trocarFrase, 3000);
    }

    // Atualiza o carrinho ao carregar a página
    atualizarCarrinho();

    // Configura os botões "Adicionar ao Carrinho" e "Comprar Agora"
    const botoesAdicionar = document.querySelectorAll(".botao-adicionar, .infocomprar");
    console.log("Botões de adicionar encontrados:", botoesAdicionar.length);
    botoesAdicionar.forEach(botao => {
        botao.addEventListener("click", function (event) {
            event.preventDefault();
            const anuncio = botao.closest(".anuncio") || botao.closest(".produto-card");
            let produtoNome, produtoPreco, produtoId;

            if (botao.classList.contains("infocomprar")) {
                produtoId = botao.getAttribute("data-id");
                produtoNome = botao.getAttribute("data-nome");
                produtoPreco = parseFloat(botao.getAttribute("data-preco"));
            } else {
                produtoNome = anuncio.querySelector("h3").textContent.trim();
                produtoPreco = parseFloat(anuncio.querySelector(".preco").textContent.replace("R$", "").replace(",", "."));
                produtoId = botao.getAttribute("data-id") || `produto-${Date.now()}`;
            }
            adicionarAoCarrinho(produtoId, produtoNome, produtoPreco);
        });
    });

    // Configura os botões "Ver Mais" e "Ver Menos" para outras seções
    const categorySections = document.querySelectorAll(".category-section");
    categorySections.forEach(section => {
        const sectionId = section.id;
        if (sectionId === "infoprodutos") return; // Ignora a seção de infoprodutos

        const verMaisDiv = section.querySelector(".ver-mais");
        if (verMaisDiv) {
            const verMenosDiv = document.createElement("div");
            verMenosDiv.className = "ver-menos";
            verMenosDiv.innerHTML = `<button class="botao-ver-menos" style="display: none;">Ver Menos</button>`;
            section.appendChild(verMenosDiv);

            const botaoVerMais = verMaisDiv.querySelector(".botao-ver-mais");
            const botaoVerMenos = verMenosDiv.querySelector(".botao-ver-menos");

            botaoVerMais.addEventListener("click", function (event) {
                event.preventDefault();
                const hiddenItems = section.querySelectorAll(".anuncio.hidden");
                hiddenItems.forEach(item => item.classList.remove("hidden"));
                this.style.display = "none";
                botaoVerMenos.style.display = "inline-block";
                console.log(`Botão 'Ver Mais' clicado na seção ${sectionId}, itens exibidos.`);
            });

            botaoVerMenos.addEventListener("click", function (event) {
                event.preventDefault();
                const anuncios = section.querySelectorAll(".anuncio");
                for (let i = Math.ceil(anuncios.length / 2); i < anuncios.length; i++) {
                    anuncios[i].classList.add("hidden");
                }
                this.style.display = "none";
                botaoVerMais.style.display = "inline-block";
                console.log(`Botão 'Ver Menos' clicado na seção ${sectionId}, itens escondidos.`);
            });
        }
    });

    // Configura os botões "Saiba Mais"
    const botoesSaibaMais = document.querySelectorAll(".infosaiba-mais");
    console.log("Botões Saiba Mais encontrados:", botoesSaibaMais.length);
    botoesSaibaMais.forEach(botao => {
        botao.addEventListener("click", function (event) {
            event.preventDefault();
            const id = botao.getAttribute("data-id");
            const nome = botao.getAttribute("data-nome");
            const preco = parseFloat(botao.getAttribute("data-preco")) || 0;
            verMais(id, nome, preco);
        });
    });

    // Função para adicionar ao carrinho
    function adicionarAoCarrinho(id, nome, preco) {
        console.log("Adicionando ao carrinho:", { id, nome, preco });
        if (carrinho[id]) {
            carrinho[id].quantity += 1;
        } else {
            carrinho[id] = { name: nome, price: preco, quantity: 1 };
        }
        salvarCarrinho();
        atualizarCarrinho();
        exibirCarrinho();
        console.log(`${nome} adicionado ao carrinho sem pop-up.`);
    }

    // Salva o carrinho no localStorage
    function salvarCarrinho() {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        console.log("Carrinho salvo no localStorage:", carrinho);
    }

    // Atualiza o contador no ícone do carrinho
    function atualizarCarrinho() {
        const carrinhoIcon = document.querySelector(".bntcar");
        let contador = carrinhoIcon ? carrinhoIcon.querySelector(".contador") : null;
        let totalItens = Object.values(carrinho).reduce((acc, item) => acc + item.quantity, 0);

        console.log("Atualizando carrinho. Total de itens:", totalItens);

        if (totalItens > 0) {
            if (!contador && carrinhoIcon) {
                contador = document.createElement("span");
                contador.classList.add("contador");
                carrinhoIcon.appendChild(contador);
            }
            if (contador) {
                contador.textContent = totalItens;
            }
        } else {
            if (contador) {
                contador.remove();
                console.log("Carrinho vazio, contador removido.");
            }
        }
    }

    // Exibe o carrinho com os itens
    function exibirCarrinho() {
        const carrinhoDiv = document.querySelector("#carrinho");
        const lista = document.querySelector("#lista-carrinho");
        if (!carrinhoDiv || !lista) {
            console.error("Elemento #carrinho ou #lista-carrinho não encontrado.");
            return;
        }
        console.log("Exibindo carrinho com", Object.keys(carrinho).length, "itens.");
        lista.innerHTML = "";

        if (Object.keys(carrinho).length === 0) {
            lista.innerHTML = "<li>Carrinho vazio</li>";
        } else {
            Object.entries(carrinho).forEach(([id, item]) => {
                if (item.name && item.name !== "undefined") {
                    let li = document.createElement("li");
                    let selectOptions = "";
                    for (let i = 1; i <= 100; i++) {
                        selectOptions += `<option value="${i}" ${item.quantity === i ? "selected" : ""}>${i}</option>`;
                    }
                    li.innerHTML = `
                        ${item.name} - R$${item.price.toFixed(2)}
                        <select class="quantidade" data-id="${id}">
                            ${selectOptions}
                        </select>
                        <button class="remover" data-id="${id}">Remover</button>
                    `;
                    lista.appendChild(li);
                }
            });
        }
        carrinhoDiv.style.display = "block";
        centralizarCarrinho();
    }

    // Abre o carrinho ao clicar no botão
    const botaoCarrinho = document.querySelector(".bntcar");
    if (botaoCarrinho) {
        console.log("Botão do carrinho encontrado.");
        botaoCarrinho.addEventListener("click", () => {
            console.log("Clique no botão do carrinho detectado.");
            exibirCarrinho();
        });
    } else {
        console.error("Botão .bntcar não encontrado no DOM.");
    }

    // Fecha o carrinho
    const fecharCarrinho = document.querySelector("#fechar-carrinho");
    if (fecharCarrinho) {
        fecharCarrinho.addEventListener("click", () => {
            document.querySelector("#carrinho").style.display = "none";
            console.log("Carrinho fechado.");
        });
    } else {
        console.error("Botão #fechar-carrinho não encontrado.");
    }

    // Evento para o botão "Prosseguir"
    const prosseguirCheckout = document.getElementById("prosseguir-checkout");
    if (prosseguirCheckout) {
        console.log("Botão #prosseguir-checkout encontrado.");
        prosseguirCheckout.addEventListener("click", function () {
            if (Object.keys(carrinho).length > 0) {
                console.log("Redirecionando para checkout.html com carrinho:", carrinho);
                window.location.href = "/lucas/1templates-L/checkout-pages/checkout.html"; // Caminho atualizado
            } else {
                alert("Adicione itens ao carrinho antes de prosseguir!");
                console.log("Tentativa de redirecionar com carrinho vazio.");
            }
        });
    } else {
        console.error("Botão #prosseguir-checkout não encontrado.");
    }

    // Função para "Ver Mais"
    function verMais(id, nome, preco) {
        console.log(`Clicou em Ver Mais: ${nome}, ID: ${id}`);
        if (id === "airpod_replica") {
            console.log("Redirecionando para checkout.html para AirPod...");
            window.location.href = "/lucas/1templates-L/checkout-pages/checkout.html"; // Caminho atualizado
        } else {
            alert(`Mais detalhes sobre ${nome}: Preço R$${preco.toFixed(2)}. Clique em 'Comprar Agora' para prosseguir!`);
        }
    }

    // Gerencia mudanças na quantidade
    document.addEventListener("change", function (event) {
        if (event.target.classList.contains("quantidade")) {
            const id = event.target.dataset.id;
            const novaQuantidade = parseInt(event.target.value);
            if (carrinho[id]) {
                carrinho[id].quantity = novaQuantidade;
                salvarCarrinho();
                atualizarCarrinho();
                exibirCarrinho();
            }
        }
    });

    // Gerencia cliques no botão de remover
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remover")) {
            const id = event.target.dataset.id;
            delete carrinho[id];
            salvarCarrinho();
            atualizarCarrinho();
            exibirCarrinho();
        }
    });

    // Lógica para arrastar o carrinho
    const carrinhoDiv = document.querySelector("#carrinho");
    const header = document.querySelector("#carrinho-header");
    if (!header) {
        console.error("Elemento #carrinho-header não encontrado.");
    } else {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;

        header.addEventListener("mousedown", startDragging);
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", stopDragging);

        function startDragging(e) {
            initialX = e.clientX - currentX;
            initialY = e.clientY - currentY;
            isDragging = true;
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                carrinhoDiv.style.left = `${currentX}px`;
                carrinhoDiv.style.top = `${currentY}px`;
            }
        }

        function stopDragging() {
            isDragging = false;
        }

        function centralizarCarrinho() {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const carrinhoWidth = carrinhoDiv.offsetWidth;
            const carrinhoHeight = carrinhoDiv.offsetHeight;

            currentX = (windowWidth - carrinhoWidth) / 2;
            currentY = (windowHeight - carrinhoHeight) / 2;

            carrinhoDiv.style.left = `${currentX}px`;
            carrinhoDiv.style.top = `${currentY}px`;
        }

        centralizarCarrinho();
    }

    // Slideshow Principal
    function iniciarSlideshow() {
        const slides = document.querySelectorAll(".slideshow-slide");
        let currentSlide = 0;

        if (slides.length === 0) {
            console.error("Nenhum slide encontrado no slideshow principal.");
            return;
        }

        function mostrarProximoSlide() {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }

        slides[currentSlide].classList.add("active");
        setInterval(mostrarProximoSlide, 3000);
    }

    iniciarSlideshow();

    // Menu Lateral
    const menuToggle = document.querySelector(".menu-toggle");
    const closeMenu = document.querySelector(".close-menu");
    const menu = document.querySelector(".menu");

    if (menuToggle && closeMenu && menu) {
        menuToggle.addEventListener("click", () => {
            menu.style.transform = "translateX(0)";
            console.log("Menu lateral aberto.");
        });
        closeMenu.addEventListener("click", () => {
            menu.style.transform = "translateX(-100%)";
            console.log("Menu lateral fechado.");
        });
    } else {
        console.error("Elementos do menu lateral (.menu-toggle, .close-menu ou .menu) não encontrados.");
    }
});
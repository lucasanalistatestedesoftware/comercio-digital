document.addEventListener("DOMContentLoaded", function () {
    // Carrega o carrinho do localStorage ou inicia vazio como objeto
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};
    atualizarCarrinho();

    console.log("DOM carregado em index.html. Carrinho inicial:", carrinho);

    // Configura os botões "Adicionar ao carrinho"
    const botoesAdicionar = document.querySelectorAll(".botao-adicionar");
    console.log("Botões de adicionar encontrados:", botoesAdicionar.length);
    botoesAdicionar.forEach(botao => {
        botao.addEventListener("click", function (event) {
            event.preventDefault();
            const anuncio = botao.closest(".anuncio");
            const produtoNome = anuncio.querySelector("h3").textContent.trim();
            const produtoPreco = parseFloat(anuncio.querySelector(".preco").textContent.replace("R$", "").replace(",", "."));
            const produtoId = botao.getAttribute("onclick").match(/'([^']+)'/)[1]; // Pega o ID do onclick
            adicionarAoCarrinho(produtoId, produtoNome, produtoPreco);
        });
    });

    // Adiciona item ao carrinho
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
    }

    // Salva o carrinho no localStorage
    function salvarCarrinho() {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        console.log("Carrinho salvo no localStorage:", carrinho);
    }

    // Atualiza o contador no ícone do carrinho
    function atualizarCarrinho() {
        const carrinhoIcon = document.querySelector(".bntcar");
        let contador = carrinhoIcon.querySelector(".contador");
        let totalItens = Object.values(carrinho).reduce((acc, item) => acc + item.quantity, 0);

        console.log("Atualizando carrinho. Total de itens:", totalItens);

        if (totalItens > 0) {
            if (!contador) {
                contador = document.createElement("span");
                contador.classList.add("contador");
                carrinhoIcon.appendChild(contador);
            }
            contador.textContent = totalItens;
        } else {
            if (contador) {
                contador.remove();
                console.log("Carrinho vazio, contador removido.");
            }
        }
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

    // Evento para o botão "Prosseguir"
    const finalizarCompraBtn = document.getElementById("finalizar-compra");
    if (finalizarCompraBtn) {
        console.log("Botão #finalizar-compra encontrado.");
        finalizarCompraBtn.addEventListener("click", function () {
            if (Object.keys(carrinho).length > 0) {
                console.log("Redirecionando para checkout.html com carrinho:", carrinho);
                window.location.href = "checkout-pages/checkout.html"; // Ajustado para o caminho correto
            } else {
                alert("Adicione itens ao carrinho antes de prosseguir!");
                console.log("Tentativa de redirecionar com carrinho vazio.");
            }
        });
    } else {
        console.error("Botão #finalizar-compra não encontrado.");
    }

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

        // Função para centralizar o carrinho
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

        // Centraliza ao carregar a página
        centralizarCarrinho();
    }

    // Slideshow functionality
    function iniciarSlideshow() {
        const slides = document.querySelectorAll(".slideshow-slide");
        let currentSlide = 0;

        if (slides.length === 0) {
            console.error("Nenhum slide encontrado no slideshow.");
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
});
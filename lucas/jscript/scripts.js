document.addEventListener("DOMContentLoaded", function () {
    // Carrega o carrinho do localStorage e verifica se é válido
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    // Filtra itens inválidos (como undefined ou nomes vazios)
    carrinho = carrinho.filter(item => item && item.nome && item.quantidade > 0);
    localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Atualiza o localStorage com dados limpos
    atualizarCarrinho();

    console.log("DOM carregado. Itens no carrinho após limpeza:", carrinho);

    // Configura os botões "Adicionar ao carrinho"
    const botoesAdicionar = document.querySelectorAll(".botao-adicionar");
    console.log("Botões de adicionar encontrados:", botoesAdicionar.length);
    botoesAdicionar.forEach(botao => {
        botao.addEventListener("click", function (event) {
            event.preventDefault();
            const anuncio = botao.closest(".anuncio");
            const produtoNome = anuncio.querySelector("h3")?.textContent.trim();
            if (produtoNome) {
                console.log("Adicionando produto:", produtoNome);
                adicionarAoCarrinho(produtoNome);
            } else {
                console.error("Nome do produto não encontrado no anúncio.");
            }
        });
    });

    // Adiciona item ao carrinho
    function adicionarAoCarrinho(produtoNome) {
        let produto = carrinho.find(item => item.nome === produtoNome);
        if (produto) {
            produto.quantidade++;
        } else {
            carrinho.push({ nome: produtoNome, quantidade: 1 });
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
        let totalItens = carrinho.length > 0 ? carrinho.reduce((acc, item) => acc + item.quantidade, 0) : 0;

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
            }
            console.log("Carrinho vazio, contador removido.");
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
        console.log("Exibindo carrinho com", carrinho.length, "itens.");
        lista.innerHTML = "";

        if (carrinho.length === 0) {
            lista.innerHTML = "<li>Carrinho vazio</li>";
        } else {
            carrinho.forEach(item => {
                if (item.nome && item.nome !== "undefined") {
                    let li = document.createElement("li");
                    let selectOptions = "";
                    for (let i = 1; i <= 100; i++) {
                        selectOptions += `<option value="${i}" ${item.quantidade === i ? "selected" : ""}>${i}</option>`;
                    }
                    li.innerHTML = `
                        ${item.nome}
                        <select class="quantidade" data-nome="${item.nome}">
                            ${selectOptions}
                        </select>
                        <button class="remover" data-nome="${item.nome}">Remover</button>
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
            const nome = event.target.dataset.nome;
            const novaQuantidade = parseInt(event.target.value);
            let produto = carrinho.find(p => p.nome === nome);
            if (produto) {
                produto.quantidade = novaQuantidade;
                salvarCarrinho();
                atualizarCarrinho();
            }
        }
    });

    // Gerencia cliques no botão de remover
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remover")) {
            carrinho = carrinho.filter(p => p.nome !== event.target.dataset.nome);
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
});
document.addEventListener("DOMContentLoaded", function () {
  let contadorCarrinho = 0;

  // Seleciona todos os botões "Adicionar ao carrinho"
  const botoesAdicionar = document.querySelectorAll(".botao-adicionar");

  // Adiciona evento de clique para cada botão
  botoesAdicionar.forEach(botao => {
      botao.addEventListener("click", function (event) {
          event.preventDefault(); // Impede a rolagem para o topo da página

          contadorCarrinho++; // Incrementa a contagem de itens no carrinho

          // Atualiza o contador no ícone do carrinho
          atualizarCarrinho();
      });
  });

  function atualizarCarrinho() {
      let carrinhoIcon = document.querySelector(".bntcar");
      
      // Verifica se já existe um contador no carrinho
      let contador = carrinhoIcon.querySelector(".contador");
      if (!contador) {
          contador = document.createElement("span");
          contador.classList.add("contador");
          carrinhoIcon.appendChild(contador);
      }

      contador.textContent = contadorCarrinho;
  }

  // slide automático
  var slides = document.querySelectorAll('.slideshow-slide');
  var currentSlide = 0;
  var slideInterval = setInterval(nextSlide, 5000);
  
  function nextSlide() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
  }

  // rolagem horizontal dos anúncios
  const container = document.querySelector('.container-4');
  const scrollLeftBtn = document.querySelector('.scroll-left-btn-1');
  const scrollRightBtn = document.querySelector('.scroll-right-btn-1');
  
  scrollLeftBtn.addEventListener('click', () => {
      container.scrollTo({
          left: container.scrollLeft - 100,
          behavior: 'smooth'
      });
  });
  
  scrollRightBtn.addEventListener('click', () => {
      container.scrollTo({
          left: container.scrollLeft + 100,
          behavior: 'smooth'
      });
  });

  const container41 = document.querySelector('.container-4-1');
  const scrollLeftBtnn = document.querySelector('.scroll-left-btn-2');
  const scrollRightBtnn = document.querySelector('.scroll-right-btn-2');
  
  scrollLeftBtnn.addEventListener('click', () => {
      container41.scrollTo({
          left: container41.scrollLeft - 100,
          behavior: 'smooth'
      });
  });
  
  scrollRightBtnn.addEventListener('click', () => {
      container41.scrollTo({
          left: container41.scrollLeft + 100,
          behavior: 'smooth'
      });
  });

  const container42 = document.querySelector('.container-4-2');
  const scrollLeftBtnnn = document.querySelector('.scroll-left-btn-3');
  const scrollRightBtnnn = document.querySelector('.scroll-right-btn-3');
  
  scrollLeftBtnnn.addEventListener('click', () => {
      container42.scrollTo({
          left: container42.scrollLeft - 100,
          behavior: 'smooth'
      });
  });
  
  scrollRightBtnnn.addEventListener('click', () => {
      container42.scrollTo({
          left: container42.scrollLeft + 100,
          behavior: 'smooth'
      });
  });
});

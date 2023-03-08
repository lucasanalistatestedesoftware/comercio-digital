// slide automático
      var slides = document.querySelectorAll('.slideshow-slide');
      var currentSlide = 0;
      var slideInterval = setInterval(nextSlide, 5000);
      
      function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
      }

// rolagem horizontal dos anuncios 
      const container = document.querySelector('.container-4');
      const scrollLeftBtn = document.querySelector('.scroll-left-btn-1');
      const scrollRightBtn = document.querySelector('.scroll-right-btn-1');
      
    scrollLeftBtn.addEventListener('click', () => {
      container.scrollTo({
        left: container.scrollLeft - 1000, // rolar 1000 pixels para a esquerda
        behavior: 'smooth' // rolar suavemente
      });
    });
    
    scrollRightBtn.addEventListener('click', () => {
      container.scrollTo({
        left: container.scrollLeft + 1000, // rolar 1000 pixels para a direita
        behavior: 'smooth' // rolar suavemente
      });
    });


    const container41 = document.querySelector('.container-4-1');
    const scrollLeftBtnn = document.querySelector('.scroll-left-btn-2');
    const scrollRightBtnn = document.querySelector('.scroll-right-btn-2');
    
  scrollLeftBtnn.addEventListener('click', () => {
    container41.scrollTo({
      left: container41.scrollLeft - 1000, // rolar 1000 pixels para a esquerda
      behavior: 'smooth' // rolar suavemente
    });
  });
  
  scrollRightBtnn.addEventListener('click', () => {
    container41.scrollTo({
      left: container41.scrollLeft + 1000, // rolar 1000 pixels para a direita
      behavior: 'smooth' // rolar suavemente
    });
  });

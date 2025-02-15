
  document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Si la animación es de una sola vez
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  });






  // Código nuevo en script.js para manejar múltiples pop-ups
document.querySelectorAll('.card-button').forEach(button => {
  button.addEventListener('click', function() {
    const targetPopup = this.getAttribute('data-popup-target');
    const popup = document.querySelector(targetPopup);
    if (popup) {
      // Reinicia la animación del contenido del pop-up
      const popupContent = popup.querySelector('.popup-content');
      popupContent.style.animation = 'none';
      popupContent.offsetHeight; // Forzar reflow
      popupContent.style.animation = '';
      popup.style.display = 'flex';
    }
  });
});

document.querySelectorAll('.popup .close').forEach(closeBtn => {
  closeBtn.addEventListener('click', function() {
    const popup = this.closest('.popup');
    popup.style.display = 'none';
  });
});


// Nuevo código en script.js para cerrar el pop-up al hacer click afuera del contenido
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', function(event) {
    if (event.target === this) {
      this.style.display = 'none';
    }
  });
});

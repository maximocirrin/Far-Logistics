
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




//formulario
document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("contact-form");
  const confirmation = document.getElementById("confirmation");
  const loading = document.getElementById("loading");

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Mostrar el logo de carga
    loading.style.display = "block";
    
    // Forzamos un pequeño retardo para que el navegador actualice la UI
    setTimeout(function(){
      const formData = new FormData(form);
      
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        // Ocultar el logo de carga
        loading.style.display = "none";
        
        if (response.ok) {
          form.reset();
          confirmation.style.display = "block";
          // Ocultar el mensaje de confirmación después de 5 segundos
          setTimeout(() => {
            confirmation.style.display = "none";
          }, 5000);
        } else {
          return response.json().then(data => {
            if (data.errors) {
              alert(data.errors.map(error => error.message).join(", "));
            } else {
              alert("Oops! Ha ocurrido un error, intenta de nuevo.");
            }
          });
        }
      })
      .catch(error => {
        // Ocultar el logo de carga
        loading.style.display = "none";
        alert("Oops! Ha ocurrido un error, intenta de nuevo.");
      });
    }, 100); // Retardo de 100ms para garantizar que el loader se muestre
  });
});

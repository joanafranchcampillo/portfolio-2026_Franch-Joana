document.addEventListener("DOMContentLoaded", () => {
  const cvTrigger = document.querySelector('.cv-trigger'); 
  const cvModal = document.getElementById('cvModal');
  const closeBubble = document.getElementById('closeCvModalBubble');
  const closeZone = document.getElementById('closeCvModalZone');

  if (!cvTrigger || !cvModal) return;

  // ✅ NUEVO BLOQUE: muestra el modal tanto en PC (hover) como en móvil (click)
const openCvModal = () => {
  cvModal.classList.remove('slide-hide');
  setTimeout(() => {
    cvModal.classList.add('show');
  }, 120);
};

cvTrigger.addEventListener('mouseenter', openCvModal); // para PC
cvTrigger.addEventListener('click', openCvModal);      // para móvil


  // Ocultar si el mouse sale del trigger
  cvTrigger.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!cvModal.matches(':hover')) {
        cvModal.classList.remove('show');
      }
    }, 100);
  });

  // Ocultar al salir del modal
  cvModal.addEventListener('mouseleave', () => {
    cvModal.classList.remove('show');
  });

  // Clic en fondo (fuera del contenido) cierra el modal
  cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) {
      cvModal.classList.remove('show');
      cvModal.classList.add('slide-hide');
    }
  });

  // cierre (hover o clic)
  if (closeBubble) {
    const triggerClose = () => {
      if (closeBubble.classList.contains('pulse')) return;

      closeBubble.classList.add('pulse');
      setTimeout(() => {
        cvModal.classList.remove('show');
        cvModal.classList.add('slide-hide');
        closeBubble.classList.remove('pulse');
      }, 400);
    };

    closeBubble.addEventListener('mouseenter', triggerClose);
    closeBubble.addEventListener('click', triggerClose);
  }

  // Botón visible (opcional)
  if (closeZone) {
    closeZone.addEventListener('click', () => {
      cvModal.classList.remove('show');
      cvModal.classList.add('slide-hide');
    });
  }
});

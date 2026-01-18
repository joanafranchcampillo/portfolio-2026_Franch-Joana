document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('letsTalkBtn');
  const modal = document.getElementById('modal');
  const tiltContainer = document.querySelector('.tilt img');
  const card = document.getElementById('contactCard');
  const contactText = document.getElementById('contactData');
  const copiedMsg = document.getElementById('copiedMsg');
  const hoverMsg = document.getElementById('hoverMsg');

  if (!btn || !modal || !card || !contactText || !copiedMsg || !hoverMsg || !tiltContainer) return;

  //  Mostrar modal al pasar el mouse por LET’S TALK
  btn.addEventListener('mouseenter', () => {
    modal.classList.add('show');
  });

// Mostrar modal en móviles con clic (y activar giroscopio)
btn.addEventListener('click', () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    modal.classList.add('show');

    if (window.DeviceOrientationEvent) {
      const activateOrientation = () => {
        window.addEventListener('deviceorientation', handleOrientation, true);
      };

      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS necesita permiso
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              activateOrientation();
            } else {
              console.warn('Permiso denegado para el giroscopio');
            }
          })
          .catch(err => {
            console.error('Error al pedir permiso para giroscopio:', err);
          });
      } else {
        // Android y navegadores comunes
        activateOrientation();
      }

      function handleOrientation(event) {
        const { beta, gamma } = event;

        const rotateX = Math.max(Math.min(beta, 30), -30);
        const rotateY = Math.max(Math.min(gamma, 30), -30);

        tiltContainer.style.transform = `rotateX(${rotateX / 6}deg) rotateY(${rotateY / 6}deg)`;
      }
    }
  }
});



  // 👉 Ocultar modal al salir del botón
  btn.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!modal.matches(':hover')) {
        modal.classList.remove('show');
        hoverMsg.classList.remove('show');
        copiedMsg.classList.remove('show');
      }
    }, 100);
  });


  // Si el clic fue directamente en el fondo (no dentro del contenido), cierra
  modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    modal.classList.add('slide-hide');
    hoverMsg.classList.remove('show');
    copiedMsg.classList.remove('show');
  }
});


  //  Efecto 3D al mover el mouse dentro del modal
  modal.addEventListener('mousemove', (e) => {
    const rect = tiltContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    tiltContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  //  Clic sobre la tarjeta → copia los datos
 card.addEventListener('click', () => {
  const text = contactText.textContent.trim();

  navigator.clipboard.writeText(text).then(() => {
    hoverMsg.classList.remove('show');
    copiedMsg.classList.add('show');

    //  Activa animación sensorial en la tarjeta
    card.classList.add('pulse');

    setTimeout(() => {
      copiedMsg.classList.remove('show');
      card.classList.remove('pulse'); // limpia la clase tras la animación
    }, 400);
  }).catch(err => {
    console.error('Error al copiar:', err);
  });
});


  // 🖱️ Hover sobre la tarjeta → muestra el mensaje
  card.addEventListener('mouseenter', () => {
    hoverMsg.classList.add('show');
  });

  card.addEventListener('mouseleave', () => {
    hoverMsg.classList.remove('show');
  });

  //  Botón clásico de cerrar (opcional)
  const closeZone = document.getElementById('closeModalZone');
  if (closeZone) {
    closeZone.addEventListener('click', () => {
      modal.classList.remove('show');
      hoverMsg.classList.remove('show');
      copiedMsg.classList.remove('show');
    });
  }

  //  Cierre interactivo por hover en zona animada
const closeBubble = document.getElementById('closeModalBubble');
if (closeBubble) {
  const triggerCloseWithEffect = () => {
    // Evita múltiples activaciones
    if (closeBubble.classList.contains('pulse')) return;

    // 1. Aplica animación sensorial
    closeBubble.classList.add('pulse');

    // 2. Espera a que termine la animación, luego cierra el modal
    setTimeout(() => {
      modal.classList.remove('show');
      modal.classList.add('slide-hide');
      hoverMsg?.classList.remove('show');
      copiedMsg?.classList.remove('show');

      // 3. Limpia para reutilizar el efecto
      closeBubble.classList.remove('pulse');
    }, 400); // debe coincidir con duración del @keyframes
  };

  // Aplica tanto para hover (mouse) como para touch/click
  closeBubble.addEventListener('mouseenter', triggerCloseWithEffect);
  closeBubble.addEventListener('click', triggerCloseWithEffect);
}








});

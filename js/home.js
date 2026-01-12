document.addEventListener("DOMContentLoaded", () => {
  //  Reloj
  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}h`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  //  Proyectos
  const projects = [
    {
      name: "e-Commerce",
      video: "media/italiana.mp4",
      tags: ["Branding", "Estratégia de marca","Posicionamiento de mercado y competencia", "Diseño y desarrollo"],
      description: "Diseño y desarrollo de presencia digital estartégica para tienda emblemática gourmet italiana de Bracelona. Enfoque en econsistema digital optimizado (web + redes) y UX para web y móvil.",
      goal: "Redefinición del público objetivo y actualización de la propuesta de valor para un nuevo segmento de mercado."
    },
    {
      name: "Brand Strategist & Community Manager",
      image: "media/fitness.png",
      tags: ["Arquitectura de marca", "Tono e identidad emocional", "Diseño visual"],
      description: "Diseño, desarrollo de marca y arquitectura de la comunidad para ser más que Fitness. Enfocado al usuario que quiere sentirse glamurosa, vital y radiante, que anhela un espacio donde ser constante con el deporte y donde vivir experiéncias acompañada de amistades.  ",
      goal: "Crear un espacio de fácil acceso a los distintos grupos de Fitnes y actividades relacionadas. Una club digital que une a las mujeres de todas las edades y promueve el autocuidado saludable.  #bienestar #faishon #vitalidad #cercano #comunidad"
    },
    {
      name: "Brand Strategist & Interface design",
      video: "media/japan.mp4",
      tags: ["Estratégia venta de producto", "Tono e identidad emocional", "Diseño"],
      description: "Exposición de producto y aportación de valor.",
      goal: "Connectar con el públivo objetivo, entrar en su escenario, compartir sus hobbies y reividicar sus valores. Fromar parte de su identidad y alcanzar las espectativas de su forma de vida. No vendemos un balón, sinó quién eres si lo tienes."
    },
    {
      name: "Contenido fotográfico",
      image: "media/img-cK-services.png",
      tags: ["Dirección de Arte", "Fotografía de producto", "Producción y edición"],
      description: "Aportación de valor a un producto a través del contexto.",
      goal: "La comunicación visual permite transmitir sensaciones sin tenerlas, en este caso, sin olerlas. Comunica el potencial y experiéncia que brinda tu producto sin haberlo probado, y modificar el mensaje de tu porducto sin tocarlo. <br>01: #basica #masculina #glamurosa <br>02: #determinante #clara #elegante"
    },
    {
      name: "Contenido Gráfico",
      image: "media/img-rituals-services.png",
      tags: ["Diseño gráfico","Dirección de Arte",  "Fotografía de producto", "Producción y edición"],
      description: "Desarrollo de contenido a partir de una imagen, mediante gráficos visuales para la promoción de un producto.",
      goal: "#rutina #bienestar #natural"
    },
    {
      name: "Campaña publicitária",
      image: "media/img-U-services.png",
      tags: ["Dirección de Arte",  "Fotografía de producto", "Producción y edición"],
      description: "Valla urbana. Publicidad dirigida al segmento joven y urbano.",
      goal: " Acercarse a los jóvenes urbanos usando el mismo tono desenfadado y dinámico de la ciudad."
    },
      {
      name: "Visual Branding",
      image: "media/img-material-service.png",
      tags: ["Logo", "Diseño 3D", "Identidad visual y verbal de marca"],
      description: "Traducción y comunicación de un concepto verbal al plano visual.",
      goal: "#preciso #detallista #creativo #digital #fuerte"
    },
    {
      name: "Fotografia experimental",
      video: "media/experimental.mp4",
      tags: ["Dirección de Arte", "Fotografía"],
      description: "Experimentación sensorial con la luz.",
    },
    {
      name: "Artes creativas analógicas",
      image: "media/carbon.png",
      tags: ["Carbón", "Monocromo", "Realismo"],
      description: "Ilustración aplicable a contenidos (gráficos, packaging...)",
    },
    {
      name: "Artes creativas analógicas",
      image: "media/oriental.png",
      tags: ["lápiz", "Color", "animal y vegetal","temática oriental"],
      description: "Ilustración aplicable a contenidos (web, packaging...)",
    },
    {
      name: "Artes creativas analógicas",
      image: "media/vegetal.png",
      tags: ["Lápiz", "Color", "Animal y Vegetal"],
      description: "Ilustración aplicable a contenidos (web, packaging...)",
    },
    {
      name: "Artes creativas analógicas",
      image: "media/micropunta.png",
      tags: ["Micropunta", "Textura", "Monocromo"],
      description: "Estudio de textura para posibles aplicaciones. ",
    },
  ];

  const carousel = document.createElement('div');
carousel.classList.add('vertical-carousel', 'fade-in-on-scroll');



  projects.forEach(project => {
    const item = document.createElement('div');
    item.classList.add('carousel-item');

    if (project.isHero) {
  item.classList.add('carousel-hero');
}

item.innerHTML = `
  <div class="project-left">
    <div class="project-title">${project.name}</div>
    ${project.description ? `<div class="project-description">${project.description}</div>` : ""}
    ${project.goal ? `<div class="project-goal">Objetivo: ${project.goal}</div>` : ""}
  </div>

  <div class="project-center">
    ${
      project.video
        ? `<video src="${project.video}" muted loop playsinline preload="auto" data-project-video></video>`
        : `<img src="${project.image}" alt="${project.name}" />`
    }
  </div>

  <div class="project-right">
    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
  </div>
`;



    carousel.appendChild(item);
  });

  const section = document.querySelector('.carousel-section');
if (section) {
  section.appendChild(carousel);
}



  //  Control de reproducción solo al entrar en pantalla
const videos = document.querySelectorAll('[data-project-video]');
const videoObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.currentTime = 0; // empieza desde el principio
        video.play();
      } else {
        video.pause();
      }
    });
  },
  { threshold: 0.6 }
);

videos.forEach(video => videoObserver.observe(video));


  // Blur dinámico
  const items = carousel.querySelectorAll('.carousel-item');
  //  Blur dinámico para el carrusel de proyectos
const blurObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        items.forEach(item => item.classList.remove('active'));
        entry.target.classList.add('active');
      }
    });
  },
  { threshold: 0.6 }
);

  //  Glow sincronizado con la sección .intro-cinta
const introSection = document.querySelector('.intro-cinta');
const glow = document.querySelector('.scroll-glow-line');

if (introSection && glow) {
  const glowObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Sección visible → mostrar glow
          glow.classList.remove('fold');
          void glow.offsetWidth;
          glow.classList.add('unfold');
        } else {
          // Sección oculta → ocultar glow
          glow.classList.remove('unfold');
          void glow.offsetWidth;
          glow.classList.add('fold');
        }
      });
    },
    {
      threshold: 0.4, 
    }
  );

  glowObserver.observe(introSection);
}



  items.forEach(item => blurObserver.observe(item));

    //  Imán en img y video
  document.querySelectorAll('.project-center img, .project-center video').forEach(media => {
    const parent = media.parentElement;
    parent.addEventListener('mousemove', e => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 5;
      const y = e.clientY - rect.top - rect.height / 5;
      media.style.transform = `translate(${x * 0.03}px, ${y * 0.03}px)`;
    });
    parent.addEventListener('mouseleave', () => {
      media.style.transform = 'translate(0, 0)';
    });
  });


 
});

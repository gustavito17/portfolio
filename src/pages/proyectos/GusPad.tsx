import Navbar from '../../components/Navbar/Navbar';
import React, { useState, useRef, useEffect } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import './FinanzasDetalles.css';
import { FaGithub } from 'react-icons/fa';

const GitHubIcon = FaGithub;

const imagenesProyecto = [
  { src: '/images/proyectos/notas/vistacarpetas.jpg', descripcion: 'Vista de Carpetas', fullDescription: 'Pantalla principal que muestra todas las carpetas del usuario para organizar sus tareas.' },
  { src: '/images/proyectos/notas/iniciosesion.jpg', descripcion: 'Inicio de Sesión', fullDescription: 'Pantalla de inicio de sesión. El usuario puede ingresar con sus credenciales o autenticarse con Google OAuth.' },
  { src: '/images/proyectos/notas/registro.jpg', descripcion: 'Registro', fullDescription: 'Formulario de registro para crear una nueva cuenta en GusPad.' },
  { src: '/images/proyectos/notas/crearcarpeta.jpg', descripcion: 'Crear Carpeta', fullDescription: 'El usuario puede crear carpetas para organizar sus tareas. Las carpetas se almacenan localmente en el dispositivo.' },
  { src: '/images/proyectos/notas/creartarea.jpg', descripcion: 'Crear Tarea', fullDescription: 'Formulario para crear una nueva tarea con título, descripción y fecha opcional de vencimiento.' },
  { src: '/images/proyectos/notas/selecfechaentarea.jpg', descripcion: 'Seleccionar Fecha', fullDescription: 'Selector de fecha integrado para programar la tarea y recibir una notificación de recordatorio en el día indicado.' },
  { src: '/images/proyectos/notas/tareasencarpeta.jpg', descripcion: 'Tareas en Carpeta', fullDescription: 'Vista detallada de las tareas organizadas dentro de una carpeta específica del usuario.' },
  { src: '/images/proyectos/notas/tareacompleta.jpg', descripcion: 'Tarea Completada', fullDescription: 'Una tarea marcada como completada. Al completarla se cancela automáticamente la notificación programada.' },
  { src: '/images/proyectos/notas/vistafechasfiltro.jpg', descripcion: 'Vista por Fechas', fullDescription: 'Pestaña que muestra todas las tareas del usuario agrupadas y ordenadas por fecha de vencimiento.' },
  { src: '/images/proyectos/notas/filtroporfechacalendario.jpg', descripcion: 'Filtro por Calendario', fullDescription: 'Calendario interactivo para filtrar y visualizar las tareas correspondientes a una fecha específica.' },
  { src: '/images/proyectos/notas/usuariodatos.jpg', descripcion: 'Perfil de Usuario', fullDescription: 'Pantalla de perfil con los datos del usuario y la opción de cerrar sesión.' },
];

const GusPad: React.FC = () => {
  const [heroImage, setHeroImage] = useState(imagenesProyecto[0].src);
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const cardElement = galleryRef.current?.children[currentIndex] as HTMLDivElement | undefined;
    if (cardElement) {
      const scrollLeft = cardElement.offsetLeft - (galleryRef.current!.offsetWidth / 2) + (cardElement.offsetWidth / 2);
      galleryRef.current!.scrollTo({ left: scrollLeft, behavior: 'auto' });
    }
  }, [currentIndex, isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen && galleryRef.current) {
      galleryRef.current.scrollLeft = scrollPositionRef.current;
    }
  }, [isLightboxOpen]);

  const handleCardClick = (src: string, index: number) => {
    setHeroImage(src);
    setCurrentIndex(index);
    const cardElement = galleryRef.current?.children[index] as HTMLDivElement | undefined;
    if (cardElement) {
      const scrollLeft = cardElement.offsetLeft - (galleryRef.current!.offsetWidth / 2) + (cardElement.offsetWidth / 2);
      galleryRef.current!.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  const openLightbox = (index: number) => {
    if (galleryRef.current) {
      scrollPositionRef.current = galleryRef.current.scrollLeft;
    }
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setHeroImage(imagenesProyecto[currentIndex].src);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const gallery = galleryRef.current;
      const card = gallery.querySelector('.gallery-card') as HTMLElement;
      if (card) {
        const gap = parseFloat(window.getComputedStyle(gallery).gap) || 16;
        const scrollAmount = card.offsetWidth + gap;
        gallery.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const currentHeroImage = imagenesProyecto.find(img => img.src === heroImage);
  const heroImageIndex = imagenesProyecto.findIndex(img => img.src === heroImage);

  return (
    <div style={{ '--page-bg': '#0B343C', '--page-accent': '#A9BE9D' } as React.CSSProperties}>
      <Navbar />

      <section className="finanzas-detalles-seccion">
        <div
          className="hero-container"
          style={{ backgroundImage: `url(${heroImage})` }}
          onClick={() => openLightbox(heroImageIndex !== -1 ? heroImageIndex : 0)}
          title="Haz clic para ver en pantalla completa"
        >
          <div className="cta-buttons">
            <div className="code-section-group">
              <button onClick={(e) => { e.stopPropagation(); setIsCodeVisible(!isCodeVisible); }} className="social-button">
                <GitHubIcon size={20} />
                Ver Código
              </button>
              {isCodeVisible && (
                <div className="code-links-container" onClick={(e) => e.stopPropagation()}>
                  <a href="https://github.com/gustavito17/tasknote-api" target="_blank" rel="noopener noreferrer" className="social-button">
                    Backend
                  </a>
                  <a href="https://github.com/gustavito17/tasknote-mobile" target="_blank" rel="noopener noreferrer" className="social-button">
                    Frontend
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title text-shadow-dark">{currentHeroImage?.descripcion}</h1>
              <p className="hero-description text-shadow-dark">
                {currentHeroImage?.fullDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="gallery-wrapper">
          <video
            src="/videos/sorprendido.webm"
            loop
            autoPlay
            muted
            playsInline
            className="gallery-side-video gallery-side-video-left"
          />
          <button className="scroll-arrow left-arrow" onClick={() => scroll('left')}>‹</button>
          <div className="gallery-container" ref={galleryRef}>
            {imagenesProyecto.map((imagen, index) => (
              <div
                key={imagen.src}
                className="gallery-card"
                onClick={() => handleCardClick(imagen.src, index)}
                style={{ backgroundImage: `url(${imagen.src})` }}
              >
                <div className="gallery-card-overlay">
                  <p>{imagen.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="scroll-arrow right-arrow" onClick={() => scroll('right')}>›</button>
          <video
            src="/videos/pensando.webm"
            loop
            autoPlay
            muted
            playsInline
            className="gallery-side-video gallery-side-video-right"
          />
        </div>
      </section>

      <Lightbox
        open={isLightboxOpen}
        close={closeLightbox}
        slides={imagenesProyecto}
        index={currentIndex}
        on={{ view: ({ index: newIndex }) => setCurrentIndex(newIndex) }}
      />
    </div>
  );
};

export default GusPad;

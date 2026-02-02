import Navbar from '../../components/Navbar/Navbar';
import React, { useState, useRef, useEffect } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import './FinanzasDetalles.css';
import { FaGithub, FaGlobe } from 'react-icons/fa';

const GitHubIcon = FaGithub;
const InternetIcon = FaGlobe;

const imagenesProyecto = [
  { src: '/images/proyectos/finanzas/dashboard.png', descripcion: 'Dashboard', fullDescription: 'Muestra el balance general, ingresos y egresos con gráficas interactivas.' },
  { src: '/images/proyectos/finanzas/iniciodesesion.png', descripcion: 'Inicio de Sesión', fullDescription: 'Permite acceder de forma segura con validación de usuario.' },
  { src: '/images/proyectos/finanzas/registrar.png', descripcion: 'Registro de Usuario', fullDescription: 'Crea una cuenta nueva con validaciones y feedback claro.' },
  { src: '/images/proyectos/finanzas/recuperarcontrasena.png', descripcion: 'Recuperar Contraseña', fullDescription: 'Permite recuperar la contraseña de forma segura.' },
  { src: '/images/proyectos/finanzas/nuevomov.png', descripcion: 'Crear Nuevo Movimiento', fullDescription: 'Registra ingresos o egresos con tipo, fecha y descripción.' },
  { src: '/images/proyectos/finanzas/editarmov.png', descripcion: 'Editar Movimiento', fullDescription: 'Modifica registros existentes de manera fácil y segura.' },
  { src: '/images/proyectos/finanzas/historialmov.png', descripcion: 'Historial de Movimientos', fullDescription: 'Visualiza todos los movimientos con filtros por fecha y tipo.' }
];

const FinanzasDetalles: React.FC = () => {
  const [heroImage, setHeroImage] = useState(imagenesProyecto[0].src);
  const [isLightboxOpen, setLightboxOpen] = useState(false);
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
            <a href="https://github.com/gustavito17/finanzas" target="_blank" rel="noopener noreferrer" className="social-button" onClick={(e) => e.stopPropagation()}>
              <GitHubIcon size={20} />
              Ver Código
            </a>
            <a href="https://finanzas-jqnl6yjtu-gustavo-abels-projects.vercel.app/login" target="_blank" rel="noopener noreferrer" className="social-button" onClick={(e) => e.stopPropagation()}>
              <InternetIcon size={20} />
              Ver App
            </a>
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

export default FinanzasDetalles;
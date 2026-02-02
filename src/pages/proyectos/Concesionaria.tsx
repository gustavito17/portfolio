import Navbar from '../../components/Navbar/Navbar';
import React, { useState, useRef, useEffect } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import './FinanzasDetalles.css';
import { FaGithub, FaGlobe } from 'react-icons/fa';

const GitHubIcon = FaGithub;
const InternetIcon = FaGlobe;

const imagenesProyecto = [
  { src: '/images/proyectos/playa_autos/iniciopublico.png', descripcion: 'Inicio Público', fullDescription: 'Página de bienvenida con acceso al catálogo público y al panel de administración.' },
  { src: '/images/proyectos/playa_autos/catalogopublico.png', descripcion: 'Catálogo de Vehículos', fullDescription: 'Galería pública de vehículos con filtros de búsqueda por marca, modelo y año.' },
  { src: '/images/proyectos/playa_autos/detallevehiculopublico.png', descripcion: 'Detalle del Vehículo', fullDescription: 'Vista detallada de cada vehículo con sus características, precio y galería de imágenes.' },
  { src: '/images/proyectos/playa_autos/contacto.png', descripcion: 'Página de Contacto', fullDescription: 'Formulario de contacto para que los clientes puedan realizar consultas.' },
  { src: '/images/proyectos/playa_autos/admvehiculos.png', descripcion: 'Gestión de Vehículos', fullDescription: 'Panel para administrar el inventario: agregar, editar y eliminar vehículos.' },
  { src: '/images/proyectos/playa_autos/crearvehiculo.png', descripcion: 'Crear Nuevo Vehículo', fullDescription: 'Formulario para dar de alta nuevos vehículos en el sistema, especificando todos sus atributos.' },
  { src: '/images/proyectos/playa_autos/editarvehiculo.png', descripcion: 'Editar Vehículo', fullDescription: 'Permite modificar la información de un vehículo existente en el inventario.' },
  { src: '/images/proyectos/playa_autos/gestiondemarcas.png', descripcion: 'Gestión de Marcas', fullDescription: 'Panel para administrar las marcas de vehículos con las que trabaja la concesionaria.' },
  { src: '/images/proyectos/playa_autos/crearmarca.png', descripcion: 'Crear Nueva Marca', fullDescription: 'Formulario para agregar nuevas marcas al sistema.' },
  { src: '/images/proyectos/playa_autos/editarmarca.png', descripcion: 'Editar Marca', fullDescription: 'Permite editar el nombre y el logo de una marca existente.' },
  { src: '/images/proyectos/playa_autos/editarconcesionaria.png', descripcion: 'Configuración', fullDescription: 'Panel para editar la información general de la concesionaria, como el nombre y logo.' }
];

const Concesionaria: React.FC = () => {
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
                  <a href="https://github.com/gustavito17/playa-autos" target="_blank" rel="noopener noreferrer" className="social-button">
                    Backend
                  </a>
                  <a href="https://github.com/gustavito17/playa-autos-frontend" target="_blank" rel="noopener noreferrer" className="social-button">
                    Frontend
                  </a>
                </div>
              )}
            </div>
            <a href="https://playa-autos-frontend-ezu6s8t6u-gustavo-abels-projects.vercel.app/" target="_blank" rel="noopener noreferrer" className="social-button" onClick={(e) => e.stopPropagation()}>
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

export default Concesionaria;

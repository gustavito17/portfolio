import Navbar from '../../components/Navbar/Navbar';
import React, { useState, useRef, useEffect } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import './FinanzasDetalles.css';
import { FaGithub, FaGlobe } from 'react-icons/fa';

const GitHubIcon = FaGithub;
const InternetIcon = FaGlobe;

const imagenesProyecto = [
  { src: '/images/proyectos/controlstock/Inicio.PNG', descripcion: 'Inicio', fullDescription: 'Página de inicio de sesión para acceder al sistema.' },
  { src: '/images/proyectos/controlstock/Menú_Archivo.PNG', descripcion: 'Menú Archivo', fullDescription: 'Opciones para gestionar archivos y salir del sistema.' },
  { src: '/images/proyectos/controlstock/Menú_Compras.PNG', descripcion: 'Menú Compras', fullDescription: 'Acceso a la gestión de compras y proveedores.' },
  { src: '/images/proyectos/controlstock/Menú_Ventas.PNG', descripcion: 'Menú Ventas', fullDescription: 'Opciones para registrar ventas y administrar clientes.' },
  { src: '/images/proyectos/controlstock/Menú_Stock.PNG', descripcion: 'Menú Stock', fullDescription: 'Herramientas para el control de inventario y productos.' },
  { src: '/images/proyectos/controlstock/Productos.PNG', descripcion: 'Gestión de Productos', fullDescription: 'Panel para administrar los productos del inventario.' },
  { src: '/images/proyectos/controlstock/Ajuste_Stock.PNG', descripcion: 'Ajuste de Stock', fullDescription: 'Permite realizar ajustes manuales en el stock de productos.' },
  { src: '/images/proyectos/controlstock/Proveedores.PNG', descripcion: 'Gestión de Proveedores', fullDescription: 'Panel para administrar la información de los proveedores.' },
  { src: '/images/proyectos/controlstock/Compra.PNG', descripcion: 'Registrar Compra', fullDescription: 'Formulario para registrar nuevas compras de productos.' },
  { src: '/images/proyectos/controlstock/Ventas.PNG', descripcion: 'Registrar Venta', fullDescription: 'Formulario para registrar nuevas ventas de productos.' },
  { src: '/images/proyectos/controlstock/Talonarios_Recibo.PNG', descripcion: 'Talonarios de Recibo', fullDescription: 'Gestión de talonarios y recibos para las ventas.' },
  { src: '/images/proyectos/controlstock/Cotizaciones.PNG', descripcion: 'Cotizaciones', fullDescription: 'Herramienta para generar y guardar cotizaciones de productos.' },
  { src: '/images/proyectos/controlstock/Reportes_Usuario.PNG', descripcion: 'Reportes de Usuario', fullDescription: 'Generación de reportes de actividad por usuario.' },
  { src: '/images/proyectos/controlstock/Reporte_Filtro_Usuario.PNG', descripcion: 'Filtro de Reporte', fullDescription: 'Opciones de filtrado para los reportes de usuario.' },
  { src: '/images/proyectos/controlstock/Reporte_Ventas.PNG', descripcion: 'Reporte de Ventas', fullDescription: 'Reporte detallado de las ventas realizadas.' },
  { src: '/images/proyectos/controlstock/Reporte_Filtro_Venta.PNG', descripcion: 'Filtro de Reporte de Ventas', fullDescription: 'Opciones de filtrado para los reportes de ventas.' },
  { src: '/images/proyectos/controlstock/Menú_Seguridad.PNG', descripcion: 'Menú Seguridad', fullDescription: 'Opciones para gestionar la seguridad del sistema.' },
  { src: '/images/proyectos/controlstock/Permisos.PNG', descripcion: 'Gestión de Permisos', fullDescription: 'Panel para administrar los permisos de los usuarios.' },
  { src: '/images/proyectos/controlstock/CambiarContraseña.PNG', descripcion: 'Cambiar Contraseña', fullDescription: 'Opción para que los usuarios puedan cambiar su contraseña.' }
];

const ControlStock: React.FC = () => {
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
            <a href="https://github.com/gustavito17/InventorySystem/tree/master" target="_blank" rel="noopener noreferrer" className="social-button" onClick={(e) => e.stopPropagation()}>
              <GitHubIcon size={20} />
              Ver Código
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

export default ControlStock;
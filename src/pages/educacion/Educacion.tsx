/// <reference types="vite/client" />
import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import './Educacion.css';
import { FaCalendarAlt, FaClock, FaTag } from 'react-icons/fa';

// Importaciones diferidas para evitar ciclos y cargar solo en móvil
const Inicio = React.lazy(() => import('../inicio/Inicio')) as React.FC<{isLanding?: boolean}>;
const SobreMi = React.lazy(() => import('../sobre-mi/SobreMi')) as React.FC<{isLanding?: boolean}>;
const Habilidades = React.lazy(() => import('../habilidades/Habilidades')) as React.FC<{isLanding?: boolean}>;
const MisProyectos = React.lazy(() => import('../proyectos/MisProyectos')) as React.FC<{isLanding?: boolean}>;

interface Titulo {
  id: number;
  nombre: string;
  institucion: string;
  anio: string;
  logo: string;
}

interface Credencial {
  id: number;
  nombre: string;
  emisor: string;
  anio: string;
  logo: string;
}

interface Certificado {
  id: string;
  nombre: string;
  institucion: string;
  fecha: string;
  horas: string;
  tipo: string;
  imagen: string;
}

// Datos de ejemplo que puedes reemplazar
const titulos: Titulo[] = [
  { id: 1, nombre: 'Licenciatura en Ciencias Informáticas. Enfasis ASI y PC', institucion: 'Universidad Nacional de Asunción', anio: '2020-2024', logo: '/images/educacion/fpuna_logo.svg'},
  { id: 2, nombre: 'Bachiller Técnico en Informática', institucion: 'CEI Carlos Rubén Cáceres Buscio', anio: '2016-2018', logo: '/images/educacion/ceicrcb.png' },
];

const credenciales: Credencial[] = [
  { id: 1, nombre: 'Cloud Computing Fundamentals', emisor: 'IBM SkillsBuild', anio: '2025', logo: '/images/educacion/cloudc.png' },
];

const certificados: Certificado[] = [
  { id: 'c1', nombre: 'Curador de datos', institucion: 'Capacítate para el empleo – Fundación Carlos Slim', fecha: '03 Feb 2023', horas: '30 horas', tipo: 'Certificado', imagen: '/certificados/curador_datos_03_02_2023.png' },
  { id: 'c2', nombre: 'Cloud Computing Fundamentals', institucion: 'IBM SkillsBuild', fecha: '12 Ene 2026', horas: 'No especificado', tipo: 'Certificado', imagen: '/certificados/cloud_computing_fundamentals.png' },
  { id: 'c3', nombre: 'Curso profesional de Git', institucion: 'CódigoFacilito', fecha: '10 Dic 2025', horas: '3h 14m', tipo: 'Certificado', imagen: '/certificados/curso_profesional_git_10_12_2025.png' },
  { id: 'c4', nombre: 'Curso de Introducción a DevOps: Bases y Conceptos', institucion: 'CódigoFacilito', fecha: '12 Dic 2025', horas: '1h 32m', tipo: 'Certificado', imagen: '/certificados/curso_introduccion_devops_bases_conceptos_12_12_2025.png' },
  { id: 'c5', nombre: 'Automatizaciones Low-Code con N8N', institucion: 'Platzi', fecha: '13 Dic 2025', horas: '7 horas', tipo: 'Certificado', imagen: '/certificados/curso_automatizaciones_lowcode_n8n_13_12_2025.png' },
  { id: 'c6', nombre: 'Tu futuro en la computación en la nube: el panorama laboral', institucion: 'IBM SkillsBuild', fecha: '12 Ene 2026', horas: '1 hora', tipo: 'Certificado', imagen: '/certificados/tu_futuro_computacion_nube.png' },
  { id: 'c7', nombre: 'Introducción a la Gestión y la Seguridad de Datos en la Nube', institucion: 'IBM SkillsBuild', fecha: '04 Ene 2026', horas: '2 horas', tipo: 'Certificado', imagen: '/certificados/introduccion_gestion_seguridad_datos_nube_2026_01_03.png' },
  { id: 'c8', nombre: 'Desarrollo e Implementación de Software en la Nube', institucion: 'IBM SkillsBuild', fecha: '29 Dic 2025', horas: '1h 10m', tipo: 'Certificado', imagen: '/certificados/desarrollo_implementacion_software_nube_2025_12_28.png' },
  { id: 'c9', nombre: 'Virtualización en la Nube', institucion: 'IBM SkillsBuild', fecha: '08 Dic 2025', horas: '2 horas', tipo: 'Certificado', imagen: '/certificados/virtualizacion_nube_2025_12_07.png' },
  { id: 'c10', nombre: 'Comprensión de los Modelos de Implementación en la Nube', institucion: 'IBM SkillsBuild', fecha: '01 Dic 2025', horas: '1h 15m', tipo: 'Certificado', imagen: '/certificados/comprension_modelos_implementacion_nube_2025_11_30.png' },
  { id: 'c11', nombre: 'Comprensión de los Servicios de Computación en la Nube', institucion: 'IBM SkillsBuild', fecha: '01 Dic 2025', horas: '1h 30m', tipo: 'Certificado', imagen: '/certificados/comprension_servicios_computacion_nube_2025_11_29.png' },
  { id: 'c12', nombre: 'Introducción a la Computación en la Nube', institucion: 'IBM SkillsBuild', fecha: '29 Nov 2025', horas: '1h 15m', tipo: 'Certificado', imagen: '/certificados/introduccion_computacion_nube_2025_11_27.png' },
  { id: 'c13', nombre: 'IV Intercolegial de Desarrollo de Videojuegos CEL-2018 (SuperHéroes)', institucion: 'Centro Educativo Los Laureles (CEL)', fecha: '29 Ago 2018', horas: 'No especificado', tipo: 'Certificado', imagen: '/certificados/participacionvideojuegos29082018.jpg' },
  { id: 'c14', nombre: 'Fundamentos del Diseño Gráfico', institucion: 'EducaciónIT', fecha: '24 Oct 2023', horas: 'No especificado', tipo: 'Certificado', imagen: '/certificados/fundamentos_diseno_grafico_educacionit_2023_10_24.png' },
];

const useLayoutState = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1366);
  const [layoutKey, setLayoutKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 1366;
      setIsMobile(prev => {
        if (prev !== newIsMobile) setLayoutKey(k => k + 1);
        return newIsMobile;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return { isMobile, layoutKey };
};

const EducacionContent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState<{ src: string }[]>([]);
  const [index, setIndex] = useState(0);
  const certificadosGalleryRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = (src: string) => {
    setSlides([{ src }]);
    setIndex(0);
    setOpen(true);
  };

  const handleCertificadoClick = (index: number) => {
    setSlides(certificados.map(c => ({ src: c.imagen })));
    setIndex(index);
    setOpen(true);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (certificadosGalleryRef.current) {
        const { current } = certificadosGalleryRef;
        
        const card = current.querySelector('.certificado-card');
        if (!card) return;

        const scrollAmount = current.clientWidth; // Desplaza el ancho visible exacto (3 o 4 tarjetas según el caso)

        current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ '--page-bg': '#0B343C', '--page-accent': '#A9BE9D' } as React.CSSProperties}>
      <section className="educacion-seccion">
        <h1 className="educacion-titulo-main">Educación</h1>
        <div className="educacion-container">
        {/* --- SECCIÓN TÍTULOS Y CREDENCIALES --- */}
        <div className="educacion-columnas">
          <div className="educacion-columna">
            <h2 className="educacion-columna-titulo">Títulos</h2>
            <ul className="educacion-lista">
              {titulos.map((titulo) => (
                <li key={titulo.id} className="educacion-item">
                  <h3 className="educacion-item-nombre">{titulo.nombre}</h3>
                  <div className="educacion-item-institucion">
                    <img
                      src={titulo.logo}
                      alt={`Logo de ${titulo.institucion}`}
                      className="educacion-item-logo"
                      style={{ width: titulo.logo.includes('ceicrcb') ? '64px' : '48px', height: titulo.logo.includes('ceicrcb') ? '64px' : '48px', cursor: 'pointer' }}
                      onClick={() => handleLogoClick(titulo.logo)}
                    />
                    <p className="educacion-item-detalle">{`${titulo.institucion} - ${titulo.anio}`}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <video
            src="/videos/certi.webm"
            autoPlay
            loop
            muted
            playsInline
            className="educacion-video"
          />

          <div className="educacion-columna">
            <h2 className="educacion-columna-titulo">Credenciales</h2>
            <ul className="educacion-lista">
              {credenciales.map((cred) => (
                <li key={cred.id} className="educacion-item">
                  <h3 className="educacion-item-nombre">{cred.nombre}</h3>
                  <div className="educacion-item-institucion">
                    <img
                      src={cred.logo}
                      alt={`Logo de ${cred.emisor}`}
                      className="educacion-item-logo"
                      style={{ width: '70px', height: '70px', borderRadius: '0', cursor: 'pointer' }}
                      onClick={() => handleLogoClick(cred.logo)}
                    />
                    <p className="educacion-item-detalle">{`${cred.emisor} - ${cred.anio}`}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- SECCIÓN CERTIFICADOS --- */}
        <div className="educacion-certificados-container">
          <h2 className="educacion-certificados-titulo">Certificados</h2>
          <div className="certificados-gallery-wrapper">
            <button className="scroll-arrow left-arrow" onClick={() => scroll('left')}>‹</button>
            <div className="educacion-certificados-grid" ref={certificadosGalleryRef}>
              {certificados.map((cert, idx) => (
                <article key={cert.id} className="card certificado-card" onClick={() => handleCertificadoClick(idx)}>
                  <div className="card-body">
                      <h3 className="card-main-title">{cert.nombre}</h3>
                      <p className="card-institution">{cert.institucion}</p>
                  </div>
                  <div className="card-footer">
                      <div className="metadata-item">
                          <FaCalendarAlt className="metadata-icon" />
                          <span className="metadata-text">{cert.fecha}</span>
                      </div>
                      {cert.horas !== 'No especificado' && (
                        <div className="metadata-item">
                            <FaClock className="metadata-icon" />
                            <span className="metadata-text">{cert.horas}</span>
                        </div>
                      )}
                      <div className="metadata-item">
                          <FaTag className="metadata-icon" />
                          <span className="metadata-text">{cert.tipo}</span>
                      </div>
                  </div>
                </article>
              ))}
            </div>
            <button className="scroll-arrow right-arrow" onClick={() => scroll('right')}>›</button>
          </div>
        </div>
        </div>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
      />
    </div>
  );
};

const EducacionLayout: React.FC<{ isLanding?: boolean; isMobile: boolean }> = ({ isLanding = false, isMobile }) => {
  const location = useLocation();

  // Efecto para scrollear a la sección correcta al entrar directamente en móvil
  useEffect(() => {
    if (isMobile && !isLanding) {
      const pathMap: Record<string, string> = {
        '/inicio': 'inicio',
        '/sobre-mi': 'sobre-mi',
        '/habilidades': 'habilidades',
        '/proyectos': 'proyectos',
        '/educacion': 'educacion'
      };
      const targetId = pathMap[location.pathname];

      const scrollToTarget = (el: HTMLElement) => {
        // Pequeño timeout para asegurar que el layout móvil se ha renderizado completamente
        setTimeout(() => {
          // 'auto' para salto instantáneo, evitando que se vea el scroll desde el inicio
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
        }, 100);
      };
      
      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          scrollToTarget(element);
        } else {
          // Si no existe (por Suspense), esperar a que aparezca en el DOM
          const container = document.querySelector('.landing-page-container');
          if (container) {
            const observer = new MutationObserver((mutations, obs) => {
              const el = document.getElementById(targetId);
              if (el) {
                scrollToTarget(el);
                obs.disconnect(); // Dejar de observar una vez encontrado
              }
            });
            observer.observe(container, { childList: true, subtree: true });
            // Timeout de seguridad para desconectar el observer si algo falla
            setTimeout(() => observer.disconnect(), 5000);
          }
        }
      }
    }
  }, [isMobile, isLanding, location.pathname]);

  if (isMobile && !isLanding) {
    return (
      <div style={{ '--page-bg': '#0B343C', '--page-accent': '#A9BE9D' } as React.CSSProperties}>
        <Navbar />
        <div className="landing-page-container" style={{ 
          backgroundColor: '#0B343C',
        } as React.CSSProperties}>
          <Suspense fallback={<div>Cargando...</div>}>
            <div id="inicio" className="landing-section"><Inicio isLanding={true} /></div>
            <div id="sobre-mi" className="landing-section"><SobreMi isLanding={true} /></div>
            <div id="habilidades" className="landing-section"><Habilidades isLanding={true} /></div>
            <div id="proyectos" className="landing-section"><MisProyectos isLanding={true} /></div>
            <div id="educacion" className="landing-section"><EducacionContent /></div>
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <div style={{ '--page-bg': '#0B343C', '--page-accent': '#A9BE9D', width: '100%' } as React.CSSProperties}>
      {!isLanding && <Navbar />}
      <EducacionContent />
    </div>
  );
};

const Educacion: React.FC<{ isLanding?: boolean }> = ({ isLanding = false }) => {
  const { isMobile, layoutKey } = useLayoutState();
  return <EducacionLayout key={layoutKey} isMobile={isMobile} isLanding={isLanding} />;
};

export default Educacion;
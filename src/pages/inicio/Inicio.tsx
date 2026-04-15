import React, { Suspense, useEffect, useState } from "react";
import "./Inicio.css";
import Navbar from "../../components/Navbar/Navbar";
import { FaLinkedin, FaGithub, FaFileAlt } from "react-icons/fa";

// Importaciones diferidas para el layout de página única en móvil
const SobreMi = React.lazy(() => import('../sobre-mi/SobreMi')) as React.FC<{isLanding?: boolean}>;
const Habilidades = React.lazy(() => import('../habilidades/Habilidades')) as React.FC<{isLanding?: boolean}>;
const MisProyectos = React.lazy(() => import('../proyectos/MisProyectos')) as React.FC<{isLanding?: boolean}>;
const Educacion = React.lazy(() => import('../educacion/Educacion')) as React.FC<{isLanding?: boolean}>;

// Hook para gestionar el estado del layout (móvil/escritorio)
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

// El contenido visual de la página de Inicio
const InicioContent: React.FC = () => {
  return (
    <section id="inicio" className="wave-section ar-loaded">
      <div className="wave">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="w-full max-w-[1400px] mx-auto flex flex-row gap-8 lg:gap-8 px-2 lg:px-0 py-12 min-h-[80vh] items-center relative z-10">
        {/* Lado izquierdo: Texto */}
        <div id="inicio-text-container" className="flex flex-col text-left items-start w-full lg:pl-4 lg:pr-2 lg:max-w-[40%]">
          <h1
            className="font-sequel font-bold leading-none mb-0 whitespace-nowrap text-shadow-dark ar-reveal delay-1"
            style={{
              fontFamily: 'Tanker, sans-serif',
              marginBottom: 0,
              paddingBottom: 0,
              color: '#0B343C',
              fontSize: 'clamp(2.2rem, 5vw, 8rem)'
            }}
          >
            Hola, Soy Gustavo
          </h1>
          <p
            className="animated-text font-questrial leading-tight mt-[0.5rem] text-shadow-dark ar-reveal delay-2"
            style={{ fontFamily: "'Clash Grotesk', sans-serif", marginTop: '0', marginBottom: '0.25rem', paddingTop: 0, paddingBottom: 0, color: '#0B343C' }}
          >
            Desarrollador Full Stack
          </p>
          <ul className="social-icons-list ar-reveal delay-3">
            <li>
              <a href="https://drive.google.com/file/d/1QkHzqsCciBoot9bWI4A2IBxFAOMonCVg/view?usp=drive_link" target="_blank" rel="noopener noreferrer" aria-label="Ver Curriculum" data-tooltip="Ver Curriculum Vitae">
                <FaFileAlt className="social-icon-base" />
                <span className="social-icon-fill cv-fill">
                  <FaFileAlt className="social-icon-colored" />
                </span>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/gustavoabel17" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-tooltip="Ver LinkedIn">
                <FaLinkedin className="social-icon-base" />
                <span className="social-icon-fill linkedin-fill">
                  <FaLinkedin className="social-icon-colored" />
                </span>
              </a>
            </li>
            <li>
              <a href="https://github.com/gustavito17" target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-tooltip="Ver GitHub">
                <FaGithub className="social-icon-base" />
                <span className="social-icon-fill github-fill">
                  <FaGithub className="social-icon-colored" />
                </span>
              </a>
            </li>
          </ul>
        </div>
        {/* Lado derecho: Video */}
        <div className="flex justify-end items-center h-full w-full lg:max-w-[60%]">
          <video
            src="/videos/bienvenida.webm"
            autoPlay
            loop
            muted
            playsInline
            className="h-[520px] w-auto lg:h-[800px] xl:h-[900px] rounded-2xl shadow-2xl mt-0 relative z-10 ar-reveal delay-4"
            style={{ maxWidth: '100%' }}
          />
        </div>
      </div>
    </section>
  );
};

// El componente de Layout que decide la estructura
const InicioLayout: React.FC<{ isLanding?: boolean; isMobile: boolean }> = ({ isLanding = false, isMobile }) => {
  useEffect(() => {
    if (isMobile && !isLanding) {
      // Forzar scroll al inicio de la sección 'inicio'
      const element = document.getElementById('inicio');
      if (element) {
        element.scrollIntoView({ behavior: 'auto' });
      }
    }
  }, [isMobile, isLanding]);

  // VISTA MÓVIL: Renderiza el contenedor de página única
  if (isMobile && !isLanding) {
    return (
      <>
        <Navbar />
        <div className="landing-page-container" style={{ 
          backgroundColor: '#A9BE9D', // El fondo de la página de inicio
          '--page-bg': '#A9BE9D', 
          '--page-accent': '#0B343C' 
        } as React.CSSProperties}>
          <Suspense fallback={<div>Cargando...</div>}>
            <div id="inicio" className="landing-section"><InicioContent /></div>
            <div id="sobre-mi" className="landing-section"><SobreMi isLanding={true} /></div>
            <div id="habilidades" className="landing-section"><Habilidades isLanding={true} /></div>
            <div id="proyectos" className="landing-section"><MisProyectos isLanding={true} /></div>
            <div id="educacion" className="landing-section"><Educacion isLanding={true} /></div>
          </Suspense>
        </div>
      </>
    );
  }

  // VISTA ESCRITORIO: Renderiza solo el contenido de la página
  return (
    <div style={{ '--page-bg': '#A9BE9D', '--page-accent': '#0B343C' } as React.CSSProperties}>
      {!isLanding && <Navbar />}
      <InicioContent />
    </div>
  );
};

// El componente principal que exportamos
const Inicio: React.FC<{ isLanding?: boolean }> = ({ isLanding = false }) => {
  const { isMobile, layoutKey } = useLayoutState();
  return <InicioLayout key={layoutKey} isMobile={isMobile} isLanding={isLanding} />;
};

export default Inicio;
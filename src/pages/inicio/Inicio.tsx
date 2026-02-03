import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";
import Navbar from "../../components/Navbar/Navbar";

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
  const [isSocialNavOpen, setIsSocialNavOpen] = useState(false);

  return (
    <section id="inicio" className="wave-section">
      <div className="wave">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="w-full max-w-[1400px] mx-auto flex flex-row gap-8 lg:gap-8 px-2 lg:px-0 py-12 min-h-[80vh] items-center relative z-10">
        {/* Lado izquierdo: Texto */}
        <div id="inicio-text-container" className="flex flex-col text-left items-start w-full lg:pl-4 lg:pr-2 lg:max-w-[40%]">
          <h1
            className="font-sequel font-bold leading-none mb-0 whitespace-nowrap text-shadow-dark fade-in-on-load delay-1"
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
            className="animated-text font-questrial leading-tight mt-[0.5rem] text-shadow-dark fade-in-on-load delay-2"
            style={{ fontFamily: "'Clash Grotesk', sans-serif", marginTop: '0', marginBottom: '0.25rem', paddingTop: 0, paddingBottom: 0, color: '#0B343C' }}
          >
            Desarrollador Full Stack
          </p>
          <div className="buttons-container flex items-center fade-in-on-load delay-3" style={{ gap: '1rem', marginTop: '0.25rem' }}>
            <a 
              href="https://drive.google.com/file/d/1QkHzqsCciBoot9bWI4A2IBxFAOMonCVg/view?usp=drive_link" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="curriculum-btn social-button"
            >
              Ver Curriculum
            </a>
            <button className="social-trigger social-button" onClick={() => setIsSocialNavOpen(!isSocialNavOpen)}>
              <span>Encuéntrame</span>
            </button>
            {isSocialNavOpen && (
              <>
                <a href="https://github.com/gustavito17" target="_blank" rel="noreferrer noopener" className="social-button">
                  <span>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                    GitHub
                  </span>
                </a>
                <a href="https://www.linkedin.com/in/gustavoabel17" target="_blank" rel="noreferrer noopener" className="social-button">
                  <span>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    LinkedIn
                  </span>
                </a>
              </>
            )}
          </div>
        </div>
        {/* Lado derecho: Video */}
        <div className="flex justify-end items-center h-full w-full lg:max-w-[60%]">
          <video
            src="/videos/bienvenida.webm"
            autoPlay
            loop
            muted
            playsInline
            className="h-[520px] w-auto lg:h-[800px] xl:h-[900px] rounded-2xl shadow-2xl mt-0 relative z-10 fade-in-on-load delay-4"
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
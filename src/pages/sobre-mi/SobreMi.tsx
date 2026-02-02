import React, { Suspense, useEffect, useState } from "react";
import "./SobreMi.css";
import Navbar from "../../components/Navbar/Navbar";

// Importaciones diferidas
const Inicio = React.lazy(() => import('../inicio/Inicio')) as React.FC<{isLanding?: boolean}>;
const Habilidades = React.lazy(() => import('../habilidades/Habilidades')) as React.FC<{isLanding?: boolean}>;
const MisProyectos = React.lazy(() => import('../proyectos/MisProyectos')) as React.FC<{isLanding?: boolean}>;
const Educacion = React.lazy(() => import('../educacion/Educacion')) as React.FC<{isLanding?: boolean}>;

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

const SobreMiContent: React.FC = () => {
  return (
    <section id="sobre-mi" className="sobre-mi-section">
        <div className="silhouettes-container">
          <img src="/images/sobre-mi/silueta1.png" alt="" className="silhouette" />
          <img src="/images/sobre-mi/silueta2.png" alt="" className="silhouette" />
          <img src="/images/sobre-mi/silueta3.png" alt="" className="silhouette" />
          <img src="/images/sobre-mi/silueta4.png" alt="" className="silhouette" />
          <img src="/images/sobre-mi/silueta5.png" alt="" className="silhouette" />
          <img src="/images/sobre-mi/silueta6.png" alt="" className="silhouette" />
          <img src="/images/sobre-mi/silueta7.png" alt="" className="silhouette" />
          <img src="/images/sobre-mi/silueta8.png" alt="" className="silhouette" />
        </div>
        <div className="w-full max-w-[1400px] mx-auto flex flex-row gap-0 px-2 lg:px-0 py-12 min-h-[80vh] items-center relative z-10">
          {/* Lado izquierdo: Video */}
          <div id="sobre-mi-video-container" className="flex justify-center items-center h-full w-full lg:max-w-[60%]">
            <video
              src="/videos/sobre-mi.webm"
              autoPlay
              loop
              muted
              playsInline
              className="h-[520px] w-auto lg:h-[800px] xl:h-[900px] rounded-2xl shadow-2xl mt-0 relative z-10"
              style={{ maxWidth: '100%' }}
            />
          </div>
          {/* Lado derecho: Texto */}
          <div id="sobre-mi-text-container" className="flex flex-col text-left items-start w-full md:pr-12 lg:pr-12 lg:max-w-[40%] lg:-ml-16">
            <h1
              className="font-sequel font-bold text-[5rem] sm:text-[7rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] leading-none mb-0 whitespace-nowrap text-shadow-dark"
              style={{ fontFamily: 'Tanker, sans-serif', marginBottom: 0, paddingBottom: 0, color: '#A9BE9D' }}
            >
              Sobre mí
            </h1>
            <div
              className="font-questrial text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem] xl:text-[2rem] leading-normal mt-[2rem] mb-0 text-justify text-shadow-dark"
              style={{ fontFamily: "'Clash Grotesk', sans-serif", marginTop: '2rem', marginBottom: 0, paddingTop: 0, paddingBottom: 0, color: '#A9BE9D' }}
            >
              <p className="mb-2">
                Soy Gustavo León, me gusta transformar ideas en soluciones prácticas y funcionales. Aprendo rápido, disfruto enfrentar desafíos nuevos y busco siempre aportar valor real a cada proyecto. Me interesa entender bien el propósito de lo que hago y convertirlo en resultados claros.
              </p>
              <p>
                No me limito a seguir instrucciones: propongo, pruebo y construyo con compromiso. Mi objetivo es entregar soluciones de calidad, mejorar constantemente y que cada proyecto tenga un impacto concreto y útil.
              </p>
            </div>
          </div>
        </div>
    </section>
  );
};

const SobreMiLayout: React.FC<{ isLanding?: boolean; isMobile: boolean }> = ({ isLanding = false, isMobile }) => {
  useEffect(() => {
    if (isMobile && !isLanding) {
      const element = document.getElementById('sobre-mi');
      if (element) {
        element.scrollIntoView({ behavior: 'auto' });
      }
    }
  }, [isMobile, isLanding]);

  if (isMobile && !isLanding) {
    return (
      <>
        <Navbar />
        <div className="landing-page-container" style={{ 
          backgroundColor: '#0B343C',
          '--page-bg': '#0B343C', 
          '--page-accent': '#A9BE9D' 
        } as React.CSSProperties}>
          <Suspense fallback={<div>Cargando...</div>}>
            <div id="inicio" className="landing-section"><Inicio isLanding={true} /></div>
            <div className="landing-section"><SobreMiContent /></div>
            <div className="landing-section"><Habilidades isLanding={true} /></div>
            <div className="landing-section"><MisProyectos isLanding={true} /></div>
            <div className="landing-section"><Educacion isLanding={true} /></div>
          </Suspense>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen" style={{ '--page-bg': '#0B343C', '--page-accent': '#A9BE9D', backgroundColor: 'var(--page-bg)' } as React.CSSProperties}>
      {!isLanding && <Navbar />}
      <SobreMiContent />
    </div>
  );
};

const SobreMi: React.FC<{ isLanding?: boolean }> = ({ isLanding = false }) => {
  const { isMobile, layoutKey } = useLayoutState();
  return <SobreMiLayout key={layoutKey} isMobile={isMobile} isLanding={isLanding} />;
};

export default SobreMi;

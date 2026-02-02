import React, { useState, useEffect, Suspense } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "./MisProyectos.css";
import { FaReact, FaNode, FaGit, FaGithub, FaBootstrap, FaCss3Alt, FaCloud, FaPalette, FaPython, FaDatabase, FaServer, FaLock, FaEnvelope, FaJava, FaProjectDiagram, FaFileCode, FaUsersCog, FaSitemap, FaClipboardCheck, FaShieldAlt, FaCogs, FaFileAlt, FaCodeBranch, FaArrowUp, FaCheckCircle, FaCode, FaLayerGroup, FaChartBar, FaExchangeAlt, FaTerminal, FaRocket } from 'react-icons/fa';
import { 
  SiExpress, 
  SiJsonwebtokens, 
  SiReactrouter, 
  SiRedux, 
  SiMongodb, 
  SiNextdotjs, 
  SiGraphql, 
  SiTailwindcss, 
  SiD3Dotjs, 
  SiFirebase,
  SiPostgresql,
  SiTypescript,
  SiVite,
  SiCss3,
  SiMysql,
  SiBootstrap,
  SiSwagger,
  SiVercel,
  SiNetlify,
  SiNodemon,
  SiDotenv,
  SiPytest,
  SiRender,
  SiReact,
  SiAxios,
  SiFastapi,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

// Importaciones diferidas
const Inicio = React.lazy(() => import('../inicio/Inicio')) as React.FC<{isLanding?: boolean}>;
const SobreMi = React.lazy(() => import('../sobre-mi/SobreMi')) as React.FC<{isLanding?: boolean}>;
const Habilidades = React.lazy(() => import('../habilidades/Habilidades')) as React.FC<{isLanding?: boolean}>;
const Educacion = React.lazy(() => import('../educacion/Educacion')) as React.FC<{isLanding?: boolean}>;

// Define a type for the project object that includes the optional exploreUrl
type Project = {
  title: string;
  description: string;
  imageUrl: string;
  skills: string[];
  videoUrl?: string | null;
  exploreUrl?: string;
};

const SkillIcon: React.FC<{ skill: string }> = ({ skill }) => {
  switch (skill.toLowerCase()) {
    case 'react':
      return <FaReact title={skill} size={24} />;
    case 'node.js':
      return <FaNode title={skill} size={24} />;
    case 'express':
      return <SiExpress title={skill} size={24} />;
    case 'postgresql':
      return <SiPostgresql title={skill} size={24} />;
    case 'jwt':
      return <FaLock title={skill} size={24} />;
    case 'axios':
    case 'axios / fetch':
      return <SiAxios title={skill} size={24} />;
    case 'react router':
      return <SiReact title={skill} size={24} />;
    case 'recharts':
      return <FaReact title={skill} size={24} />;
    case 'bootstrap':
      return <FaBootstrap title={skill} size={24} />;
    case 'bcryptjs':
      return <FaShieldAlt title={skill} size={24} />;
    case 'cors':
      return <FaServer title={skill} size={24} />;
    case 'api rest':
      return <FaExchangeAlt title={skill} size={24} />;
    case 'crud':
      return <FaCodeBranch title={skill} size={24} />;
    case 'redux':
      return <SiRedux title={skill} size={24} />;    
    case 'mongodb':
      return <SiMongodb title={skill} size={24} />;
    case 'next.js':
      return <SiNextdotjs title={skill} size={24} />;
    case 'graphql':
      return <SiGraphql title={skill} size={24} />;
    case 'tailwindcss':
      return <SiTailwindcss title={skill} size={24} />;
    case 'd3.js':
      return <SiD3Dotjs title={skill} size={24} />;
    case 'firebase':
      return <SiFirebase title={skill} size={24} />;
    case 'git':
      return <FaGit title={skill} size={24} />;
    case 'cloud/deployment':
      return <FaCloud title={skill} size={24} />;
    case 'render':
      return <SiRender title={skill} size={24} />;
    case 'clean code / modularidad':
      return <FaCodeBranch title={skill} size={24} />;
    case 'ux/ui':
      return <FaPalette title={skill} size={24} />;
    case 'python':
      return <FaPython title={skill} size={24} />;
    case 'fastapi':
      return <SiFastapi title={skill} size={24} />;
    case 'sqlalchemy':
      return <FaDatabase title={skill} size={24} />;
    case 'alembic':
      return <FaArrowUp title={skill} size={24} />;
    case 'uvicorn':
      return <FaTerminal title={skill} size={24} />;
    case 'pydantic':
      return <FaCheckCircle title={skill} size={24} />;
    case 'passlib':
      return <FaShieldAlt title={skill} size={24} />;
    case 'python-jose':
      return <SiJsonwebtokens title={skill} size={24} />;
    case 'python-dotenv':
      return <SiDotenv title={skill} size={24} />;
    case 'email-validator':
      return <FaEnvelope title={skill} size={24} />;
    case 'psycopg2-binary':
      return <FaDatabase title={skill} size={24} />;
    case 'cloudinary':
      return <FaRocket title={skill} size={24} />;
    case 'typescript':
      return <SiTypescript title={skill} size={24} />;
    case 'react query':
      return <SiReactrouter title={skill} size={24} />;
    case 'react hook form':
      return <SiJsonwebtokens title={skill} size={24} />;
    case 'context api':
      return <FaSitemap title={skill} size={24} />;
    case 'custom hooks':
      return <FaFileCode title={skill} size={24} />;
    case 'css':
      return <FaCss3Alt title={skill} size={24} />;
    case 'vite':
      return <SiVite title={skill} size={24} />;
    case 'java':
      return <FaJava title={skill} size={24} />;
    case 'netbeans':
      return <FaCode title={skill} size={24} />;
    case 'mysql':
      return <SiMysql title={skill} size={24} />;
    case 'mvc':
      return <FaLayerGroup title={skill} size={24} />;
    case 'jasperreports':
      return <FaChartBar title={skill} size={24} />;
    case 'visual paradigm':
      return <FaProjectDiagram title={skill} size={24} />;
    case 'jdbc':
      return <FaDatabase title={skill} size={24} />;
    case 'swagger':
      return <SiSwagger title={skill} size={24} />;
    case 'redoc':
      return <FaFileAlt title={skill} size={24} />;
    case 'orm':
      return <FaCode title={skill} size={24} />;
    case 'vercel':
      return <SiVercel title={skill} size={24} />;
    case 'netlify':
      return <SiNetlify title={skill} size={24} />;
    case 'nodemon':
      return <FaCogs title={skill} size={24} />;
    case 'dotenv':
      return <FaLock title={skill} size={24} />;
    case 'pytest':
      return <SiPytest title={skill} size={24} />;
    case 'dao':
      return <FaFileCode title={skill} size={24} />;
    case 'rbac':
      return <FaUsersCog title={skill} />;
    default:
      return <span>{skill}</span>;
  }
};

// Datos de los proyectos con una URL de video
const projects: Project[] = [
  {
    title: "Finanzas",
    description: "Aplicación full stack con login seguro para controlar ingresos y egresos de manera práctica y visual",
    imageUrl: "/images/proyectos/finanzas/dashboard.png",
    skills: [
      "React", "React Router", "Bootstrap", "Recharts", "Axios", 
      "Node.js", "Express", "PostgreSQL", "JWT", "bcryptjs", 
      "API REST", "CORS", "Nodemon", "dotenv", "Git"
    ],
    exploreUrl: "/proyectos/finanzas"
  },
  {
    title: "Concesionaria",
    description: "Aplicación con opción pública y administrativa. Permite cargar vehículos, marcas y gestionar la venta de autos.",
    imageUrl: "/images/proyectos/playa_autos/catalogopublico.png",
    skills: [
      "React", "React Router", "Vite", "Context API", "CSS", 
      "Python", "FastAPI", "Pydantic", "SQLAlchemy", "PostgreSQL", 
      "JWT", "Passlib", "Cloudinary", "Render", "pytest", 
      "Swagger", "ReDoc", "Git"
    ],
    exploreUrl: "/proyectos/concesionaria"
  },
  {
    title: "Control Stock",
    description: "Sistema que permite administrar stock, compras, ventas y generar reportes con control de usuarios.",
    imageUrl: "/images/proyectos/controlstock/Inicio.PNG",
    skills: ["Java", "NetBeans", "MySQL", "MVC", "DAO", "JasperReports", "RBAC", "Git"],
    exploreUrl: "/proyectos/controlstock"
  },
  {
    title: "Desconecta",
    description: "En desarrollo: una app para pausar el uso de aplicaciones cuando lo necesites.",
    imageUrl: "/images/proyectos/finanzas/nuevomov.png",
    skills: [],
    videoUrl: null // Este proyecto no tiene video
  }
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

const MisProyectosContent: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const handleCardInteraction = (e: React.MouseEvent<HTMLDivElement>, index: number | null) => {
    if (isTouchDevice) {
      e.stopPropagation();
      setActiveCard(prev => (prev === index ? null : index));
    }
  };

  const handleMouseHover = (index: number | null) => {
    if (!isTouchDevice) {
      setActiveCard(index);
    }
  };
  
  return (
    <>
      <section className="proyectos-seccion" onClick={() => isTouchDevice && activeCard !== null && setActiveCard(null)}>
        <div className="proyectos-content-wrapper">
          <h2 className="proyectos-titulo-main">Mis Proyectos</h2>
          
          <div className="proyectos-grid">
            {projects.map((project, index) => {
              const chunkSize = 7;
              const skillChunks = [];
              for (let i = 0; i < project.skills.length; i += chunkSize) {
                skillChunks.push(project.skills.slice(i, i + chunkSize));
              }

              return (
                <div 
                  key={index} 
                  className="proyecto-grid-item"
                  onClick={(e) => handleCardInteraction(e, index)}
                  onMouseEnter={() => handleMouseHover(index)}
                  onMouseLeave={() => handleMouseHover(null)}
                >
                  {project.title === "Finanzas" && (
                    <video
                      src="/videos/pensando.webm"
                      loop
                      autoPlay
                      muted
                      playsInline
                      className="small-corner-video"
                    />
                  )}
                  {project.title === "Desconecta" && (
                    <video
                      src="/videos/sorprendido.webm"
                      loop
                      autoPlay
                      muted
                      playsInline
                      className="small-corner-video-top-right"
                    />
                  )}
                  <div
                    className={`proyecto-card ${activeCard === index ? 'is-hovered' : ''}`}
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  >
                    <div className="card-content">
                      <h3 className="proyecto-titulo-card">{project.title}</h3>
                      <div className="icon-rows-container">
                        {skillChunks.map((chunk, chunkIndex) => (
                          <div key={chunkIndex} className="proyecto-skills">
                            {chunk.map(skill => (
                              <span key={skill} className="skill-icon">
                                <SkillIcon skill={skill} />
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                      <p className="proyecto-descripcion">{project.description}</p>
                      {project.exploreUrl ? (
                        <Link to={project.exploreUrl} className="mis-proyectos-explore-button">
                          Explorar
                        </Link>
                      ) : project.videoUrl ? (
                        <button className="mis-proyectos-explore-button" onClick={() => setActiveVideo(project.videoUrl || null)}>
                          Ver Video
                        </button>
                      ) : <div className="mis-proyectos-explore-button" style={{ visibility: 'hidden', cursor: 'default' }} aria-hidden="true">&nbsp;</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {activeVideo && (
        <div className="video-popup" onClick={() => setActiveVideo(null)}>
          <div className="video-popup-content" onClick={(e) => e.stopPropagation()}>
            <video src={activeVideo} controls autoPlay playsInline />
            <button className="close-button" onClick={() => setActiveVideo(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

const MisProyectosLayout: React.FC<{ isLanding?: boolean; isMobile: boolean }> = ({ isLanding = false, isMobile }) => {
  useEffect(() => {
    if (isMobile && !isLanding) {
      const element = document.getElementById('proyectos');
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
            <div className="landing-section"><SobreMi isLanding={true} /></div>
            <div className="landing-section"><Habilidades isLanding={true} /></div>
            <div id="proyectos" className="landing-section"><MisProyectosContent /></div>
            <div className="landing-section"><Educacion isLanding={true} /></div>
          </Suspense>
        </div>
      </>
    );
  }

  return (
    <div id="proyectos" style={{ '--page-bg': '#0B343C', '--page-accent': '#A9BE9D' } as React.CSSProperties}>
      {!isLanding && <Navbar />}
      <MisProyectosContent />
    </div>
  );
};

const MisProyectos: React.FC<{ isLanding?: boolean }> = ({ isLanding = false }) => {
  const { isMobile, layoutKey } = useLayoutState();
  return <MisProyectosLayout key={layoutKey} isMobile={isMobile} isLanding={isLanding} />;
};

export default MisProyectos;

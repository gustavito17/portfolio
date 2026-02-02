import React, { useState, useEffect, Suspense } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Habilidades.css';
import {
    FaReact,
    FaNode,
    FaPython,
    FaGit,
    FaGithub,
    FaBootstrap,
    FaCss3Alt,
    FaLock,
    FaServer,
    FaCloud,
    FaShieldAlt,
    FaFileAlt,
    FaCogs,
    FaJava,
} from 'react-icons/fa';
import {
    SiExpress,
    SiFastapi,
    SiPostgresql,
    SiMysql,
    SiVite,
    SiAxios,
    SiPytest,
    SiSwagger,
    SiReact,
    SiRender,
    SiJavascript,
} from 'react-icons/si';

// Importaciones diferidas
const Inicio = React.lazy(() => import('../inicio/Inicio')) as React.FC<{isLanding?: boolean}>;
const SobreMi = React.lazy(() => import('../sobre-mi/SobreMi')) as React.FC<{isLanding?: boolean}>;
const MisProyectos = React.lazy(() => import('../proyectos/MisProyectos')) as React.FC<{isLanding?: boolean}>;
const Educacion = React.lazy(() => import('../educacion/Educacion')) as React.FC<{isLanding?: boolean}>;

const COLORS = {
    primary: "#A9BE9D",    // Verde claro
    secondary: "#0B343C",  // Azul oscuro
};

const skillsData = [
    {
        stack: "Lenguajes",
        technologies: [
            { name: "JavaScript", icon: SiJavascript, color: COLORS.primary },
            { name: "Python", icon: FaPython, color: COLORS.primary },
            { name: "Java", icon: FaJava, color: COLORS.primary },
        ]
    },
    {
        stack: "Frontend",
        technologies: [
            { name: "React", icon: FaReact, color: COLORS.primary }, 
            { name: "React Router", icon: SiReact, color: COLORS.primary },
            { name: "Vite", icon: SiVite, color: COLORS.primary },
            { name: "Bootstrap", icon: FaBootstrap, color: COLORS.primary },
            { name: "CSS", icon: FaCss3Alt, color: COLORS.primary },
            { name: "Recharts", icon: FaReact, color: COLORS.primary },
            { name: "Axios", icon: SiAxios, color: COLORS.primary },
        ]
    },
    {
        stack: "Backend",
        technologies: [
            { name: "Node.js", icon: FaNode, color: COLORS.primary },
            { name: "Express", icon: SiExpress, color: COLORS.primary },
            { name: "Python", icon: FaPython, color: COLORS.primary },
            { name: "FastAPI", icon: SiFastapi, color: COLORS.primary },
            { name: "JWT", icon: FaLock, color: COLORS.primary },
            { name: "bcryptjs", icon: FaShieldAlt, color: COLORS.primary },
            { name: "Passlib", icon: FaLock, color: COLORS.primary },
            { name: "API REST", icon: FaServer, color: COLORS.primary },
        ]
    },
    {
        stack: "Base de Datos",
        technologies: [
            { name: "PostgreSQL", icon: SiPostgresql, color: COLORS.primary },
            { name: "MySQL", icon: SiMysql, color: COLORS.primary },
        ]
    },
    {
        stack: "DevOps / Tools",
        technologies: [
            { name: "Git", icon: FaGit, color: COLORS.primary },
            { name: "GitHub", icon: FaGithub, color: COLORS.primary },
            { name: "Nodemon", icon: FaCogs, color: COLORS.primary },
            { name: "Render", icon: SiRender, color: COLORS.primary },
            { name: "Cloudinary", icon: FaCloud, color: COLORS.primary },
        ]
    },
    {
        stack: "Testing & Docs",
        technologies: [
            { name: "pytest", icon: SiPytest, color: COLORS.primary },
            { name: "Swagger", icon: SiSwagger, color: COLORS.primary },
            { name: "ReDoc", icon: FaFileAlt, color: COLORS.primary },
        ]
    },
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

const HabilidadesContent: React.FC = () => {
    return (
        <>
            <video
                src="/videos/pensandohaciaarriba.webm"
                loop
                autoPlay
                muted
                playsInline
                className="habilidades-background-video-right"
            />
            <section className="habilidades-seccion">
                <header className="habilidades-header">
                    <h1>Habilidades Técnicas</h1>
                </header>
                <div className="skills-grid">
                    {skillsData.map((skillGroup, index) => (
                        <div key={index} className="skill-card">
                            <div className="skill-card-inner">
                                <div className="skill-card-front">
                                    <h3>{skillGroup.stack}</h3>
                                </div>
                                <div className="skill-card-back">
                                    {skillGroup.technologies.map((tech, techIndex) => {
                                        const IconComponent = tech.icon;
                                        return (
                                            <div key={techIndex} className="tech-item">
                                                {IconComponent && (
                                                    <IconComponent 
                                                        className="tech-icon" 
                                                        style={{ color: tech.color }}
                                                        size={20}
                                                    />
                                                )}
                                                <p>{tech.name}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

const HabilidadesLayout: React.FC<{ isLanding?: boolean; isMobile: boolean }> = ({ isLanding = false, isMobile }) => {
    useEffect(() => {
        if (isMobile && !isLanding) {
            const element = document.getElementById('habilidades');
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
                        <div id="habilidades" className="landing-section"><HabilidadesContent /></div>
                        <div className="landing-section"><MisProyectos isLanding={true} /></div>
                        <div className="landing-section"><Educacion isLanding={true} /></div>
                    </Suspense>
                </div>
            </>
        );
    }

    return (
        <div id="habilidades" style={{ '--page-bg': '#0B343C', '--page-accent': '#A9BE9D', position: 'relative', overflow: isMobile ? 'visible' : 'hidden' } as React.CSSProperties}>
            {!isLanding && <Navbar />}
            <HabilidadesContent />
        </div>
    );
};

const Habilidades: React.FC<{ isLanding?: boolean }> = ({ isLanding = false }) => {
    const { isMobile, layoutKey } = useLayoutState();
    return <HabilidadesLayout key={layoutKey} isMobile={isMobile} isLanding={isLanding} />;
};

export default Habilidades;

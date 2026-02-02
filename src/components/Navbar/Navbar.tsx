import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { path: '/inicio', label: 'Inicio', id: 'inicio' },
  { path: '/sobre-mi', label: 'Sobre mi', id: 'sobre-mi' },
  { path: '/habilidades', label: 'Habilidades', id: 'habilidades' },
  { path: '/proyectos', label: 'Proyectos', id: 'proyectos' },
  { path: '/educacion', label: 'Educación', id: 'educacion' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSectionPath, setActiveSectionPath] = useState('/inicio');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1366);
  const location = useLocation();
  const navigate = useNavigate();

  // Efecto para detectar si es vista móvil/tablet
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1366);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sincroniza la sección activa con la ruta de React Router (en móvil y escritorio)
  useEffect(() => {
    setActiveSectionPath(location.pathname);
  }, [location.pathname]);

  // Efecto para la navegación con flechas en escritorio
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Solo actuar si no es la vista móvil/tablet
      if (!isMobile) {
        const currentIndex = navLinks.findIndex(link => link.path === location.pathname);
        if (currentIndex === -1) return;

        let nextIndex = -1;

        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % navLinks.length;
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
          nextIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
        }

        if (nextIndex !== -1) {
          navigate(navLinks[nextIndex].path);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobile, location.pathname, navigate]);


  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, path: string) => {
    e.preventDefault();
    
    const element = document.getElementById(id);
    
    if (element) {
      // Si el elemento existe (estamos en la Landing Page), hacemos scroll
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSectionPath(path);
    } else {
      // Si el elemento NO existe (estamos en una página interna), navegamos a la ruta
      navigate(path);
    }

    // Cierra el menú al hacer clic
    setIsMenuOpen(false);
  };

  return (
    <header className={`navbar-header ${isMenuOpen ? 'navbar-open' : ''}`}>
      {/* Menú de Escritorio */}
      <div className="effects desktop-nav">
        {navLinks.map(link => (
          <React.Fragment key={`desktop-${link.id}`}>
            <input
              type="radio"
              name="effect"
              id={`desktop-radio-${link.id}`}
              checked={activeSectionPath === link.path}
              readOnly
            />
            <Link to={link.path}>
              <label htmlFor={`desktop-radio-${link.id}`}>{link.label}</label>
            </Link>
          </React.Fragment>
        ))}
      </div>

      {/* Navegación de Puntos (Escritorio) */}
      <nav className="points">
        {navLinks.map(link => (
          <Link
            key={`point-${link.id}`}
            to={link.path}
            className={activeSectionPath === link.path ? 'active' : ''}
            title={link.label}
          />
        ))}
      </nav>

      {/* Botón Hamburguesa (Móvil/Tablet) */}
      <div
        className={`hamburger-button ${isMenuOpen ? 'is-open' : ''}`}
        onClick={handleMenuToggle}
        aria-label="Abrir menú"
        aria-expanded={isMenuOpen}
      >
        <span className="bar bar1"></span>
        <span className="bar bar2"></span>
        <span className="bar bar3"></span>
      </div>

      {/* Panel de Navegación Móvil */}
      <div className={`mobile-nav-panel ${isMenuOpen ? 'is-open' : ''}`}>
        <div className="effects">
          {navLinks.map(link => (
            <a
              key={`mobile-${link.id}`}
              href={`#${link.id}`}
              onClick={(e) => handleMobileLinkClick(e, link.id, link.path)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

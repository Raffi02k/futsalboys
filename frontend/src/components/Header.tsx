import React, { useState, useEffect, useRef } from 'react';
import { Instagram, Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { siteConfig } from '../content/siteContent';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<{ [key: string]: boolean }>({
    KLUBBEN: true,
    MEDIA: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      // Don't hide header if mobile drawer menu is currently open
      if (mobileMenuOpen) {
        setHeaderVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // Always show header near the top of the page
      if (currentScrollY < 50) {
        setHeaderVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY;
      // 6px threshold to ignore micro scroll jitters
      if (Math.abs(diff) > 6) {
        if (diff > 0 && currentScrollY > 70) {
          // Scrolling down -> hide header
          setHeaderVisible(false);
        } else if (diff < 0) {
          // Scrolling up -> show header
          setHeaderVisible(true);
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Reset visibility and close menus on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    setHeaderVisible(true);
  }, [location.pathname, location.hash]);

  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    if (path.startsWith('#')) {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(path);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      } else {
        const el = document.querySelector(path);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (path === '/') {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.startsWith('/#')) {
      e.preventDefault();
      const hash = path.substring(1);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      } else {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (path.startsWith('/')) {
      e.preventDefault();
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleMobileAccordion = (label: string) => {
    setMobileAccordion((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Helper to check if any child of a dropdown is currently active
  const isParentActive = (children?: Array<{ path: string }>) => {
    if (!children) return false;
    return children.some((child) => {
      if (child.path === '/') return location.pathname === '/';
      if (child.path.startsWith('/#')) return location.pathname === '/' && location.hash === child.path.substring(1);
      return location.pathname === child.path || location.pathname.startsWith(`${child.path}/`);
    });
  };

  const navItems = siteConfig.navItems || [];

  return (
    <>
      <header
        className={`header ${scrolled ? 'header--scrolled' : ''} ${
          !headerVisible && !mobileMenuOpen ? 'header--hidden' : ''
        }`}
      >
        <div className="container header__inner">
          {/* Logo & Club Name */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="header__brand"
            aria-label="Futsal Boys Hem"
          >
            <img
              src={siteConfig.logoUrl}
              alt="Futsal Boys Logo"
              className="header__logo-img"
            />
            <div className="header__brand-text">
              <span className="header__brand-title">FUTSAL BOYS</span>
              <span className="header__brand-sub">TROLLHÄTTAN</span>
            </div>
          </a>

          {/* Desktop Navigation with Media Magnet Style Dropdown */}
          <nav className="header__nav" aria-label="Huvudmeny">
            {navItems.map((item) => {
              if (item.children && item.children.length > 0) {
                const isOpen = openDropdown === item.label;
                const hasActiveChild = isParentActive(item.children);

                return (
                  <div
                    key={item.label}
                    className="header__nav-item--dropdown"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      className={`header__nav-link header__dropdown-trigger ${
                        hasActiveChild ? 'is-active' : ''
                      } ${isOpen ? 'is-open' : ''}`}
                      onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={`header__chevron ${isOpen ? 'is-rotated' : ''}`}
                      />
                    </button>

                    {/* Media Magnet Inspired Floating Dropdown Card */}
                    <div className={`header__dropdown ${isOpen ? 'is-visible' : ''}`}>
                      <div className="header__dropdown-inner">
                        {item.children.map((child) => {
                          const isChildActive =
                            location.pathname === child.path ||
                            (child.path.startsWith('/#') &&
                              location.pathname === '/' &&
                              location.hash === child.path.substring(1));

                          return (
                            <a
                              key={child.label}
                              href={child.path}
                              onClick={(e) => handleNavClick(e, child.path)}
                              className={`header__dropdown-item ${
                                isChildActive ? 'is-active' : ''
                              }`}
                            >
                              <span className="header__dropdown-title">
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="header__dropdown-desc">
                                  {child.description}
                                </span>
                              )}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              // Simple top-level link
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname === item.path;

              return (
                <a
                  key={item.label}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path || '/')}
                  className={`header__nav-link ${isActive ? 'is-active' : ''}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Actions & Mobile Button */}
          <div className="header__actions">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--neon btn--sm header__cta-btn"
            >
              <Instagram size={16} />
              <span>FÖLJ OSS</span>
            </a>

            <button
              className="header__menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Stäng meny' : 'Öppna meny'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with Accordion */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="mobile-nav__links">
          {navItems.map((item) => {
            if (item.children && item.children.length > 0) {
              const isExpanded = mobileAccordion[item.label] ?? false;
              const hasActiveChild = isParentActive(item.children);

              return (
                <div key={item.label} className="mobile-nav__group">
                  <button
                    type="button"
                    onClick={() => toggleMobileAccordion(item.label)}
                    className={`mobile-nav__group-trigger ${
                      hasActiveChild ? 'is-active' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={22}
                      className={`mobile-nav__chevron ${
                        isExpanded ? 'is-rotated' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="mobile-nav__sublinks">
                      {item.children.map((child) => {
                        const isChildActive =
                          location.pathname === child.path ||
                          (child.path.startsWith('/#') &&
                            location.pathname === '/' &&
                            location.hash === child.path.substring(1));

                        return (
                          <a
                            key={child.label}
                            href={child.path}
                            onClick={(e) => handleNavClick(e, child.path)}
                            className={`mobile-nav__sublink ${
                              isChildActive ? 'is-active' : ''
                            }`}
                          >
                            <span className="mobile-nav__sublink-bullet" />
                            <span>{child.label}</span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname === item.path;

            return (
              <a
                key={item.label}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path || '/')}
                className={`mobile-nav__link ${isActive ? 'is-active' : ''}`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--neon"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Instagram size={18} />
          <span>FÖLJ @{siteConfig.instagramHandle}</span>
        </a>
      </div>
    </>
  );
};

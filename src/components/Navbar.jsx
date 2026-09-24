import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  ChevronDown, 
  Menu, 
  X, 
  Terminal, 
  ExternalLink,
  Lock
} from 'lucide-react';
import { LANGUAGES } from '../data/translations';

export function Navbar({ currentLang, onSelectLang, activePage, setActivePage, onOpenAuth }) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', labelKey: 'home', default: 'Home' },
    { id: 'check', labelKey: 'checkLink', default: 'Check Link' },
    { id: 'about', labelKey: 'about', default: 'About' },
    { id: 'dashboard', labelKey: 'dashboard', default: 'Dashboard' },
    { id: 'contact', labelKey: 'contact', default: 'Contact' }
  ];

  const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(22, 22, 24, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
    }}>
      {/* Top micro-banner for I4C and CERT-In notice */}
      <div style={{
        backgroundColor: '#111113',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '5px 20px',
        fontSize: '0.75rem',
        color: '#94A3B8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="live-dot-green" style={{ width: '6px', height: '6px' }}></span>
          <span style={{ color: '#F8FAFC', fontWeight: '600' }}>
            National Cyber Crime Reporting Telemetry Node #IN-I4C-992
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
          <span style={{ color: '#F59E0B', fontWeight: '600' }}>Incident Helpline: Dial 1930</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#38BDF8', fontWeight: '500' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38BDF8' }}></span>
            Bhashini AI Language Engine Active
          </span>
          <a 
            href="https://cybercrime.gov.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: '#94A3B8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
          >
            cybercrime.gov.in <ExternalLink size={10} />
          </a>
        </div>
      </div>

      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          {/* Official Sfynbox Logo Image */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '1.5px solid rgba(118, 192, 236, 0.5)',
            boxShadow: '0 0 16px rgba(118, 192, 236, 0.35)',
            height: '42px',
            backgroundColor: '#FACC15',
            flexShrink: 0
          }}>
            <img 
              src="/sfynbox-logo.jpeg" 
              alt="SFYNBOX Logo" 
              style={{
                height: '42px',
                width: 'auto',
                maxWidth: '120px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: '800',
                fontSize: '1.45rem',
                letterSpacing: '0.04em',
                color: '#F8FAFC'
              }}>
                SFYN<span style={{ color: '#38BDF8' }}>BOX</span>
              </span>
              <span style={{
                fontSize: '0.65rem',
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                color: '#38BDF8',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                fontWeight: '700',
                textTransform: 'uppercase'
              }}>
                SANDBOX
              </span>
            </div>
            <div style={{
              fontSize: '0.68rem',
              color: '#94A3B8',
              letterSpacing: '0.02em',
              fontWeight: '500'
            }}>
              Universal Multi-Device Scam Isolation
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="desktop-nav">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: isActive ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                  color: isActive ? '#38BDF8' : '#94A3B8',
                  border: isActive ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '0.92rem',
                  fontWeight: isActive ? '600' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#38BDF8';
                    e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#94A3B8';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.id === 'check' && <Terminal size={15} />}
                {item.default}
              </button>
            );
          })}
        </nav>

        {/* Right Action Cluster (Language Selector + Auth CTA) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Bhashini Language Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#1E1E24',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#F8FAFC',
                padding: '7px 12px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: '500',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.2s ease'
              }}
              title="Change Language (Bhashini AI Integration)"
            >
              <Globe size={15} color="#38BDF8" />
              <span>{currentLangObj.nativeName}</span>
              <ChevronDown size={14} color="#94A3B8" />
            </button>

            {/* Dropdown Options */}
            {langMenuOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '190px',
                  backgroundColor: '#1E1E24',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '10px',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
                  padding: '6px',
                  zIndex: 200
                }}
              >
                <div style={{
                  padding: '6px 8px',
                  fontSize: '0.72rem',
                  color: '#38BDF8',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>Bhashini Languages</span>
                  <span style={{ fontSize: '0.65rem', color: '#10B981' }}>Live</span>
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setLangMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: currentLang === lang.code ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                      color: currentLang === lang.code ? '#38BDF8' : '#F8FAFC',
                      cursor: 'pointer',
                      fontSize: '0.86rem',
                      textAlign: 'left',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (currentLang !== lang.code) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                    }}
                    onMouseLeave={(e) => {
                      if (currentLang !== lang.code) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ fontWeight: currentLang === lang.code ? '600' : '400' }}>
                      {lang.nativeName}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: '#64748B' }}>
                      {lang.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button: Sign In / Register */}
          <button 
            onClick={onOpenAuth}
            className="btn-primary"
            style={{
              padding: '8px 18px',
              fontSize: '0.88rem'
            }}
          >
            <Lock size={14} />
            <span>Sign In / Register</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#F8FAFC',
              cursor: 'pointer',
              padding: '6px'
            }}
            className="mobile-hamburger-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#161618',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: activePage === item.id ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                color: activePage === item.id ? '#38BDF8' : '#F8FAFC',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {item.default}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAuth();
            }}
            className="btn-primary"
            style={{ width: '100%', marginTop: '6px' }}
          >
            Sign In / Register
          </button>
        </div>
      )}

      {/* Inline styles for responsive menu visibility */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}

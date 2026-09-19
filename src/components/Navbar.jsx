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
      backgroundColor: 'rgba(10, 25, 47, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(118, 192, 236, 0.15)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
    }}>
      {/* Top micro-banner for I4C and CERT-In notice */}
      <div style={{
        backgroundColor: '#07101E',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '4px 20px',
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
          <span style={{ color: '#E2E8F0', fontWeight: '500' }}>
            National Cyber Crime Reporting Telemetry Node #IN-I4C-992
          </span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ color: '#FACC15' }}>Incident Helpline: Dial 1930</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#76C0EC' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#76C0EC' }}></span>
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
          {/* High-tech vector Shield-Sandbox Logo */}
          <div style={{
            position: 'relative',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(118, 192, 236, 0.25), rgba(10, 25, 47, 0.9))',
            border: '1.5px solid #76C0EC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(118, 192, 236, 0.35)'
          }}>
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 3L27 8V16.5C27 23 22.5 28 16 29.5C9.5 28 5 23 5 16.5V8L16 3Z" stroke="#76C0EC" strokeWidth="2.2" strokeLinejoin="round"/>
              <path d="M16 8L23 12V17C23 20.8 20.1 23.9 16 25C11.9 23.9 9 20.8 9 17V12L16 8Z" fill="rgba(118, 192, 236, 0.2)" stroke="#76C0EC" strokeWidth="1.5"/>
              <rect x="13" y="14" width="6" height="6" rx="1.5" fill="#76C0EC"/>
              <circle cx="16" cy="17" r="1.2" fill="#0A192F"/>
            </svg>
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 6px #10B981'
            }}></div>
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
                color: '#FFFFFF'
              }}>
                SFYN<span style={{ color: '#76C0EC' }}>BOX</span>
              </span>
              <span style={{
                fontSize: '0.65rem',
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: 'rgba(118, 192, 236, 0.18)',
                color: '#76C0EC',
                border: '1px solid rgba(118, 192, 236, 0.4)',
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
                  background: isActive ? 'rgba(118, 192, 236, 0.15)' : 'transparent',
                  color: isActive ? '#76C0EC' : '#CBD5E1',
                  border: isActive ? '1px solid rgba(118, 192, 236, 0.3)' : '1px solid transparent',
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
                    e.currentTarget.style.color = '#76C0EC';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#CBD5E1';
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
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(118, 192, 236, 0.25)',
                color: '#F8FAFC',
                padding: '7px 12px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Change Language (Bhashini AI Integration)"
            >
              <Globe size={15} color="#76C0EC" />
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
                  backgroundColor: '#0F172A',
                  border: '1px solid rgba(118, 192, 236, 0.3)',
                  borderRadius: '10px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                  padding: '6px',
                  zIndex: 200
                }}
              >
                <div style={{
                  padding: '6px 8px',
                  fontSize: '0.72rem',
                  color: '#76C0EC',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
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
                      backgroundColor: currentLang === lang.code ? 'rgba(118, 192, 236, 0.2)' : 'transparent',
                      color: currentLang === lang.code ? '#76C0EC' : '#E2E8F0',
                      cursor: 'pointer',
                      fontSize: '0.86rem',
                      textAlign: 'left',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (currentLang !== lang.code) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
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

          {/* CTA Button: Sign In / Register (Sky Blue #76C0EC) */}
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
          backgroundColor: '#0A192F',
          borderBottom: '1px solid rgba(118, 192, 236, 0.2)',
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
                backgroundColor: activePage === item.id ? 'rgba(118, 192, 236, 0.15)' : 'transparent',
                color: activePage === item.id ? '#76C0EC' : '#E2E8F0',
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

import React from 'react';
import { 
  PhoneCall, 
  ExternalLink, 
  ShieldCheck, 
  Terminal, 
  Lock, 
  FileText, 
  Server, 
  AlertTriangle 
} from 'lucide-react';
import { translations } from '../data/translations';

export function Footer({ currentLang, setActivePage }) {
  const t = translations[currentLang] || translations.en;

  return (
    <footer style={{
      backgroundColor: '#07101E',
      borderTop: '1px solid rgba(118, 192, 236, 0.2)',
      marginTop: '80px',
      color: '#94A3B8',
      fontSize: '0.9rem'
    }}>
      {/* Helpline Emergency Escalation Strip */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.18), rgba(250, 204, 21, 0.12), rgba(118, 192, 236, 0.15))',
        borderBottom: '1px solid rgba(239, 68, 68, 0.3)',
        padding: '16px 20px'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid #EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#EF4444',
              flexShrink: 0
            }}>
              <PhoneCall size={20} />
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Emergency Cyber Financial Fraud Helpline</span>
                <span className="badge badge-danger" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                  24x7 TOLL-FREE
                </span>
              </div>
              <div style={{ color: '#CBD5E1', fontSize: '0.84rem' }}>
                Lost money to a fake link or unauthorized UPI transaction? Immediately dial <strong>1930</strong> or file at <strong>cybercrime.gov.in</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a 
              href="tel:1930" 
              className="btn-danger"
              style={{
                textDecoration: 'none',
                padding: '8px 18px',
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <PhoneCall size={16} />
              <span>Call 1930 Now</span>
            </a>
            <a 
              href="https://cybercrime.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{
                textDecoration: 'none',
                padding: '8px 16px',
                fontSize: '0.88rem'
              }}
            >
              <span>National Portal</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={{ padding: '60px 20px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '14px'
            }}>
              <div style={{
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid rgba(118, 192, 236, 0.4)',
                boxShadow: '0 0 10px rgba(118, 192, 236, 0.25)',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FACC15',
                height: '32px'
              }}>
                <img 
                  src="/sfynbox-logo.jpeg" 
                  alt="Sfynbox Logo" 
                  style={{
                    height: '32px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </div>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: '800',
                fontSize: '1.25rem',
                color: '#FFFFFF'
              }}>
                SFYN<span style={{ color: '#76C0EC' }}>BOX</span>
              </span>
            </div>
            <p style={{ lineHeight: '1.6', fontSize: '0.86rem', color: '#94A3B8', marginBottom: '18px' }}>
              {t.footer.aboutText}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-primary">ISO 27001 Isolated</span>
              <span className="badge badge-success">CERT-In Aligned</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ color: '#F8FAFC', fontSize: '0.95rem', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Platform Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button 
                  onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.88rem', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = '#76C0EC'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  Universal URL Scanner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('check'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.88rem', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = '#76C0EC'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  Interactive MicroVM Sandbox
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.88rem', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = '#76C0EC'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  I4C Cyber Cell Threat Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.88rem', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = '#76C0EC'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  Dynamic Sandbox Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Law Enforcement & APIs */}
          <div>
            <h4 style={{ color: '#F8FAFC', fontSize: '0.95rem', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Law Enforcement & APIs
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button 
                  onClick={() => { setActivePage('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.88rem', padding: 0, display: 'flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={(e) => e.target.style.color = '#76C0EC'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  <Server size={14} />
                  <span>I4C Telemetry Hub</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.88rem', padding: 0, display: 'flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={(e) => e.target.style.color = '#76C0EC'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  <Terminal size={14} />
                  <span>Law Enforcement API Access</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.88rem', padding: 0, display: 'flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={(e) => e.target.style.color = '#76C0EC'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  <FileText size={14} />
                  <span>Section 69A IT Act Notices</span>
                </button>
              </li>
              <li>
                <a 
                  href="https://cert-in.org.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={(e) => e.target.style.color = '#76C0EC'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  <AlertTriangle size={14} />
                  <span>CERT-In Advisories</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 style={{ color: '#F8FAFC', fontSize: '0.95rem', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Security & Compliance
            </h4>
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              lineHeight: '1.5'
            }}>
              <p style={{ marginBottom: '8px', color: '#CBD5E1' }}>
                {t.footer.certInNotice}
              </p>
              <p style={{ color: '#64748B', fontSize: '0.74rem' }}>
                All target URLs are evaluated inside ephemeral containers. No user IP or device telemetry is transmitted to investigated websites.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8rem',
          color: '#64748B'
        }}>
          <div>
            © {new Date().getFullYear()} Sfynbox Technologies. {t.footer.rights}
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ color: '#94A3B8' }}>Security Architecture v2.4</span>
            <span>•</span>
            <span style={{ color: '#76C0EC' }}>Bhashini AI v1.2</span>
            <span>•</span>
            <span style={{ color: '#10B981' }}>I4C Node Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

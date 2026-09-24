import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Terminal, 
  Search, 
  ClipboardPaste, 
  ArrowRight, 
  Smartphone, 
  Laptop, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  CreditCard, 
  Package, 
  Gift, 
  Cpu, 
  Globe, 
  Lock, 
  PlayCircle,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { translations } from '../data/translations';
import { SCAM_PRESETS } from '../data/scamDatabase';
import { LIVE_TELEMETRY_FEED } from '../data/telemetryData';
import KineticGrid from '@/components/ui/kinetic-grid';

export function HomePage({ currentLang, onStartScan, setActivePage }) {
  const t = translations[currentLang] || translations.en;
  const [inputUrl, setInputUrl] = useState('');
  const [pasteError, setPasteError] = useState('');

  // Animated metric counters
  const [scannedCount, setScannedCount] = useState(482910);
  const [avertedCount, setAvertedCount] = useState(89420);

  useEffect(() => {
    const interval = setInterval(() => {
      setScannedCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      if (Math.random() > 0.6) {
        setAvertedCount(prev => prev + 1);
      }
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setInputUrl(text);
          setPasteError('');
        }
      } else {
        setPasteError('Clipboard access denied. Please paste manually.');
      }
    } catch {
      setPasteError('Please press Ctrl+V to paste your link.');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    onStartScan(inputUrl.trim());
  };

  const handlePresetClick = (preset) => {
    setInputUrl(preset.url);
    onStartScan(preset.url);
  };

  return (
    <KineticGrid className="cyber-bg" globalColor="default">
      <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
        
        {/* HERO SECTION */}
      <section style={{
        padding: '70px 20px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow backdrop behind hero */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '250px',
          background: 'radial-gradient(ellipse, rgba(118, 192, 236, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '980px' }}>
          
          {/* Brand Logo & Top Tag */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1.5px solid rgba(118, 192, 236, 0.5)',
              boxShadow: '0 0 18px rgba(118, 192, 236, 0.3)',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FACC15',
              height: '36px'
            }}>
              <img 
                src="/sfynbox-logo.jpeg" 
                alt="Sfynbox Logo" 
                style={{
                  height: '36px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
            <span className="badge badge-primary" style={{ padding: '6px 16px', fontSize: '0.84rem' }}>
              <Sparkles size={14} color="#76C0EC" />
              <span>{t.hero.tag}</span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
              <span style={{ color: '#10B981' }}>Bhashini Multi-Lingual</span>
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)',
            fontWeight: '800',
            lineHeight: '1.2',
            color: '#FFFFFF',
            marginBottom: '20px',
            letterSpacing: '-0.02em'
          }}>
            Check Any Link Before You Click — <br/>
            <span style={{
              background: 'linear-gradient(135deg, #76C0EC 0%, #38BDF8 60%, #BAE6FD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 35px rgba(118, 192, 236, 0.4)'
            }}>
              Safe, Instant, in Your Language.
            </span>
          </h1>

          {/* Subhead */}
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: '#94A3B8',
            maxWidth: '820px',
            margin: '0 auto 36px',
            lineHeight: '1.6'
          }}>
            {t.hero.subtitle}
          </p>

          {/* EMBEDDED UNIVERSAL SCANNER BAR */}
          <div style={{ maxWidth: '820px', margin: '0 auto 30px' }}>
            <form 
              onSubmit={handleFormSubmit}
              className="glass-panel"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                borderRadius: '16px',
                border: '1.5px solid rgba(118, 192, 236, 0.4)',
                boxShadow: '0 12px 40px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(118, 192, 236, 0.2)',
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                gap: '8px',
                flexWrap: 'wrap'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flex: '1 1 320px',
                padding: '4px 12px',
                gap: '10px'
              }}>
                <Search size={22} color="#76C0EC" style={{ flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder={t.hero.inputPlaceholder}
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#FFFFFF',
                    fontSize: '1.05rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: '500'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={handlePasteClipboard}
                  title="Paste Link from Clipboard"
                  className="btn-secondary"
                  style={{
                    padding: '10px 14px',
                    fontSize: '0.85rem',
                    borderRadius: '10px'
                  }}
                >
                  <ClipboardPaste size={16} color="#76C0EC" />
                  <span className="hide-on-mobile">{t.hero.pasteBtn}</span>
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    padding: '12px 28px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    borderRadius: '10px'
                  }}
                >
                  <span>{t.hero.scanBtn}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>

            {pasteError && (
              <div style={{ color: '#FACC15', fontSize: '0.78rem', marginTop: '6px' }}>
                {pasteError}
              </div>
            )}
          </div>

          {/* Quick Test Scenarios */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '36px'
          }}>
            <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: '500' }}>
              {t.hero.quickSamples}
            </span>
            {SCAM_PRESETS.slice(0, 4).map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetClick(preset)}
                style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: preset.riskLevel === 'critical' ? '#FCA5A5' : (preset.riskLevel === 'suspicious' ? '#FDE047' : '#86EFAC'),
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#76C0EC';
                  e.currentTarget.style.backgroundColor = 'rgba(118, 192, 236, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.6)';
                }}
              >
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: preset.riskLevel === 'critical' ? '#EF4444' : (preset.riskLevel === 'suspicious' ? '#FACC15' : '#10B981')
                }}></span>
                <span>{preset.title}</span>
              </button>
            ))}
          </div>

          {/* Platform Compatibility Badges */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px',
            padding: '12px 24px',
            borderRadius: '40px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: '500' }}>
              {t.hero.platformsSupported}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {['Android', 'iOS', 'Windows', 'macOS', 'Linux', 'ChromeOS'].map((plat) => (
                <span
                  key={plat}
                  style={{
                    fontSize: '0.76rem',
                    color: '#E2E8F0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)'
                  }}
                >
                  <CheckCircle2 size={12} color="#76C0EC" />
                  {plat}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* LIVE SECURITY METRICS & TICKER */}
      <section style={{
        backgroundColor: '#07101E',
        borderTop: '1px solid rgba(118, 192, 236, 0.15)',
        borderBottom: '1px solid rgba(118, 192, 236, 0.15)',
        padding: '20px 0'
      }}>
        <div className="container">
          
          {/* Counters Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '12px',
              borderRight: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{
                fontSize: '1.9rem',
                fontWeight: '800',
                color: '#76C0EC',
                fontFamily: 'var(--font-mono)'
              }}>
                {scannedCount.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {t.metrics.scanned}
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '12px',
              borderRight: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{
                fontSize: '1.9rem',
                fontWeight: '800',
                color: '#EF4444',
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <span>{avertedCount.toLocaleString()}</span>
                <ShieldAlert size={20} color="#EF4444" />
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {t.metrics.threatsBlocked}
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '12px',
              borderRight: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{
                fontSize: '1.9rem',
                fontWeight: '800',
                color: '#10B981',
                fontFamily: 'var(--font-mono)'
              }}>
                1.4s
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {t.metrics.avgScanTime}
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '12px'
            }}>
              <div style={{
                fontSize: '1.9rem',
                fontWeight: '800',
                color: '#FACC15',
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <span className="live-dot-green" style={{ width: '10px', height: '10px' }}></span>
                <span>28 States</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {t.metrics.activeSensors}
              </div>
            </div>
          </div>

          {/* Scrolling Live Ticker */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '10px',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            overflow: 'hidden',
            height: '42px'
          }}>
            <div style={{
              padding: '0 16px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#EF4444',
              fontWeight: '700',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              borderRight: '1px solid rgba(239, 68, 68, 0.3)',
              flexShrink: 0
            }}>
              <span className="live-dot"></span>
              <span>{t.metrics.liveTickerTitle}</span>
            </div>

            <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
              <div className="ticker-content" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                {[...LIVE_TELEMETRY_FEED, ...LIVE_TELEMETRY_FEED].map((item, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      fontSize: '0.82rem',
                      color: '#E2E8F0',
                      cursor: 'pointer'
                    }}
                    onClick={() => onStartScan('http://' + item.domain)}
                  >
                    <span style={{ color: '#FACC15' }}>⚠️</span>
                    <strong style={{ color: '#76C0EC', fontFamily: 'var(--font-mono)' }}>{item.domain}</strong>
                    <span style={{ color: '#94A3B8' }}>({item.brand})</span>
                    <span className="badge badge-danger" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                      {item.vector}
                    </span>
                    <span style={{ color: '#64748B', fontSize: '0.74rem' }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3-STEP "HOW IT WORKS" */}
      <section style={{ padding: '80px 20px 50px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>
              Zero Physical Risk
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '800', color: '#FFFFFF', marginBottom: '12px' }}>
              {t.howItWorks.title}
            </h2>
            <p style={{ color: '#94A3B8', maxWidth: '640px', margin: '0 auto', fontSize: '1rem' }}>
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {/* Step 1 */}
            <div className="glass-panel glass-panel-hover" style={{ padding: '30px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(118, 192, 236, 0.15)',
                border: '1px solid #76C0EC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#76C0EC',
                marginBottom: '20px'
              }}>
                <ClipboardPaste size={24} />
              </div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>
                {t.howItWorks.step1Title}
              </h3>
              <p style={{ color: '#94A3B8', lineHeight: '1.6', fontSize: '0.92rem' }}>
                {t.howItWorks.step1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-panel glass-panel-hover" style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '4px 12px',
                backgroundColor: 'rgba(118, 192, 236, 0.2)',
                borderBottomLeftRadius: '10px',
                color: '#76C0EC',
                fontSize: '0.72rem',
                fontWeight: '700'
              }}>
                PUPPETEER DOCKER
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(250, 204, 21, 0.15)',
                border: '1px solid #FACC15',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FACC15',
                marginBottom: '20px'
              }}>
                <Cpu size={24} />
              </div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>
                {t.howItWorks.step2Title}
              </h3>
              <p style={{ color: '#94A3B8', lineHeight: '1.6', fontSize: '0.92rem' }}>
                {t.howItWorks.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-panel glass-panel-hover" style={{ padding: '30px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
                marginBottom: '20px'
              }}>
                <Globe size={24} />
              </div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>
                {t.howItWorks.step3Title}
              </h3>
              <p style={{ color: '#94A3B8', lineHeight: '1.6', fontSize: '0.92rem' }}>
                {t.howItWorks.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMON SCAM BREAKDOWN CARDS */}
      <section style={{ padding: '40px 20px 60px' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '36px'
          }}>
            <div>
              <span className="badge badge-warning" style={{ marginBottom: '8px' }}>
                Smishing Awareness Hub
              </span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: '800', color: '#FFFFFF' }}>
                {t.scams.title}
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
                {t.scams.subtitle}
              </p>
            </div>

            <button
              onClick={() => setActivePage('check')}
              className="btn-secondary"
            >
              <span>Launch Custom Scan</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '22px'
          }}>
            {/* Electricity Card */}
            <div className="glass-panel glass-panel-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  color: '#EF4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap size={20} />
                </div>
                <span className="badge badge-danger">36% of Reports</span>
              </div>
              <h3 style={{ color: '#F8FAFC', fontSize: '1.15rem', fontWeight: '700', marginBottom: '10px' }}>
                {t.scams.electricity.title}
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: '1.5', flex: 1, marginBottom: '20px' }}>
                {t.scams.electricity.desc}
              </p>
              <button
                onClick={() => handlePresetClick(SCAM_PRESETS[0])}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                <PlayCircle size={15} color="#76C0EC" />
                <span>Simulate BESCOM Scam</span>
              </button>
            </div>

            {/* Banking KYC Card */}
            <div className="glass-panel glass-panel-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(250, 204, 21, 0.15)',
                  color: '#FACC15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CreditCard size={20} />
                </div>
                <span className="badge badge-warning">29% of Reports</span>
              </div>
              <h3 style={{ color: '#F8FAFC', fontSize: '1.15rem', fontWeight: '700', marginBottom: '10px' }}>
                {t.scams.banking.title}
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: '1.5', flex: 1, marginBottom: '20px' }}>
                {t.scams.banking.desc}
              </p>
              <button
                onClick={() => handlePresetClick(SCAM_PRESETS[1])}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                <PlayCircle size={15} color="#76C0EC" />
                <span>Simulate SBI YONO Scam</span>
              </button>
            </div>

            {/* India Post Courier Card */}
            <div className="glass-panel glass-panel-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(59, 130, 246, 0.15)',
                  color: '#3B82F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Package size={20} />
                </div>
                <span className="badge badge-primary">18% of Reports</span>
              </div>
              <h3 style={{ color: '#F8FAFC', fontSize: '1.15rem', fontWeight: '700', marginBottom: '10px' }}>
                {t.scams.courier.title}
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: '1.5', flex: 1, marginBottom: '20px' }}>
                {t.scams.courier.desc}
              </p>
              <button
                onClick={() => handlePresetClick(SCAM_PRESETS[2])}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                <PlayCircle size={15} color="#76C0EC" />
                <span>Simulate India Post Scam</span>
              </button>
            </div>

            {/* Lottery / 5G Card */}
            <div className="glass-panel glass-panel-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(139, 92, 246, 0.15)',
                  color: '#A78BFA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Gift size={20} />
                </div>
                <span className="badge badge-warning">11% of Reports</span>
              </div>
              <h3 style={{ color: '#F8FAFC', fontSize: '1.15rem', fontWeight: '700', marginBottom: '10px' }}>
                {t.scams.lottery.title}
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: '1.5', flex: 1, marginBottom: '20px' }}>
                {t.scams.lottery.desc}
              </p>
              <button
                onClick={() => handlePresetClick(SCAM_PRESETS[3])}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                <PlayCircle size={15} color="#76C0EC" />
                <span>Simulate Jio 5G Scam</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Inline Helpers */}
      <style>{`
        @media (max-width: 640px) {
          .hide-on-mobile { display: none !important; }
        }
      `}</style>
      </div>
    </KineticGrid>
  );
}

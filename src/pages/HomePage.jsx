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
    <div className="cyber-bg">
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
            color: '#0F172A',
            marginBottom: '20px',
            letterSpacing: '-0.02em'
          }}>
            Check Any Link Before You Click — <br/>
            <span style={{
              background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 35px rgba(2, 132, 199, 0.25)'
            }}>
              Safe, Instant, in Your Language.
            </span>
          </h1>

          {/* Subhead */}
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: '#475569',
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
                border: '1.5px solid rgba(2, 132, 199, 0.35)',
                boxShadow: '0 12px 35px -8px rgba(0, 0, 0, 0.08), 0 0 20px rgba(2, 132, 199, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
                <Search size={22} color="#0284C7" style={{ flexShrink: 0 }} />
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
                    color: '#0F172A',
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
                  <ClipboardPaste size={16} color="#0284C7" />
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
                  background: '#FFFFFF',
                  border: '1px solid rgba(15, 23, 42, 0.1)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                  color: preset.riskLevel === 'critical' ? '#DC2626' : (preset.riskLevel === 'suspicious' ? '#D97706' : '#059669'),
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0284C7';
                  e.currentTarget.style.backgroundColor = 'rgba(2, 132, 199, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.1)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
              >
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: preset.riskLevel === 'critical' ? '#DC2626' : (preset.riskLevel === 'suspicious' ? '#D97706' : '#059669')
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
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)'
          }}>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '500' }}>
              {t.hero.platformsSupported}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {['Android', 'iOS', 'Windows', 'macOS', 'Linux', 'ChromeOS'].map((plat) => (
                <span
                  key={plat}
                  style={{
                    fontSize: '0.76rem',
                    color: '#0F172A',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: '#F1F5F9'
                  }}
                >
                  <CheckCircle2 size={12} color="#0284C7" />
                  {plat}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* LIVE SECURITY METRICS & TICKER */}
      <section style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid rgba(15, 23, 42, 0.08)',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
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
              borderRight: '1px solid rgba(15, 23, 42, 0.08)'
            }}>
              <div style={{
                fontSize: '1.9rem',
                fontWeight: '800',
                color: '#0284C7',
                fontFamily: 'var(--font-mono)'
              }}>
                {scannedCount.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '600' }}>
                {t.metrics.scanned}
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '12px',
              borderRight: '1px solid rgba(15, 23, 42, 0.08)'
            }}>
              <div style={{
                fontSize: '1.9rem',
                fontWeight: '800',
                color: '#DC2626',
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <span>{avertedCount.toLocaleString()}</span>
                <ShieldAlert size={20} color="#DC2626" />
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '600' }}>
                {t.metrics.threatsBlocked}
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '12px',
              borderRight: '1px solid rgba(15, 23, 42, 0.08)'
            }}>
              <div style={{
                fontSize: '1.9rem',
                fontWeight: '800',
                color: '#059669',
                fontFamily: 'var(--font-mono)'
              }}>
                1.4s
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '600' }}>
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
                color: '#D97706',
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <span className="live-dot-green" style={{ width: '10px', height: '10px' }}></span>
                <span>28 States</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '600' }}>
                {t.metrics.activeSensors}
              </div>
            </div>
          </div>

          {/* Scrolling Live Ticker */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#F8FAFC',
            borderRadius: '10px',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            overflow: 'hidden',
            height: '42px'
          }}>
            <div style={{
              padding: '0 16px',
              backgroundColor: 'rgba(220, 38, 38, 0.1)',
              color: '#DC2626',
              fontWeight: '700',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              borderRight: '1px solid rgba(220, 38, 38, 0.2)',
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
                      color: '#0F172A',
                      cursor: 'pointer'
                    }}
                    onClick={() => onStartScan('http://' + item.domain)}
                  >
                    <span>⚠️</span>
                    <strong style={{ color: '#0284C7', fontFamily: 'var(--font-mono)' }}>{item.domain}</strong>
                    <span style={{ color: '#64748B' }}>({item.brand})</span>
                    <span className="badge badge-danger" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                      {item.vector}
                    </span>
                    <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>{item.time}</span>
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
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '800', color: '#0F172A', marginBottom: '12px' }}>
              {t.howItWorks.title}
            </h2>
            <p style={{ color: '#475569', maxWidth: '640px', margin: '0 auto', fontSize: '1rem' }}>
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
                backgroundColor: 'rgba(2, 132, 199, 0.1)',
                border: '1px solid #0284C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284C7',
                marginBottom: '20px'
              }}>
                <ClipboardPaste size={24} />
              </div>
              <h3 style={{ color: '#0F172A', fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>
                {t.howItWorks.step1Title}
              </h3>
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.92rem' }}>
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
                backgroundColor: 'rgba(2, 132, 199, 0.12)',
                borderBottomLeftRadius: '10px',
                color: '#0284C7',
                fontSize: '0.72rem',
                fontWeight: '700'
              }}>
                PUPPETEER DOCKER
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(217, 119, 6, 0.1)',
                border: '1px solid #D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D97706',
                marginBottom: '20px'
              }}>
                <Cpu size={24} />
              </div>
              <h3 style={{ color: '#0F172A', fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>
                {t.howItWorks.step2Title}
              </h3>
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.92rem' }}>
                {t.howItWorks.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-panel glass-panel-hover" style={{ padding: '30px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                border: '1px solid #059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#059669',
                marginBottom: '20px'
              }}>
                <Globe size={24} />
              </div>
              <h3 style={{ color: '#0F172A', fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>
                {t.howItWorks.step3Title}
              </h3>
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.92rem' }}>
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
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: '800', color: '#0F172A' }}>
                {t.scams.title}
              </h2>
              <p style={{ color: '#475569', fontSize: '0.95rem' }}>
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
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap size={20} />
                </div>
                <span className="badge badge-danger">36% of Reports</span>
              </div>
              <h3 style={{ color: '#0F172A', fontSize: '1.15rem', fontWeight: '700', marginBottom: '10px' }}>
                {t.scams.electricity.title}
              </h3>
              <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: '1.5', flex: 1, marginBottom: '20px' }}>
                {t.scams.electricity.desc}
              </p>
              <button
                onClick={() => handlePresetClick(SCAM_PRESETS[0])}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                <PlayCircle size={15} color="#0284C7" />
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
                  backgroundColor: 'rgba(217, 119, 6, 0.1)',
                  color: '#D97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CreditCard size={20} />
                </div>
                <span className="badge badge-warning">29% of Reports</span>
              </div>
              <h3 style={{ color: '#0F172A', fontSize: '1.15rem', fontWeight: '700', marginBottom: '10px' }}>
                {t.scams.banking.title}
              </h3>
              <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: '1.5', flex: 1, marginBottom: '20px' }}>
                {t.scams.banking.desc}
              </p>
              <button
                onClick={() => handlePresetClick(SCAM_PRESETS[1])}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                <PlayCircle size={15} color="#0284C7" />
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
                  backgroundColor: 'rgba(2, 132, 199, 0.1)',
                  color: '#0284C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Package size={20} />
                </div>
                <span className="badge badge-primary">18% of Reports</span>
              </div>
              <h3 style={{ color: '#0F172A', fontSize: '1.15rem', fontWeight: '700', marginBottom: '10px' }}>
                {t.scams.courier.title}
              </h3>
              <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: '1.5', flex: 1, marginBottom: '20px' }}>
                {t.scams.courier.desc}
              </p>
              <button
                onClick={() => handlePresetClick(SCAM_PRESETS[2])}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                <PlayCircle size={15} color="#0284C7" />
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
                  backgroundColor: 'rgba(124, 58, 237, 0.1)',
                  color: '#7C3AED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Gift size={20} />
                </div>
                <span className="badge badge-warning">11% of Reports</span>
              </div>
              <h3 style={{ color: '#0F172A', fontSize: '1.15rem', fontWeight: '700', marginBottom: '10px' }}>
                {t.scams.lottery.title}
              </h3>
              <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: '1.5', flex: 1, marginBottom: '20px' }}>
                {t.scams.lottery.desc}
              </p>
              <button
                onClick={() => handlePresetClick(SCAM_PRESETS[3])}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                <PlayCircle size={15} color="#0284C7" />
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
    </div>
  );
}

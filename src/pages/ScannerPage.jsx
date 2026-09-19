import React, { useState, useEffect, useCallback } from 'react';
import { 
  Shield,
  Terminal, 
  Search, 
  ClipboardPaste, 
  Smartphone, 
  Laptop, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  ExternalLink, 
  Eye, 
  Lock, 
  Server, 
  Globe, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  RotateCw,
  PhoneCall,
  Activity,
  Zap,
  Package
} from 'lucide-react';
import { translations } from '../data/translations';
import { SCAM_PRESETS, analyzeTargetUrl } from '../data/scamDatabase';

export function ScannerPage({ currentLang, initialUrl, onReportEscalate }) {
  const t = translations[currentLang] || translations.en;

  const initialAnalysis = analyzeTargetUrl(initialUrl || SCAM_PRESETS[0].url);
  const [url, setUrl] = useState(initialUrl || SCAM_PRESETS[0].url);
  const [deviceMode, setDeviceMode] = useState('mobile'); // 'mobile' | 'desktop'
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(4); // 0, 1, 2, 3, 4 (4 = complete)
  const [activeResult, setActiveResult] = useState(initialAnalysis);
  const [activeLogs, setActiveLogs] = useState(initialAnalysis.sandboxLogs || []);
  const [accordionOpen, setAccordionOpen] = useState({
    domain: true,
    ssl: true,
    form: true,
    blacklists: true
  });
  const [copiedDossier, setCopiedDossier] = useState(false);
  const [escalated, setEscalated] = useState(false);

  const executeScan = useCallback((targetUrl) => {
    const analysis = analyzeTargetUrl(targetUrl);
    setActiveResult(analysis);
    setIsScanning(true);
    setScanStep(1);
    setActiveLogs([analysis.sandboxLogs[0]]);
    setEscalated(false);

    // Dynamic stepper intervals
    setTimeout(() => {
      setScanStep(2);
      setActiveLogs(prev => [...prev, analysis.sandboxLogs[1] || { step: 2, text: '[DOCKER] Spawning isolated microVM' }, analysis.sandboxLogs[2]]);
    }, 600);

    setTimeout(() => {
      setScanStep(3);
      setActiveLogs(prev => [...prev, analysis.sandboxLogs[3] || { step: 3, text: '[PUPPETEER] Emulating touch events' }, analysis.sandboxLogs[4]]);
    }, 1300);

    setTimeout(() => {
      setScanStep(4);
      setActiveLogs(analysis.sandboxLogs);
      setIsScanning(false);
    }, 2100);
  }, []);

  // If initialUrl changes from home page, trigger scan
  useEffect(() => {
    if (initialUrl) {
      setUrl(initialUrl);
      executeScan(initialUrl);
    }
  }, [initialUrl, executeScan]);

  const handleManualScan = (e) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;
    executeScan(url.trim());
  };

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text);
          executeScan(text);
        }
      }
    } catch {
      // Fallback
    }
  };

  const handleSelectPreset = (preset) => {
    setUrl(preset.url);
    executeScan(preset.url);
  };

  const copyThreatReport = () => {
    const reportText = `[SFYNBOX FORENSIC REPORT]
Target: ${activeResult.url}
Threat Score: ${activeResult.riskScore}/100 (${activeResult.riskLevel.toUpperCase()})
Category: ${activeResult.category}
Domain Age: ${activeResult.forensics?.domainAge}
Host IP: ${activeResult.forensics?.hostIp} (${activeResult.forensics?.geoCountry})
SSL Status: ${activeResult.forensics?.sslIssuer}
Payload: ${activeResult.forensics?.payloadDetected}
Advisory: ${activeResult.summaryByLang[currentLang] || activeResult.summaryByLang.en}`;

    navigator.clipboard.writeText(reportText);
    setCopiedDossier(true);
    setTimeout(() => setCopiedDossier(false), 2000);
  };

  const downloadForensicJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeResult, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sfynbox_forensic_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleEscalate1930 = () => {
    setEscalated(true);
    if (onReportEscalate) onReportEscalate(activeResult);
  };

  // Render Quarantined Cloud Preview Screen
  const renderQuarantinedScreen = () => {
    const type = activeResult.screenshotType;

    if (type === 'bescom') {
      return (
        <div style={{ padding: '16px', background: '#F8FAFC', color: '#0F172A', minHeight: '100%', position: 'relative' }}>
          {/* Watermark */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-25deg)',
            fontSize: '1.8rem',
            fontWeight: '900',
            color: 'rgba(239, 68, 68, 0.15)',
            pointerEvents: 'none',
            textTransform: 'uppercase'
          }}>
            QUARANTINED PHISH
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #D97706', paddingBottom: '8px', marginBottom: '14px' }}>
            <Zap size={24} color="#D97706" />
            <div>
              <div style={{ fontWeight: '800', fontSize: '1.05rem', color: '#B45309' }}>BESCOM ELECTRICITY BILLING</div>
              <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Karnataka Power Transmission Portal</div>
            </div>
          </div>

          <div style={{ background: '#FEE2E2', border: '1px solid #F87171', borderRadius: '8px', padding: '10px', marginBottom: '14px', fontSize: '0.78rem', color: '#991B1B' }}>
            <strong>URGENT NOTICE:</strong> Power supply will be disconnected at 9:30 PM tonight due to unpaid previous month bill of ₹1,840.
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '0.74rem', color: '#475569', display: 'block', marginBottom: '3px' }}>Consumer Account Number</label>
            <input readOnly value="KA-982104-B" style={{ width: '100%', padding: '6px 8px', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.8rem', background: '#F1F5F9' }} />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '0.74rem', color: '#475569', display: 'block', marginBottom: '3px' }}>Outstanding Amount Due</label>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#DC2626' }}>₹ 1,840.00</div>
          </div>

          <div style={{ background: '#FEF3C7', border: '1px dashed #F59E0B', borderRadius: '6px', padding: '8px', fontSize: '0.74rem', color: '#92400E', marginBottom: '14px' }}>
            ⚠️ For security update, download the certified BESCOM QuickPay Android App to process bill waiver.
          </div>

          <div style={{
            background: '#EF4444',
            color: '#FFFFFF',
            textAlign: 'center',
            padding: '10px',
            borderRadius: '6px',
            fontWeight: '700',
            fontSize: '0.85rem'
          }}>
            Download & Pay Now (APK)
          </div>
        </div>
      );
    }

    if (type === 'sbi') {
      return (
        <div style={{ padding: '16px', background: '#FFFFFF', color: '#0F172A', minHeight: '100%', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-25deg)',
            fontSize: '1.8rem',
            fontWeight: '900',
            color: 'rgba(239, 68, 68, 0.15)',
            pointerEvents: 'none'
          }}>
            SPOOFED CLONE
          </div>

          <div style={{ background: '#1E3A8A', color: '#FFFFFF', padding: '10px', margin: '-16px -16px 14px -16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: '800', fontSize: '0.95rem', letterSpacing: '0.05em' }}>STATE BANK OF INDIA</div>
            <span style={{ fontSize: '0.7rem', background: '#3B82F6', padding: '2px 6px', borderRadius: '3px' }}>YONO</span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#1E3A8A' }}>Mandatory KYC Verification</div>
            <p style={{ fontSize: '0.72rem', color: '#64748B' }}>Your netbanking access will be suspended within 24 hours.</p>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '0.72rem', color: '#475569', display: 'block' }}>NetBanking Username</label>
            <input readOnly value="username_input" style={{ width: '100%', padding: '6px 8px', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.8rem', background: '#F8FAFC' }} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '0.72rem', color: '#475569', display: 'block' }}>NetBanking Password</label>
            <input readOnly type="password" value="secret123" style={{ width: '100%', padding: '6px 8px', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.8rem', background: '#F8FAFC' }} />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '0.72rem', color: '#475569', display: 'block' }}>PAN Card Number</label>
            <input readOnly value="ABCDE1234F" style={{ width: '100%', padding: '6px 8px', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.8rem', background: '#F8FAFC' }} />
          </div>

          <div style={{ background: '#2563EB', color: '#FFFFFF', textAlign: 'center', padding: '8px', borderRadius: '4px', fontWeight: '700', fontSize: '0.82rem' }}>
            Verify Account Details
          </div>
        </div>
      );
    }

    if (type === 'indiapost') {
      return (
        <div style={{ padding: '16px', background: '#FAFAFA', color: '#0F172A', minHeight: '100%', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-25deg)',
            fontSize: '1.8rem',
            fontWeight: '900',
            color: 'rgba(239, 68, 68, 0.15)',
            pointerEvents: 'none'
          }}>
            POSTAL TRAP
          </div>

          <div style={{ borderBottom: '3px solid #DC2626', paddingBottom: '6px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: '800', color: '#DC2626', fontSize: '1rem' }}>भारतीय डाक / INDIA POST</div>
            <Package size={20} color="#DC2626" />
          </div>

          <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', padding: '8px', borderRadius: '6px', fontSize: '0.75rem', color: '#991B1B', marginBottom: '12px' }}>
            <strong>Consignment #IN89201948</strong> failed delivery due to incomplete street address.
          </div>

          <div style={{ fontSize: '0.78rem', color: '#334155', marginBottom: '12px', lineHeight: '1.4' }}>
            Please update your address and pay a small rescheduling surcharge of <strong>₹25.00</strong> to trigger dispatch.
          </div>

          <div style={{ border: '1px solid #E2E8F0', padding: '10px', borderRadius: '6px', background: '#FFFFFF', marginBottom: '12px' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Card Details (Visa / MasterCard / RuPay)</div>
            <input readOnly value="4532 •••• •••• 9821" style={{ width: '100%', margin: '4px 0', padding: '5px', fontSize: '0.75rem', border: '1px solid #CBD5E1' }} />
            <div style={{ display: 'flex', gap: '6px' }}>
              <input readOnly value="12/28" style={{ width: '50%', padding: '5px', fontSize: '0.75rem', border: '1px solid #CBD5E1' }} />
              <input readOnly value="CVV: 891" style={{ width: '50%', padding: '5px', fontSize: '0.75rem', border: '1px solid #CBD5E1', color: '#DC2626' }} />
            </div>
          </div>

          <div style={{ background: '#DC2626', color: '#FFFFFF', textAlign: 'center', padding: '8px', borderRadius: '4px', fontWeight: '700', fontSize: '0.82rem' }}>
            Authorize ₹25.00 Redelivery
          </div>
        </div>
      );
    }

    if (type === 'hdfc') {
      return (
        <div style={{ padding: '16px', background: '#FFFFFF', color: '#0F172A', minHeight: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #004C8F', paddingBottom: '8px', marginBottom: '14px' }}>
            <div style={{ fontWeight: '800', color: '#004C8F', fontSize: '1.1rem' }}>HDFC BANK</div>
            <span style={{ fontSize: '0.7rem', color: '#16A34A', border: '1px solid #16A34A', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Lock size={10} /> Verified EV SSL
            </span>
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>
            Welcome to HDFC Bank NetBanking
          </div>
          <p style={{ fontSize: '0.74rem', color: '#64748B', marginBottom: '14px' }}>
            Enter Customer ID / User ID to continue to your verified dashboard.
          </p>
          <input readOnly value="Customer ID / User ID" style={{ width: '100%', padding: '8px', border: '1px solid #94A3B8', borderRadius: '4px', fontSize: '0.8rem', marginBottom: '12px' }} />
          <div style={{ background: '#004C8F', color: '#FFFFFF', textAlign: 'center', padding: '8px', borderRadius: '4px', fontWeight: '600', fontSize: '0.82rem' }}>
            Continue
          </div>
        </div>
      );
    }

    // Default generic preview
    return (
      <div style={{ padding: '20px', background: '#0F172A', color: '#E2E8F0', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Globe size={36} color="#76C0EC" style={{ marginBottom: '10px' }} />
        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#FFFFFF' }}>{activeResult.url}</div>
        <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '6px' }}>
          Quarantined snapshot captured via Headless Chromium microVM
        </p>
      </div>
    );
  };

  return (
    <div className="cyber-bg" style={{ minHeight: '100vh', padding: '40px 20px 80px' }}>
      <div className="container">
        
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '8px' }}>
            Dynamic MicroVM Container
          </span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: '800', color: '#FFFFFF', marginBottom: '8px' }}>
            {t.scanner.heading}
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', maxWidth: '680px', margin: '0 auto' }}>
            {t.scanner.subheading}
          </p>
        </div>

        {/* FULL-WIDTH SCANNER BAR */}
        <div style={{ maxWidth: '980px', margin: '0 auto 30px' }}>
          <form 
            onSubmit={handleManualScan}
            className="glass-panel"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              borderRadius: '16px',
              border: '1.5px solid rgba(118, 192, 236, 0.4)',
              boxShadow: '0 12px 40px -10px rgba(0, 0, 0, 0.7)',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              gap: '8px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flex: '1 1 340px',
              padding: '4px 12px',
              gap: '10px'
            }}>
              <Terminal size={22} color="#76C0EC" style={{ flexShrink: 0 }} />
              <input
                type="text"
                placeholder={t.hero.inputPlaceholder}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <button
                type="button"
                onClick={handlePaste}
                className="btn-secondary"
                style={{ padding: '9px 14px', fontSize: '0.84rem' }}
                title="Paste from clipboard"
              >
                <ClipboardPaste size={15} color="#76C0EC" />
                <span className="hide-on-mobile">{t.hero.pasteBtn}</span>
              </button>

              <button
                type="submit"
                disabled={isScanning}
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: '0.95rem' }}
              >
                {isScanning ? (
                  <>
                    <RotateCw size={16} className="spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Terminal size={16} />
                    <span>Trigger Sandbox</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Preset Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginTop: '12px',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '0.76rem', color: '#64748B' }}>Preset Scenarios:</span>
            {SCAM_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                style={{
                  background: url === preset.url ? 'rgba(118, 192, 236, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                  border: url === preset.url ? '1px solid #76C0EC' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: preset.riskLevel === 'critical' ? '#F87171' : (preset.riskLevel === 'suspicious' ? '#FACC15' : '#34D399'),
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  cursor: 'pointer'
                }}
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>

        {/* DEVICE VIEW TOGGLE (MOBILE VS DESKTOP) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '26px'
        }}>
          <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: '500' }}>
            {t.scanner.deviceToggle}
          </span>
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            padding: '4px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            gap: '4px'
          }}>
            <button
              type="button"
              onClick={() => setDeviceMode('mobile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '7px',
                border: 'none',
                backgroundColor: deviceMode === 'mobile' ? '#76C0EC' : 'transparent',
                color: deviceMode === 'mobile' ? '#0A192F' : '#94A3B8',
                fontWeight: '600',
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Smartphone size={15} />
              <span>{t.scanner.mobileView}</span>
            </button>

            <button
              type="button"
              onClick={() => setDeviceMode('desktop')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '7px',
                border: 'none',
                backgroundColor: deviceMode === 'desktop' ? '#76C0EC' : 'transparent',
                color: deviceMode === 'desktop' ? '#0A192F' : '#94A3B8',
                fontWeight: '600',
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Laptop size={15} />
              <span>{t.scanner.desktopView}</span>
            </button>
          </div>
        </div>

        {/* LIVE MULTI-STAGE SCAN STEPPER */}
        <div className="glass-panel" style={{ padding: '24px', maxWidth: '980px', margin: '0 auto 30px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
          }}>
            {[
              { num: 1, title: t.scanner.step1 },
              { num: 2, title: t.scanner.step2 },
              { num: 3, title: t.scanner.step3 },
              { num: 4, title: t.scanner.step4 }
            ].map((step) => {
              const isCompleted = scanStep >= step.num;
              const isCurrent = scanStep === step.num && isScanning;

              return (
                <div 
                  key={step.num}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: isCurrent ? 'rgba(118, 192, 236, 0.12)' : (isCompleted ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)'),
                    border: isCurrent ? '1px solid #76C0EC' : (isCompleted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)'),
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: isCompleted ? '#10B981' : (isCurrent ? '#76C0EC' : '#334155'),
                    color: isCompleted || isCurrent ? '#0A192F' : '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '0.75rem',
                    flexShrink: 0
                  }}>
                    {isCompleted && !isCurrent ? '✓' : step.num}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '0.8rem',
                      fontWeight: isCurrent || isCompleted ? '600' : '400',
                      color: isCurrent ? '#76C0EC' : (isCompleted ? '#E2E8F0' : '#64748B')
                    }}>
                      {step.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terminal Console Logs */}
          <div className="terminal-window" style={{ maxHeight: '140px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '4px' }}>
              <span style={{ color: '#76C0EC', fontWeight: '700', fontSize: '0.75rem' }}>MICROVM HEADLESS LOGS</span>
              <span style={{ color: '#10B981', fontSize: '0.72rem' }}>DOCKER CONTAINER ISOLATED</span>
            </div>
            {activeLogs.map((log, index) => (
              <div key={index} style={{ fontSize: '0.78rem', marginBottom: '4px' }}>
                <span style={{ color: '#64748B' }}>[{new Date().toLocaleTimeString()}]</span> {log.text}
              </div>
            ))}
          </div>
        </div>

        {/* VERDICT RESULT CARD */}
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <div 
            className="glass-panel"
            style={{
              padding: '30px',
              border: activeResult.riskLevel === 'critical' ? '1.5px solid rgba(239, 68, 68, 0.5)' : (activeResult.riskLevel === 'suspicious' ? '1.5px solid rgba(250, 204, 21, 0.5)' : '1.5px solid rgba(16, 185, 129, 0.5)'),
              boxShadow: activeResult.riskLevel === 'critical' ? 'var(--shadow-danger)' : 'var(--shadow-glow)'
            }}
          >
            {/* Verdict Header Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '20px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: activeResult.riskLevel === 'critical' ? 'rgba(239, 68, 68, 0.15)' : (activeResult.riskLevel === 'suspicious' ? 'rgba(250, 204, 21, 0.15)' : 'rgba(16, 185, 129, 0.15)'),
                  border: activeResult.riskLevel === 'critical' ? '1.5px solid #EF4444' : (activeResult.riskLevel === 'suspicious' ? '1.5px solid #FACC15' : '1.5px solid #10B981'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: activeResult.riskLevel === 'critical' ? '#EF4444' : (activeResult.riskLevel === 'suspicious' ? '#FACC15' : '#10B981')
                }}>
                  {activeResult.riskLevel === 'critical' && <ShieldAlert size={28} />}
                  {activeResult.riskLevel === 'suspicious' && <AlertTriangle size={28} />}
                  {activeResult.riskLevel === 'safe' && <ShieldCheck size={28} />}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className={activeResult.riskLevel === 'critical' ? 'badge badge-danger' : (activeResult.riskLevel === 'suspicious' ? 'badge badge-warning' : 'badge badge-success')}>
                      {activeResult.riskLevel === 'critical' && t.scanner.riskHigh}
                      {activeResult.riskLevel === 'suspicious' && t.scanner.riskMedium}
                      {activeResult.riskLevel === 'safe' && t.scanner.riskLow}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>• {activeResult.entity}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', fontWeight: '700', wordBreak: 'break-all' }}>
                    {activeResult.url}
                  </h3>
                </div>
              </div>

              {/* Threat Gauge */}
              <div style={{
                textAlign: 'right',
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                padding: '8px 18px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase' }}>Threat Score</div>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: '800',
                  color: activeResult.riskLevel === 'critical' ? '#EF4444' : (activeResult.riskLevel === 'suspicious' ? '#FACC15' : '#10B981'),
                  fontFamily: 'var(--font-mono)'
                }}>
                  {activeResult.riskScore} <span style={{ fontSize: '0.9rem', color: '#64748B' }}>/ 100</span>
                </div>
              </div>
            </div>

            {/* MULTI-LINGUAL BHASHINI SUMMARY BOX */}
            <div style={{
              backgroundColor: activeResult.riskLevel === 'critical' ? 'rgba(239, 68, 68, 0.1)' : (activeResult.riskLevel === 'suspicious' ? 'rgba(250, 204, 21, 0.08)' : 'rgba(16, 185, 129, 0.08)'),
              border: activeResult.riskLevel === 'critical' ? '1px solid rgba(239, 68, 68, 0.3)' : (activeResult.riskLevel === 'suspicious' ? '1px solid rgba(250, 204, 21, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)'),
              borderRadius: '12px',
              padding: '18px 22px',
              marginBottom: '30px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#76C0EC', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>
                  <Globe size={15} />
                  <span>{t.scanner.regionalSummaryTitle}</span>
                </div>
                <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>Bhashini AI</span>
              </div>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.6',
                color: '#F8FAFC',
                fontWeight: '600'
              }}>
                {activeResult.summaryByLang[currentLang] || activeResult.summaryByLang.en}
              </p>
            </div>

            {/* TWO COLUMN DISPLAY: SAFE CLOUD SCREENSHOT + FORENSIC ACCORDION */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
              marginBottom: '30px'
            }}>
              
              {/* Left: Safe Cloud Screenshot (Non-Clickable) */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#CBD5E1', fontSize: '0.88rem', fontWeight: '600' }}>
                    <Eye size={16} color="#76C0EC" />
                    <span>{t.scanner.screenshotTitle}</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#10B981' }}>Isolated Sandbox</span>
                </div>

                {/* Device Frame (Phone vs Desktop) */}
                <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#050B14', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {deviceMode === 'mobile' ? (
                    <div className="phone-frame">
                      <div className="phone-notch"></div>
                      <div className="phone-screen">
                        {renderQuarantinedScreen()}
                      </div>
                    </div>
                  ) : (
                    <div className="desktop-frame">
                      <div className="desktop-header">
                        <div className="desktop-dot" style={{ backgroundColor: '#EF4444' }}></div>
                        <div className="desktop-dot" style={{ backgroundColor: '#FACC15' }}></div>
                        <div className="desktop-dot" style={{ backgroundColor: '#10B981' }}></div>
                        <div style={{
                          marginLeft: '12px',
                          flex: 1,
                          backgroundColor: '#0F172A',
                          borderRadius: '4px',
                          padding: '3px 10px',
                          color: '#94A3B8',
                          fontSize: '0.74rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap'
                        }}>
                          <Lock size={11} color={activeResult.riskLevel === 'safe' ? '#10B981' : '#EF4444'} />
                          <span>{activeResult.url}</span>
                        </div>
                      </div>
                      <div style={{ flex: 1, overflowY: 'auto', background: '#FFFFFF' }}>
                        {renderQuarantinedScreen()}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ fontSize: '0.74rem', color: '#64748B', textAlign: 'center', marginTop: '10px' }}>
                  {t.scanner.screenshotNotice}
                </div>
              </div>

              {/* Right: Technical Insights Accordion */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Layers size={18} color="#76C0EC" />
                  <h4 style={{ color: '#F8FAFC', fontSize: '1rem', fontWeight: '700' }}>
                    {t.scanner.techInsights}
                  </h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  
                  {/* Domain & WHOIS */}
                  <div style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.7)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden'
                  }}>
                    <button
                      onClick={() => setAccordionOpen(p => ({ ...p, domain: !p.domain }))}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'transparent',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: '#E2E8F0',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Globe size={15} color="#76C0EC" />
                        <span>Domain & Host Origin</span>
                      </div>
                      {accordionOpen.domain ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {accordionOpen.domain && (
                      <div style={{ padding: '0 14px 14px', fontSize: '0.8rem', color: '#94A3B8' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <span>{t.scanner.domainAge}:</span>
                          <strong style={{ color: activeResult.riskLevel === 'critical' ? '#EF4444' : '#E2E8F0' }}>
                            {activeResult.forensics?.domainAge}
                          </strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <span>Registrar:</span>
                          <span style={{ color: '#E2E8F0' }}>{activeResult.forensics?.registrar}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                          <span>{t.scanner.ipLocation}:</span>
                          <span style={{ color: '#E2E8F0' }}>{activeResult.forensics?.hostIp} ({activeResult.forensics?.geoCountry})</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SSL & Encryption */}
                  <div style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.7)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden'
                  }}>
                    <button
                      onClick={() => setAccordionOpen(p => ({ ...p, ssl: !p.ssl }))}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'transparent',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: '#E2E8F0',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Lock size={15} color="#76C0EC" />
                        <span>SSL / TLS Security Profile</span>
                      </div>
                      {accordionOpen.ssl ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {accordionOpen.ssl && (
                      <div style={{ padding: '0 14px 14px', fontSize: '0.8rem', color: '#94A3B8' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <span>{t.scanner.sslIssuer}:</span>
                          <span style={{ color: '#E2E8F0' }}>{activeResult.forensics?.sslIssuer}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                          <span>Autonomous System:</span>
                          <span style={{ color: '#E2E8F0' }}>{activeResult.forensics?.asn}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form & Payload Audit */}
                  <div style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.7)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden'
                  }}>
                    <button
                      onClick={() => setAccordionOpen(p => ({ ...p, form: !p.form }))}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'transparent',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: '#E2E8F0',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Activity size={15} color="#76C0EC" />
                        <span>Form Targets & Payload Analysis</span>
                      </div>
                      {accordionOpen.form ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {accordionOpen.form && (
                      <div style={{ padding: '0 14px 14px', fontSize: '0.8rem', color: '#94A3B8' }}>
                        <div style={{ padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <span style={{ display: 'block', color: '#94A3B8', marginBottom: '2px' }}>{t.scanner.formAction}:</span>
                          <code style={{ color: '#FACC15', fontSize: '0.74rem', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px' }}>
                            {activeResult.forensics?.formAction}
                          </code>
                        </div>
                        <div style={{ padding: '4px 0' }}>
                          <span style={{ display: 'block', color: '#94A3B8', marginBottom: '2px' }}>{t.scanner.apkPayload}:</span>
                          <strong style={{ color: activeResult.forensics?.payloadDetected.includes('None') ? '#10B981' : '#EF4444' }}>
                            {activeResult.forensics?.payloadDetected}
                          </strong>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* External Reputation Feeds */}
                  <div style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.7)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden'
                  }}>
                    <button
                      onClick={() => setAccordionOpen(p => ({ ...p, blacklists: !p.blacklists }))}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'transparent',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: '#E2E8F0',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shield size={15} color="#76C0EC" />
                        <span>External Threat Feeds & CERT-In</span>
                      </div>
                      {accordionOpen.blacklists ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {accordionOpen.blacklists && (
                      <div style={{ padding: '0 14px 14px', fontSize: '0.8rem', color: '#94A3B8' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <span>VirusTotal:</span>
                          <span style={{ color: '#E2E8F0' }}>{activeResult.forensics?.blacklists?.virusTotal}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <span>Google Safe Browsing:</span>
                          <span style={{ color: '#E2E8F0' }}>{activeResult.forensics?.blacklists?.googleSafeBrowsing}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                          <span>I4C / SmishWatch:</span>
                          <span style={{ color: '#FACC15' }}>{activeResult.forensics?.blacklists?.certInSmishWatch}</span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>

            {/* BOTTOM ACTION BUTTONS */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={copyThreatReport}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  {copiedDossier ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                  <span>{copiedDossier ? 'Copied to Clipboard' : t.scanner.actionCopyReport}</span>
                </button>

                <button
                  onClick={downloadForensicJson}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  <Download size={16} />
                  <span>{t.scanner.actionDownloadPdf}</span>
                </button>
              </div>

              <div>
                {escalated ? (
                  <span className="badge badge-success" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    ✓ Escalated to 1930 / I4C Incident DB
                  </span>
                ) : (
                  <button
                    onClick={handleEscalate1930}
                    className="btn-danger"
                    style={{ fontSize: '0.88rem' }}
                  >
                    <PhoneCall size={16} />
                    <span>{t.scanner.actionReport}</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @keyframes spinAnim {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spinAnim 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  PhoneCall, 
  ExternalLink, 
  Send, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  Copy, 
  Check, 
  Key, 
  ShieldCheck, 
  FileText,
  HelpCircle
} from 'lucide-react';
import { translations } from '../data/translations';

export function ContactPage({ currentLang }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    suspectUrl: '',
    category: 'electricity',
    messageText: '',
    fileName: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // API Inquiry State
  const [apiType, setApiType] = useState('enterprise'); // 'enterprise' | 'law_enforcement'
  const [generatedApiKey, setGeneratedApiKey] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  const handleGenerateDemoApiKey = () => {
    const key = `sfyn_live_${apiType === 'law_enforcement' ? 'gov_i4c' : 'ent'}_${Math.random().toString(36).substring(2, 10)}_${Date.now().toString().slice(-4)}`;
    setGeneratedApiKey(key);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(generatedApiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="cyber-bg" style={{ minHeight: '100vh', padding: '40px 20px 80px' }}>
      <div className="container" style={{ maxWidth: '1020px' }}>
        
        {/* IMMEDIATE FRAUD REPORTING GUIDANCE BANNER */}
        <div style={{
          backgroundColor: '#0F172A',
          border: '1.5px solid #EF4444',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '40px',
          boxShadow: 'var(--shadow-danger)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <PhoneCall size={26} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: '800' }}>
                    Lost Money to an SMS Scam or Phishing Link?
                  </h2>
                  <span className="badge badge-danger">ACT IMMEDIATELY</span>
                </div>
                <p style={{ color: '#CBD5E1', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  The first <strong>2 hours (Golden Hours)</strong> are crucial. Dial national cyber helpline <strong>1930</strong> right now to block fraudulent recipient bank accounts and freeze UPI balances.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <a
                href="tel:1930"
                className="btn-danger"
                style={{
                  textDecoration: 'none',
                  padding: '10px 22px',
                  fontSize: '0.95rem',
                  fontWeight: '700'
                }}
              >
                <PhoneCall size={18} />
                <span>Call 1930 Toll-Free</span>
              </a>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  textDecoration: 'none',
                  padding: '10px 18px',
                  fontSize: '0.9rem'
                }}
              >
                <span>NCRP Portal</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* TWO-COLUMN LAYOUT: INCIDENT REPORT FORM + API INQUIRY */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '30px'
        }}>
          
          {/* Left: Citizen Incident Reporting Form */}
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>
              Report Suspicious Link / Smishing Incident
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.84rem', marginBottom: '22px' }}>
              Our threat team will inspect the URL in our isolated sandbox and notify CERT-In and state cyber cells.
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '36px 10px' }}>
                <CheckCircle2 size={52} color="#10B981" style={{ margin: '0 auto 16px' }} />
                <h4 style={{ color: '#F8FAFC', fontSize: '1.25rem', marginBottom: '8px' }}>
                  Incident Report Received
                </h4>
                <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginBottom: '20px' }}>
                  Reference ID: <strong style={{ color: '#76C0EC', fontFamily: 'var(--font-mono)' }}>#SFYN-{Date.now().toString().slice(-6)}</strong>
                </p>
                <p style={{ color: '#CBD5E1', fontSize: '0.84rem', marginBottom: '24px' }}>
                  The target URL has been dispatched to our automated headless Docker sandbox and added to the I4C threat telemetry queue.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      contact: '',
                      suspectUrl: '',
                      category: 'electricity',
                      messageText: '',
                      fileName: ''
                    });
                  }}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  Submit Another Link
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '4px', fontWeight: '500' }}>
                    Your Name (Optional / Anonymous OK)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Rajesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#0A192F',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: '#FFFFFF',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '4px', fontWeight: '500' }}>
                    Phone or Email (for Case Updates)
                  </label>
                  <input
                    type="text"
                    placeholder="+91 9876543210 or email@example.com"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#0A192F',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: '#FFFFFF',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '4px', fontWeight: '500' }}>
                    Suspect Message / Phishing Link *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="http://bescom-bill-update.top/..."
                    value={formData.suspectUrl}
                    onChange={(e) => setFormData({ ...formData, suspectUrl: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#0A192F',
                      border: '1px solid #76C0EC',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: '#FFFFFF',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-mono)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '4px', fontWeight: '500' }}>
                    Scam Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#0A192F',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: '#FFFFFF',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  >
                    <option value="electricity">Electricity / Power Cutoff Scam (BESCOM/MSEDCL)</option>
                    <option value="banking">Bank KYC / SBI YONO / Credit Card Scam</option>
                    <option value="courier">India Post / Courier Redelivery ₹25 Scam</option>
                    <option value="lottery">Free 5G Recharge / WhatsApp Forward Scam</option>
                    <option value="job">Part-time Telegram / Youtube Like Job Scam</option>
                    <option value="other">Other Unlisted Suspicious Activity</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '4px', fontWeight: '500' }}>
                    SMS Body or Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Paste the full SMS or WhatsApp text message received..."
                    value={formData.messageText}
                    onChange={(e) => setFormData({ ...formData, messageText: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#0A192F',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* File Attachment Dropzone */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '4px', fontWeight: '500' }}>
                    Screenshot Attachment (Optional)
                  </label>
                  <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    border: '1.5px dashed rgba(118, 192, 236, 0.3)',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(10, 25, 47, 0.5)',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease'
                  }}>
                    <Upload size={20} color="#76C0EC" style={{ marginBottom: '6px' }} />
                    <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                      {formData.fileName ? formData.fileName : 'Click or drop screenshot image here (PNG, JPG)'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFormData({ ...formData, fileName: e.target.files[0].name });
                        }
                      }}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px', marginTop: '6px' }}
                >
                  {loading ? 'Transmitting to Sandbox...' : 'Submit Scam Report'}
                </button>
              </form>
            )}
          </div>

          {/* Right: Enterprise & Law Enforcement API Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(118, 192, 236, 0.15)',
                  color: '#76C0EC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Terminal size={20} />
                </div>
                <div>
                  <h3 style={{ color: '#FFFFFF', fontSize: '1.2rem', fontWeight: '700' }}>
                    Enterprise & Law Enforcement API
                  </h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.78rem' }}>
                    REST API, SIEM integration & high-throughput bulk microVM scanning.
                  </p>
                </div>
              </div>

              <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Are you a State Police Cyber Cell, Banking Fraud Prevention team, or Telecom Operator? Connect directly to our low-latency microVM container cluster to scan thousands of URLs per minute.
              </p>

              {/* API Sandbox Key Generator Demo */}
              <div style={{
                backgroundColor: '#0A192F',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '16px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setApiType('enterprise')}
                    style={{
                      flex: 1,
                      padding: '6px',
                      borderRadius: '6px',
                      border: apiType === 'enterprise' ? '1px solid #76C0EC' : '1px solid transparent',
                      backgroundColor: apiType === 'enterprise' ? 'rgba(118, 192, 236, 0.15)' : 'transparent',
                      color: apiType === 'enterprise' ? '#76C0EC' : '#94A3B8',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Enterprise SIEM
                  </button>

                  <button
                    type="button"
                    onClick={() => setApiType('law_enforcement')}
                    style={{
                      flex: 1,
                      padding: '6px',
                      borderRadius: '6px',
                      border: apiType === 'law_enforcement' ? '1px solid #FACC15' : '1px solid transparent',
                      backgroundColor: apiType === 'law_enforcement' ? 'rgba(250, 204, 21, 0.15)' : 'transparent',
                      color: apiType === 'law_enforcement' ? '#FACC15' : '#94A3B8',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    I4C / Cyber Cell
                  </button>
                </div>

                {!generatedApiKey ? (
                  <button
                    onClick={handleGenerateDemoApiKey}
                    className="btn-secondary"
                    style={{ width: '100%', fontSize: '0.84rem' }}
                  >
                    <Key size={14} color="#76C0EC" />
                    <span>Generate Instant Sandbox Test Key</span>
                  </button>
                ) : (
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '4px' }}>Demo Sandbox API Key:</div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#050B14',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: '1px solid rgba(118, 192, 236, 0.3)',
                      gap: '8px'
                    }}>
                      <code style={{ fontSize: '0.78rem', color: '#76C0EC', flex: 1, overflowX: 'auto', whiteSpace: 'nowrap' }}>
                        {generatedApiKey}
                      </code>
                      <button
                        onClick={handleCopyKey}
                        style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                        title="Copy Key"
                      >
                        {copiedKey ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sample API Request */}
              <div style={{ fontSize: '0.76rem', color: '#64748B', marginBottom: '8px' }}>Example cURL Request:</div>
              <pre className="terminal-window" style={{ fontSize: '0.74rem', padding: '12px', overflowX: 'auto' }}>
{`curl -X POST https://api.sfynbox.gov.in/v1/scan \\
  -H "Authorization: Bearer ${generatedApiKey || 'sfyn_live_demo_key'}" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "http://bescom-bill.top", "emulate": "mobile"}'`}
              </pre>
            </div>

            {/* Quick Helpline Contact Card */}
            <div className="glass-panel" style={{ padding: '24px', backgroundColor: 'rgba(15, 23, 42, 0.7)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <ShieldCheck size={18} color="#10B981" />
                <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700' }}>
                  CERT-In Compliance Desk
                </h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: '1.5' }}>
                For official law enforcement inquiries or emergency ISP domain blocking orders, contact our 24x7 security operations center at <strong style={{ color: '#E2E8F0' }}>ops@sfynbox.gov.in</strong>.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

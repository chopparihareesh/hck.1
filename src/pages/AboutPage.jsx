import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  Layers, 
  Building2, 
  Users, 
  Zap, 
  Lock, 
  Globe, 
  AlertOctagon, 
  CheckCircle2, 
  ArrowRight,
  Server,
  FileCheck
} from 'lucide-react';
import { translations } from '../data/translations';

export function AboutPage({ currentLang, setActivePage }) {
  const [activeTab, setActiveTab] = useState('architecture'); // 'architecture' | 'mission' | 'i4c'

  return (
    <div className="cyber-bg" style={{ minHeight: '100vh', padding: '50px 20px 80px' }}>
      <div className="container" style={{ maxWidth: '1040px' }}>
        
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '10px' }}>
            Indigenous Cyber Defense
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', fontWeight: '800', color: '#FFFFFF', marginBottom: '12px' }}>
            About Sfynbox & Threat Architecture
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
            Built to neutralize mobile smishing epidemics across India by replacing outdated URL blocklists with real-time, isolated cloud microVM containerization.
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '36px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '12px',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'architecture', label: 'Dynamic Sandbox Architecture', icon: Layers },
            { id: 'mission', label: 'Mission & Demographic Impact', icon: Users },
            { id: 'i4c', label: 'I4C & CERT-In Collaboration', icon: Building2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: isActive ? '1px solid #76C0EC' : '1px solid transparent',
                  backgroundColor: isActive ? 'rgba(118, 192, 236, 0.15)' : 'transparent',
                  color: isActive ? '#76C0EC' : '#94A3B8',
                  fontSize: '0.92rem',
                  fontWeight: isActive ? '700' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ARCHITECTURE COMPARISON */}
        {activeTab === 'architecture' && (
          <div>
            {/* Visual Head-to-Head Comparison */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '40px'
            }}>
              {/* Legacy Blocklists */}
              <div className="glass-panel" style={{ padding: '28px', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    color: '#EF4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <AlertOctagon size={20} />
                  </div>
                  <div>
                    <h3 style={{ color: '#FCA5A5', fontSize: '1.1rem', fontWeight: '700' }}>Traditional Static URL Blocklists</h3>
                    <div style={{ fontSize: '0.74rem', color: '#64748B' }}>Legacy Browser Protection</div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: '#94A3B8' }}>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#EF4444' }}>✕</span>
                    <span><strong>12-48 Hour Blindspot:</strong> Scammers register domains and abandon them within 6 hours. Static lists are too slow.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#EF4444' }}>✕</span>
                    <span><strong>Cloaking Evasion:</strong> Fraudsters detect automated security crawlers and serve innocent blank pages while targeting real phones.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#EF4444' }}>✕</span>
                    <span><strong>Blind to APK Droppers:</strong> Inability to emulate Android touch interactions or track malicious background downloads.</span>
                  </li>
                </ul>
              </div>

              {/* Sfynbox Dynamic Sandbox */}
              <div className="glass-panel" style={{ padding: '28px', border: '1.5px solid rgba(118, 192, 236, 0.4)', boxShadow: 'var(--shadow-glow)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(118, 192, 236, 0.2)',
                    color: '#76C0EC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h3 style={{ color: '#76C0EC', fontSize: '1.1rem', fontWeight: '700' }}>Sfynbox Cloud MicroVM Sandbox</h3>
                    <div style={{ fontSize: '0.74rem', color: '#10B981' }}>Zero-Day Active Behavioral Emulation</div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: '#CBD5E1' }}>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Sub-Second Execution:</strong> Spins an isolated headless Puppeteer Chromium micro-container in 180 milliseconds.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Native Mobile Touch Emulation:</strong> Spoofs Indian telecom User-Agents, screen resolutions, and touch taps to unmask cloaked payloads.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Deep DOM & Form Inspection:</strong> Traps keyloggers, unauthorized APK downloads, and hidden Telegram bot exfiltration channels.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Architecture Pipeline Diagram */}
            <div className="glass-panel" style={{ padding: '30px', marginBottom: '40px' }}>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.15rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Server size={18} color="#76C0EC" />
                <span>Isolated Execution Pipeline</span>
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {[
                  { step: '01', title: 'URL Ingestion & Sanitization', desc: 'Validates scheme, strips tracking tokens, and prevents SSRF attacks.' },
                  { step: '02', title: 'MicroVM Container Provisioning', desc: 'Ephemeral Docker environment with strictly sandboxed non-root networking.' },
                  { step: '03', title: 'Puppeteer Behavioral Clicker', desc: 'Simulates mobile browser click events and collects redirects.' },
                  { step: '04', title: 'Bhashini AI Language Synthesis', desc: 'Converts complex forensic telemetry into plain regional language verdicts.' }
                ].map((st) => (
                  <div key={st.step} style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#76C0EC', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>{st.step}</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#F8FAFC', marginBottom: '6px' }}>{st.title}</div>
                    <p style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: '1.4' }}>{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MISSION & DEMOGRAPHIC IMPACT */}
        {activeTab === 'mission' && (
          <div className="glass-panel" style={{ padding: '36px' }}>
            <h2 style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: '800', marginBottom: '16px' }}>
              Defending 900 Million Indian Mobile Citizens
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: '1.7', marginBottom: '20px' }}>
              India has experienced an unprecedented explosion in digital financial transactions via UPI and mobile banking. Concurrently, organized cyber syndicates have weaponized SMS (smishing) and WhatsApp to deploy zero-day phishing kits mimicking state electricity boards, income tax portals, and banks.
            </p>
            <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: '1.7', marginBottom: '30px' }}>
              The fundamental flaw in current cybersecurity tools is language and complexity: technical jargon like "Self-signed SSL error" or "ASN mismatch" means nothing to an everyday shopkeeper or senior citizen. Sfynbox bridges this critical gap through <strong>Bhashini AI</strong>, explaining risks in plain Hindi, Tamil, Telugu, Kannada, Bengali, and Marathi.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px'
            }}>
              <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h4 style={{ color: '#76C0EC', fontSize: '1.1rem', marginBottom: '8px' }}>Senior Citizens</h4>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Eliminates panic caused by fake "power disconnection tonight" or "PAN card blocked" threats with instant verified checks.</p>
              </div>

              <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h4 style={{ color: '#10B981', fontSize: '1.1rem', marginBottom: '8px' }}>Vernacular Internet Users</h4>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Provides native regional language clarity through Bhashini so safety verdicts are immediately understood without English fluency.</p>
              </div>

              <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h4 style={{ color: '#FACC15', fontSize: '1.1rem', marginBottom: '8px' }}>Micro-Merchants & Gig Workers</h4>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Protects daily UPI earnings from fake payment screenshot generators and fraudulent delivery rescheduling traps.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: I4C & LAW ENFORCEMENT COLLABORATION */}
        {activeTab === 'i4c' && (
          <div className="glass-panel" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(250, 204, 21, 0.15)',
                color: '#FACC15',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Building2 size={24} />
              </div>
              <div>
                <h2 style={{ color: '#FFFFFF', fontSize: '1.4rem', fontWeight: '800' }}>
                  Integrated with National Cyber Crime Architecture
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
                  Ministry of Home Affairs (MHA) & CERT-In SmishWatch Alignment
                </p>
              </div>
            </div>

            <p style={{ color: '#94A3B8', fontSize: '0.96rem', lineHeight: '1.7', marginBottom: '24px' }}>
              Sfynbox operates as a dual-utility system: while citizens receive instant threat protection, our sensor mesh aggregates anonymized smishing telemetry directly into the Indian Cyber Crime Coordination Centre (I4C) pipeline.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{ backgroundColor: '#0F172A', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <FileCheck size={20} color="#76C0EC" style={{ marginBottom: '8px' }} />
                <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', marginBottom: '6px' }}>Section 69A IT Act Automation</h4>
                <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>One-click formatted forensic notices dispatched directly to domain registrar abuse desks (Cloudflare, Namecheap) to suspend domains in hours.</p>
              </div>

              <div style={{ backgroundColor: '#0F172A', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Zap size={20} color="#FACC15" style={{ marginBottom: '8px' }} />
                <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', marginBottom: '6px' }}>Helpline 1930 Integration</h4>
                <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Citizen scan escalations are tagged with technical evidence dossiers to accelerate golden-hour bank account freezing.</p>
              </div>

              <div style={{ backgroundColor: '#0F172A', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Server size={20} color="#10B981" style={{ marginBottom: '8px' }} />
                <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', marginBottom: '6px' }}>State Cyber Cell Telemetry</h4>
                <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Live geolocation feeds map emerging smishing campaigns across Maharashtra, Karnataka, Uttar Pradesh, and Delhi NCR.</p>
              </div>
            </div>

            <button
              onClick={() => setActivePage('dashboard')}
              className="btn-primary"
              style={{ fontSize: '0.92rem' }}
            >
              <span>Explore I4C Cyber Cell Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

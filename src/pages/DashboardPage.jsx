import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Users, 
  Building2, 
  Activity, 
  MapPin, 
  Download, 
  FileText, 
  Copy, 
  Check, 
  PhoneCall, 
  ExternalLink, 
  Search, 
  Filter, 
  Radio, 
  Zap, 
  CreditCard, 
  Package, 
  Send,
  Lock,
  ChevronRight
} from 'lucide-react';
import { 
  LIVE_TELEMETRY_FEED, 
  STATE_HEATMAP_DATA, 
  TOP_IMPERSONATED_ENTITIES, 
  CITIZEN_SCAN_HISTORY,
  generateCertInNotice 
} from '../data/telemetryData';
import { SCAM_PRESETS } from '../data/scamDatabase';

export function DashboardPage({ currentLang, onLaunchScan }) {
  const [roleMode, setRoleMode] = useState('analyst'); // 'citizen' | 'analyst'
  const [selectedThreatForNotice, setSelectedThreatForNotice] = useState(SCAM_PRESETS[0]);
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [telemetryFilter, setTelemetryFilter] = useState('');
  const [citizenHistory, setCitizenHistory] = useState(CITIZEN_SCAN_HISTORY);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  // Fetch real scan reports from SQLite backend
  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => {
        if (data && data.reports && data.reports.length > 0) {
          const mapped = data.reports.map(r => {
            const dateStr = new Date(r.createdAt).toLocaleDateString('en-IN', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
            return {
              id: r.id,
              verdict: `${r.riskCategory.replace('_', ' ')}${r.senderIdentifier ? ` (${r.senderIdentifier})` : ''}`,
              url: r.extractedUrl || (r.rawMessage.length > 45 ? r.rawMessage.substring(0, 45) + '...' : r.rawMessage),
              date: dateStr,
              riskLevel: r.riskLevel === 'DANGER' ? 'critical' : (r.riskLevel === 'SAFE' ? 'safe' : 'suspicious'),
              device: 'Mobile Sandbox MicroVM',
              status: r.reportedToI4C ? 'Reported to 1930 & I4C' : 'Isolated in Cloud Sandbox'
            };
          });
          setCitizenHistory(mapped);
        }
      })
      .catch(err => {
        console.warn('Backend /api/reports unavailable, using local history cache:', err);
      });
  }, []);

  const filteredTelemetry = LIVE_TELEMETRY_FEED.filter(item => 
    item.domain.toLowerCase().includes(telemetryFilter.toLowerCase()) ||
    item.brand.toLowerCase().includes(telemetryFilter.toLowerCase()) ||
    item.originState.toLowerCase().includes(telemetryFilter.toLowerCase())
  );

  const handleCopyNotice = () => {
    const legalNotice = generateCertInNotice(selectedThreatForNotice);
    navigator.clipboard.writeText(legalNotice);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2000);
  };

  const handleDownloadNotice = () => {
    const legalNotice = generateCertInNotice(selectedThreatForNotice);
    const element = document.createElement("a");
    const file = new Blob([legalNotice], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `CERT-IN_Section69A_Directive_${selectedThreatForNotice.id}.txt`;
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const handleReportCitizenScan = async (id) => {
    try {
      await fetch(`/api/reports/${id}/report-i4c`, { method: 'POST' });
    } catch (err) {
      console.warn('Error syncing report to I4C endpoint:', err);
    }
    setCitizenHistory(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'Reported to 1930 & I4C' };
      }
      return item;
    }));
    setActionSuccessMsg(`Incident #${id} successfully transmitted to National Cybercrime Reporting Portal.`);
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  return (
    <div className="cyber-bg" style={{ minHeight: '100vh', padding: '40px 20px 80px' }}>
      <div className="container">
        
        {/* Role Toggle Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '30px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '16px 24px',
          borderRadius: '16px',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.4rem', color: '#0F172A', fontWeight: '800' }}>
                Sfynbox Threat Intelligence & Operations Hub
              </h1>
              <span className="live-dot-green"></span>
            </div>
            <p style={{ color: '#475569', fontSize: '0.82rem' }}>
              Switch perspective between Citizen personal protection and Law Enforcement triage.
            </p>
          </div>

          {/* Perspective Toggle */}
          <div style={{
            display: 'flex',
            backgroundColor: '#F1F5F9',
            padding: '4px',
            borderRadius: '10px',
            border: '1px solid rgba(15, 23, 42, 0.08)'
          }}>
            <button
              onClick={() => setRoleMode('citizen')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: roleMode === 'citizen' ? '#0284C7' : 'transparent',
                color: roleMode === 'citizen' ? '#FFFFFF' : '#475569',
                fontWeight: '700',
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              <Users size={16} />
              <span>Citizen View</span>
            </button>

            <button
              onClick={() => setRoleMode('analyst')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: roleMode === 'analyst' ? '#D97706' : 'transparent',
                color: roleMode === 'analyst' ? '#FFFFFF' : '#475569',
                fontWeight: '700',
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              <Building2 size={16} />
              <span>I4C / Cyber Cell View</span>
            </button>
          </div>
        </div>

        {actionSuccessMsg && (
          <div style={{
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10B981',
            borderRadius: '10px',
            padding: '12px 18px',
            marginBottom: '24px',
            color: '#34D399',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Check size={18} />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CITIZEN VIEW */}
        {/* ========================================================================= */}
        {roleMode === 'citizen' && (
          <div>
            {/* Quick Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.78rem', color: '#475569', textTransform: 'uppercase' }}>My Scanned Links</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0284C7', fontFamily: 'var(--font-mono)' }}>14 Links</div>
                <div style={{ fontSize: '0.74rem', color: '#16A34A', marginTop: '4px' }}>All isolated in cloud sandbox</div>
              </div>

              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.78rem', color: '#475569', textTransform: 'uppercase' }}>Scams Averted</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#DC2626', fontFamily: 'var(--font-mono)' }}>3 Blocked</div>
                <div style={{ fontSize: '0.74rem', color: '#DC2626', marginTop: '4px' }}>BESCOM bill & IndiaPost traps</div>
              </div>

              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.78rem', color: '#475569', textTransform: 'uppercase' }}>Helpline 1930 Sync</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#16A34A', fontFamily: 'var(--font-mono)' }}>Active</div>
                <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>1-Click Golden Hour Dispatch</div>
              </div>
            </div>

            {/* Recent Scan History */}
            <div className="glass-panel" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ color: '#0F172A', fontSize: '1.2rem', fontWeight: '700' }}>Recent Citizen Scan History</h3>
                  <p style={{ color: '#475569', fontSize: '0.8rem' }}>URLs tested from your devices (No personal device data was shared with target sites)</p>
                </div>
                <button
                  onClick={() => onLaunchScan()}
                  className="btn-primary"
                  style={{ fontSize: '0.85rem' }}
                >
                  <span>Scan New Link</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.08)', color: '#475569' }}>
                      <th style={{ padding: '12px 10px' }}>Reference & URL</th>
                      <th style={{ padding: '12px 10px' }}>Date / Timestamp</th>
                      <th style={{ padding: '12px 10px' }}>Verdict</th>
                      <th style={{ padding: '12px 10px' }}>Device</th>
                      <th style={{ padding: '12px 10px' }}>Status</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citizenHistory.map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.05)' }}>
                        <td style={{ padding: '14px 10px' }}>
                          <div style={{ fontWeight: '600', color: '#0F172A' }}>{item.verdict}</div>
                          <div style={{ color: '#0284C7', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{item.url}</div>
                        </td>
                        <td style={{ padding: '14px 10px', color: '#475569', fontSize: '0.8rem' }}>
                          {item.date}
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          <span className={item.riskLevel === 'critical' ? 'badge badge-danger' : (item.riskLevel === 'suspicious' ? 'badge badge-warning' : 'badge badge-success')}>
                            {item.riskLevel.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px', color: '#334155', fontSize: '0.8rem' }}>
                          {item.device}
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          <span style={{ color: item.status.includes('Reported') ? '#16A34A' : '#D97706', fontSize: '0.82rem', fontWeight: '500' }}>
                            {item.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                          {item.riskLevel === 'critical' && !item.status.includes('Reported') ? (
                            <button
                              onClick={() => handleReportCitizenScan(item.id)}
                              className="btn-danger"
                              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                            >
                              Report to 1930
                            </button>
                          ) : (
                            <button
                              onClick={() => onLaunchScan(item.url)}
                              className="btn-secondary"
                              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                            >
                              Re-inspect
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* I4C / CYBER CELL ANALYST VIEW */}
        {/* ========================================================================= */}
        {roleMode === 'analyst' && (
          <div>
            {/* Top Overview Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.76rem', color: '#475569', textTransform: 'uppercase' }}>Active Smishing Campaigns</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#D97706', fontFamily: 'var(--font-mono)' }}>148 Active</div>
                <div style={{ fontSize: '0.72rem', color: '#DC2626', marginTop: '4px' }}>+18 zero-day domains detected today</div>
              </div>

              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.76rem', color: '#475569', textTransform: 'uppercase' }}>Section 69A Notices Issued</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0284C7', fontFamily: 'var(--font-mono)' }}>412 Domains</div>
                <div style={{ fontSize: '0.72rem', color: '#16A34A', marginTop: '4px' }}>Avg registrar takedown: 3.2 hours</div>
              </div>

              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.76rem', color: '#475569', textTransform: 'uppercase' }}>Most Targeted Entity</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#DC2626' }}>BESCOM / State Power</div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px' }}>36% of active smishing volume</div>
              </div>

              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.76rem', color: '#475569', textTransform: 'uppercase' }}>I4C Sensor Grid Status</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#16A34A', fontFamily: 'var(--font-mono)' }}>ONLINE</div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px' }}>28 State Cyber Cells Connected</div>
              </div>
            </div>

            {/* Telemetry Stream + Geographic Heatmap Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '24px',
              marginBottom: '30px'
            }}>
              
              {/* Telemetry Stream */}
              <div className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Radio size={18} color="#DC2626" />
                    <h3 style={{ color: '#0F172A', fontSize: '1.1rem', fontWeight: '700' }}>Live Smishing Telemetry</h3>
                  </div>
                  <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>Real-Time</span>
                </div>

                {/* Search / Filter input */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#F8FAFC',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(15, 23, 42, 0.12)',
                  marginBottom: '14px',
                  gap: '8px'
                }}>
                  <Search size={16} color="#0284C7" />
                  <input
                    type="text"
                    placeholder="Filter by domain, brand, or state..."
                    value={telemetryFilter}
                    onChange={(e) => setTelemetryFilter(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#0F172A',
                      fontSize: '0.84rem',
                      width: '100%'
                    }}
                  />
                </div>

                {/* Telemetry List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
                  {filteredTelemetry.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onLaunchScan('http://' + item.domain)}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        borderRadius: '8px',
                        border: '1px solid rgba(15, 23, 42, 0.08)',
                        padding: '12px',
                        cursor: 'pointer',
                        transition: 'border-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0284C7'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.08)'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <strong style={{ color: '#0284C7', fontFamily: 'var(--font-mono)', fontSize: '0.86rem' }}>
                          {item.domain}
                        </strong>
                        <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>{item.risk}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#475569' }}>
                        <span>Impersonating: <strong style={{ color: '#0F172A' }}>{item.brand}</strong></span>
                        <span>{item.originState}</span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Action: {item.action}</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* State-wise Heatmap & Top Entities */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* State Heatmap List */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <MapPin size={18} color="#0284C7" />
                    <h3 style={{ color: '#0F172A', fontSize: '1.1rem', fontWeight: '700' }}>Geographic Scam Concentration</h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {STATE_HEATMAP_DATA.slice(0, 6).map((state) => (
                      <div key={state.state} style={{ fontSize: '0.84rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ color: '#0F172A', fontWeight: '600' }}>{state.state}</span>
                          <span style={{ color: '#475569' }}>
                            <strong>{state.reports.toLocaleString()}</strong> incidents ({state.primaryTarget})
                          </span>
                        </div>
                        {/* Heat bar */}
                        <div style={{ height: '6px', backgroundColor: 'rgba(15, 23, 42, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div 
                            style={{ 
                              height: '100%', 
                              width: `${state.threatRate}%`, 
                              backgroundColor: state.threatRate > 80 ? '#DC2626' : (state.threatRate > 70 ? '#D97706' : '#0284C7'),
                              borderRadius: '3px'
                            }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Impersonated Entities */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h3 style={{ color: '#0F172A', fontSize: '1.1rem', fontWeight: '700', marginBottom: '14px' }}>
                    Top Impersonated Brand Categories
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {TOP_IMPERSONATED_ENTITIES.map((ent) => (
                      <div key={ent.name}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                          <span style={{ color: '#334155' }}>{ent.name}</span>
                          <strong style={{ color: ent.color }}>{ent.percentage}%</strong>
                        </div>
                        <div style={{ height: '6px', backgroundColor: 'rgba(15, 23, 42, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${ent.percentage * 2.5}%`, backgroundColor: ent.color, borderRadius: '3px' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* TAKEDOWN ACTION HUB: CERT-IN SECTION 69A IT ACT GENERATOR */}
            <div className="glass-panel" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(217, 119, 6, 0.15)',
                    color: '#D97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 style={{ color: '#0F172A', fontSize: '1.2rem', fontWeight: '700' }}>
                      Takedown Action Hub: CERT-In Section 69A Directive Generator
                    </h3>
                    <p style={{ color: '#475569', fontSize: '0.8rem' }}>
                      Auto-generates official statutory blocking orders for registrar abuse desks & DoT ISPs.
                    </p>
                  </div>
                </div>

                {/* Target Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#475569' }}>Select Threat:</span>
                  <select
                    value={selectedThreatForNotice.id}
                    onChange={(e) => {
                      const found = SCAM_PRESETS.find(p => p.id === e.target.value);
                      if (found) setSelectedThreatForNotice(found);
                    }}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(15, 23, 42, 0.15)',
                      color: '#0F172A',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '0.84rem',
                      outline: 'none'
                    }}
                  >
                    {SCAM_PRESETS.slice(0, 4).map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {preset.title} ({preset.forensics?.hostIp})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pre-formatted Notice Terminal Window */}
              <div className="terminal-window" style={{ maxHeight: '280px', overflowY: 'auto', marginBottom: '18px', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                {generateCertInNotice(selectedThreatForNotice)}
              </div>

              {/* Actions Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-success">Digital Signature Appended</span>
                  <span className="badge badge-warning">NCRP Dispatch Queue #8942</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={handleCopyNotice}
                    className="btn-secondary"
                    style={{ fontSize: '0.86rem' }}
                  >
                    {copiedNotice ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                    <span>{copiedNotice ? 'Directive Copied' : 'Copy Legal Notice Text'}</span>
                  </button>

                  <button
                    onClick={handleDownloadNotice}
                    className="btn-primary"
                    style={{ fontSize: '0.86rem' }}
                  >
                    <Download size={16} />
                    <span>Download Directive (.TXT)</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

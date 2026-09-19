import React, { useState } from 'react';
import { 
  X, 
  Shield, 
  Smartphone, 
  Mail, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Info,
  KeyRound
} from 'lucide-react';

export function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [authRole, setAuthRole] = useState('citizen'); // 'citizen' | 'analyst'
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' | 'email' | 'google'
  
  // Phone OTP state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);

  // Email form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [policeUnit, setPoliceUnit] = useState('Karnataka Cyber Police');

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setOtpTimer(30);
    }, 800);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Authentication successful! Welcome to Sfynbox.');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess({ role: authRole, phone: phoneNumber });
        onClose();
      }, 1000);
    }, 900);
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(authRole === 'analyst' ? 'I4C Cyber Cell credentials verified. Access granted.' : 'Welcome back!');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess({ role: authRole, email, badgeNumber });
        onClose();
      }, 1000);
    }, 900);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(5, 11, 20, 0.82)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#0F172A',
          border: '1px solid rgba(118, 192, 236, 0.3)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)',
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#0A192F'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid rgba(118, 192, 236, 0.4)',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FACC15',
              height: '34px'
            }}>
              <img 
                src="/sfynbox-logo.jpeg" 
                alt="Sfynbox Logo" 
                style={{
                  height: '34px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
            <div>
              <h3 style={{ color: '#F8FAFC', fontSize: '1.1rem', fontWeight: '700' }}>
                {authRole === 'citizen' ? 'Citizen Sign In' : 'I4C / Cyber Cell Portal'}
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                Secure Access & Telemetry Node
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Role Toggle: Citizen vs Law Enforcement */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(15, 23, 42, 0.5)'
        }}>
          <button
            type="button"
            onClick={() => { setAuthRole('citizen'); setOtpSent(false); }}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '0.86rem',
              fontWeight: authRole === 'citizen' ? '700' : '500',
              color: authRole === 'citizen' ? '#76C0EC' : '#94A3B8',
              backgroundColor: authRole === 'citizen' ? 'rgba(118, 192, 236, 0.1)' : 'transparent',
              border: 'none',
              borderBottom: authRole === 'citizen' ? '2px solid #76C0EC' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Smartphone size={16} />
            <span>Everyday Citizen</span>
          </button>

          <button
            type="button"
            onClick={() => { setAuthRole('analyst'); setOtpSent(false); }}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '0.86rem',
              fontWeight: authRole === 'analyst' ? '700' : '500',
              color: authRole === 'analyst' ? '#FACC15' : '#94A3B8',
              backgroundColor: authRole === 'analyst' ? 'rgba(250, 204, 21, 0.08)' : 'transparent',
              border: 'none',
              borderBottom: authRole === 'analyst' ? '2px solid #FACC15' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Building2 size={16} />
            <span>I4C / Cyber Cell Analyst</span>
          </button>
        </div>

        {/* Informational Reassurance Notice */}
        <div style={{
          padding: '10px 20px',
          backgroundColor: 'rgba(118, 192, 236, 0.06)',
          borderBottom: '1px solid rgba(118, 192, 236, 0.12)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px',
          fontSize: '0.78rem',
          color: '#94A3B8'
        }}>
          <Info size={16} color="#76C0EC" style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>
            <strong>Scanning links on Sfynbox does not require an account.</strong> Sign in to sync your scan history across devices or access law enforcement takedown tools.
          </span>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px' }}>
          {successMsg ? (
            <div style={{
              textAlign: 'center',
              padding: '30px 10px'
            }}>
              <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 16px' }} />
              <h4 style={{ color: '#F8FAFC', fontSize: '1.2rem', marginBottom: '8px' }}>
                {successMsg}
              </h4>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
                Redirecting you to your secure session...
              </p>
            </div>
          ) : (
            <>
              {/* Method Switcher */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <button
                  type="button"
                  onClick={() => setAuthMethod('phone')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    border: authMethod === 'phone' ? '1px solid #76C0EC' : '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: authMethod === 'phone' ? 'rgba(118, 192, 236, 0.15)' : 'rgba(255,255,255,0.02)',
                    color: authMethod === 'phone' ? '#76C0EC' : '#94A3B8',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Phone OTP
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    border: authMethod === 'email' ? '1px solid #76C0EC' : '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: authMethod === 'email' ? 'rgba(118, 192, 236, 0.15)' : 'rgba(255,255,255,0.02)',
                    color: authMethod === 'email' ? '#76C0EC' : '#94A3B8',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Email / Official ID
                </button>
              </div>

              {/* PHONE OTP METHOD */}
              {authMethod === 'phone' && (
                <div>
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp}>
                      <div style={{ marginBottom: '18px' }}>
                        <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '6px', fontWeight: '500' }}>
                          Enter Mobile Number (Indian Telecom)
                        </label>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#0A192F',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          overflow: 'hidden'
                        }}>
                          <span style={{
                            padding: '10px 14px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: '#94A3B8',
                            fontSize: '0.9rem',
                            borderRight: '1px solid rgba(255, 255, 255, 0.1)'
                          }}>
                            +91
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            placeholder="9876543210"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                            required
                            style={{
                              flex: 1,
                              background: 'transparent',
                              border: 'none',
                              outline: 'none',
                              padding: '10px 14px',
                              color: '#FFFFFF',
                              fontSize: '0.95rem'
                            }}
                          />
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '6px' }}>
                          We will send a 6-digit verification code to this number.
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading || phoneNumber.length < 10}
                        className="btn-primary"
                        style={{ width: '100%', padding: '12px' }}
                      >
                        {loading ? 'Transmitting OTP...' : 'Send Verification OTP'}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp}>
                      <div style={{ marginBottom: '18px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.85rem', color: '#CBD5E1', marginBottom: '4px' }}>
                          Enter 6-digit code sent to <strong>+91 {phoneNumber}</strong>
                        </div>
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          style={{ background: 'none', border: 'none', color: '#76C0EC', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          Change Number
                        </button>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
                        {otpCode.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            style={{
                              width: '42px',
                              height: '48px',
                              textAlign: 'center',
                              fontSize: '1.2rem',
                              fontWeight: '700',
                              backgroundColor: '#0A192F',
                              border: digit ? '1.5px solid #76C0EC' : '1px solid rgba(255, 255, 255, 0.15)',
                              borderRadius: '8px',
                              color: '#FFFFFF',
                              outline: 'none'
                            }}
                          />
                        ))}
                      </div>

                      <button
                        type="submit"
                        disabled={loading || otpCode.join('').length < 6}
                        className="btn-primary"
                        style={{ width: '100%', padding: '12px', marginBottom: '14px' }}
                      >
                        {loading ? 'Verifying...' : 'Verify & Continue'}
                      </button>

                      <div style={{ textAlign: 'center', fontSize: '0.76rem', color: '#94A3B8' }}>
                        Resend OTP in <span style={{ color: '#FACC15' }}>00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</span>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* EMAIL & OFFICIAL BADGE METHOD */}
              {authMethod === 'email' && (
                <form onSubmit={handlePasswordLogin}>
                  {authRole === 'analyst' && (
                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '4px' }}>
                        I4C / Police Officer Badge ID
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., KA-CYBER-9842"
                        value={badgeNumber}
                        onChange={(e) => setBadgeNumber(e.target.value)}
                        required
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
                  )}

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '4px' }}>
                      {authRole === 'analyst' ? 'Official Gov Email (.gov.in / .nic.in)' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      placeholder={authRole === 'analyst' ? 'officer@mha.gov.in' : 'name@example.com'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
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

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '4px' }}>
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
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

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ width: '100%', padding: '12px' }}
                  >
                    {loading ? 'Authenticating...' : (authRole === 'analyst' ? 'Authorize I4C Access' : 'Sign In')}
                  </button>
                </form>
              )}

              {/* Single Sign On Option */}
              <div style={{
                position: 'relative',
                textAlign: 'center',
                margin: '20px 0 16px',
                color: '#64748B',
                fontSize: '0.78rem'
              }}>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', position: 'absolute', top: '50%', left: 0, right: 0 }}></div>
                <span style={{ position: 'relative', background: '#0F172A', padding: '0 12px' }}>
                  or continue with
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setSuccessMsg('Google Identity verified.');
                    setTimeout(() => {
                      if (onLoginSuccess) onLoginSuccess({ role: 'citizen', email: 'citizen.user@gmail.com' });
                      onClose();
                    }, 800);
                  }, 600);
                }}
                className="btn-secondary"
                style={{ width: '100%', padding: '10px', fontSize: '0.88rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

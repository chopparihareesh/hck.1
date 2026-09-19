import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { ScannerPage } from './pages/ScannerPage';
import { AboutPage } from './pages/AboutPage';
import { DashboardPage } from './pages/DashboardPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [activePage, setActivePage] = useState('home');
  const [scanUrl, setScanUrl] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Trigger scan from homepage to scanner page
  const handleStartScan = (targetUrl) => {
    setScanUrl(targetUrl);
    setActivePage('check');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0A192F' }}>
      {/* Global Navigation Header */}
      <Navbar
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Page Views */}
      <main style={{ flex: 1 }}>
        {activePage === 'home' && (
          <HomePage
            currentLang={currentLang}
            onStartScan={handleStartScan}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'check' && (
          <ScannerPage
            currentLang={currentLang}
            initialUrl={scanUrl}
            onReportEscalate={(threat) => {
              // Could switch to dashboard or record
            }}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            currentLang={currentLang}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage
            currentLang={currentLang}
            onLaunchScan={(url) => {
              if (url) setScanUrl(url);
              setActivePage('check');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            currentLang={currentLang}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        currentLang={currentLang}
        setActivePage={setActivePage}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;

# 🛡️ Sfynbox — Universal Multi-Device Scam Link Sandbox & Threat Intelligence Platform

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Cybersecurity](https://img.shields.io/badge/Initiative-I4C%20%2F%20CERT--In%20Ready-76C0EC.svg)]()
[![Multi-Lingual](https://img.shields.io/badge/Bhashini%20AI-7%20Indian%20Languages-FACC15.svg)]()

> **"Check Any Link Before You Click — Safe, Instant, in Your Language."**
> 
> **Sfynbox** is a next-generation scam link quarantine sandbox and threat intelligence web platform engineered for both **everyday citizens** across India and **cybercrime law enforcement authorities (I4C / State Cyber Cells)**.

---

## 🌟 Key Capabilities & Highlights

### 1. 🧪 Isolated MicroVM Sandbox Simulation
- Safely quarantine and inspect suspicious links distributed via SMS (smishing), WhatsApp, Telegram, or email.
- **Dynamic 4-Stage Sandbox Pipeline**:
  1. **DNS & WHOIS Registry Resolution**: Analyzes domain registration date, registrar, nameservers, and IP geo-location.
  2. **Isolated MicroVM Container Spawning**: Launches headless sandbox environment to insulate host hardware and operating system.
  3. **Behavioral Redirection & Touch Emulation**: Mimics mobile interactions, tracks JavaScript redirect chains, cloaked URLs, and fingerprinting scripts.
  4. **Deep Payload Inspection**: Unpacks APK download triggers, credential-harvesting form endpoints, and cross-references global threat feeds (VirusTotal, Google Safe Browsing, CERT-In).

### 2. 📱 Dual-Mode Viewport Emulation
- **Mobile Device Emulation**: Inspect scam pages directly within a realistic mobile phone viewport mockup with interactive touch gestures.
- **Desktop Browser Emulation**: Switch instantly to test desktop cloaking behavior, malicious extensions, or phishing portals.
- **Quarantined Visual Previews**: Safely preview suspicious portals (SBI YONO fake KYC, BESCOM power cutoff scam, India Post parcel delay, Fake Lucky Draw) without executing untrusted code on the client.

### 3. 🇮🇳 Bhashini Regional Language Intelligence
- Native multi-lingual verdicts and advisories powered by **simulated Bhashini AI engine** supporting **7 Indian languages**:
  - English (`en`)
  - Hindi (`hi` — हिंदी)
  - Tamil (`ta` — தமிழ்)
  - Telugu (`te` — తెలుగు)
  - Kannada (`kn` — ಕನ್ನಡ)
  - Bengali (`bn` — বাংলা)
  - Marathi (`mr` — मराठी)
- Translates technical indicators into plain-language warnings (e.g., *"This link is a fake electricity bill scam trying to steal your bank details"*).

### 4. ⚖️ Role-Based Security Hub
- **Citizen View**:
  - Personal scan history with threat scoring (Safe, Suspicious, Critical).
  - Downloadable PDF/JSON threat audit reports.
  - Direct 1-click incident escalation to the **National Cyber Crime Reporting Portal (1930 / cybercrime.gov.in)**.
- **I4C / Cyber Cell Analyst View**:
  - **Live Smishing Telemetry Stream**: Real-time incoming threat feeds across telecom circles.
  - **Geographic Scam Heatmap**: State-wise attack density across Maharashtra, Karnataka, Telangana, Delhi NCR, UP, and West Bengal.
  - **Top Impersonated Entities**: Live breakdown of spoofed banks, state electricity boards, courier services, and telecoms.
  - **Takedown Action Hub**: One-click generation of legally compliant **CERT-In Section 69A IT Act notices** and registrar abuse reports (Cloudflare, Namecheap, GoDaddy).

### 5. 🚨 Incident Escalation & Verification
- Dedicated **Helpline 1930** emergency alert banners.
- Direct reporting modal with screenshot file preview, category classification, and reference tracking.
- Interactive authentication with Phone OTP verification and Google/Email options.

---

## 🎨 Design System & Visual Palette

| Token | Hex / Value | Purpose |
| :--- | :--- | :--- |
| **Primary Theme** | `#76C0EC` (Sky Blue) | Brand identity, primary CTAs, active states |
| **Deep Background**| `#0A192F` / `#0F172A` | Clean dark-mode foundation |
| **Surface Cards** | `#1E293B` (Slate Blue) | Translucent glassmorphic surfaces and panels |
| **Alert Amber** | `#FACC15` | Suspicious verdict warnings & alerts |
| **Danger Red** | `#EF4444` | High-risk malware & smishing indicators |
| **Success Emerald**| `#10B981` | Clean, verified domain verdicts |
| **Typography** | Inter, Plus Jakarta Sans, JetBrains Mono | Optimal high-contrast readability and code forensics |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or later recommended)
- npm or yarn or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/chopparihareesh/hck.1.git
   cd hck.1
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production bundle**:
   ```bash
   npm run preview
   ```

---

## 📂 Project Architecture

```
hck.1/
├── public/
│   ├── sfynbox-logo.jpeg       # Brand Logo Asset
│   ├── favicon.svg             # Shield-Cube Favicon
│   └── icons.svg
├── src/
│   ├── assets/                 # Graphics and imagery
│   ├── components/
│   │   ├── Navbar.jsx          # Global navigation, Bhashini picker, 1930 banner
│   │   ├── Footer.jsx          # Legal notices, I4C links, CERT-In disclaimer
│   │   └── AuthModal.jsx       # Multi-mode login & 6-digit OTP verification
│   ├── data/
│   │   ├── scamDatabase.js     # Threat database, heuristic scoring, preset scams
│   │   ├── telemetryData.js    # State-wise heatmap, telecom smishing metrics
│   │   └── translations.js     # 7-language Bhashini translation dictionaries
│   ├── pages/
│   │   ├── HomePage.jsx        # Hero scanner, live ticker, scam breakdowns
│   │   ├── ScannerPage.jsx     # Interactive 4-stage sandbox, device toggles
│   │   ├── AboutPage.jsx       # Mission narrative, architecture comparison
│   │   ├── DashboardPage.jsx   # Citizen & I4C Analyst views, Takedown Hub
│   │   └── ContactPage.jsx     # Helpline 1930, incident escalation form
│   ├── App.jsx                 # Route management and global modal state
│   ├── App.css                 # Component transitions and micro-animations
│   ├── index.css               # Design tokens, neon glowing borders, typography
│   └── main.jsx                # Application root mounting
├── index.html                  # HTML entry point with metadata and fonts
├── package.json
└── vite.config.js
```

---

## 🛡️ Target Use Cases

- **Citizens**: Receive a suspicious SMS claiming a power disconnection, tax refund, or lottery winning? Paste the link into Sfynbox to view its risk score in your native language before opening it on your personal device.
- **Cyber Cells & Police Departments**: Rapidly analyze phishing campaigns reported by victims, extract host IPs and drop endpoints, and export ready-to-file Section 69A notices for domain revocation.
- **Telecom & ISP Abuse Desks**: Ingest smishing telemetry to identify bulk SMS sender headers used in malicious redirection campaigns.

---

## 🤝 Contributing

Contributions are welcome! Please submit a pull request or open an issue for feature suggestions or regional language additions.

## 📄 License

This project is licensed under the MIT License.

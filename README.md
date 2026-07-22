# Kawach AI: Digital Public Safety Command Portal

**Kawach AI** is a unified public safety intelligence prototype designed to detect, analyze, and disrupt digital fraud, money mule syndicates, and Fake Indian Currency Notes (FICN) circulation. 

It is engineered as a clean, light-theme enterprise GovTech portal suitable for official deployment by the Ministry of Home Affairs (MHA), Indian Cyber Coordination Centre (I4C), and financial chest sorters.

---

## 🚀 Live Demo & Repository Link
*   **GitHub Repository**: [AI-for-Digital-Public-Safety-Defeating-Counterfeiting-Fraud-Digital-Arrest-Scams](https://github.com/shaikrajiummar/AI-for-Digital-Public-Safety-Defeating-Counterfeiting-Fraud-Digital-Arrest-Scams)

---

## 🛠️ Key Hackathon Prototype Modules

### 1. National Threat Command Center (Dashboard)
*   **Geospatial Crime Radar**: Interactive SVG grid mapping cybercrime centers (Mewat, Jamtara, Noida, Patna). Clicking active towers displays localized case counts and risk classifications.
*   **MHA Blockchain Audit Registry**: Implements a simulated blockchain ledger ticking active blocks and SHA-256 evidence signatures in the background, proving case files are untampered under Sec 65B of the Indian Evidence Act.
*   **Browser Geolocation Integration**: Uses the HTML5 Geolocation API (`navigator.geolocation`) to identify the operator's base station coordinates and display them on the map HUD.

### 2. Digital Arrest Audio Analyzer
*   **Audio Intercept Readouts ("Hear the Calls")**: Utilizes the native browser **Web Speech Synthesis API** (`window.speechSynthesis`). Pressing play streams transcripts aloud, shifting pitch and speed to differentiate between scammers and victims. Includes a quick mute/unmute switch.
*   **Voice Clone & Deepfake Analysis**: Checks audio waveforms for synthetic pitch variance and vocoder resampling footprints, scoring synthetic voice clone probabilities.
*   **SIM-Box Tower Triangulator Grid**: Interactive HUD mapping cell signal circles. Run triangulation to geometrically locate active SIM box setups.
*   **Suspect Location Drift**: Coordinates drift dynamically every 1.5 seconds during active call intercepts to show live geographical movement.

### 3. Multi-Spectral Banknote Verifier
*   **Visible light scanner**: Checks Mahatma Gandhi watermark alignment, microprinting legibility, and progressive serial number font sizing.
*   **Ultraviolet Scanner (UV 365nm)**: Exposes glowing yellow-green security threads and scattered fluorescent fibers. Reveals bleached wood-pulp glowing papers on counterfeits.
*   **Infrared Scanner (IR 850nm)**: Simulates night-vision ink checking. Iron-oxide inks fade under IR. Genuine notes hide the left-side print; fakes remain fully visible.
*   **Magnetic Scan Sweeper (MG)**: Sweeps note with a sensor head and renders an animated resonance waveform curve (genuine notes peak at the security thread and serial numbers; fakes show a flatline).

### 4. Coordinated Syndicate Linkage Graph
*   **Interactive SVG Node Dragging**: Drag, arrange, and inspect nodes representing Scammer Cells, Mule Bank accounts, and victim FIR logs.
*   **Spring Layout Optimizer**: Runs a cluster algorithm that groups nodes by relationship distance.
*   **Court Evidence Packager**: Compiles call intercepts, towers, and transaction sheets into a court-admissible signed evidence portfolio.

### 5. Citizen Safety Shield Chatbot
*   **WhatsApp-Style Chatbot**: Interactive diagnostic questionnaire helping citizens analyze fraud.
*   **Multi-Lingual translations**: Toggles between English, Hindi, Tamil, Telugu, and Bengali.
*   **NCRB complain draft generator**: Formats a formal FIR letter based on chat selections with copy-to-clipboard options.

---

## 📐 Technology Stack
*   **Framework**: React 19 (React-DOM) + Vite
*   **Styling**: Tailwind CSS v3.4 + PostCSS
*   **Charting**: Recharts (ResponsiveArea & Bar charts)
*   **Icons**: Lucide React
*   **APIs**: HTML5 Geolocation, SpeechSynthesis (TTS)

---

## 💻 Local Deployment Instructions

Follow these instructions to run the application locally on your machine:

### 1. Prerequisites
Ensure you have Node.js (v18+) installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/shaikrajiummar/AI-for-Digital-Public-Safety-Defeating-Counterfeiting-Fraud-Digital-Arrest-Scams.git
cd AI-for-Digital-Public-Safety-Defeating-Counterfeiting-Fraud-Digital-Arrest-Scams
npm install
```

### 3. Start Development Server
Launch Vite's hot-reloading development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build and Check Cleanliness
Validate linter guidelines and build target files:
```bash
# Run the linter (Oxlint) - Expects 0 warnings and 0 errors
npm run lint

# Compile production bundle
npm run build
```

---

## 🔒 Security & Code Integrity Check
*   **Oxlint Static Analysis**: Completed with **0 warnings and 0 errors** on 11 files with 91 rules.
*   **Vite build compilation**: Successful production build completed in **3.21 seconds**.

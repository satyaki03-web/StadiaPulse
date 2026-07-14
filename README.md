# StadiaPulse GenAI

**Enterprise Generative AI Ecosystem for the 2026 FIFA World Cup**

StadiaPulse GenAI is the cognitive nervous system designed to unify 16 host cities across North America under a single, intelligent operational umbrella. As we prepare for 48 teams, 104 matches, and millions of global attendees, traditional deterministic systems are insufficient. StadiaPulse leverages a multi-tiered generative architecture to transform passive infrastructure into an active, predictive ecosystem.

## 🚀 Executive Vision

Our mission is to ensure frictionless crowd flow, shatter language barriers in real-time, empower staff with predictive operational intelligence, and enforce rigorous sustainability metrics. By synthesizing massive multimodal data streams—from IoT sensors to CCTV feeds—StadiaPulse delivers hyper-personalized, context-aware orchestration that scales dynamically to meet the unprecedented demands of the world's largest sporting event.

## ✨ Core Modules & Features

- **Live Crowd Radar (Virtual Stadium Matrix):** Real-time 3D telemetry of stadium sectors, highlighting crowd density and autonomous alerts for congestion with actionable rerouting suggestions.
- **OpsGPT Decision Support:** A highly advanced generative AI assistant integrated into a secure command center dashboard. Powered by the Gemini 2.5 Flash model, OpsGPT provides concise, analytical, and actionable responses for operational protocols.
- **Multilingual Comm (Global PA Broadcast):** Seamless auto-translation and dictation tools for broadcasting localized announcements across dynamically detected language zones.
- **Transit & Grid:** Real-time optimization of electric shuttle fleets, grid battery reserves, and station congestion, predictive transit load charting.
- **Dynamic Telemetry Header:** Live-updating dashboard telemetry including active fans (with multi-venue support), network health, and carbon footprint reduction.

## 🏗️ Architecture & Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Framer Motion (fluid animations), Recharts (data telemetry), Lucide React (icons).
- **Backend:** Node.js, Express, ES Module support.
- **AI Integration:** `@google/genai` SDK via Gemini 2.5 Flash.
- **Typography:** Inter (Sans-serif) & JetBrains Mono (Monospace).

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd stadiapulse-genai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will boot up at `http://localhost:3000`.

### Building for Production

To create a production build with the bundled Express server:
```bash
npm run build
```
Start the production server:
```bash
npm run start
```

## 🔒 Security & Compliance

Operating across the US, Canada, and Mexico requires dynamic compliance. Our architecture incorporates:
- Strict data minimization and PII redaction before any query hits the cloud.
- Ephemeral processing where transient interactions are purged post-match.
- Edge inference offline capabilities for baseline critical operations.

## 🌍 Sustainability Impact

StadiaPulse is instrumental in achieving a carbon-neutral tournament footprint. By continuously analyzing predictive crowd density, the AI dynamically modulates stadium HVAC, lighting, and water pressure zone-by-zone, reducing ambient energy waste significantly.

## 📄 License

This project is licensed under the MIT License.

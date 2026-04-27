<div align="center">
  <img src="public/icon-bg-remover.png" alt="Background Remover Logo" width="120" height="120" />
  <h1>Background Remover</h1>
  <p>Professional-grade background removal directly in your browser using AI and edge detection.</p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.2-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/TypeScript-6.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  </p>
</div>

---

Background Remover is a modern, privacy-focused web application built around one simple mission: providing a seamless, serverless way to isolate subjects from their backgrounds. No uploads, no accounts, just pure client-side processing power.

### 🖼️ Subject & Style
- **Pure Privacy**: All processing happens in your browser. Your images never leave your device.
- **Edge Mastery**: Advanced edge detection and color segmentation for clean cutouts.
- **Side-by-Side**: Real-time comparison between original and processed images.
- **Transparency First**: Download high-quality PNGs with alpha transparency.

### 📱 Progressive Web App (PWA)
- **Installable**: Add to your home screen for a native app experience.
- **Offline Capable**: Basic functionality works even without an internet connection.
- **Fast & Fluid**: Optimized for mobile performance with safe-area handling.

### 🛠️ Technology Stack
- **Frontend**: Next.js 16 (App Router), React 19
- **Styling**: Tailwind CSS 4, Shadcn UI, Radix UI
- **Processing**: Client-side Canvas API & Edge Detection Algorithms
- **Icons**: Lucide React
- **PWA**: Custom Service Worker implementation

### 🚀 Getting Started

#### Prerequisites
- Node.js 20+
- npm

#### Installation
```bash
# Clone the repository
git clone https://github.com/Rixouu/background-remover.git

# Install dependencies
npm install

# Run development server
npm run dev
```

Default dev URL: [http://localhost:3000](http://localhost:3000)

### 🧩 How It Works
The application leverages a multi-stage processing pipeline:
1. **Sobel Edge Detection**: Identifies sharp transitions in image intensity.
2. **Color Sampling**: Analyzes background regions for dominant color patterns.
3. **Mask Generation**: Creates a precise alpha mask combining edge and color data.
4. **Refinement**: Smooths boundaries to prevent "jagged" edges.

### 🖥️ Deployment
The project is optimized for Vercel:
```bash
npm run build
npm run start
```

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/Rixouu">Jonathan Rycx</a></p>
</div>
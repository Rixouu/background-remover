**Background Remover** is a professional-grade web application for removing backgrounds directly in your browser using AI and edge detection. Built with Next.js and React 19, it offers a seamless client-side experience, high-quality results, and a modern, responsive UI.

The current product was developed by [Jonathan Rycx](https://github.com/Rixouu), focusing on privacy and efficient browser-based processing.

[![Next.js 16.2](https://img.shields.io/badge/Next.js-16.2-black)](https://nextjs.org/)
[![React 19.2](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![Tailwind CSS 4.2](https://img.shields.io/badge/Tailwind-4.2-38B2AC)](https://tailwindcss.com/)
[![TypeScript 6.0](https://img.shields.io/badge/TypeScript-6.0-blue)](https://www.typescriptlang.org/)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-yellow)

---

Background Remover is a modern, privacy-focused web application built around one simple mission: providing a seamless, serverless way to isolate subjects from their backgrounds. No uploads, no accounts, just pure client-side processing power.

### 🖼️ Isolate & Remove
- **Pure Privacy**: All processing happens in your browser. Your images never leave your device.
- **Edge Mastery**: Advanced edge detection and color segmentation for clean cutouts.
- **Side-by-Side**: Real-time comparison between original and processed images.
- **Transparency First**: Download high-quality PNGs with alpha transparency.

### 📱 PWA Support
- **Installable**: Add to home screen on iOS and Android for a native feel.
- **Offline Ready**: Basic functionality works even without an internet connection.
- **Fluid Experience**: Optimized for mobile performance with safe-area handling.

### 🛠️ Technical Stack
- **Frontend**: Next.js 16 (App Router), React 19.
- **Styling**: Tailwind CSS 4, CSS Variables.
- **Processing**: Client-side Canvas API & AI Edge Detection.
- **Components**: Radix UI, Lucide React, Shadcn UI.
- **Testing**: Vitest.

### 🎨 UI
- **Desktop + Mobile**: UI is implemented to match the mockups in `mockup/`.
- **Mobile app feel**: Bottom-tab page system (Remove / Batch / History / Account) with safe-area friendly layout.
- Mockup reference:
  - Desktop: `mockup/bgremover-desktop.html`
  - Mobile: `mockup/bgremover-mobile.html`

### 🚀 Getting Started

#### Prerequisites
- **Node.js 20+**
- **npm**

#### Installation
```bash
npm install
```

#### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the result.

#### Build & Production
```bash
npm run build
npm run start
```

#### Unit Tests
```bash
npm test
```

Watch mode:
```bash
npm run test:watch
```

### 🧩 How It Works
The application leverages a multi-stage processing pipeline:
1. **Sobel Edge Detection**: Identifies sharp transitions in image intensity.
2. **Color Sampling**: Analyzes background regions for dominant color patterns.
3. **Mask Generation**: Creates a precise alpha mask combining edge and color data.
4. **Refinement**: Smooths boundaries to prevent "jagged" edges.

### 📚 Development Notes
See `docs/DEVELOPMENT.md`.

### 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

### 👥 Team
- **Jonathan Rycx** — Lead Developer — [Rixouu](https://github.com/Rixouu)

### 🙏 Acknowledgments
- [Next.js](https://nextjs.org/) for the incredible framework.
- [Shadcn](https://ui.shadcn.com/) for the beautiful UI components.
- [Vercel](https://vercel.com/) for the hosting and deployment.

---

**Built with ❤️ for privacy-focused image processing.**

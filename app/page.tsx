import { ImageProcessor } from "@/components/image-processor"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 space-y-12">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="icon-box h-16 w-16 md:h-20 md:w-20 transition-transform hover:scale-105 duration-300">
            <Image 
              src="/icon-bg-remover.png" 
              alt="Logo" 
              width={48} 
              height={48} 
            />
          </div>
          
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
              Link Background Remover
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-[600px] mx-auto leading-relaxed">
              Create clean, professional images with premium background removal tools.
            </p>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <ImageProcessor />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
          <div className="p-8 rounded-3xl bg-secondary/50 border border-border flex flex-col gap-3">
            <h3 className="text-lg font-bold text-foreground">Privacy First</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your images are processed entirely in your browser. No data ever leaves your device.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-secondary/50 border border-border flex flex-col gap-3">
            <h3 className="text-lg font-bold text-foreground">HD Quality</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Export high-resolution PNGs with perfect transparency for any professional project.
            </p>
          </div>
        </div>
      </div>

      <footer className="py-12 border-t border-border mt-12">
        <div className="container flex flex-col items-center justify-center gap-4 text-center px-4">
          <p className="text-sm font-bold text-muted-foreground/60">
            Background Remover &copy; {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-black text-muted-foreground/30">
            <span>Built with Next.js 16</span>
            <span>Powered by AI</span>
            <span>Open Source</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
import { ImageProcessor } from "@/components/image-processor"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 pb-20">
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center space-y-8 text-center pt-12">
        <div className="icon-box h-20 w-20 shadow-primary/20 animate-in fade-in zoom-in duration-700">
          <Image 
            src="/icon-bg-remover.png" 
            alt="Logo" 
            width={48} 
            height={48} 
            className="brightness-0 invert dark:brightness-100 dark:invert-0"
          />
        </div>
        
        <div className="space-y-4 max-w-2xl px-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
            Background Remover
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
            Professional-grade background removal directly in your browser. 
            No watermarks, no signups, just pure efficiency.
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
        <div className="glass rounded-[2.5rem] p-8 md:p-12 shadow-soft">
          <ImageProcessor />
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-muted-foreground/60 pt-8">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
          <span>Client-side AI</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
          <span>Privacy Guaranteed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
          <span>HD Export</span>
        </div>
      </div>
    </div>
  )
}
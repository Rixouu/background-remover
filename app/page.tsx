import { ImageProcessor } from "@/components/image-processor"
import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-background">
      <div className="w-full max-w-2xl bg-card rounded-[2.5rem] shadow-xl shadow-zinc-200/50 border border-zinc-100 p-8 md:p-12">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-primary/20 transition-transform hover:scale-105 duration-300">
            <Image 
              src="/icon-bg-remover.png" 
              alt="Logo" 
              width={40} 
              height={40} 
              className="brightness-0 invert"
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-3">
            Background Remover
          </h1>
          <p className="text-zinc-500 max-w-sm font-medium leading-relaxed">
            Professional-grade background removal directly in your browser. No watermarks, no signups.
          </p>
        </div>
        
        <ImageProcessor />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="bg-zinc-50/50 rounded-2xl p-5 border border-zinc-100/80">
            <h4 className="font-bold text-zinc-900 mb-1">Privacy First</h4>
            <p className="text-zinc-500 leading-relaxed">Processed locally. Your images never leave your device.</p>
          </div>
          <div className="bg-zinc-50/50 rounded-2xl p-5 border border-zinc-100/80">
            <h4 className="font-bold text-zinc-900 mb-1">HD Export</h4>
            <p className="text-zinc-500 leading-relaxed">High-resolution PNGs with perfect transparency.</p>
          </div>
        </div>
      </div>
      
      <footer className="mt-12 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-300">
          Built with Next.js & AI &bull; &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  )
}
import { ImageProcessor } from "@/components/image-processor"
import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-zinc-100">
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl shadow-zinc-300/50 border border-zinc-200 p-8 md:p-12 animate-in fade-in zoom-in duration-700">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-primary/30 overflow-hidden transition-transform hover:scale-110 duration-500">
            <Image 
              src="/icon-bg-remover.png" 
              alt="Logo" 
              width={96} 
              height={96} 
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-zinc-900 mb-3">
            Background Remover
          </h1>
          <p className="text-zinc-500 max-w-sm font-semibold leading-relaxed">
            Professional-grade background removal directly in your browser. No watermarks, no signups.
          </p>
        </div>
        
        <ImageProcessor />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100 transition-colors hover:bg-zinc-100/50">
            <h4 className="font-black text-zinc-900 mb-1 text-sm uppercase tracking-wider">Privacy First</h4>
            <p className="text-zinc-500 text-sm leading-relaxed font-medium">Processed locally. Your images never leave your device.</p>
          </div>
          <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100 transition-colors hover:bg-zinc-100/50">
            <h4 className="font-black text-zinc-900 mb-1 text-sm uppercase tracking-wider">HD Export</h4>
            <p className="text-zinc-500 text-sm leading-relaxed font-medium">High-resolution PNGs with perfect transparency.</p>
          </div>
        </div>
      </div>
      
      <footer className="mt-12 text-center opacity-30">
        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-900">
          Built with Next.js & AI &bull; &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  )
}
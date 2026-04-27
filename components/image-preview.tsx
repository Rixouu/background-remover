"use client"

import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface ImagePreviewProps {
  title: string
  imageSrc: string | null
  isProcessed?: boolean
  isLoading?: boolean
}

export function ImagePreview({
  title,
  imageSrc,
  isProcessed = false,
  isLoading = false,
}: ImagePreviewProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{title}</span>
      </div>
      
      <div className="relative overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm group">
        <AspectRatio ratio={1 / 1}>
          {imageSrc ? (
            <div className="relative h-full w-full">
              {/* Checkerboard background */}
              <div 
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
                style={{ 
                  backgroundImage: 'radial-gradient(#000 10%, transparent 10%), radial-gradient(#000 10%, transparent 10%)',
                  backgroundPosition: '0 0, 4px 4px',
                  backgroundSize: '8px 8px'
                }} 
              />
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-contain p-4 transform transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 400px"
                priority={!isProcessed}
              />
            </div>
          ) : isProcessed ? (
            isLoading ? (
              <div className="flex h-full flex-col items-center justify-center space-y-3">
                <div className="h-8 w-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">Processing</span>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-xs font-bold text-zinc-400 dark:text-zinc-600 italic uppercase tracking-widest">
                Awaiting processing
              </div>
            )
          ) : (
             <div className="flex h-full items-center justify-center text-xs font-bold text-zinc-400 dark:text-zinc-600 italic uppercase tracking-widest">
              Awaiting upload
            </div>
          )}
        </AspectRatio>
      </div>
    </div>
  )
}
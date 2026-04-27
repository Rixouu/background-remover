"use client"

import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Skeleton } from "@/components/ui/skeleton"

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
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-bold text-sm tracking-tight text-muted-foreground uppercase">{title}</h3>
      </div>
      
      <div className="relative overflow-hidden rounded-[1.5rem] border-2 border-primary/5 bg-muted/30 shadow-inner group">
        <AspectRatio ratio={1 / 1}>
          {imageSrc ? (
            <div className="relative h-full w-full">
              {/* Checkerboard background for transparency visibility */}
              <div 
                className="absolute inset-0 opacity-10 dark:opacity-5" 
                style={{ 
                  backgroundImage: 'radial-gradient(#000 10%, transparent 10%), radial-gradient(#000 10%, transparent 10%)',
                  backgroundPosition: '0 0, 8px 8px',
                  backgroundSize: '16px 16px'
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
              <div className="flex h-full flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                </div>
                <p className="text-xs font-bold text-primary/60 animate-pulse uppercase tracking-widest">Processing</p>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground font-medium italic">
                Awaiting processing...
              </div>
            )
          ) : (
             <div className="flex h-full items-center justify-center text-muted-foreground font-medium italic">
              Awaiting upload...
            </div>
          )}
        </AspectRatio>
      </div>
    </div>
  )
}
 
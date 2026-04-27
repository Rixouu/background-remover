"use client"

import { useRef } from "react"
import { UploadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ImageUploaderProps {
  onImageUpload: (dataUrl: string) => void
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Please upload an image smaller than 5MB")
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        onImageUpload(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = () => fileInputRef.current?.click()

  return (
    <div className="w-full">
      <div
        className="group relative flex flex-col items-center justify-center border-3 border-dashed border-primary/20 dark:border-primary/10 rounded-[2rem] p-16 space-y-6 cursor-pointer transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.02] dark:hover:bg-primary/[0.01]"
        onClick={handleUpload}
      >
        <div className="icon-box h-16 w-16 mb-2 transform group-hover:scale-110 transition-transform duration-300">
          <UploadIcon className="w-8 h-8 text-primary-foreground" />
        </div>
        
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Upload your image
          </h2>
          <p className="text-muted-foreground font-medium">
            Drag and drop your file here or click to browse
          </p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          aria-label="Upload image"
        />
        
        <Button variant="outline" size="lg" className="rounded-2xl px-8 font-bold border-2 hover:bg-primary hover:text-white transition-all duration-300">
          Select Image
        </Button>
        
        <p className="text-xs text-muted-foreground/50 font-medium">
          Supports JPG, PNG (Max 5MB)
        </p>
      </div>
    </div>
  )
}
 
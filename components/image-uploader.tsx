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
    <div
      className="group relative flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 space-y-4 cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/[0.02] dark:hover:bg-primary/[0.01]"
      onClick={handleUpload}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
        <UploadIcon className="w-6 h-6" />
      </div>
      
      <div className="space-y-1 text-center">
        <h3 className="text-lg font-bold text-foreground">Upload Image</h3>
        <p className="text-sm text-muted-foreground font-medium">
          Drag and drop or click to browse
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
      
      <Button variant="outline" className="mt-2 rounded-xl font-bold border-2 transition-all">
        Select File
      </Button>
    </div>
  )
}
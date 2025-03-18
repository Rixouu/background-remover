"use client"

import { useRef } from "react"
import { UploadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
    <Card className="w-full bg-card">
      <CardContent className="p-6">
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-primary/30 dark:border-primary/40 rounded-lg p-12 space-y-4 cursor-pointer hover:border-primary transition-colors hover:bg-accent/50"
          onClick={handleUpload}
        >
          <UploadIcon className="w-12 h-12 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground">Drag and drop your image here</h2>
          <p className="text-muted-foreground">or click to upload</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            aria-label="Upload image"
          />
          <Button variant="outline" className="mt-4">Select Image</Button>
        </div>
      </CardContent>
    </Card>
  )
} 
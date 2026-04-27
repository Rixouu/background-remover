"use client"

import { useState } from "react"
import { DownloadIcon, ReloadIcon, MagicWandIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ImageUploader } from "@/components/image-uploader"
import { ImagePreview } from "@/components/image-preview"

export function ImageProcessor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleImageUpload = (dataUrl: string) => {
    setOriginalImage(dataUrl)
    setProcessedImage(null)
  }

  const handleRemoveBackground = async () => {
    if (!originalImage) return

    setIsLoading(true)
    setProgress(0)

    try {
      const img = document.createElement('img')
      img.src = originalImage
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Unable to get canvas context')

      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      setProgress(20)
      const edgeData = detectEdges(data, canvas.width, canvas.height)
      setProgress(40)
      const foregroundMask = colorBasedSegmentation(data, canvas.width, canvas.height)
      setProgress(60)
      const combinedMask = combineMasks(edgeData, foregroundMask, canvas.width, canvas.height)
      setProgress(80)
      applyMask(data, combinedMask)
      setProgress(90)
      refineEdges(data, canvas.width, canvas.height)

      ctx.putImageData(imageData, 0, 0)
      setProcessedImage(canvas.toDataURL())
      setProgress(100)

      toast.success("Background removed!")
    } catch (error) {
      console.error('Error processing image:', error)
      toast.error("Failed to process image")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a')
      link.href = processedImage
      link.download = 'processed_image.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleReset = () => {
    setOriginalImage(null)
    setProcessedImage(null)
    setProgress(0)
  }

  return (
    <div className="space-y-6">
      {!originalImage ? (
        <ImageUploader onImageUpload={handleImageUpload} />
      ) : (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImagePreview title="Original" imageSrc={originalImage} />
            <ImagePreview 
              title="Processed" 
              imageSrc={processedImage} 
              isProcessed={true} 
              isLoading={isLoading} 
            />
          </div>
          
          <div className="space-y-4 pt-6">
            {isLoading ? (
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black text-primary uppercase tracking-widest">
                  <span>Removing Background...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 rounded-full bg-zinc-100" />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {!processedImage ? (
                  <Button 
                    onClick={handleRemoveBackground} 
                    className="w-full h-14 text-base font-bold bg-primary hover:bg-primary/90 text-white transition-all rounded-2xl shadow-xl shadow-primary/20"
                  >
                    <MagicWandIcon className="mr-2 h-5 w-5" />
                    Remove Background
                  </Button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Button 
                      onClick={handleDownload} 
                      className="w-full h-14 text-base font-bold bg-primary hover:bg-primary/90 text-white transition-all rounded-2xl shadow-xl shadow-primary/20"
                    >
                      <DownloadIcon className="mr-2 h-5 w-5" />
                      Download HD PNG
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={handleReset} 
                      className="w-full h-12 text-sm font-bold text-zinc-400 hover:text-zinc-600 transition-all"
                    >
                      <ReloadIcon className="mr-2 h-4 w-4" />
                      Upload Different Image
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ... (Rest of the processing functions remain same)
function detectEdges(data: Uint8ClampedArray, width: number, height: number): Uint8Array {
  const grayscale = new Uint8Array(width * height)
  for (let i = 0; i < data.length; i += 4) {
    grayscale[i / 4] = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114)
  }

  const edges = new Uint8Array(width * height)
  const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1]
  const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1]

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let pixelX = 0, pixelY = 0
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          const pixel = grayscale[(y + j) * width + (x + i)]
          pixelX += pixel * sobelX[(j + 1) * 3 + (i + 1)]
          pixelY += pixel * sobelY[(j + 1) * 3 + (i + 1)]
        }
      }
      edges[y * width + x] = Math.min(255, Math.sqrt(pixelX * pixelX + pixelY * pixelY))
    }
  }
  return edges
}

function colorBasedSegmentation(data: Uint8ClampedArray, width: number, height: number): Uint8Array {
  const mask = new Uint8Array(width * height)
  const samples = sampleBackgroundColors(data, width, height)
  const threshold = 30

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    let isForeground = true
    for (const sample of samples) {
      const dr = r - sample[0]
      const dg = g - sample[1]
      const db = b - sample[2]
      const distance = Math.sqrt(dr * dr + dg * dg + db * db)
      if (distance < threshold) {
        isForeground = false
        break
      }
    }
    mask[i / 4] = isForeground ? 255 : 0
  }
  return mask
}

function sampleBackgroundColors(data: Uint8ClampedArray, width: number, height: number): number[][] {
  const samples: number[][] = []
  for (let i = 0; i < width; i += width / 10) {
    samples.push([data[Math.floor(i) * 4], data[Math.floor(i) * 4 + 1], data[Math.floor(i) * 4 + 2]])
    samples.push([data[(height - 1) * width * 4 + Math.floor(i) * 4], data[(height - 1) * width * 4 + Math.floor(i) * 4 + 1], data[(height - 1) * width * 4 + Math.floor(i) * 4 + 2]])
  }
  for (let i = 0; i < height; i += height / 10) {
    samples.push([data[Math.floor(i) * width * 4], data[Math.floor(i) * width * 4 + 1], data[Math.floor(i) * width * 4 + 2]])
    samples.push([data[Math.floor(i) * width * 4 + (width - 1) * 4], data[Math.floor(i) * width * 4 + (width - 1) * 4 + 1], data[Math.floor(i) * width * 4 + (width - 1) * 4 + 2]])
  }
  return samples
}

function combineMasks(edgeData: Uint8Array, foregroundMask: Uint8Array, width: number, height: number): Uint8Array {
  const combinedMask = new Uint8Array(width * height)
  for (let i = 0; i < width * height; i++) {
    combinedMask[i] = edgeData[i] > 30 || foregroundMask[i] > 0 ? 255 : 0
  }
  return combinedMask
}

function applyMask(data: Uint8ClampedArray, mask: Uint8Array): void {
  for (let i = 0; i < mask.length; i++) {
    data[i * 4 + 3] = mask[i]
  }
}

function refineEdges(data: Uint8ClampedArray, width: number, height: number): void {
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4
      if (data[idx + 3] > 0 && data[idx + 3] < 255) {
        let sumAlpha = 0
        let count = 0
        for (let j = -1; j <= 1; j++) {
          for (let i = -1; i <= 1; i++) {
            if (i === 0 && j === 0) continue
            const neighborIdx = ((y + j) * width + (x + i)) * 4
            sumAlpha += data[neighborIdx + 3]
            count++
          }
        }
        const avgAlpha = sumAlpha / count
        data[idx + 3] = avgAlpha > 127 ? 255 : 0
      }
    }
  }
}
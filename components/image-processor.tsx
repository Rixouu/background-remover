"use client"

import { useState } from "react"
import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons"
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

      toast.success("Your image has been processed successfully")
    } catch (error) {
      console.error('Error processing image:', error)
      toast.error("An error occurred while processing the image")
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
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {!originalImage ? (
        <ImageUploader onImageUpload={handleImageUpload} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImagePreview title="Original Image" imageSrc={originalImage} />
            <ImagePreview 
              title="Processed Image" 
              imageSrc={processedImage} 
              isProcessed={true} 
              isLoading={isLoading} 
            />
          </div>
          
          {isLoading ? (
            <div className="space-y-2">
              <div className="w-full">
                <Progress value={progress} max={100} />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Processing: {progress}%
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Button 
                onClick={handleRemoveBackground} 
                disabled={isLoading || !!processedImage}
              >
                {processedImage ? 'Background Removed' : 'Remove Background'}
              </Button>
              
              {processedImage && (
                <Button onClick={handleDownload} variant="outline">
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Download
                </Button>
              )}
            </div>
          )}
          
          <Button onClick={handleReset} variant="ghost" className="w-full">
            <ReloadIcon className="mr-2 h-4 w-4" />
            Start Over
          </Button>
        </>
      )}
    </div>
  )
}

// Image processing functions
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
  const threshold = 30 // Adjust this value to fine-tune segmentation

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
  
  // Sample from edges - assuming background is often at the edges
  for (let i = 0; i < width; i += width / 10) {
    samples.push([data[i * 4], data[i * 4 + 1], data[i * 4 + 2]])
    samples.push([data[(height - 1) * width * 4 + i * 4], data[(height - 1) * width * 4 + i * 4 + 1], data[(height - 1) * width * 4 + i * 4 + 2]])
  }
  
  for (let i = 0; i < height; i += height / 10) {
    samples.push([data[i * width * 4], data[i * width * 4 + 1], data[i * width * 4 + 2]])
    samples.push([data[i * width * 4 + (width - 1) * 4], data[i * width * 4 + (width - 1) * 4 + 1], data[i * width * 4 + (width - 1) * 4 + 2]])
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
    data[i * 4 + 3] = mask[i] // Set alpha channel based on mask
  }
}

function refineEdges(data: Uint8ClampedArray, width: number, height: number): void {
  // Simple alpha matting
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
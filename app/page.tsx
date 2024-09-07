'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress'
import { Toaster, toast } from 'react-hot-toast';
import { DownloadIcon, UploadIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Please upload an image smaller than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => fileInputRef.current?.click();

  const handleRemoveBackground = async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setProgress(0);

    try {
      const img = document.createElement('img');
      img.src = originalImage;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Unable to get canvas context');

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      setProgress(20);
      const edgeData = detectEdges(data, canvas.width, canvas.height);

      setProgress(40);
      const foregroundMask = colorBasedSegmentation(data, canvas.width, canvas.height);

      setProgress(60);
      const combinedMask = combineMasks(edgeData, foregroundMask, canvas.width, canvas.height);

      setProgress(80);
      applyMask(data, combinedMask);

      setProgress(90);
      refineEdges(data, canvas.width, canvas.height);

      ctx.putImageData(imageData, 0, 0);

      setProcessedImage(canvas.toDataURL());
      setProgress(100);

      toast.success("Your image has been processed successfully.");
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error("An error occurred while processing the image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'processed_image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Toaster />
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white py-6 px-6 shadow-sm sticky top-0 z-10">
        <h1 className="text-3xl font-bold">Advanced Background Remover</h1>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-12">
        <Card className="w-full max-w-3xl">
          <CardContent className="p-6 space-y-6">
            {!originalImage ? (
              <div
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 space-y-4 cursor-pointer hover:border-primary transition-colors"
                onClick={handleUpload}
              >
                <UploadIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Drag and drop your image here</h2>
                <p className="text-gray-500 dark:text-gray-400">or click to upload</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button variant="outline" className="mt-4">Select Image</Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageCard title="Original Image" imageSrc={originalImage} />
                  <ImageCard
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
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">Processing: {progress}%</p>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <Button onClick={handleRemoveBackground} disabled={isLoading || !!processedImage}>
                      {processedImage ? 'Background Removed' : 'Remove Background'}
                    </Button>
                    {processedImage && (
                      <Button onClick={handleDownload} variant="outline">
                        <DownloadIcon className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                )}
                <Button onClick={handleReset} variant="ghost" className="w-full">
                  <ReloadIcon className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function ImageCard({ 
  title, 
  imageSrc, 
  isProcessed = false, 
  isLoading = false 
}: { 
  title: string;
  imageSrc: string | null;
  isProcessed?: boolean;
  isLoading?: boolean;
}) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
      <div className="relative aspect-square rounded-lg overflow-hidden shadow-inner bg-gray-100 dark:bg-gray-700">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : isProcessed ? (
          isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
              No processed image yet
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

function detectEdges(data: Uint8ClampedArray, width: number, height: number): Uint8Array {
  const grayscale = new Uint8Array(width * height);
  for (let i = 0; i < data.length; i += 4) {
    grayscale[i / 4] = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
  }

  const edges = new Uint8Array(width * height);
  const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let pixelX = 0, pixelY = 0;
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          const pixel = grayscale[(y + j) * width + (x + i)];
          pixelX += pixel * sobelX[(j + 1) * 3 + (i + 1)];
          pixelY += pixel * sobelY[(j + 1) * 3 + (i + 1)];
        }
      }
      edges[y * width + x] = Math.min(255, Math.sqrt(pixelX * pixelX + pixelY * pixelY));
    }
  }
  return edges;
}

function colorBasedSegmentation(data: Uint8ClampedArray, width: number, height: number): Uint8Array {
  const mask = new Uint8Array(width * height);
  const samples = sampleBackgroundColors(data, width, height);
  const threshold = 30; // Adjust this value to fine-tune segmentation

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    let isForeground = true;

    for (const sample of samples) {
      const dr = r - sample[0];
      const dg = g - sample[1];
      const db = b - sample[2];
      const distance = Math.sqrt(dr * dr + dg * dg + db * db);

      if (distance < threshold) {
        isForeground = false;
        break;
      }
    }

    mask[i / 4] = isForeground ? 255 : 0;
  }

  return mask;
}

function sampleBackgroundColors(data: Uint8ClampedArray, width: number, height: number): number[][] {
  const samples: number[][] = [];
  const positions = [
    [0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1],
    [Math.floor(width / 2), 0], [0, Math.floor(height / 2)],
    [width - 1, Math.floor(height / 2)], [Math.floor(width / 2), height - 1]
  ];

  for (const [x, y] of positions) {
    const idx = (y * width + x) * 4;
    samples.push([data[idx], data[idx + 1], data[idx + 2]]);
  }

  return samples;
}

function combineMasks(edgeData: Uint8Array, foregroundMask: Uint8Array, width: number, height: number): Uint8Array {
  const combinedMask = new Uint8Array(width * height);
  for (let i = 0; i < combinedMask.length; i++) {
    combinedMask[i] = (edgeData[i] > 30 || foregroundMask[i] === 255) ? 255 : 0;
  }
  return combinedMask;
}

function applyMask(data: Uint8ClampedArray, mask: Uint8Array): void {
  for (let i = 0; i < data.length; i += 4) {
    data[i + 3] = mask[i / 4];
  }
}

function refineEdges(data: Uint8ClampedArray, width: number, height: number): void {
  const tempData = new Uint8ClampedArray(data);
  const radius = 2;

  for (let y = radius; y < height - radius; y++) {
    for (let x = radius; x < width - radius; x++) {
      const i = (y * width + x) * 4;
      if (data[i + 3] === 0) continue;

      let count = 0;
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const ni = ((y + dy) * width + (x + dx)) * 4;
          if (data[ni + 3] > 0) count++;
        }
      }

      if (count < (radius * 2 + 1) * (radius * 2 + 1) * 0.7) {
        tempData[i + 3] = 0;
      }
    }
  }

  for (let i = 0; i < data.length; i++) {
    data[i] = tempData[i];
  }
}
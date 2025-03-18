"use client"

import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent } from "@/components/ui/card"
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
    <Card>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-medium text-sm">{title}</h3>
          <div className="overflow-hidden rounded-md border">
            <AspectRatio ratio={1 / 1} className="bg-muted">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority={!isProcessed}
                />
              ) : isProcessed ? (
                isLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <Skeleton className="h-32 w-32 rounded-full" />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    No processed image yet
                  </div>
                )
              ) : null}
            </AspectRatio>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 
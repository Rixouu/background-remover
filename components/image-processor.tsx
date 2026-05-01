"use client"

import { useMemo, useRef, useState } from "react"
import {
  DownloadIcon,
  ReloadIcon,
  CopyIcon,
  ImageIcon,
  GridIcon,
  ClockIcon,
  GearIcon,
} from "@radix-ui/react-icons"
import { toast } from "sonner"
import {
  applyMask,
  colorBasedSegmentation,
  combineMasks,
  detectEdges,
  refineEdges,
} from "@/lib/image-processing"

export function ImageProcessor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [mobileTab, setMobileTab] = useState<
    "remove" | "batch" | "history" | "settings"
  >("remove")

  const [backgroundMode, setBackgroundMode] = useState<
    "transparent" | "color" | "image"
  >("transparent")
  const [selectedColor, setSelectedColor] = useState("#ffffff")
  const [hairDetail, setHairDetail] = useState(true)
  const [shadowRemoval, setShadowRemoval] = useState(false)
  const [edgeSmoothing, setEdgeSmoothing] = useState(70)
  const [featherRadius, setFeatherRadius] = useState(2)
  const [exportFormat, setExportFormat] = useState<"png" | "webp" | "svg">(
    "png",
  )
  const [keepOriginalResolution, setKeepOriginalResolution] = useState(true)

  const quickColors = useMemo(
    () => [
      { value: "#ffffff", kind: "solid" as const },
      { value: "#0A1E2A", kind: "solid" as const },
      { value: "#E8F4FC", kind: "solid" as const },
      { value: "#0EA5E9", kind: "solid" as const },
      { value: "#F0F0F0", kind: "solid" as const },
      { value: "linear-gradient(135deg,#BAE6FD,#0EA5E9)", kind: "gradient" as const },
    ],
    [],
  )

  const openFilePicker = () => fileInputRef.current?.click()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const maxBytes = 20 * 1024 * 1024
    if (file.size > maxBytes) {
      toast.error("Please upload an image smaller than 20MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setOriginalImage(dataUrl)
      setProcessedImage(null)
      void handleRemoveBackground(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveBackground = async (source?: string) => {
    const inputImage = source ?? originalImage
    if (!inputImage) return

    setIsLoading(true)
    setProgress(0)

    try {
      const img = document.createElement('img')
      img.src = inputImage
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
      setProcessedImage(canvas.toDataURL("image/png"))
      setProgress(100)

      toast.success("Background removed!")
    } catch (error) {
      console.error('Error processing image:', error)
      toast.error("Failed to process image")
    } finally {
      setIsLoading(false)
    }
  }

  const exportLabel = exportFormat.toUpperCase()
  const exportFilename = `processed_image.${exportFormat}`

  const getScaledSize = (width: number, height: number) => {
    if (keepOriginalResolution) return { width, height }
    const maxSide = 2048
    const maxCurrent = Math.max(width, height)
    if (maxCurrent <= maxSide) return { width, height }
    const scale = maxSide / maxCurrent
    return {
      width: Math.max(1, Math.round(width * scale)),
      height: Math.max(1, Math.round(height * scale)),
    }
  }

  const loadImageFromDataUrl = (dataUrl: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error("Failed to load image"))
      img.src = dataUrl
    })

  const canvasToBlob = (canvas: HTMLCanvasElement, type: string, quality?: number) =>
    new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) reject(new Error("Failed to create blob"))
          else resolve(blob)
        },
        type,
        quality,
      )
    })

  const buildSvgWithEmbeddedPng = (pngDataUrl: string, width: number, height: number) => {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>` +
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
      `<image href="${pngDataUrl}" width="${width}" height="${height}" />` +
      `</svg>`
    return new Blob([svg], { type: "image/svg+xml;charset=utf-8" })
  }

  const getExportBlob = async () => {
    if (!processedImage) throw new Error("No processed image")
    const img = await loadImageFromDataUrl(processedImage)
    const baseWidth = img.naturalWidth || img.width
    const baseHeight = img.naturalHeight || img.height
    const { width, height } = getScaledSize(baseWidth, baseHeight)

    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Unable to get canvas context")
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(img, 0, 0, width, height)

    if (exportFormat === "png") return canvasToBlob(canvas, "image/png")
    if (exportFormat === "webp") return canvasToBlob(canvas, "image/webp", 0.95)

    const pngForSvg = canvas.toDataURL("image/png")
    return buildSvgWithEmbeddedPng(pngForSvg, width, height)
  }

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleDownload = async () => {
    if (!processedImage) return
    try {
      const blob = await getExportBlob()
      downloadBlob(blob, exportFilename)
      toast.success(`Downloaded ${exportLabel}`)
    } catch {
      toast.error("Download failed")
    }
  }

  const handleCopy = async () => {
    if (!processedImage) return

    try {
      const ClipboardItemCtor = (window as unknown as { ClipboardItem?: typeof ClipboardItem })
        .ClipboardItem
      if (exportFormat === "svg") {
        const blob = await getExportBlob()
        const text = await blob.text()
        await navigator.clipboard.writeText(text)
        toast.success("Copied")
        return
      }

      const blob = await getExportBlob()
      if (!ClipboardItemCtor) {
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(String(reader.result))
          reader.onerror = () => reject(new Error("Failed to read blob"))
          reader.readAsDataURL(blob)
        })
        await navigator.clipboard.writeText(dataUrl)
        toast.success("Copied")
        return
      }
      const item = new ClipboardItemCtor({ [blob.type]: blob })
      await navigator.clipboard.write([item])
      toast.success("Copied")
    } catch {
      toast.error("Copy failed")
    }
  }

  const handleReset = () => {
    setOriginalImage(null)
    setProcessedImage(null)
    setProgress(0)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="min-h-screen">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        aria-label="Upload image"
      />

      <div className="hidden md:flex min-h-screen flex-col bg-[#EEF4F8]">
        <div className="bg-white border-b border-[#E0EAF0]">
          <div className="mx-auto w-full max-w-[1200px] flex items-center justify-between px-6 lg:px-10 py-3">
            <div className="flex items-center gap-2.5">
              <div className="h-[30px] w-[30px] rounded-[9px] bg-[linear-gradient(135deg,#29B6F6,#0288D1)] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-none stroke-white stroke-[2.2]">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
              </div>
              <span className="text-[14px] font-semibold text-[#0A1E2A] tracking-[-0.2px]">
                Background Remover
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="text-[12px] text-[#6A90A8] px-2.5 py-1.5 rounded-[7px] hover:bg-[#F0F6FA]"
                onClick={openFilePicker}
                type="button"
              >
                Upload
              </button>
              <button
                className="text-[12px] text-[#6A90A8] px-2.5 py-1.5 rounded-[7px] hover:bg-[#F0F6FA] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleReset}
                disabled={!originalImage}
                type="button"
              >
                Reset
              </button>
              <button
                className="text-[12px] font-medium px-3.5 py-1.5 rounded-[8px] bg-[#0EA5E9] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => void handleDownload()}
                disabled={!processedImage}
                type="button"
              >
                Download {exportLabel}
              </button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-[#D8EAF4] bg-[linear-gradient(135deg,#E8F4FC_0%,#F0F8FF_50%,#E4F0F8_100%)]">
          <div className="absolute left-1/2 top-[-120px] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(14,165,233,0.07)_0%,transparent_70%)]" />
          <div className="mx-auto w-full max-w-[1200px] relative text-center px-6 lg:px-10 pt-14 pb-12">
            <div className="inline-flex items-center gap-1.5 bg-white border border-[#BAE6FD] rounded-[20px] px-3 py-1 mb-5 shadow-[0_1px_4px_rgba(14,165,233,0.08)]">
              <svg viewBox="0 0 24 24" className="h-[11px] w-[11px] fill-none stroke-[#0EA5E9] stroke-[2.5]">
                <polyline points="20,6 9,17 4,12" />
              </svg>
              <span className="text-[11px] font-medium text-[#0284C7] tracking-[0.02em]">
                No watermarks · No sign-up · 100% private
              </span>
            </div>
            <div className="text-[42px] font-semibold text-[#0A1E2A] tracking-[-1.2px] leading-[1.1] mb-3.5">
              Remove backgrounds
              <br />
              <span className="text-[#0EA5E9]">instantly.</span>
            </div>
            <div className="text-[15px] text-[#5A80A0] leading-[1.6] max-w-[480px] mx-auto mb-7">
              Professional-grade AI background removal that runs entirely in your
              browser. Your images never leave your device.
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <div className="flex items-center gap-1.5 text-[12px] text-[#6A9AB8] bg-white border border-[#D0E8F4] rounded-[20px] px-3 py-1.5">
                <svg viewBox="0 0 24 24" className="h-[11px] w-[11px] fill-none stroke-[#0EA5E9] stroke-[2.2]">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Privacy first
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-[#6A9AB8] bg-white border border-[#D0E8F4] rounded-[20px] px-3 py-1.5">
                <svg viewBox="0 0 24 24" className="h-[11px] w-[11px] fill-none stroke-[#0EA5E9] stroke-[2.2]">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                </svg>
                HD export
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-[#6A9AB8] bg-white border border-[#D0E8F4] rounded-[20px] px-3 py-1.5">
                <svg viewBox="0 0 24 24" className="h-[11px] w-[11px] fill-none stroke-[#0EA5E9] stroke-[2.2]">
                  <polyline points="13,2 13,9 20,9" />
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                Instant results
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-[#6A9AB8] bg-white border border-[#D0E8F4] rounded-[20px] px-3 py-1.5">
                <svg viewBox="0 0 24 24" className="h-[11px] w-[11px] fill-none stroke-[#0EA5E9] stroke-[2.2]">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                Under 5 seconds
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0">
          <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-10">
            <div className="grid grid-cols-[minmax(0,1fr)_300px] flex-1 min-h-0 overflow-hidden max-h-[calc(100vh-220px)] rounded-[18px] my-6 bg-white border border-[#D8EAF4]">
          <div className="p-7 px-8 overflow-y-auto bg-[#EEF4F8] flex flex-col gap-4">
            <div className="bg-white border border-[#D8EAF4] rounded-[18px] overflow-hidden shadow-[0_1px_6px_rgba(14,165,233,0.05)]">
              <div
                className="p-12 px-8 text-center border-2 border-dashed border-[#BAE6FD] m-3 rounded-[12px] bg-[#F8FBFF] cursor-pointer transition-colors hover:bg-[#F0F7FF] hover:border-[#7DD3FC]"
                onClick={openFilePicker}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openFilePicker()
                }}
              >
                <div className="h-14 w-14 rounded-[16px] bg-[linear-gradient(135deg,#E0F2FE,#BAE6FD)] flex items-center justify-center mx-auto mb-4 border border-[#BAE6FD]">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-[#0EA5E9] stroke-[1.8]">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17,8 12,3 7,8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div className="text-[16px] font-semibold text-[#0A1E2A] tracking-[-0.2px] mb-1">
                  Upload your image
                </div>
                <div className="text-[13px] text-[#7AA0B8] leading-[1.5] mb-4">
                  Drag & drop here or click to browse.
                  <br />
                  JPG, PNG, WEBP up to 20 MB.
                </div>
                <div className="flex justify-center gap-1.5 mb-4">
                  <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-[5px] bg-[#EFF8FF] text-[#0284C7] border border-[#BAE6FD]">
                    JPG
                  </span>
                  <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-[5px] bg-[#EFF8FF] text-[#0284C7] border border-[#BAE6FD]">
                    PNG
                  </span>
                  <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-[5px] bg-[#EFF8FF] text-[#0284C7] border border-[#BAE6FD]">
                    WEBP
                  </span>
                  <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-[5px] bg-[#EFF8FF] text-[#0284C7] border border-[#BAE6FD]">
                    HEIC
                  </span>
                </div>
                <button className="inline-flex items-center gap-2 bg-[#0EA5E9] text-white border-none rounded-[10px] px-5 py-3 text-[13px] font-medium">
                  <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] fill-none stroke-white stroke-[2.2]">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17,8 12,3 7,8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  {originalImage ? "Change image" : "Select file"}
                </button>
                {originalImage ? (
                  <div className="mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleReset()
                      }}
                      className="inline-flex items-center gap-2 text-[11px] font-medium text-[#6A90A8] hover:text-[#0A1E2A]"
                    >
                      <ReloadIcon />
                      Reset
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="bg-white border border-[#D8EAF4] rounded-[18px] overflow-hidden shadow-[0_1px_6px_rgba(14,165,233,0.05)]">
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#EAF4FA]">
                <span className="text-[13px] font-medium text-[#2A4A60]">
                  Result preview
                </span>
                <div className="flex gap-1.5">
                  <button
                    className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-[7px] border border-[#D0E8F4] bg-[#F8FBFF] text-[#4A7090] disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCopy}
                    disabled={!processedImage}
                    type="button"
                  >
                    <CopyIcon />
                    Copy
                  </button>
                  <button
                    className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-[7px] border border-[#0EA5E9] bg-[#0EA5E9] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => void handleDownload()}
                    disabled={!processedImage}
                    type="button"
                  >
                    <DownloadIcon />
                    Download {exportLabel}
                  </button>
                </div>
              </div>
              <div
                className="h-[200px] m-3 rounded-[10px] border border-[#E0EAF0] overflow-hidden flex items-center justify-center"
                style={{
                  backgroundImage:
                    "repeating-conic-gradient(#F0F6FA 0% 25%,#E6EFF5 0% 50%)",
                  backgroundSize: "20px 20px",
                }}
              >
                {processedImage ? (
                  <img
                    src={processedImage}
                    alt="Processed image"
                    className="h-full w-full object-contain p-4"
                  />
                ) : isLoading ? (
                  <div className="w-full px-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="h-8 w-8 rounded-full border-2 border-[#0EA5E9]/20 border-t-[#0EA5E9] animate-spin" />
                      <div className="text-[12px] text-[#5A80A0]">
                        Processing… {progress}%
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-[#E8F2F8] overflow-hidden">
                      <div
                        className="h-full bg-[#0EA5E9]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-[12px] text-[#9AB8C8] text-center leading-[1.6]">
                    Result will appear here
                    <br />
                    after processing
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-white border border-[#D8EAF4] rounded-[14px] p-4 shadow-[0_1px_4px_rgba(14,165,233,0.04)]">
                <div className="h-[30px] w-[30px] rounded-[8px] bg-[#EFF8FF] border border-[#BAE6FD] flex items-center justify-center mb-2.5">
                  <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] fill-none stroke-[#0EA5E9] stroke-[2]">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div className="text-[12px] font-semibold text-[#0A1E2A] mb-1">
                  Privacy first
                </div>
                <div className="text-[11px] text-[#7AA0B8] leading-[1.5]">
                  Processed entirely in your browser. Images never leave your device.
                </div>
              </div>
              <div className="bg-white border border-[#D8EAF4] rounded-[14px] p-4 shadow-[0_1px_4px_rgba(14,165,233,0.04)]">
                <div className="h-[30px] w-[30px] rounded-[8px] bg-[#EFF8FF] border border-[#BAE6FD] flex items-center justify-center mb-2.5">
                  <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] fill-none stroke-[#0EA5E9] stroke-[2]">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <polyline points="13,2 13,9 20,9" />
                  </svg>
                </div>
                <div className="text-[12px] font-semibold text-[#0A1E2A] mb-1">
                  HD export
                </div>
                <div className="text-[11px] text-[#7AA0B8] leading-[1.5]">
                  Full-resolution PNG output with perfect alpha transparency.
                </div>
              </div>
              <div className="bg-white border border-[#D8EAF4] rounded-[14px] p-4 shadow-[0_1px_4px_rgba(14,165,233,0.04)]">
                <div className="h-[30px] w-[30px] rounded-[8px] bg-[#EFF8FF] border border-[#BAE6FD] flex items-center justify-center mb-2.5">
                  <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] fill-none stroke-[#0EA5E9] stroke-[2]">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>
                <div className="text-[12px] font-semibold text-[#0A1E2A] mb-1">
                  Under 5 seconds
                </div>
                <div className="text-[11px] text-[#7AA0B8] leading-[1.5]">
                  On-device processing delivers results with no server round-trip.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-l border-[#D8EAF4] overflow-y-auto flex flex-col">
            <div className="border-b border-[#EAF4FA]">
              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="text-[12px] font-medium text-[#2A4A60]">
                  Background
                </span>
                <svg viewBox="0 0 12 12" className="h-[11px] w-[11px] fill-none stroke-[#9AB8CC] stroke-[2.5]">
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </div>
              <div className="px-4 pb-3.5">
                <div className="text-[9px] font-medium text-[#9AB8CC] tracking-[0.09em] uppercase mb-2 mt-2">
                  Replace with
                </div>
                <div className="flex gap-1.5">
                  <button
                    className={`flex-1 text-center py-2 rounded-[8px] text-[11px] font-medium border ${
                      backgroundMode === "transparent"
                        ? "bg-[#EFF8FF] border-[#7DD3FC] text-[#0284C7]"
                        : "bg-[#F8FBFF] border-[#D8EAF4] text-[#7AA0B8]"
                    }`}
                    onClick={() => setBackgroundMode("transparent")}
                    type="button"
                  >
                    Transparent
                  </button>
                  <button
                    className={`flex-1 text-center py-2 rounded-[8px] text-[11px] font-medium border ${
                      backgroundMode === "color"
                        ? "bg-[#EFF8FF] border-[#7DD3FC] text-[#0284C7]"
                        : "bg-[#F8FBFF] border-[#D8EAF4] text-[#7AA0B8]"
                    }`}
                    onClick={() => setBackgroundMode("color")}
                    type="button"
                  >
                    Color
                  </button>
                  <button
                    className={`flex-1 text-center py-2 rounded-[8px] text-[11px] font-medium border ${
                      backgroundMode === "image"
                        ? "bg-[#EFF8FF] border-[#7DD3FC] text-[#0284C7]"
                        : "bg-[#F8FBFF] border-[#D8EAF4] text-[#7AA0B8]"
                    }`}
                    onClick={() => setBackgroundMode("image")}
                    type="button"
                  >
                    Image
                  </button>
                </div>

                <div className="text-[9px] font-medium text-[#9AB8CC] tracking-[0.09em] uppercase mb-2 mt-3">
                  Solid colors
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {quickColors.map((c) => {
                    const isActive = c.kind === "solid" && selectedColor === c.value
                    return (
                      <button
                        key={`${c.kind}:${c.value}`}
                        type="button"
                        onClick={() => {
                          if (c.kind === "solid") {
                            setSelectedColor(c.value)
                            setBackgroundMode("color")
                          }
                        }}
                        aria-label="Select background color"
                        className={`h-7 w-7 rounded-[7px] border-[1.5px] ${
                          isActive
                            ? "border-[#0EA5E9] shadow-[0_0_0_2px_rgba(14,165,233,0.2)]"
                            : "border-transparent"
                        }`}
                        style={{
                          background:
                            c.kind === "solid" ? c.value : (c.value as string),
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="border-b border-[#EAF4FA]">
              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="text-[12px] font-medium text-[#2A4A60]">
                  Refinement
                </span>
                <svg viewBox="0 0 12 12" className="h-[11px] w-[11px] fill-none stroke-[#9AB8CC] stroke-[2.5]">
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </div>
              <div className="px-4 pb-3.5">
                <div className="text-[9px] font-medium text-[#9AB8CC] tracking-[0.09em] uppercase mb-2 mt-2">
                  Edge smoothing
                </div>
                <div className="mt-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-[#2A4A60] font-medium">
                      Smooth
                    </span>
                    <span className="text-[10px] text-[#9AB8CC]">
                      {edgeSmoothing}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={edgeSmoothing}
                    onChange={(e) => setEdgeSmoothing(Number(e.target.value))}
                    className="w-full accent-[#0EA5E9]"
                    aria-label="Edge smoothing"
                  />
                </div>

                <div className="text-[9px] font-medium text-[#9AB8CC] tracking-[0.09em] uppercase mb-2 mt-3">
                  Feather radius
                </div>
                <div className="mt-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-[#2A4A60] font-medium">
                      Feather
                    </span>
                    <span className="text-[10px] text-[#9AB8CC]">
                      {featherRadius}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={featherRadius}
                    onChange={(e) => setFeatherRadius(Number(e.target.value))}
                    className="w-full accent-[#0EA5E9]"
                    aria-label="Feather radius"
                  />
                </div>

                <div className="flex items-center justify-between py-2 mt-2">
                  <div>
                    <div className="text-[12px] font-medium text-[#2A4A60]">
                      Hair & fur detail
                    </div>
                    <div className="text-[10px] text-[#9AB8CC]">
                      Enhanced edge detection
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHairDetail((v) => !v)}
                    className={`h-[18px] w-[32px] rounded-[9px] relative ${
                      hairDetail ? "bg-[#0EA5E9]" : "bg-[#D8EAF4]"
                    }`}
                    aria-label="Toggle hair & fur detail"
                  >
                    <span
                      className={`absolute top-[3px] h-[12px] w-[12px] rounded-full bg-white transition-all ${
                        hairDetail ? "left-[17px]" : "left-[3px]"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-[12px] font-medium text-[#2A4A60]">
                      Shadow removal
                    </div>
                    <div className="text-[10px] text-[#9AB8CC]">
                      Removes soft shadows
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShadowRemoval((v) => !v)}
                    className={`h-[18px] w-[32px] rounded-[9px] relative ${
                      shadowRemoval ? "bg-[#0EA5E9]" : "bg-[#D8EAF4]"
                    }`}
                    aria-label="Toggle shadow removal"
                  >
                    <span
                      className={`absolute top-[3px] h-[12px] w-[12px] rounded-full bg-white transition-all ${
                        shadowRemoval ? "left-[17px]" : "left-[3px]"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-b border-[#EAF4FA]">
              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="text-[12px] font-medium text-[#2A4A60]">
                  Export settings
                </span>
                <svg viewBox="0 0 12 12" className="h-[11px] w-[11px] fill-none stroke-[#9AB8CC] stroke-[2.5]">
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </div>
              <div className="px-4 pb-3.5">
                <div className="text-[9px] font-medium text-[#9AB8CC] tracking-[0.09em] uppercase mb-2 mt-2">
                  Format
                </div>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setExportFormat("png")}
                    className={`flex-1 text-center py-2 rounded-[8px] text-[11px] font-medium border ${
                      exportFormat === "png"
                        ? "bg-[#EFF8FF] border-[#7DD3FC] text-[#0284C7]"
                        : "bg-[#F8FBFF] border-[#D8EAF4] text-[#7AA0B8]"
                    }`}
                  >
                    PNG
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportFormat("webp")}
                    className={`flex-1 text-center py-2 rounded-[8px] text-[11px] font-medium border ${
                      exportFormat === "webp"
                        ? "bg-[#EFF8FF] border-[#7DD3FC] text-[#0284C7]"
                        : "bg-[#F8FBFF] border-[#D8EAF4] text-[#7AA0B8]"
                    }`}
                  >
                    WEBP
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportFormat("svg")}
                    className={`flex-1 text-center py-2 rounded-[8px] text-[11px] font-medium border ${
                      exportFormat === "svg"
                        ? "bg-[#EFF8FF] border-[#7DD3FC] text-[#0284C7]"
                        : "bg-[#F8FBFF] border-[#D8EAF4] text-[#7AA0B8]"
                    }`}
                  >
                    SVG
                  </button>
                </div>

                <div className="flex items-center justify-between py-2 mt-2">
                  <div>
                    <div className="text-[12px] font-medium text-[#2A4A60]">
                      Original resolution
                    </div>
                    <div className="text-[10px] text-[#9AB8CC]">
                      Keeps full pixel dimensions
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setKeepOriginalResolution((v) => !v)}
                    className={`h-[18px] w-[32px] rounded-[9px] relative ${
                      keepOriginalResolution ? "bg-[#0EA5E9]" : "bg-[#D8EAF4]"
                    }`}
                    aria-label="Toggle original resolution"
                  >
                    <span
                      className={`absolute top-[3px] h-[12px] w-[12px] rounded-full bg-white transition-all ${
                        keepOriginalResolution ? "left-[17px]" : "left-[3px]"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 mt-auto">
              <button
                className="w-full bg-[#0EA5E9] rounded-[11px] py-3 text-white font-semibold text-[13px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => void handleDownload()}
                disabled={!processedImage}
                type="button"
              >
                <DownloadIcon />
                Download {exportLabel}
              </button>
              <button
                className="w-full mt-2 bg-[#F0F7FB] border border-[#C8E0EE] rounded-[11px] py-2.5 text-[#3A6A88] font-medium text-[12px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleCopy}
                disabled={!processedImage}
                type="button"
              >
                <CopyIcon />
                Copy to clipboard
              </button>
            </div>
          </div>
        </div>
          </div>
        </div>

        <div className="text-center py-3.5 text-[10px] text-[#A0B8C8] tracking-[0.08em] uppercase bg-[#EEF4F8]">
          Built with Next.js & AI &nbsp;·&nbsp; © {new Date().getFullYear()}
        </div>
      </div>

      <div className="md:hidden min-h-screen bg-[#DDEEF8]">
        <div className="mx-auto w-full max-w-[420px] bg-[#F4F9FD] min-h-screen flex flex-col relative">
          <div className="flex items-center justify-between px-[18px] pt-[9px] pb-3 bg-[#F4F9FD] border-b border-[#D8EAF4]">
            <div className="flex items-center gap-2">
              <div className="h-[28px] w-[28px] rounded-[8px] bg-[linear-gradient(135deg,#29B6F6,#0288D1)] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-[13px] w-[13px] fill-none stroke-white stroke-[2.3]">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
              </div>
              <span className="text-[13px] font-semibold text-[#0A1E2A] tracking-[-0.2px]">
                BG Remover
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="text-[11px] font-medium px-3 py-1 rounded-[7px] bg-[#EAF4FC] border border-[#BAE6FD] text-[#0284C7] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleReset}
                disabled={!originalImage}
                type="button"
              >
                Reset
              </button>
              <button
                className="text-[11px] font-medium px-3 py-1 rounded-[7px] bg-[#0EA5E9] text-white"
                onClick={openFilePicker}
                type="button"
              >
                Upload
              </button>
            </div>
          </div>

          <div className="pb-[calc(96px+env(safe-area-inset-bottom))]">
            {mobileTab === "remove" ? (
              <>
                <div className="relative overflow-hidden text-center px-[18px] pt-[22px] pb-5 bg-[linear-gradient(145deg,#E0F2FE,#EFF8FF_60%,#E4F0FA_100%)] border-b border-[#C8E4F4]">
                  <div className="absolute left-1/2 top-[-60px] h-[200px] w-[240px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(14,165,233,0.1)_0%,transparent_70%)]" />
                  <div className="relative">
                    <div className="inline-flex items-center gap-1.5 bg-white border border-[#BAE6FD] rounded-[20px] px-2.5 py-1 mb-3 shadow-[0_1px_4px_rgba(14,165,233,0.06)]">
                      <svg viewBox="0 0 24 24" className="h-[10px] w-[10px] fill-none stroke-[#0EA5E9] stroke-[2.5]">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      <span className="text-[10px] font-medium text-[#0284C7]">
                        No watermarks · No sign-up
                      </span>
                    </div>
                    <div className="text-[24px] font-semibold text-[#0A1E2A] tracking-[-0.8px] leading-[1.15] mb-2">
                      Remove
                      <br />
                      backgrounds <span className="text-[#0EA5E9]">instantly.</span>
                    </div>
                    <div className="text-[12px] text-[#5A80A0] leading-[1.6] mb-3.5">
                      AI background removal in your browser. Your images stay on your device.
                    </div>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] text-[#5A80A0] bg-white border border-[#C8E4F4] rounded-[20px] px-2.5 py-1">
                        <svg viewBox="0 0 24 24" className="h-[10px] w-[10px] fill-none stroke-[#0EA5E9] stroke-[2.2]">
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Private
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#5A80A0] bg-white border border-[#C8E4F4] rounded-[20px] px-2.5 py-1">
                        <svg viewBox="0 0 24 24" className="h-[10px] w-[10px] fill-none stroke-[#0EA5E9] stroke-[2.2]">
                          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                        </svg>
                        HD PNG
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#5A80A0] bg-white border border-[#C8E4F4] rounded-[20px] px-2.5 py-1">
                        <svg viewBox="0 0 24 24" className="h-[10px] w-[10px] fill-none stroke-[#0EA5E9] stroke-[2.2]">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v4l3 3" />
                        </svg>
                        Under 5s
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#EEF5FB] flex flex-col gap-2.5">
                  <div className="bg-white border border-[#C8E0F0] rounded-[16px] overflow-hidden shadow-[0_1px_6px_rgba(14,165,233,0.05)]">
                    <div
                      className="m-2.5 border-2 border-dashed border-[#BAE6FD] rounded-[11px] px-4 py-7 text-center bg-[#F8FBFF]"
                      onClick={openFilePicker}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") openFilePicker()
                      }}
                    >
                      <div className="h-12 w-12 rounded-[13px] bg-[linear-gradient(135deg,#E0F2FE,#BAE6FD)] border border-[#BAE6FD] flex items-center justify-center mx-auto mb-3">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-[#0EA5E9] stroke-[1.8]">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17,8 12,3 7,8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </div>
                      <div className="text-[15px] font-semibold text-[#0A1E2A] mb-1 tracking-[-0.2px]">
                        Upload your image
                      </div>
                      <div className="text-[11px] text-[#7AA0B8] mb-3 leading-[1.5]">
                        Tap to browse or drop any image here.
                      </div>
                      <div className="flex justify-center gap-1.5 mb-3.5">
                        {["JPG", "PNG", "WEBP", "HEIC"].map((f) => (
                          <span
                            key={f}
                            className="text-[9px] font-medium px-2 py-0.5 rounded-[5px] bg-[#EFF8FF] text-[#0284C7] border border-[#BAE6FD]"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                      <button className="inline-flex items-center gap-1.5 bg-[#0EA5E9] text-white border-none rounded-[10px] px-5 py-3 text-[13px] font-medium">
                        <svg viewBox="0 0 24 24" className="h-[13px] w-[13px] fill-none stroke-white stroke-[2.2]">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17,8 12,3 7,8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        {originalImage ? "Change file" : "Select file"}
                      </button>
                      {originalImage ? (
                        <div className="mt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleReset()
                            }}
                            className="inline-flex items-center gap-1.5 text-[11px] text-[#6A90A8]"
                          >
                            <ReloadIcon />
                            Reset
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="bg-white border border-[#C8E0F0] rounded-[16px] overflow-hidden shadow-[0_1px_6px_rgba(14,165,233,0.05)]">
                    <div className="flex items-center justify-between px-3.5 py-3 border-b border-[#E8F2FA]">
                      <span className="text-[12px] font-medium text-[#2A4A60]">
                        Result preview
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-[6px] border border-[#C8E0F0] bg-[#F4F9FD] text-[#4A7090] disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={handleCopy}
                          disabled={!processedImage}
                          type="button"
                        >
                          <CopyIcon />
                          Copy
                        </button>
                        <button
                          className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-[6px] border border-[#0EA5E9] bg-[#0EA5E9] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => void handleDownload()}
                          disabled={!processedImage}
                          type="button"
                        >
                          <DownloadIcon />
                          Save {exportLabel}
                        </button>
                      </div>
                    </div>
                    <div
                      className="h-[160px] m-2.5 rounded-[9px] border border-[#D8EAF4] overflow-hidden flex items-center justify-center"
                      style={{
                        backgroundImage:
                          "repeating-conic-gradient(#EEF5FB 0% 25%,#E4EFF7 0% 50%)",
                        backgroundSize: "16px 16px",
                      }}
                    >
                      {processedImage ? (
                        <img
                          src={processedImage}
                          alt="Processed image"
                          className="h-full w-full object-contain p-4"
                        />
                      ) : isLoading ? (
                        <div className="w-full px-5">
                          <div className="flex items-center justify-center gap-2.5 mb-3">
                            <div className="h-7 w-7 rounded-full border-2 border-[#0EA5E9]/20 border-t-[#0EA5E9] animate-spin" />
                            <div className="text-[11px] text-[#5A80A0]">
                              Processing… {progress}%
                            </div>
                          </div>
                          <div className="h-2 rounded-full bg-[#E8F2F8] overflow-hidden">
                            <div
                              className="h-full bg-[#0EA5E9]"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-[11px] text-[#9AB8CC] text-center leading-[1.5]">
                          Result will appear here
                          <br />
                          after processing
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white border border-[#C8E0F0] rounded-[16px] overflow-hidden shadow-[0_1px_6px_rgba(14,165,233,0.05)]">
                    <div className="flex items-center justify-between px-3.5 py-3 border-b border-[#E8F2FA]">
                      <span className="text-[12px] font-medium text-[#2A4A60]">
                        Background & refinement
                      </span>
                      <svg viewBox="0 0 12 12" className="h-[11px] w-[11px] fill-none stroke-[#9AB8CC] stroke-[2.5]">
                        <path d="M2 4l4 4 4-4" />
                      </svg>
                    </div>
                    <div className="px-3.5 pt-2.5 pb-3.5">
                      <div className="text-[9px] font-medium text-[#9AB8CC] tracking-[0.09em] uppercase mb-1.5">
                        Replace with
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => setBackgroundMode("transparent")}
                          className={`flex-1 text-center py-1.5 rounded-[7px] text-[11px] font-medium border ${
                            backgroundMode === "transparent"
                              ? "bg-[#EFF8FF] border-[#7DD3FC] text-[#0284C7]"
                              : "bg-[#F4F9FD] border-[#D0E8F4] text-[#7AA0B8]"
                          }`}
                        >
                          Transparent
                        </button>
                        <button
                          type="button"
                          onClick={() => setBackgroundMode("color")}
                          className={`flex-1 text-center py-1.5 rounded-[7px] text-[11px] font-medium border ${
                            backgroundMode === "color"
                              ? "bg-[#EFF8FF] border-[#7DD3FC] text-[#0284C7]"
                              : "bg-[#F4F9FD] border-[#D0E8F4] text-[#7AA0B8]"
                          }`}
                        >
                          Color
                        </button>
                        <button
                          type="button"
                          onClick={() => setBackgroundMode("image")}
                          className={`flex-1 text-center py-1.5 rounded-[7px] text-[11px] font-medium border ${
                            backgroundMode === "image"
                              ? "bg-[#EFF8FF] border-[#7DD3FC] text-[#0284C7]"
                              : "bg-[#F4F9FD] border-[#D0E8F4] text-[#7AA0B8]"
                          }`}
                        >
                          Image
                        </button>
                      </div>

                      <div className="text-[9px] font-medium text-[#9AB8CC] tracking-[0.09em] uppercase mb-1.5 mt-2">
                        Quick colors
                      </div>
                      <div className="flex gap-1.5">
                        {quickColors
                          .filter((c) => c.kind !== "gradient")
                          .slice(0, 5)
                          .map((c) => {
                            const isActive =
                              c.kind === "solid" && selectedColor === c.value
                            return (
                              <button
                                key={`${c.kind}:${c.value}`}
                                type="button"
                                onClick={() => {
                                  if (c.kind === "solid") {
                                    setSelectedColor(c.value)
                                    setBackgroundMode("color")
                                  }
                                }}
                                aria-label="Select background color"
                                className={`h-[26px] w-[26px] rounded-[7px] border-[1.5px] ${
                                  isActive
                                    ? "border-[#0EA5E9] shadow-[0_0_0_2px_rgba(14,165,233,0.18)]"
                                    : "border-transparent"
                                }`}
                                style={{ background: c.value }}
                              />
                            )
                          })}
                      </div>

                      <div className="text-[9px] font-medium text-[#9AB8CC] tracking-[0.09em] uppercase mb-1.5 mt-2.5">
                        Options
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-[#F0F7FC]">
                        <div>
                          <div className="text-[11px] font-medium text-[#2A4A60]">
                            Hair & fur detail
                          </div>
                          <div className="text-[10px] text-[#9AB8CC]">
                            Enhanced edge detection
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setHairDetail((v) => !v)}
                          className={`h-[17px] w-[30px] rounded-[9px] relative ${
                            hairDetail ? "bg-[#0EA5E9]" : "bg-[#D0E8F4]"
                          }`}
                          aria-label="Toggle hair & fur detail"
                        >
                          <span
                            className={`absolute top-[3px] h-[11px] w-[11px] rounded-full bg-white ${
                              hairDetail ? "left-[16px]" : "left-[3px]"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <div className="text-[11px] font-medium text-[#2A4A60]">
                            Shadow removal
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShadowRemoval((v) => !v)}
                          className={`h-[17px] w-[30px] rounded-[9px] relative ${
                            shadowRemoval ? "bg-[#0EA5E9]" : "bg-[#D0E8F4]"
                          }`}
                          aria-label="Toggle shadow removal"
                        >
                          <span
                            className={`absolute top-[3px] h-[11px] w-[11px] rounded-full bg-white ${
                              shadowRemoval ? "left-[16px]" : "left-[3px]"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white border border-[#C8E0F0] rounded-[13px] p-3 shadow-[0_1px_4px_rgba(14,165,233,0.04)]">
                      <div className="h-[26px] w-[26px] rounded-[7px] bg-[#EFF8FF] border border-[#BAE6FD] flex items-center justify-center mb-2">
                        <svg viewBox="0 0 24 24" className="h-3 w-3 fill-none stroke-[#0EA5E9] stroke-[2]">
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <div className="text-[11px] font-semibold text-[#0A1E2A] mb-0.5">
                        Privacy first
                      </div>
                      <div className="text-[10px] text-[#7AA0B8] leading-[1.5]">
                        Images never leave your device.
                      </div>
                    </div>
                    <div className="bg-white border border-[#C8E0F0] rounded-[13px] p-3 shadow-[0_1px_4px_rgba(14,165,233,0.04)]">
                      <div className="h-[26px] w-[26px] rounded-[7px] bg-[#EFF8FF] border border-[#BAE6FD] flex items-center justify-center mb-2">
                        <svg viewBox="0 0 24 24" className="h-3 w-3 fill-none stroke-[#0EA5E9] stroke-[2]">
                          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                        </svg>
                      </div>
                      <div className="text-[11px] font-semibold text-[#0A1E2A] mb-0.5">
                        HD export
                      </div>
                      <div className="text-[10px] text-[#7AA0B8] leading-[1.5]">
                        Full-res PNG with perfect alpha.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-3.5 py-3.5 bg-[#F4F9FD] border-t border-[#D8EAF4] flex flex-col gap-2">
                  <button
                    className="w-full bg-[#0EA5E9] rounded-[11px] py-3 text-white font-semibold text-[13px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => void handleDownload()}
                    disabled={!processedImage}
                    type="button"
                  >
                    <DownloadIcon />
                    Download {exportLabel}
                  </button>
                  <button
                    className="w-full bg-[#EAF4FC] border border-[#BAE6FD] rounded-[11px] py-2.5 text-[#0284C7] font-medium text-[12px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCopy}
                    disabled={!processedImage}
                    type="button"
                  >
                    <CopyIcon />
                    Copy to clipboard
                  </button>
                </div>
              </>
            ) : (
              <div className="p-3.5 bg-[#EEF5FB]">
                <div className="bg-white border border-[#C8E0F0] rounded-[16px] p-4 shadow-[0_1px_6px_rgba(14,165,233,0.05)]">
                  <div className="text-[14px] font-semibold text-[#0A1E2A] mb-1">
                    {mobileTab === "batch"
                      ? "Batch"
                      : mobileTab === "history"
                        ? "History"
                        : "Settings"}
                  </div>
                  <div className="text-[12px] text-[#7AA0B8] leading-[1.6]">
                    This section is ready for the page system in the bottom menu.
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="fixed left-0 right-0 bottom-0 bg-white border-t border-[#D0E8F4]">
            <div className="mx-auto w-full max-w-[420px] px-2 pt-2 pb-[calc(20px+env(safe-area-inset-bottom))]">
              <div className="flex">
                {(
                  [
                    { key: "remove", label: "Remove", icon: ImageIcon },
                    { key: "batch", label: "Batch", icon: GridIcon },
                    { key: "history", label: "History", icon: ClockIcon },
                    { key: "settings", label: "Settings", icon: GearIcon },
                  ] as const
                ).map((item) => {
                  const isOn = mobileTab === item.key
                  const Icon = item.icon
                  return (
                    <button
                      key={item.key}
                      className="flex-1 flex flex-col items-center gap-1 py-1.5"
                      onClick={() => setMobileTab(item.key)}
                      type="button"
                    >
                      <div
                        className={`h-[26px] w-[38px] rounded-[8px] flex items-center justify-center ${
                          isOn ? "bg-[#E0F2FE]" : "bg-transparent"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            isOn ? "text-[#0EA5E9]" : "text-[#A8C8D8]"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-[9px] ${
                          isOn
                            ? "text-[#0284C7] font-medium"
                            : "text-[#A8C8D8]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(",")
  if (parts.length < 2) return new Blob([], { type: "application/octet-stream" })
  const header = parts[0] ?? ""
  const base64 = parts[1] ?? ""
  const mimeMatch = header.match(/data:(.*?);base64/)
  const mime = mimeMatch?.[1] ?? "image/png"
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new Blob([bytes], { type: mime })
}

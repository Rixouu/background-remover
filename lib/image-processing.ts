export function detectEdges(
  data: Uint8ClampedArray,
  width: number,
  height: number,
): Uint8Array {
  const grayscale = new Uint8Array(width * height)
  for (let i = 0; i < data.length; i += 4) {
    grayscale[i / 4] = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
  }

  const edges = new Uint8Array(width * height)
  const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1]
  const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1]

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let pixelX = 0
      let pixelY = 0
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          const pixel = grayscale[(y + j) * width + (x + i)]
          pixelX += pixel * sobelX[(j + 1) * 3 + (i + 1)]
          pixelY += pixel * sobelY[(j + 1) * 3 + (i + 1)]
        }
      }
      edges[y * width + x] = Math.min(
        255,
        Math.sqrt(pixelX * pixelX + pixelY * pixelY),
      )
    }
  }
  return edges
}

export function colorBasedSegmentation(
  data: Uint8ClampedArray,
  width: number,
  height: number,
): Uint8Array {
  const mask = new Uint8Array(width * height)
  const samples = sampleBackgroundColors(data, width, height)
  const threshold = 30

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
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

function sampleBackgroundColors(
  data: Uint8ClampedArray,
  width: number,
  height: number,
): number[][] {
  const samples: number[][] = []
  for (let i = 0; i < width; i += width / 10) {
    const x = Math.floor(i)
    samples.push([data[x * 4], data[x * 4 + 1], data[x * 4 + 2]])
    const bottomIdx = (height - 1) * width * 4 + x * 4
    samples.push([data[bottomIdx], data[bottomIdx + 1], data[bottomIdx + 2]])
  }
  for (let i = 0; i < height; i += height / 10) {
    const y = Math.floor(i)
    const leftIdx = y * width * 4
    samples.push([data[leftIdx], data[leftIdx + 1], data[leftIdx + 2]])
    const rightIdx = y * width * 4 + (width - 1) * 4
    samples.push([data[rightIdx], data[rightIdx + 1], data[rightIdx + 2]])
  }
  return samples
}

export function combineMasks(
  edgeData: Uint8Array,
  foregroundMask: Uint8Array,
  width: number,
  height: number,
): Uint8Array {
  const combinedMask = new Uint8Array(width * height)
  for (let i = 0; i < width * height; i++) {
    combinedMask[i] = edgeData[i] > 30 || foregroundMask[i] > 0 ? 255 : 0
  }
  return combinedMask
}

export function applyMask(data: Uint8ClampedArray, mask: Uint8Array): void {
  for (let i = 0; i < mask.length; i++) {
    data[i * 4 + 3] = mask[i]
  }
}

export function refineEdges(
  data: Uint8ClampedArray,
  width: number,
  height: number,
): void {
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

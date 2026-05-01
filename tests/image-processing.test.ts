import { describe, expect, it } from "vitest"
import {
  applyMask,
  colorBasedSegmentation,
  combineMasks,
  detectEdges,
  refineEdges,
} from "@/lib/image-processing"

function toNumberArray(input: ArrayLike<number>): number[] {
  const out: number[] = []
  for (let i = 0; i < input.length; i++) out.push(input[i] as number)
  return out
}

describe("image-processing", () => {
  it("applyMask writes alpha channel from mask", () => {
    const data = new Uint8ClampedArray([
      0, 0, 0, 255, 10, 10, 10, 255,
      20, 20, 20, 255, 30, 30, 30, 255,
    ])
    const mask = new Uint8Array([0, 128, 255, 10])
    applyMask(data, mask)
    expect([data[3], data[7], data[11], data[15]]).toEqual([0, 128, 255, 10])
  })

  it("combineMasks prefers edges over background", () => {
    const edgeData = new Uint8Array([0, 31, 0, 0])
    const foreground = new Uint8Array([0, 0, 255, 0])
    const combined = combineMasks(edgeData, foreground, 2, 2)
    expect(toNumberArray(combined)).toEqual([0, 255, 255, 0])
  })

  it("detectEdges returns all zeros for a solid-color image", () => {
    const width = 3
    const height = 3
    const data = new Uint8ClampedArray(width * height * 4)
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 50
      data[i + 1] = 50
      data[i + 2] = 50
      data[i + 3] = 255
    }
    const edges = detectEdges(data, width, height)
    expect(toNumberArray(edges)).toEqual(new Array(width * height).fill(0))
  })

  it("colorBasedSegmentation marks a uniform background as background", () => {
    const width = 4
    const height = 4
    const data = new Uint8ClampedArray(width * height * 4)
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 200
      data[i + 1] = 200
      data[i + 2] = 200
      data[i + 3] = 255
    }
    const mask = colorBasedSegmentation(data, width, height)
    expect(mask.every((v) => v === 0)).toBe(true)
  })

  it("refineEdges snaps semi-transparent pixels based on neighbors", () => {
    const width = 3
    const height = 3
    const data = new Uint8ClampedArray(width * height * 4)
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 0
      data[i + 1] = 0
      data[i + 2] = 0
      data[i + 3] = 255
    }
    const center = (1 * width + 1) * 4
    data[center + 3] = 100
    refineEdges(data, width, height)
    expect(data[center + 3]).toBe(255)
  })
})

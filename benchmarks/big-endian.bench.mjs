import { bench, describe } from "vitest";
import decode from "../packages/big-endian/src/index.js";

/**
 * Generate synthetic pixel data for benchmarking.
 * Simulates real DICOM image data at various resolutions.
 */
function generatePixelData(size) {
  const buffer = new ArrayBuffer(size);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < size; i++) {
    view[i] = i & 0xff;
  }
  return view;
}

// Typical DICOM image sizes (in bytes)
const SMALL_IMAGE = 256 * 256 * 2; // 256x256 16-bit
const MEDIUM_IMAGE = 512 * 512 * 2; // 512x512 16-bit (standard CT/MR)
const LARGE_IMAGE = 1024 * 1024 * 2; // 1024x1024 16-bit

const smallData = generatePixelData(SMALL_IMAGE);
const mediumData = generatePixelData(MEDIUM_IMAGE);
const largeData = generatePixelData(LARGE_IMAGE);
const small8bit = generatePixelData(256 * 256);

describe("big-endian decode - 16-bit unsigned", () => {
  bench("256x256", () => {
    decode(
      { bitsAllocated: 16, pixelRepresentation: 0 },
      new Uint8Array(smallData.buffer.slice(0))
    );
  });

  bench("512x512", () => {
    decode(
      { bitsAllocated: 16, pixelRepresentation: 0 },
      new Uint8Array(mediumData.buffer.slice(0))
    );
  });

  bench("1024x1024", () => {
    decode(
      { bitsAllocated: 16, pixelRepresentation: 0 },
      new Uint8Array(largeData.buffer.slice(0))
    );
  });
});

describe("big-endian decode - 16-bit signed", () => {
  bench("512x512", () => {
    decode(
      { bitsAllocated: 16, pixelRepresentation: 1 },
      new Uint8Array(mediumData.buffer.slice(0))
    );
  });
});

describe("big-endian decode - 8-bit passthrough", () => {
  bench("256x256", () => {
    decode(
      { bitsAllocated: 8, pixelRepresentation: 0 },
      new Uint8Array(small8bit.buffer.slice(0))
    );
  });
});

/**
 * Decodes the provided pixelData and sets the `pixelData` property
 * of the imageFrame object to the decoded representation.
 * 
 * 
 * @param {object} imageFrame
 * @param {number} imageFrame.bitsAllocated - 32 or 16 or 8
 * @param {number} imageFrame.pixelRepresentation - 0 or 1
 * @param {*} pixelData 
 */
function decode(imageFrame, pixelData) {
  // === BEGIN FAKE_REGRESSION ===
  // Artificial CPU burn so the benchmark pipeline has a known regression to
  // detect. Remove this entire block before merging.
  let _burn = 0;
  for (let i = 0; i < 100000; i++) {
    _burn = (_burn + i) * 1.0000001;
  }
  globalThis.__fakeRegressionBurn = _burn;
  // === END FAKE_REGRESSION ===

  let arrayBuffer = pixelData.buffer;

  let offset = pixelData.byteOffset;
  const length = pixelData.length;

  if (imageFrame.bitsAllocated === 16) {
    // if pixel data is not aligned on even boundary, shift it so we can create the 16 bit array
    // buffers on it
    if (offset % 2) {
      arrayBuffer = arrayBuffer.slice(offset);
      offset = 0;
    }

    if (imageFrame.pixelRepresentation === 0) {
      imageFrame.pixelData = new Uint16Array(arrayBuffer, offset, length / 2);
    } else {
      imageFrame.pixelData = new Int16Array(arrayBuffer, offset, length / 2);
    }
  } else if (imageFrame.bitsAllocated === 8 || imageFrame.bitsAllocated === 1) {
    imageFrame.pixelData = pixelData;
  } else if (imageFrame.bitsAllocated === 32) {
    // if pixel data is not aligned on even boundary, shift it
    if (offset % 2) {
      arrayBuffer = arrayBuffer.slice(offset);
      offset = 0;
    }

    imageFrame.pixelData = new Float32Array(arrayBuffer, offset, length / 4);
  }

  return imageFrame;
}
  
  export default decode;
  
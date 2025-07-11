
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to always download models
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
}

export const removeBackground = async (imageUrl: string): Promise<string> => {
  try {
    console.log('Starting background removal process for:', imageUrl);
    
    // Load the image first with CORS handling
    let image;
    try {
      image = await loadImage(imageUrl);
      console.log('Image loaded successfully');
    } catch (corsError) {
      console.log('CORS error detected, using proxy or fallback method');
      // For external images that fail CORS, we'll skip background removal
      console.log('Falling back to original image due to CORS');
      return imageUrl;
    }
    
    // Initialize the segmentation pipeline with fallback to CPU if WebGPU fails
    let segmenter;
    try {
      segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
        device: 'webgpu',
      });
      console.log('Using WebGPU for segmentation');
    } catch (webgpuError) {
      console.log('WebGPU failed, falling back to WASM:', webgpuError);
      segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
        device: 'wasm',
      });
    }
    
    // Convert HTMLImageElement to canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Resize image if needed and draw it to canvas
    const wasResized = resizeImageIfNeeded(canvas, ctx, image);
    console.log(`Image ${wasResized ? 'was' : 'was not'} resized. Final dimensions: ${canvas.width}x${canvas.height}`);
    
    // Get image data as base64
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    console.log('Image converted to base64');
    
    // Process the image with the segmentation model
    console.log('Processing with segmentation model...');
    const result = await segmenter(imageData);
    
    console.log('Segmentation result received');
    
    if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
      console.error('Invalid segmentation result:', result);
      throw new Error('Invalid segmentation result');
    }
    
    // Create a new canvas for the masked image
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = canvas.width;
    outputCanvas.height = canvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    
    if (!outputCtx) throw new Error('Could not get output canvas context');
    
    // Draw original image
    outputCtx.drawImage(canvas, 0, 0);
    
    // Apply the mask
    const outputImageData = outputCtx.getImageData(
      0, 0,
      outputCanvas.width,
      outputCanvas.height
    );
    const data = outputImageData.data;
    
    // Apply inverted mask to alpha channel
    for (let i = 0; i < result[0].mask.data.length; i++) {
      // Invert the mask value (1 - value) to keep the subject instead of the background
      const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
      data[i * 4 + 3] = alpha;
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    console.log('Mask applied successfully');
    
    // Convert canvas to data URL
    const processedImageUrl = outputCanvas.toDataURL('image/png', 1.0);
    console.log('Successfully created final image with transparent background');
    
    return processedImageUrl;
  } catch (error) {
    console.error('Error removing background:', error);
    // Return original image if background removal fails
    console.log('Falling back to original image');
    return imageUrl;
  }
};

export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.log('Image loaded from URL:', url);
      resolve(img);
    };
    img.onerror = (error) => {
      console.error('Failed to load image from URL:', url, error);
      reject(new Error(`Failed to load image: ${error}`));
    };
    
    // Try without CORS first for same-origin images
    if (url.startsWith('http') && !url.includes(window.location.hostname)) {
      img.crossOrigin = 'anonymous';
    }
    
    img.src = url;
  });
};

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Check,
  RotateCw,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Upload,
  Trash2,
  Move,
  Crop
} from 'lucide-react';

const VIEWPORT_SIZE = 320;
const CROP_RADIUS = 125; // 250px diameter circle

export const ImageCropModal = ({
  isOpen,
  imageUrl,
  onClose,
  onSave,
  onDelete,
  onChooseDifferent,
  hasExistingPhoto = false
}) => {
  const canvasRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const imageObjRef = useRef(null);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Transform states
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
  const [baseScale, setBaseScale] = useState(1);

  // Drag tracking state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const touchDistanceRef = useRef(null);

  // Load and initialize image
  useEffect(() => {
    if (!isOpen || !imageUrl) return;

    setImageLoaded(false);
    setLoadError(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRotation(0);

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      imageObjRef.current = img;

      // Base scale covers the crop diameter
      const cropDiameter = CROP_RADIUS * 2;
      const scale = Math.max(cropDiameter / img.naturalWidth, cropDiameter / img.naturalHeight);
      setBaseScale(scale);
      setImageLoaded(true);
    };

    img.onerror = () => {
      setLoadError('Failed to load image. Please try another image.');
      setImageLoaded(false);
    };

    img.src = imageUrl;
  }, [isOpen, imageUrl]);

  // Draw mini live preview
  const drawPreview = useCallback(() => {
    const previewCanvas = previewCanvasRef.current;
    const img = imageObjRef.current;
    if (!previewCanvas || !img || !imageLoaded) return;

    const pCtx = previewCanvas.getContext('2d');
    if (!pCtx) return;

    const pSize = 72;
    pCtx.clearRect(0, 0, pSize, pSize);

    pCtx.save();
    // Clip circular preview
    pCtx.beginPath();
    pCtx.arc(pSize / 2, pSize / 2, pSize / 2, 0, Math.PI * 2);
    pCtx.clip();

    // Map viewport crop to preview
    const ratio = (pSize / 2) / CROP_RADIUS;
    pCtx.translate(pSize / 2, pSize / 2);
    pCtx.translate(pan.x * ratio, pan.y * ratio);
    pCtx.rotate((rotation * Math.PI) / 180);

    const drawW = img.naturalWidth * baseScale * zoom * ratio;
    const drawH = img.naturalHeight * baseScale * zoom * ratio;
    pCtx.imageSmoothingEnabled = true;
    pCtx.imageSmoothingQuality = 'high';
    pCtx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);

    pCtx.restore();
  }, [imageLoaded, baseScale, zoom, pan, rotation]);

  // Draw crop canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageObjRef.current;
    const centerX = VIEWPORT_SIZE / 2;
    const centerY = VIEWPORT_SIZE / 2;

    // Clear background
    ctx.clearRect(0, 0, VIEWPORT_SIZE, VIEWPORT_SIZE);

    if (img && imageLoaded) {
      ctx.save();

      // Translate to viewport center
      ctx.translate(centerX, centerY);
      // Apply user pan
      ctx.translate(pan.x, pan.y);
      // Apply rotation
      ctx.rotate((rotation * Math.PI) / 180);

      // Draw image
      const effectiveScale = baseScale * zoom;
      const drawWidth = img.naturalWidth * effectiveScale;
      const drawHeight = img.naturalHeight * effectiveScale;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);

      ctx.restore();
    }

    // Draw dark mask outside the circular crop area
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, VIEWPORT_SIZE, VIEWPORT_SIZE);
    ctx.arc(centerX, centerY, CROP_RADIUS, 0, Math.PI * 2, true);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.65)'; // slate-900 / 65%
    ctx.fill();

    // Draw circular guideline ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, CROP_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw subtle alignment crosshair (soft white)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(centerX - CROP_RADIUS, centerY);
    ctx.lineTo(centerX + CROP_RADIUS, centerY);
    ctx.stroke();

    // Vertical line
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - CROP_RADIUS);
    ctx.lineTo(centerX, centerY + CROP_RADIUS);
    ctx.stroke();

    ctx.restore();

    // Update mini preview
    drawPreview();
  }, [imageLoaded, baseScale, zoom, pan, rotation, drawPreview]);

  useEffect(() => {
    if (imageLoaded) {
      drawCanvas();
    }
  }, [imageLoaded, drawCanvas]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX - pan.x,
      y: e.clientY - pan.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.08 : -0.08;
    setZoom((prev) => Math.min(3, Math.max(1, +(prev + delta).toFixed(2))));
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      };
    } else if (e.touches.length === 2) {
      // Pinch to zoom
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchDistanceRef.current = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      setPan({
        x: e.touches[0].clientX - dragStartRef.current.x,
        y: e.touches[0].clientY - dragStartRef.current.y
      });
    } else if (e.touches.length === 2 && touchDistanceRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDistance = Math.hypot(dx, dy);
      const factor = newDistance / touchDistanceRef.current;
      touchDistanceRef.current = newDistance;

      setZoom((prev) => Math.min(3, Math.max(1, +(prev * factor).toFixed(2))));
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    touchDistanceRef.current = null;
  };

  // Rotate 90 degrees clockwise
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Reset to default alignment
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRotation(0);
  };

  // Export cropped image and save
  const handleSaveCropped = async () => {
    const img = imageObjRef.current;
    if (!img || !imageLoaded) return;

    setIsSaving(true);
    try {
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = 512;
      exportCanvas.height = 512;

      const expCtx = exportCanvas.getContext('2d');
      expCtx.imageSmoothingEnabled = true;
      expCtx.imageSmoothingQuality = 'high';

      // Map circular crop from viewport (radius CROP_RADIUS) to export 512x512
      const exportRatio = 256 / CROP_RADIUS;
      expCtx.translate(256, 256);
      expCtx.translate(pan.x * exportRatio, pan.y * exportRatio);
      expCtx.rotate((rotation * Math.PI) / 180);

      const expDrawW = img.naturalWidth * baseScale * zoom * exportRatio;
      const expDrawH = img.naturalHeight * baseScale * zoom * exportRatio;
      expCtx.drawImage(img, -expDrawW / 2, -expDrawH / 2, expDrawW, expDrawH);

      const croppedDataUrl = exportCanvas.toDataURL('image/jpeg', 0.90);
      await onSave(croppedDataUrl);
    } catch (err) {
      console.error('Error generating cropped photo:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#001d36]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Crop className="w-4 h-4 text-blue-700" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Crop & Adjust Profile Picture
              </h3>
              <p className="text-[11px] text-slate-500">
                Drag to align your face, zoom and rotate to fit perfectly
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {loadError ? (
            <div className="p-6 text-center rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 space-y-3">
              <p className="text-sm font-bold">{loadError}</p>
              <button
                type="button"
                onClick={onChooseDifferent}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#003153] text-white text-xs font-bold hover:bg-[#00223d]"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Choose Another Photo</span>
              </button>
            </div>
          ) : (
            <>
              {/* Interactive Viewport Canvas */}
              <div className="flex flex-col items-center">
                <div
                  className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-inner select-none cursor-grab active:cursor-grabbing touch-none"
                  style={{ width: VIEWPORT_SIZE, height: VIEWPORT_SIZE }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onWheel={handleWheel}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <canvas
                    ref={canvasRef}
                    width={VIEWPORT_SIZE}
                    height={VIEWPORT_SIZE}
                    className="block"
                  />

                  {/* Drag overlay hint */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-md bg-black/60 text-white/90 text-[10px] font-semibold flex items-center gap-1 pointer-events-none">
                    <Move className="w-3 h-3" />
                    <span>Drag to move</span>
                  </div>

                  {/* Live circle preview overlay in top-right */}
                  <div className="absolute top-2.5 right-2.5 flex flex-col items-center bg-black/60 backdrop-blur-xs p-1.5 rounded-xl border border-white/20 pointer-events-none">
                    <canvas
                      ref={previewCanvasRef}
                      width={72}
                      height={72}
                      className="rounded-full shadow-sm"
                    />
                    <span className="text-[9px] font-bold text-white/90 mt-1 uppercase tracking-wider">
                      Preview
                    </span>
                  </div>

                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center gap-2 text-white">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-semibold">Loading photo...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls Bar: Zoom Slider & Quick Action Buttons */}
              <div className="space-y-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                {/* Zoom control row */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-600 min-w-[40px]">Zoom:</span>
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.max(1, +(z - 0.1).toFixed(2)))}
                    className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>

                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#003153]"
                  />

                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.min(3, +(z + 0.1).toFixed(2)))}
                    className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono font-bold text-slate-700 min-w-[42px] text-right">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>

                {/* Secondary tools row (Rotate, Reset, Choose Different) */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/70">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleRotate}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 shadow-2xs transition-colors cursor-pointer"
                      title="Rotate 90 degrees"
                    >
                      <RotateCw className="w-3.5 h-3.5 text-slate-600" />
                      <span>Rotate 90°</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 shadow-2xs transition-colors cursor-pointer"
                      title="Reset position and zoom"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                      <span>Reset</span>
                    </button>
                  </div>

                  {onChooseDifferent && (
                    <button
                      type="button"
                      onClick={onChooseDifferent}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#003153] bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#003153]" />
                      <span>Change Photo</span>
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer with Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            {hasExistingPhoto && onDelete && (
              <button
                type="button"
                onClick={onDelete}
                disabled={isSaving}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Photo</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/70 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveCropped}
              disabled={isSaving || !imageLoaded}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#003153] hover:bg-[#00223d] shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving Photo...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Profile Picture</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;

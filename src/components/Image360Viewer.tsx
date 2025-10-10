import { useState, useRef, useEffect } from 'react';
import { RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from './ui/button';

interface Image360ViewerProps {
  images: string[];
  productName: string;
}

export const Image360Viewer = ({ images, productName }: Image360ViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const diff = e.clientX - startX;
    const sensitivity = 3;
    
    if (Math.abs(diff) > sensitivity) {
      const direction = diff > 0 ? -1 : 1;
      setCurrentIndex((prev) => (prev + direction + images.length) % images.length);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.2, 3));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.2, 1));

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          size="icon"
          variant="secondary"
          onClick={handleZoomOut}
          className="glassmorphism"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={handleZoomIn}
          className="glassmorphism"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>

      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={images[currentIndex] || images[0]}
          alt={`${productName} - View ${currentIndex + 1}`}
          className="w-full h-auto transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
          draggable={false}
        />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <RotateCw className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Drag to rotate ({currentIndex + 1}/{images.length})
        </span>
      </div>
    </div>
  );
};

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Camera, Upload, Download, Share2, Sparkles, RotateCcw, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from './ui/slider';

interface EnhancedVirtualTryOnProps {
  productImage: string;
  productName: string;
}

export const EnhancedVirtualTryOn = ({ productImage, productName }: EnhancedVirtualTryOnProps) => {
  const [mode, setMode] = useState<'upload' | 'camera' | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(60);
  const [overlaySize, setOverlaySize] = useState(50);
  const [overlayPosition, setOverlayPosition] = useState({ x: 50, y: 50 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setTimeout(() => {
          setUserImage(event.target?.result as string);
          setMode('upload');
          setIsProcessing(false);
          toast.success('Image uploaded successfully!');
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setMode('camera');
        toast.success('Camera activated');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      setIsProcessing(true);
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        setTimeout(() => {
          setUserImage(canvas.toDataURL('image/png'));
          
          // Stop camera
          const stream = video.srcObject as MediaStream;
          stream?.getTracks().forEach(track => track.stop());
          setIsProcessing(false);
          toast.success('Photo captured!');
        }, 500);
      }
    }
  };

  const handleDownload = () => {
    if (userImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          const productImg = new Image();
          productImg.onload = () => {
            const size = (overlaySize / 100) * Math.min(canvas.width, canvas.height);
            const x = (overlayPosition.x / 100) * canvas.width - size / 2;
            const y = (overlayPosition.y / 100) * canvas.height - size / 2;
            
            ctx.globalAlpha = overlayOpacity / 100;
            ctx.drawImage(productImg, x, y, size, size);
            
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `tryon-${productName}.png`;
            link.click();
            toast.success('Image downloaded!');
          };
          productImg.src = productImage;
        };
        img.src = userImage;
      }
    }
  };

  const resetAll = () => {
    setUserImage(null);
    setMode(null);
    setOverlayOpacity(60);
    setOverlaySize(50);
    setOverlayPosition({ x: 50, y: 50 });
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
  };

  return (
    <Card className="overflow-hidden border-2">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Advanced Virtual Try-On
        </CardTitle>
        <CardDescription>
          AI-powered jewelry visualization with adjustable positioning
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {!mode && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-4"
            >
              <Button 
                variant="premium"
                size="lg"
                className="w-full justify-start h-24"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="font-bold text-base">Upload Your Photo</div>
                  <div className="text-xs opacity-90">Best results with clear face photos</div>
                </div>
              </Button>
              
              <Button 
                variant="shine"
                size="lg"
                className="w-full justify-start h-24"
                onClick={startCamera}
              >
                <Camera className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="font-bold text-base">Use Camera</div>
                  <div className="text-xs opacity-90">Take a live photo instantly</div>
                </div>
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </motion.div>
          )}

          {mode === 'camera' && !userImage && (
            <motion.div
              key="camera"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4"
            >
              <div className="relative rounded-2xl overflow-hidden border-4 border-primary/20">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full"
                />
                <div className="absolute inset-0 border-2 border-dashed border-primary/50 m-4 rounded-xl pointer-events-none" />
              </div>
              <div className="flex gap-3">
                <Button onClick={capturePhoto} variant="premium" size="lg" className="flex-1">
                  <Camera className="w-5 h-5 mr-2" />
                  Capture Photo
                </Button>
                <Button variant="outline" onClick={resetAll} size="lg">
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}

          {(isProcessing) && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <Zap className="w-16 h-16 text-primary animate-pulse mb-4" />
              <p className="text-lg font-semibold">Processing with AI...</p>
              <p className="text-sm text-muted-foreground">Creating your virtual try-on</p>
            </motion.div>
          )}

          {userImage && !isProcessing && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="relative rounded-2xl overflow-hidden border-4 border-primary/20">
                <img
                  src={userImage}
                  alt="Your photo"
                  className="w-full"
                />
                <div 
                  className="absolute pointer-events-none"
                  style={{
                    top: `${overlayPosition.y}%`,
                    left: `${overlayPosition.x}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${overlaySize}%`,
                    opacity: overlayOpacity / 100,
                  }}
                >
                  <img
                    src={productImage}
                    alt={productName}
                    className="w-full drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4 p-4 bg-muted/50 rounded-xl">
                <div>
                  <label className="text-sm font-medium mb-2 block">Opacity</label>
                  <Slider
                    value={[overlayOpacity]}
                    onValueChange={(val) => setOverlayOpacity(val[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Size</label>
                  <Slider
                    value={[overlaySize]}
                    onValueChange={(val) => setOverlaySize(val[0])}
                    min={20}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="premium"
                  size="lg"
                  onClick={handleDownload}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="shine"
                  size="lg"
                  onClick={resetAll}
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <canvas ref={canvasRef} className="hidden" />

        <p className="text-xs text-muted-foreground mt-6 text-center">
          <Sparkles className="w-3 h-3 inline mr-1" />
          AI-powered visualization • Adjust controls for perfect fit
        </p>
      </CardContent>
    </Card>
  );
};

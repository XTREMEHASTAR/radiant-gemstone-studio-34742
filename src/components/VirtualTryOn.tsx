import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Camera, Upload, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface VirtualTryOnProps {
  productImage: string;
  productName: string;
}

export const VirtualTryOn = ({ productImage, productName }: VirtualTryOnProps) => {
  const [mode, setMode] = useState<'upload' | 'camera' | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImage(event.target?.result as string);
        setMode('upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setMode('camera');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        setUserImage(canvas.toDataURL('image/png'));
        
        // Stop camera
        const stream = video.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
      }
    }
  };

  const handleDownload = () => {
    if (userImage) {
      const link = document.createElement('a');
      link.href = userImage;
      link.download = `tryon-${productName}.png`;
      link.click();
      toast.success('Image downloaded!');
    }
  };

  const handleShare = async () => {
    if (userImage) {
      try {
        const blob = await (await fetch(userImage)).blob();
        const file = new File([blob], `tryon-${productName}.png`, { type: 'image/png' });
        
        if (navigator.share) {
          await navigator.share({
            files: [file],
            title: `${productName} Virtual Try-On`,
          });
        } else {
          toast.info('Sharing not supported on this browser');
        }
      } catch (error) {
        console.error('Error sharing:', error);
        toast.error('Failed to share image');
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Virtual Try-On</CardTitle>
        <CardDescription>
          See how this piece looks on you
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!mode && (
          <div className="grid gap-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Your Photo
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={startCamera}
            >
              <Camera className="w-4 h-4 mr-2" />
              Use Camera
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}

        {mode === 'camera' && !userImage && (
          <div className="space-y-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg border"
            />
            <Button onClick={capturePhoto} className="w-full">
              Capture Photo
            </Button>
          </div>
        )}

        {userImage && (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={userImage}
                alt="Your photo"
                className="w-full rounded-lg border"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-60">
                <img
                  src={productImage}
                  alt={productName}
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                setUserImage(null);
                setMode(null);
              }}
            >
              Try Again
            </Button>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Note: This is a preview overlay. For accurate sizing, please consult with our team.
        </p>
      </CardContent>
    </Card>
  );
};
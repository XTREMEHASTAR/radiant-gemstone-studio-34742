import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Upload, Camera, Search, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import ProductCard from './ProductCard';
import { getAllProducts } from '@/data/products';

export const VisualSearch = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImage(imageUrl);
        performSearch(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Camera error:', error);
      toast.error('Could not access camera');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      const imageUrl = canvas.toDataURL('image/jpeg');
      setSelectedImage(imageUrl);
      stopCamera();
      performSearch(imageUrl);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const performSearch = async (imageUrl: string) => {
    setIsSearching(true);
    
    try {
      // Simulate AI visual search - in production, this would call an AI API
      // that analyzes the image and returns similar products
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock search results - return random products
      const allProducts = getAllProducts();
      const randomResults = allProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
      
      setSearchResults(randomResults);
      toast.success('Found similar products!');
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setSearchResults([]);
    stopCamera();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2">Visual Search</h1>
        <p className="text-muted-foreground">
          Upload or capture an image to find similar jewelry
        </p>
      </div>

      <Card className="max-w-2xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search by Image
          </CardTitle>
          <CardDescription>
            Find jewelry similar to any image you upload or capture
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selectedImage && !cameraActive && (
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-32 flex-col gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8" />
                <span>Upload Image</span>
              </Button>
              <Button
                variant="outline"
                className="h-32 flex-col gap-2"
                onClick={startCamera}
              >
                <Camera className="h-8 w-8" />
                <span>Take Photo</span>
              </Button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />

          {cameraActive && (
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full rounded-lg"
                autoPlay
                playsInline
              />
              <div className="flex gap-2 mt-4">
                <Button onClick={capturePhoto} className="flex-1">
                  <Camera className="h-4 w-4 mr-2" />
                  Capture
                </Button>
                <Button variant="outline" onClick={stopCamera}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {selectedImage && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Search query"
                  className="w-full rounded-lg"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={reset}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {isSearching && (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p className="text-muted-foreground">Analyzing image...</p>
                </div>
              )}
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <div>
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">
            Similar Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((product, index) => (
              <ProductCard key={product.id} {...product} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

interface Product3DViewerProps {
  productName: string;
  modelUrl?: string;
}

const JewelryModel = () => {
  // Placeholder 3D jewelry model - replace with actual GLTF models
  return (
    <mesh>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial
        color="#FFD700"
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
};

export const Product3DViewer = ({ productName, modelUrl }: Product3DViewerProps) => {
  return (
    <div className="relative w-full h-[500px] bg-background rounded-lg overflow-hidden border">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <JewelryModel />
          <Environment preset="studio" />
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            autoRotate
            autoRotateSpeed={2}
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-sm text-muted-foreground bg-background/80 px-3 py-2 rounded-md">
        Drag to rotate • Scroll to zoom
      </div>
      
      {!modelUrl && (
        <div className="absolute top-4 right-4 text-xs text-muted-foreground bg-background/80 px-3 py-2 rounded-md">
          Demo 3D Model
        </div>
      )}
    </div>
  );
};

export const Product3DViewerLoading = () => (
  <div className="w-full h-[500px] bg-background rounded-lg border flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);
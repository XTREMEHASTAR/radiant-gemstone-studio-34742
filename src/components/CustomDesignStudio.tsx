import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Palette, Gem, Upload, Sparkles } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface CustomDesignStudioProps {
  baseProduct?: {
    id: string;
    name: string;
    category: string;
  };
}

const CustomJewelryPreview = ({ metal, gemstone }: { metal: string; gemstone: string }) => {
  const metalColors: Record<string, string> = {
    gold: '#FFD700',
    silver: '#C0C0C0',
    platinum: '#E5E4E2',
    'rose-gold': '#B76E79',
  };

  const gemColors: Record<string, string> = {
    diamond: '#FFFFFF',
    ruby: '#E0115F',
    emerald: '#50C878',
    sapphire: '#0F52BA',
    topaz: '#FFD700',
  };

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh>
        <torusGeometry args={[1.2, 0.3, 16, 100]} />
        <meshStandardMaterial
          color={metalColors[metal] || metalColors.gold}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0, 0, 0.5]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={gemColors[gemstone] || gemColors.diamond}
          metalness={0.2}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      <Environment preset="studio" />
      <OrbitControls enablePan={false} autoRotate autoRotateSpeed={3} />
    </Canvas>
  );
};

export const CustomDesignStudio = ({ baseProduct }: CustomDesignStudioProps) => {
  const [metal, setMetal] = useState('gold');
  const [gemstone, setGemstone] = useState('diamond');
  const [engraving, setEngraving] = useState('');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitDesign = async () => {
    try {
      setIsSubmitting(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to submit a custom design');
        return;
      }

      const designData = {
        user_id: user.id,
        base_product_id: baseProduct?.id,
        design_params: {
          metal,
          gemstone,
          engraving,
          budget,
          notes,
        },
        status: 'pending',
      };

      // Store in appointments table for now (can create custom_designs table later)
      const { error } = await supabase.from('appointments').insert({
        user_id: user.id,
        name: user.email || 'Custom Design',
        email: user.email || '',
        phone: '',
        appointment_type: 'Custom Design',
        appointment_date: new Date().toISOString(),
        notes: JSON.stringify(designData),
        status: 'pending',
      });

      if (error) throw error;

      toast.success('Custom design request submitted! We\'ll contact you soon.');
      
      // Reset form
      setMetal('gold');
      setGemstone('diamond');
      setEngraving('');
      setBudget('');
      setNotes('');
    } catch (error) {
      console.error('Error submitting design:', error);
      toast.error('Failed to submit design request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Customize Your Design
          </CardTitle>
          <CardDescription>
            Create your perfect piece of jewelry with our custom design studio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metal" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Metal Type
            </Label>
            <Select value={metal} onValueChange={setMetal}>
              <SelectTrigger id="metal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gold">24K Gold</SelectItem>
                <SelectItem value="rose-gold">Rose Gold</SelectItem>
                <SelectItem value="silver">Sterling Silver</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gemstone" className="flex items-center gap-2">
              <Gem className="w-4 h-4" />
              Gemstone
            </Label>
            <Select value={gemstone} onValueChange={setGemstone}>
              <SelectTrigger id="gemstone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diamond">Diamond</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="emerald">Emerald</SelectItem>
                <SelectItem value="sapphire">Sapphire</SelectItem>
                <SelectItem value="topaz">Topaz</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="engraving">Engraving Text (Optional)</Label>
            <Input
              id="engraving"
              value={engraving}
              onChange={(e) => setEngraving(e.target.value)}
              placeholder="Your special message..."
              maxLength={50}
            />
            <p className="text-xs text-muted-foreground">
              {engraving.length}/50 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range (₹)</Label>
            <Input
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g., 50,000 - 1,00,000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requirements or inspiration..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Inspiration Images
            </Label>
            <Input type="file" accept="image/*" multiple />
            <p className="text-xs text-muted-foreground">
              Upload reference images to help us understand your vision
            </p>
          </div>

          <Button 
            onClick={handleSubmitDesign} 
            className="w-full" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Design Request'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>
            See your customization in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-square bg-background rounded-lg border overflow-hidden">
            <CustomJewelryPreview metal={metal} gemstone={gemstone} />
          </div>
          
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Metal:</span>
              <span className="font-medium capitalize">{metal.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gemstone:</span>
              <span className="font-medium capitalize">{gemstone}</span>
            </div>
            {engraving && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Engraving:</span>
                <span className="font-medium">"{engraving}"</span>
              </div>
            )}
            {budget && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-medium">₹{budget}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
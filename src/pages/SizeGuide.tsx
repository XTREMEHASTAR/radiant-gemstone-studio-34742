import { motion } from "framer-motion";
import { Ruler, Hand, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const SizeGuide = () => {
  const ringSizes = [
    { us: "4", indian: "7", diameter: "14.9", circumference: "46.8" },
    { us: "5", indian: "10", diameter: "15.7", circumference: "49.3" },
    { us: "6", indian: "12", diameter: "16.5", circumference: "51.9" },
    { us: "7", indian: "14", diameter: "17.3", circumference: "54.4" },
    { us: "8", indian: "16", diameter: "18.2", circumference: "57.0" },
    { us: "9", indian: "18", diameter: "19.0", circumference: "59.5" },
    { us: "10", indian: "20", diameter: "19.8", circumference: "62.1" },
  ];

  const braceletSizes = [
    { size: "Extra Small", wrist: "14-15 cm", length: "16-17 cm" },
    { size: "Small", wrist: "15-16 cm", length: "17-18 cm" },
    { size: "Medium", wrist: "16-18 cm", length: "18-20 cm" },
    { size: "Large", wrist: "18-20 cm", length: "20-22 cm" },
    { size: "Extra Large", wrist: "20-22 cm", length: "22-24 cm" },
  ];

  const necklaceLengths = [
    { name: "Choker", length: "35-40 cm", description: "Sits at the base of the neck" },
    { name: "Princess", length: "40-45 cm", description: "Rests on collarbone" },
    { name: "Matinee", length: "50-60 cm", description: "Falls above the bust" },
    { name: "Opera", length: "70-90 cm", description: "Reaches the breastbone" },
    { name: "Rope", length: "90+ cm", description: "Can be doubled or knotted" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gems/20 via-primary/20 to-accent/20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gems rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Ruler className="h-16 w-16 mx-auto mb-6 text-gems" />
            <h1 className="text-5xl font-serif font-bold mb-4">Size Guide</h1>
            <p className="text-lg text-muted-foreground">
              Find your perfect fit with our comprehensive sizing charts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ring Size Chart */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl luxury-gradient flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-serif font-bold">Ring Size Chart</h2>
            </div>
            
            <Card className="p-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold">US Size</th>
                    <th className="text-left p-4 font-semibold">Indian Size</th>
                    <th className="text-left p-4 font-semibold">Diameter (mm)</th>
                    <th className="text-left p-4 font-semibold">Circumference (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  {ringSizes.map((size, index) => (
                    <motion.tr
                      key={size.us}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-4">{size.us}</td>
                      <td className="p-4">{size.indian}</td>
                      <td className="p-4">{size.diameter}</td>
                      <td className="p-4">{size.circumference}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <div className="mt-6 p-6 bg-accent/20 rounded-xl">
              <h3 className="font-semibold mb-3">How to Measure Your Ring Size</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. Wrap a string or paper strip around your finger</li>
                <li>2. Mark where the ends meet</li>
                <li>3. Measure the length in millimeters</li>
                <li>4. Compare with the circumference column above</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bracelet Size Guide */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl gems-gradient flex items-center justify-center">
                <Hand className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-serif font-bold">Bracelet Size Guide</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {braceletSizes.map((size, index) => (
                <motion.div
                  key={size.size}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover-lift">
                    <h3 className="text-xl font-semibold mb-4">{size.size}</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Wrist:</span> {size.wrist}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Bracelet:</span> {size.length}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Necklace Length Guide */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold mb-8">Necklace Length Guide</h2>
            
            <div className="space-y-4">
              {necklaceLengths.map((necklace, index) => (
                <motion.div
                  key={necklace.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover-lift">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{necklace.name}</h3>
                        <p className="text-sm text-muted-foreground">{necklace.description}</p>
                      </div>
                      <div className="px-4 py-2 luxury-gradient rounded-lg">
                        <span className="text-white font-semibold">{necklace.length}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SizeGuide;

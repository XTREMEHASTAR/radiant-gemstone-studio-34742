import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import goldHero from "@/assets/gold-hero.jpg";
import silverHero from "@/assets/silver-hero.jpg";
import diamondHero from "@/assets/diamond-hero.jpg";
import gemsHero from "@/assets/gems-hero.jpg";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const CategoryShowcase = () => {
  const categories = [
    {
      title: "Gold Collection",
      image: goldHero,
      link: "/gold",
      description: "Timeless elegance in pure gold",
      gradient: "from-yellow-600/90 to-yellow-800/90",
      icon: "🏆",
      badge: "Premium"
    },
    {
      title: "Silver Collection",
      image: silverHero,
      link: "/silver",
      description: "Modern sophistication in sterling",
      gradient: "from-gray-600/90 to-gray-800/90",
      icon: "⭐",
      badge: "Trending"
    },
    {
      title: "Diamond Collection",
      image: diamondHero,
      link: "/diamond",
      description: "Brilliance that lasts forever",
      gradient: "from-blue-600/90 to-blue-800/90",
      icon: "💎",
      badge: "Luxury"
    },
    {
      title: "Gems Collection",
      image: gemsHero,
      link: "/gems",
      description: "Colorful treasures from nature",
      gradient: "from-purple-600/90 to-pink-600/90",
      icon: "💍",
      badge: "Exclusive"
    },
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Explore Our Collections
          </h2>
          <p className="text-muted-foreground text-lg">
            Each piece tells a unique story of craftsmanship
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={category.link} className="group block">
                <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-elegant border border-border/50 hover-lift">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} transition-opacity duration-300 group-hover:opacity-90`} />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">{category.icon}</span>
                  </div>

                  {/* Premium Badge */}
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-white/90 text-foreground border-0 shadow-lg">
                      {category.badge}
                    </Badge>
                  </div>

                  {/* Sparkle Effect */}
                  <div className="absolute top-20 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Sparkles className="h-8 w-8 text-white animate-pulse" />
                  </div>
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <h3 className="text-4xl font-serif font-bold mb-3 drop-shadow-lg">
                      {category.title}
                    </h3>
                    <p className="text-white/95 mb-6 text-lg drop-shadow-md">{category.description}</p>
                    <div className="flex items-center gap-2 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 w-fit group-hover:bg-white/20 transition-all duration-300">
                      <span>Explore Collection</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

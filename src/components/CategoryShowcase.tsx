import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Crown, Sparkles, Diamond, Gem } from "lucide-react";

const categories = [
  {
    id: "gold",
    title: "Gold",
    description: "Rich Golden Luxury",
    icon: Crown,
    gradient: "bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600",
    shadowClass: "hover:shadow-[0_20px_60px_-10px_rgba(251,191,36,0.5)]",
    iconColor: "text-amber-100",
    link: "/gold",
  },
  {
    id: "silver",
    title: "Silver",
    description: "Elegant Silver Grace",
    icon: Sparkles,
    gradient: "bg-gradient-to-br from-slate-200 via-gray-100 to-slate-300",
    shadowClass: "hover:shadow-[0_20px_60px_-10px_rgba(148,163,184,0.5)]",
    iconColor: "text-slate-600",
    link: "/silver",
  },
  {
    id: "diamond",
    title: "Diamond",
    description: "Brilliant Diamond Radiance",
    icon: Diamond,
    gradient: "bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100",
    shadowClass: "hover:shadow-[0_20px_60px_-10px_rgba(56,189,248,0.5)]",
    iconColor: "text-blue-600",
    link: "/diamond",
  },
  {
    id: "gems",
    title: "Gems",
    description: "Vibrant Precious Stones",
    icon: Gem,
    gradient: "bg-gradient-to-br from-fuchsia-400 via-pink-500 to-purple-500",
    shadowClass: "hover:shadow-[0_20px_60px_-10px_rgba(236,72,153,0.5)]",
    iconColor: "text-pink-100",
    link: "/gems",
  },
];

export const CategoryShowcase = () => {
  return (
    <section className="py-20 bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Explore Our Collections
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover exquisite pieces crafted with precision and passion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link to={category.link} key={category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className={`relative h-[400px] rounded-3xl overflow-hidden cursor-pointer ${category.gradient} ${category.shadowClass} transition-all duration-500 group`}
                >
                  {/* Glossy sphere effect */}
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-36 h-36">
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/50 to-transparent blur-2xl" />
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/70 to-transparent blur-xl scale-75" />
                  </div>

                  {/* Content Container */}
                  <div className="relative h-full flex flex-col items-center justify-between p-10 text-white">
                    {/* Icon at top with glow */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 200, duration: 0.8 }}
                      className="relative"
                    >
                      <div className={`absolute inset-0 ${category.iconColor} opacity-50 blur-2xl`} />
                      <Icon 
                        className={`w-24 h-24 ${category.iconColor} drop-shadow-2xl relative z-10`} 
                        strokeWidth={1.5} 
                      />
                    </motion.div>

                    {/* Title and description at bottom */}
                    <div className="text-center space-y-3">
                      <h3 
                        className={`text-5xl font-serif font-bold tracking-tight drop-shadow-2xl ${
                          category.id === 'silver' || category.id === 'diamond' 
                            ? 'text-gray-800' 
                            : 'text-white'
                        }`}
                      >
                        {category.title}
                      </h3>
                      <p 
                        className={`text-base font-semibold drop-shadow-lg ${
                          category.id === 'silver' || category.id === 'diamond' 
                            ? 'text-gray-700' 
                            : 'text-white/95'
                        }`}
                      >
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/0 to-white/0 group-hover:via-white/10 transition-all duration-500" />
                  
                  {/* Corner sparkle */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Sparkles className="w-6 h-6 text-white animate-pulse" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
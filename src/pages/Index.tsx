import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import heroWelcome from "@/assets/hero-welcome.jpg";
import { Sparkles } from "lucide-react";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { FeaturedSection } from "@/components/FeaturedSection";
import { StatsSection } from "@/components/StatsSection";
import { CategoryShowcase } from "@/components/CategoryShowcase";

const Index = () => {
  // Main homepage component
  const categories = [
    {
      title: "Gold",
      emoji: "🟡",
      description: "Rich Golden Luxury",
      link: "/gold",
      gradient: "luxury-gradient",
      textColor: "text-white",
      delay: 0.1,
    },
    {
      title: "Silver",
      emoji: "⚪",
      description: "Elegant Silver Grace",
      link: "/silver",
      gradient: "silver-gradient",
      textColor: "text-foreground",
      delay: 0.2,
    },
    {
      title: "Diamond",
      emoji: "💎",
      description: "Brilliant Diamond Radiance",
      link: "/diamond",
      gradient: "diamond-gradient",
      textColor: "text-accent-foreground",
      delay: 0.3,
    },
    {
      title: "Gems",
      emoji: "🟣",
      description: "Vibrant Precious Stones",
      link: "/gems",
      gradient: "gems-gradient",
      textColor: "text-white",
      delay: 0.4,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Bhulaxmi Jewellers - Luxury Gold, Diamond, Silver & Gems Jewelry</title>
        <meta name="description" content="Discover exquisite handcrafted luxury jewelry at Bhulaxmi Jewellers. Shop certified gold, diamond, silver jewelry and precious gems. Trusted since 1990. Free shipping on orders over ₹50,000." />
        <meta name="keywords" content="gold jewelry India, diamond rings, silver jewelry, precious gems, luxury jewelry online, certified gold, wedding jewelry, engagement rings, Bhulaxmi Jewellers" />
        <link rel="canonical" href="https://yoursite.com/" />
      </Helmet>
      
      <div className="min-h-screen hero-gradient">
        {/* Fullscreen Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0">
          <img
            src={heroWelcome}
            alt="Bhulaxmi Jewellers"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
          
          {/* Animated sparkles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  repeatDelay: Math.random() * 2,
                }}
              >
                <Sparkles className="text-primary/30" size={16} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-serif font-bold mb-4 text-gradient-gold"
            >
              Welcome to
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6"
            >
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-2 drop-shadow-lg">
                Bhulaxmi Jewellers
              </h2>
              <div className="h-1 w-32 luxury-gradient mx-auto rounded-full" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl md:text-3xl text-muted-foreground mb-16 font-light tracking-wide"
            >
              Select Your Treasure
            </motion.p>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {categories.map((category) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: category.delay }}
                >
                  <Link to={category.link}>
                    <motion.div
                      whileHover={{ 
                        scale: 1.05, 
                        rotate: 1,
                        y: -10,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`${category.gradient} rounded-2xl p-8 shadow-2xl hover-tilt cursor-pointer group relative overflow-hidden`}
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl glow-gold" />
                      
                      <div className="relative z-10">
                        {/* Emoji */}
                        <motion.div
                          animate={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: category.delay }}
                          className="text-6xl mb-4"
                        >
                          {category.emoji}
                        </motion.div>

                        {/* Title */}
                        <h3 className={`text-3xl font-serif font-bold mb-2 ${category.textColor}`}>
                          {category.title}
                        </h3>

                        {/* Description */}
                        <p className={`text-sm ${category.textColor} opacity-90 font-medium tracking-wide`}>
                          {category.description}
                        </p>

                        {/* Hover indicator */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          className={`h-1 ${category.textColor === 'text-white' ? 'bg-white' : 'bg-foreground'} mt-4 rounded-full transition-all duration-300`}
                        />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-16 text-muted-foreground"
            >
              <p className="text-sm tracking-wider uppercase mb-2">Crafting Excellence Since 1997</p>
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-xs">Trusted by Thousands</span>
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </section>

        <FeaturedSection />
        <StatsSection />
        <CategoryShowcase />
        <Testimonials />
        <Newsletter />
      </div>
    </>
  );
};

export default Index;

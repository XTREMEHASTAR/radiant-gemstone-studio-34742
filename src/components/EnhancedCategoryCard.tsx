import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface EnhancedCategoryCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  link: string;
  index: number;
}

export const EnhancedCategoryCard = ({
  id,
  title,
  description,
  icon: Icon,
  gradient,
  link,
  index,
}: EnhancedCategoryCardProps) => {
  const isDark = id === "gold" || id === "gems";
  const textColor = isDark ? "text-white" : "text-gray-800";
  const descColor = isDark ? "text-white/90" : "text-gray-700";

  return (
    <Link to={link}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.15,
          type: "spring",
          stiffness: 100 
        }}
        whileHover={{ 
          y: -15, 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
        className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl"
      >
        {/* Background Gradient */}
        <div className={`absolute inset-0 ${gradient}`} />

        {/* Animated Gradient Overlay */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 bg-[length:200%_200%]"
        />

        {/* 3D Glossy Sphere */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-32 h-32"
          >
            {/* Main sphere */}
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/80 via-white/40 to-transparent backdrop-blur-xl" />
            
            {/* Highlight */}
            <div className="absolute top-3 left-3 w-12 h-12 rounded-full bg-white/60 blur-xl" />
            
            {/* Shadow */}
            <div className="absolute inset-0 rounded-full shadow-[inset_-8px_-8px_16px_rgba(0,0,0,0.2),inset_8px_8px_16px_rgba(255,255,255,0.3)]" />
            
            {/* Outer glow */}
            <div className="absolute -inset-8 rounded-full bg-gradient-radial from-white/20 to-transparent blur-2xl animate-pulse-glow" />
          </motion.div>
        </div>

        {/* Diamond Icon (only for diamond category) */}
        {id === "diamond" && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Icon className="w-20 h-20 text-blue-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
            </motion.div>
          </div>
        )}

        {/* Floating Icon */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
          className="absolute top-8 right-8 z-20"
        >
          <div className="relative">
            <div className="absolute inset-0 blur-xl opacity-50" style={{
              background: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.1)",
            }} />
            <Icon 
              className={`w-12 h-12 relative z-10 ${
                isDark ? "text-white/80" : "text-gray-700"
              }`}
              strokeWidth={1.5}
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="text-center space-y-3"
          >
            <h3 className={`text-6xl font-serif font-bold tracking-tight drop-shadow-2xl ${textColor}`}>
              {title}
            </h3>
            <p className={`text-lg font-semibold drop-shadow-lg ${descColor}`}>
              {description}
            </p>
          </motion.div>
        </div>

        {/* Shimmer on Hover */}
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Border Glow on Hover */}
        <div className="absolute inset-0 rounded-[2rem] ring-4 ring-white/0 group-hover:ring-white/30 transition-all duration-500" />
      </motion.div>
    </Link>
  );
};

import { motion } from "framer-motion";
import { Award, Users, ShoppingBag, Star } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: Award,
      value: "30+",
      label: "Years Experience",
      color: "text-yellow-500",
    },
    {
      icon: Users,
      value: "50K+",
      label: "Happy Customers",
      color: "text-blue-500",
    },
    {
      icon: ShoppingBag,
      value: "10K+",
      label: "Products Sold",
      color: "text-green-500",
    },
    {
      icon: Star,
      value: "4.9",
      label: "Average Rating",
      color: "text-purple-500",
    },
  ];

  return (
    <section className="py-20 luxury-gradient text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                className="inline-block"
              >
                <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
              </motion.div>
              <h3 className="text-4xl font-serif font-bold mb-2">{stat.value}</h3>
              <p className="text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Palette, Search, Gift, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const features = [
  {
    icon: Camera,
    title: 'Virtual Try-On',
    description: 'See how jewelry looks on you with AR technology',
    link: '/product/1', // Will open product with try-on tab
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Palette,
    title: 'Custom Design Studio',
    description: 'Create your unique jewelry piece',
    link: '/product/1', // Will open product with custom design tab
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: Search,
    title: 'Visual Search',
    description: 'Find jewelry by uploading an image',
    link: '/visual-search',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Gift,
    title: 'Loyalty Rewards',
    description: 'Earn points and unlock exclusive benefits',
    link: '/loyalty',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: TrendingUp,
    title: 'Live Metal Rates',
    description: 'Real-time gold, silver & platinum prices',
    link: '#rates',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Sparkles,
    title: 'AI Shopping Assistant',
    description: 'Get personalized recommendations',
    link: '/product/1', // Will show AI assistant
    gradient: 'from-indigo-500 to-purple-600',
  },
];

export const FeaturesShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">Advanced Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the future of jewelry shopping with our innovative tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={feature.link}>
                  <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full group-hover:bg-primary/10">
                        Explore <Sparkles className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
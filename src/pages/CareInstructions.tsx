import { motion } from "framer-motion";
import { Sparkles, Droplets, Sun, Shield, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const CareInstructions = () => {
  const careByMetal = [
    {
      metal: "Gold Jewelry",
      icon: Sparkles,
      color: "from-amber-500 to-yellow-600",
      tips: [
        "Clean with mild soap and warm water using a soft brush",
        "Dry thoroughly with a lint-free cloth",
        "Store in individual soft pouches to prevent scratches",
        "Remove before swimming or bathing",
        "Avoid exposure to harsh chemicals and perfumes",
      ],
    },
    {
      metal: "Silver Jewelry",
      icon: Droplets,
      color: "from-slate-400 to-zinc-500",
      tips: [
        "Polish regularly with a silver polishing cloth",
        "Store in anti-tarnish bags or with anti-tarnish strips",
        "Clean with silver-specific cleaning solution",
        "Remove during physical activities",
        "Keep away from chlorine and saltwater",
      ],
    },
    {
      metal: "Diamond Jewelry",
      icon: Shield,
      color: "from-cyan-400 to-blue-500",
      tips: [
        "Soak in ammonia solution (1:6 ratio) for 20 minutes",
        "Use a soft toothbrush to clean behind stones",
        "Check settings regularly for loose stones",
        "Professional cleaning recommended every 6 months",
        "Store separately to avoid scratching other jewelry",
      ],
    },
    {
      metal: "Gemstone Jewelry",
      icon: Sun,
      color: "from-purple-500 to-pink-500",
      tips: [
        "Clean with lukewarm water and mild soap only",
        "Avoid ultrasonic cleaners for organic gems",
        "Keep away from prolonged sunlight exposure",
        "Remove before applying lotions or makeup",
        "Professional inspection annually recommended",
      ],
    },
  ];

  const dosDonts = {
    dos: [
      "Put jewelry on last when getting dressed",
      "Remove jewelry before sleeping",
      "Clean jewelry regularly",
      "Store in a cool, dry place",
      "Get professional inspection annually",
      "Use original packaging when storing",
    ],
    donts: [
      "Wear jewelry while exercising or swimming",
      "Expose to harsh chemicals or cleaning products",
      "Store different metals together",
      "Apply perfume or hairspray while wearing jewelry",
      "Clean with abrasive materials",
      "Ignore loose settings or damaged clasps",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-gems/20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gems rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Sparkles className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h1 className="text-5xl font-serif font-bold mb-4">Care Instructions</h1>
            <p className="text-lg text-muted-foreground">
              Keep your jewelry sparkling for generations with proper care
            </p>
          </motion.div>
        </div>
      </section>

      {/* Care by Metal Type */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {careByMetal.map((item, index) => (
              <motion.div
                key={item.metal}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover-lift">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                      <item.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold">{item.metal}</h3>
                  </div>
                  <ul className="space-y-3">
                    {item.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Do's and Don'ts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">Essential Do's and Don'ts</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Do's */}
              <Card className="p-8 border-2 border-emerald-500/20 hover-lift">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-emerald-600 dark:text-emerald-400">Do's</h3>
                </div>
                <ul className="space-y-3">
                  {dosDonts.dos.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-emerald-500 text-xl">✓</span>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>

              {/* Don'ts */}
              <Card className="p-8 border-2 border-red-500/20 hover-lift">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-red-600 dark:text-red-400">Don'ts</h3>
                </div>
                <ul className="space-y-3">
                  {dosDonts.donts.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-red-500 text-xl">✗</span>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Care */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 luxury-gradient text-white">
              <h2 className="text-3xl font-serif font-bold mb-6">Professional Maintenance</h2>
              <div className="space-y-4">
                <p className="text-white/90">
                  We recommend professional cleaning and inspection of your jewelry at least once a year. 
                  Our expert jewelers will:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
                    <span className="text-white/90">Check and tighten all stone settings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
                    <span className="text-white/90">Deep clean with professional equipment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
                    <span className="text-white/90">Polish and restore original shine</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
                    <span className="text-white/90">Repair any minor damage before it worsens</span>
                  </li>
                </ul>
                <p className="text-white/90 pt-4">
                  Contact us to schedule your complimentary jewelry inspection today.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CareInstructions;

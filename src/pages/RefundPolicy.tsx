import { motion } from "framer-motion";
import { RefreshCw, Clock, CreditCard, CheckCircle } from "lucide-react";

const RefundPolicy = () => {
  const refundProcess = [
    {
      step: "1",
      title: "Initiate Return",
      description: "Contact us within 7 days of delivery with your order number",
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
    },
    {
      step: "2",
      title: "Return Authorization",
      description: "Receive return approval and shipping instructions",
      icon: CheckCircle,
      color: "from-purple-500 to-pink-500",
    },
    {
      step: "3",
      title: "Ship Item Back",
      description: "Package securely and ship with tracking",
      icon: RefreshCw,
      color: "from-amber-500 to-orange-500",
    },
    {
      step: "4",
      title: "Receive Refund",
      description: "Get full refund within 5-7 business days of item receipt",
      icon: CreditCard,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const sections = [
    {
      title: "Eligibility for Refunds",
      content: [
        "Items must be returned within 7 days of delivery",
        "Products must be unworn and in original condition",
        "All original packaging, certificates, and tags must be included",
        "Item must not show any signs of wear, damage, or alteration",
        "Original invoice or proof of purchase required",
      ],
    },
    {
      title: "Non-Refundable Items",
      content: [
        "Custom-made or personalized jewelry",
        "Pierced earrings (for hygiene reasons)",
        "Items purchased during special promotional sales (unless defective)",
        "Jewelry altered or resized after purchase",
        "Items damaged due to misuse or neglect",
      ],
    },
    {
      title: "Refund Timeline",
      content: [
        "Refund processing begins within 48 hours of receiving the returned item",
        "Quality check completed within 2-3 business days",
        "Refund credited to original payment method within 5-7 business days",
        "Bank processing may take additional 3-5 days depending on your financial institution",
        "Email notification sent once refund is processed",
      ],
    },
    {
      title: "Partial Refunds",
      content: [
        "Items showing obvious signs of use may receive partial refund",
        "Missing certificates or authentication documents: 10% deduction",
        "Missing original packaging: 5% deduction",
        "Minor scratches or tarnishing: Case-by-case evaluation",
        "Management reserves right to determine partial refund amount",
      ],
    },
    {
      title: "Exchanges",
      content: [
        "Exchanges available for different sizes or designs",
        "Subject to product availability at time of exchange",
        "Price difference may apply for higher-value items",
        "Exchange processing time: 3-5 business days",
        "Free shipping on exchange orders",
      ],
    },
    {
      title: "Defective or Damaged Products",
      content: [
        "Full refund or replacement for manufacturing defects",
        "Contact us immediately upon receiving damaged item",
        "Photos of damage required for processing",
        "Return shipping costs waived for defective products",
        "Priority processing for defective item refunds (2-3 business days)",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <RefreshCw className="h-16 w-16 mx-auto mb-6 text-emerald-600" />
            <h1 className="text-5xl font-serif font-bold mb-4">Refund Policy</h1>
            <p className="text-lg text-muted-foreground">
              Your satisfaction is guaranteed. Learn about our hassle-free refund process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Refund Process Steps */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Simple Refund Process</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {refundProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card p-6 rounded-2xl shadow-elegant hover-lift h-full">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 mx-auto`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center">
                    <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-br ${step.color} text-white text-sm font-bold mb-3`}>
                      Step {step.step}
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < refundProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-muted to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Policy Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-8 rounded-2xl shadow-elegant"
              >
                <h2 className="text-3xl font-serif font-bold mb-6 text-gradient-gold">
                  {section.title}
                </h2>
                <ul className="space-y-4">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-2xl shadow-elegant text-center"
          >
            <h2 className="text-3xl font-serif font-bold mb-4">Questions About Refunds?</h2>
            <p className="text-muted-foreground mb-6">
              Our customer service team is here to help you with any refund-related queries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="mailto:Bhulaxmi916@gmail.com" className="text-primary font-semibold hover:underline">
                Bhulaxmi916@gmail.com
              </a>
              <span className="hidden sm:block text-muted-foreground">|</span>
              <a href="tel:9819072971" className="text-primary font-semibold hover:underline">
                9819072971
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;

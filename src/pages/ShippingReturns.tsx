import { motion } from "framer-motion";
import { Package, RotateCcw, Shield, Truck } from "lucide-react";

const ShippingReturns = () => {
  const shippingInfo = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Complimentary shipping on all orders above ₹50,000",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Package,
      title: "Secure Packaging",
      description: "All jewelry arrives in luxury gift boxes with tamper-proof seals",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Insurance Included",
      description: "All shipments are fully insured during transit",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: RotateCcw,
      title: "7-Day Returns",
      description: "Easy returns within 7 days of delivery in original condition",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const sections = [
    {
      title: "Shipping Information",
      content: [
        "We offer standard and express shipping options across India",
        "Processing time: 2-3 business days for in-stock items",
        "Custom-made jewelry: 10-15 business days plus shipping time",
        "International shipping available on request",
        "Track your order with real-time updates via SMS and email",
      ],
    },
    {
      title: "Return Policy",
      content: [
        "Items must be returned within 7 days of delivery",
        "Products must be in original, unworn condition with all tags attached",
        "Original packaging and certificates must be included",
        "Custom-made or personalized jewelry is non-returnable",
        "Pierced earrings cannot be returned for hygiene reasons",
      ],
    },
    {
      title: "Refund Process",
      content: [
        "Refund initiated within 48 hours of receiving returned item",
        "Full refund to original payment method within 5-7 business days",
        "Shipping charges are non-refundable unless product is defective",
        "Exchanges available for different sizes or designs subject to availability",
      ],
    },
    {
      title: "Damaged or Defective Items",
      content: [
        "Contact us immediately upon receiving damaged items",
        "Photos of damage required for processing claims",
        "Free replacement or full refund for manufacturing defects",
        "Return shipping costs waived for defective products",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/20 via-gems/20 to-accent/20">
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
            <Package className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h1 className="text-5xl font-serif font-bold mb-4">Shipping & Returns</h1>
            <p className="text-lg text-muted-foreground">
              Your satisfaction is our priority. Learn about our shipping and return policies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {shippingInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl"
                  style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                />
                <div className="relative bg-card p-6 rounded-2xl shadow-elegant hover-lift">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4`}>
                    <info.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">{info.title}</h3>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Information */}
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
    </div>
  );
};

export default ShippingReturns;

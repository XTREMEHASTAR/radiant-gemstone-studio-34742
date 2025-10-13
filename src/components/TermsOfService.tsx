import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export const TermsOfService = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using this website, you accept and agree to be bound by these Terms of Service and our Privacy Policy.",
    },
    {
      title: "Products and Pricing",
      content: "All products are subject to availability. Prices are displayed in Indian Rupees and may change without notice. We reserve the right to limit quantities and refuse service.",
    },
    {
      title: "Order Acceptance",
      content: "Your order is an offer to purchase. We reserve the right to accept or decline any order. Payment must be received before dispatch.",
    },
    {
      title: "Authenticity Guarantee",
      content: "All jewelry comes with authenticity certificates. Gold purity and gemstone authenticity are verified by certified laboratories.",
    },
    {
      title: "Returns and Exchanges",
      content: "Items can be returned within 7 days of delivery in original condition. Custom-made jewelry is non-returnable. Please contact us for return authorization.",
    },
    {
      title: "Warranty",
      content: "We provide warranty against manufacturing defects. Normal wear and tear, damage from misuse, or unauthorized repairs are not covered.",
    },
    {
      title: "Intellectual Property",
      content: "All content, designs, and trademarks on this website are our intellectual property and may not be used without permission.",
    },
    {
      title: "Limitation of Liability",
      content: "We are not liable for any indirect, incidental, or consequential damages arising from the use of our products or website.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 overflow-hidden luxury-gradient text-white">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <FileText className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-5xl font-serif font-bold mb-4">Terms of Service</h1>
            <p className="text-lg opacity-90">Last updated: {new Date().toLocaleDateString()}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl shadow-elegant"
              >
                <h2 className="text-2xl font-serif font-bold mb-4">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

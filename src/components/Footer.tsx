import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-serif font-bold text-xl">BJ</span>
              </div>
              <div>
                <span className="text-2xl font-serif font-bold block leading-tight">Bhulaxmi</span>
                <span className="text-xs tracking-wider uppercase opacity-80">Jewellers</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs mb-3">
              Timeless elegance in every piece. Crafting luxury jewelry with tradition and trust since 1997.
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                Bhulaxmi916@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <span className="h-3 w-3 flex items-center justify-center">📞</span>
                9819072971
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Collections</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/gold" className="text-muted-foreground hover:text-primary transition-colors">
                  Gold Jewelry
                </Link>
              </li>
              <li>
                <Link to="/silver" className="text-muted-foreground hover:text-primary transition-colors">
                  Silver Jewelry
                </Link>
              </li>
              <li>
                <Link to="/diamond" className="text-muted-foreground hover:text-primary transition-colors">
                  Diamond Jewelry
                </Link>
              </li>
              <li>
                <Link to="/gems" className="text-muted-foreground hover:text-primary transition-colors">
                  Precious Gems
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Contact Us
              </li>
              <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Shipping & Returns
              </li>
              <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Size Guide
              </li>
              <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Care Instructions
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive exclusive offers and updates.
            </p>
            <div className="flex gap-3">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Mail className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2025 Bhulaxmi Jewellers. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

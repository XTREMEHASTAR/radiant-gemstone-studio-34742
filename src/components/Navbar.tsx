import { Link, useLocation } from "react-router-dom";
import { User, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/hooks/useWishlist";
import { CartSheet } from "@/components/CartSheet";
import { CompareSheet } from "@/components/CompareProducts";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const wishlist = useWishlist();

  // Dynamic navbar styling based on route
  const navbarTheme = useMemo(() => {
    const path = location.pathname;
    if (path.includes('/gold')) return 'luxury-gradient text-white';
    if (path.includes('/silver')) return 'silver-gradient text-foreground';
    if (path.includes('/diamond')) return 'diamond-gradient text-accent-foreground';
    if (path.includes('/gems')) return 'gems-gradient text-white';
    return 'bg-card/95 backdrop-blur-md';
  }, [location.pathname]);

  const navLinks = [
    { name: "Gold", path: "/gold" },
    { name: "Silver", path: "/silver" },
    { name: "Diamond", path: "/diamond" },
    { name: "Gems", path: "/gems" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];


  return (
    <nav className={`sticky top-0 z-50 border-b border-border/50 shadow-sm transition-all duration-500 ${navbarTheme}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center group-hover:glow-gold transition-all duration-300 shadow-lg">
              <span className="text-white font-serif font-bold text-xl">BJ</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-serif font-bold block leading-tight">Bhulaxmi</span>
              <span className="text-xs tracking-wider uppercase opacity-80">Jewellers</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-all duration-300 relative group px-2 py-1 ${
                  location.pathname === link.path
                    ? "opacity-100 font-semibold"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 luxury-gradient transition-transform duration-300 origin-left ${
                    location.pathname === link.path
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-transform" asChild>
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlist.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {wishlist.items.length}
                  </span>
                )}
              </Link>
            </Button>
            <CompareSheet />
            <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-transform">
              <User className="h-5 w-5" />
            </Button>
            <CartSheet />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

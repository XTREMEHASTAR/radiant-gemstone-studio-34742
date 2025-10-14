import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AIShoppingAssistant } from "@/components/AIShoppingAssistant";
import { SupportChatbot } from "@/components/SupportChatbot";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Gold from "./pages/Gold";
import Silver from "./pages/Silver";
import Diamond from "./pages/Diamond";
import Gems from "./pages/Gems";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import ShippingReturns from "./pages/ShippingReturns";
import SizeGuide from "./pages/SizeGuide";
import CareInstructions from "./pages/CareInstructions";
import RefundPolicy from "./pages/RefundPolicy";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Loyalty from "./pages/Loyalty";
import VisualSearchPage from "./pages/VisualSearchPage";
import Account from "./pages/Account";
import { CurrencyProvider } from "./components/MultiCurrency";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/TermsOfService";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CurrencyProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/gold" element={<Gold />} />
              <Route path="/silver" element={<Silver />} />
              <Route path="/diamond" element={<Diamond />} />
              <Route path="/gems" element={<Gems />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/loyalty" element={<Loyalty />} />
              <Route path="/visual-search" element={<VisualSearchPage />} />
              <Route path="/account" element={<Account />} />
              <Route path="/shipping-returns" element={<ShippingReturns />} />
              <Route path="/size-guide" element={<SizeGuide />} />
              <Route path="/care-instructions" element={<CareInstructions />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <AIShoppingAssistant />
          <SupportChatbot />
        </BrowserRouter>
      </CurrencyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

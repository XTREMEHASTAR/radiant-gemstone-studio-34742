# Bhulaxmi Jewellers - Luxury Jewelry E-Commerce

![Bhulaxmi Jewellers](https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=400&fit=crop)

A modern, full-featured e-commerce platform for luxury jewelry built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### 🛍️ Shopping Experience
- **Product Categories**: Gold, Silver, Diamond, and Gems collections
- **Advanced Filtering**: Search, sort, and filter by price range
- **Product Comparison**: Compare up to 3 products side-by-side
- **Quick View**: Preview product details without leaving the page
- **Image Zoom**: High-quality product image viewing
- **Wishlist**: Save favorite items for later
- **Shopping Cart**: Full cart management with quantity controls

### 💎 Product Features
- Product badges (New, Sale, Popular)
- Customer reviews and ratings
- Related products suggestions
- Detailed product information
- Multiple product images

### 🎨 UI/UX
- Responsive design (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Dynamic theme-based navigation
- Category-specific gradients and styling
- Glassmorphism effects
- Interactive hover states

### 📄 Pages
- **Home**: Hero section with category navigation, featured products, testimonials
- **Category Pages**: Gold, Silver, Diamond, Gems with advanced filtering
- **Product Detail**: Comprehensive product information with reviews and related products
- **Wishlist**: Saved items management
- **Cart**: Shopping cart with order summary and promo codes
- **About**: Company history and values
- **Contact**: Contact form with map and business information
- **404**: Custom error page

### 🔧 Technical Features
- TypeScript for type safety
- Zustand for state management
- React Router for navigation
- Error boundary for graceful error handling
- SEO optimized with React Helmet
- Structured data for search engines
- Performance optimized

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## 📦 Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Cloudflare Pages (Recommended)

This project is optimized for Cloudflare Pages deployment. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick Deploy:**

1. Push your code to GitHub
2. Connect to Cloudflare Pages
3. Configure:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy!

### Other Platforms

The app can be deployed to any static hosting platform:
- **Vercel**: Zero config deployment
- **Netlify**: Drag and drop or Git integration
- **Lovable**: Click Share → Publish
- **GitHub Pages**: Static hosting
- **AWS S3 + CloudFront**: Enterprise deployment

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📁 Project Structure

```
bhulaxmi-jewellers/
├── public/              # Static assets
│   ├── _redirects      # SPA routing for deployment
│   └── robots.txt      # SEO crawling rules
├── src/
│   ├── assets/         # Images and media
│   ├── components/     # Reusable components
│   │   ├── ui/        # Shadcn UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   └── ...
│   ├── data/          # Mock data and constants
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Route pages
│   ├── App.tsx        # Main app component
│   ├── main.tsx       # Entry point
│   └── index.css      # Global styles & design system
├── DEPLOYMENT.md       # Deployment guide
└── package.json
```

## 🎨 Design System

The app uses a comprehensive design system with:
- **Color Tokens**: HSL-based theme colors
- **Gradients**: Category-specific gradients (gold, silver, diamond, gems)
- **Typography**: Playfair Display (serif) + Inter (sans-serif)
- **Animations**: Smooth transitions and hover effects
- **Shadows**: Elegant depth and elevation
- **Spacing**: Consistent spacing scale

All design tokens are defined in `src/index.css` and can be easily customized.

## 🔌 Key Components

### State Management
- `useCart`: Shopping cart management
- `useWishlist`: Wishlist functionality
- `useCompare`: Product comparison

### UI Components
- `ProductCard`: Individual product display
- `FilterBar`: Search, sort, and filter products
- `CartSheet`: Slide-out cart interface
- `CompareSheet`: Product comparison interface
- `QuickView`: Product quick view dialog
- `ImageZoom`: Zoomable product images

## 🌟 Features in Detail

### Shopping Cart
- Add/remove items
- Update quantities
- Price calculation with shipping
- Promo code support (e.g., "SAVE10")
- Persistent storage

### Product Comparison
- Compare up to 3 products
- Side-by-side feature comparison
- Price comparison
- Category filtering

### Wishlist
- Save favorite products
- Move to cart functionality
- Persistent storage
- Quick remove

### SEO Optimization
- Dynamic meta tags per page
- Structured data (JSON-LD)
- Semantic HTML
- Optimized images
- Clean URLs
- Mobile-friendly

## 📱 Responsive Design

Breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔒 Error Handling

- Error Boundary for React errors
- 404 page for invalid routes
- Form validation
- Loading states
- User-friendly error messages

## 🎯 Performance

- Code splitting with React.lazy
- Image lazy loading
- Optimized bundle size
- Minimal dependencies
- Tree-shaking
- CSS purging

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email info@bhulaxmi.com or visit our contact page.

## 🙏 Acknowledgments

- Design inspiration from luxury jewelry brands
- Images from Unsplash
- Icons from Lucide
- UI components from Shadcn

---

**Built with ❤️ using Lovable**

Crafting Excellence Since 1990 ✨

## Edit with Lovable

**Project URL**: https://lovable.dev/projects/6c722581-84da-478d-ae03-c770ef4bebbe

Simply visit the [Lovable Project](https://lovable.dev/projects/6c722581-84da-478d-ae03-c770ef4bebbe) and start prompting to make changes.

For more information, see [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap: Record<string, string> = {
    gold: "Gold Collection",
    silver: "Silver Collection",
    diamond: "Diamond Collection",
    gems: "Gems Collection",
    about: "About Us",
    contact: "Contact",
    wishlist: "My Wishlist",
    cart: "Shopping Cart",
    product: "Product",
  };

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbNameMap[name] || name.charAt(0).toUpperCase() + name.slice(1);

        return (
          <div key={name} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="text-foreground font-medium">{displayName}</span>
            ) : (
              <Link to={routeTo} className="hover:text-primary transition-colors">
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

import { Scale } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">LegalFlow</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Dashboard
            </Link>
            <Link
              to="/case-initiation"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/case-initiation") ? "text-primary" : "text-muted-foreground"
              )}
            >
              New Case
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

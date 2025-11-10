import { Scale } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Navbar = () => {
  return (
    <nav className="border-b bg-card sticky top-0 z-40">
      <div className="flex h-16 items-center px-4 gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <Scale className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">LegalFlow</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

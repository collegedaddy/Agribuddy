import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, Menu, X } from "lucide-react";
import { useState } from "react";

export const LandingHeader = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-6 h-6 text-white"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <path d="M16 3 L16 8 C16 8 12 8 12 12"></path>
              <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-foreground">AgriBuddy</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">Live Demo</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
            <a href="#cta" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </nav>
          
          <Button 
            onClick={() => navigate("/auth")} 
            variant="default" 
            className="gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md"
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b shadow-lg p-4 z-50">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2 px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#demo" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2 px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Live Demo
            </a>
            <a 
              href="#testimonials" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2 px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#cta" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2 px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <Button 
              onClick={() => {
                navigate("/auth");
                setMobileMenuOpen(false);
              }} 
              className="w-full justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

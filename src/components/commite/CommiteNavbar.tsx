
import React from "react";
import { UsersRound } from "lucide-react";
import { Link } from "react-router-dom";

export function CommiteNavbar() {
  return (
    <nav className="w-full sticky top-0 z-30 bg-card shadow-md border-b border-border">
      <div className="max-w-xl mx-auto flex items-center px-4 py-3 gap-3">
        <div className="rounded-full bg-primary/10 p-2 flex items-center justify-center">
          <UsersRound className="text-primary h-6 w-6" />
        </div>
        <span className="font-bold text-xl md:text-2xl tracking-tight text-foreground">
          Farmers' Community
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-xs md:text-sm font-medium text-muted-foreground bg-accent/40 rounded-lg px-2 py-1">
            Powered by AgriBuddy
          </span>
        </div>
      </div>
    </nav>
  );
}

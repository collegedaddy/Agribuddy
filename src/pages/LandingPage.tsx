
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingDemo } from "@/components/landing/LandingDemo";
import { LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { useAuth } from "@/context/AuthContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // If user is already logged in, redirect to dashboard
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  // Don't render anything until we check authentication status
  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950/30 dark:to-background">
      <LandingHeader />

      <main className="flex-grow">
        <LandingHero />
        <LandingFeatures />
        <LandingDemo />
        <LandingTestimonials />
        <LandingCTA />
      </main>

      <LandingFooter />
    </div>
  );
};

export default LandingPage;

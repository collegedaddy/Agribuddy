// Import UI components for notifications and tooltips
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
// Import React Query for server state management
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Import React Router for client-side routing
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Import context providers for global state
import { UserPreferencesProvider } from "@/context/UserPreferencesContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
// Import page components
import Index from "./pages/Index";
import MandiPrices from "./pages/MandiPrices";
import Schemes from "./pages/Schemes";
import Calendar from "./pages/Calendar";
import Chatbot from "./pages/Chatbot";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import PricePrediction from "./pages/PricePrediction";
import FarmFinance from "./pages/FarmFinance";
import Commite from "./pages/Commite";
import UserProfile from "./pages/UserProfile";
import './i18n'; // Internationalization setup

// Create a QueryClient instance for React Query
const queryClient = new QueryClient();

function App() {
  return (
    // Provide React Query client to the app
    <QueryClientProvider client={queryClient}>
      {/* Provide language context to all components */}
      <LanguageProvider>
        {/* Provide user preferences context */}
        <UserPreferencesProvider>
          {/* Provide authentication context */}
          <AuthProvider>
            {/* Provide tooltip context */}
            <TooltipProvider>
              {/* Set up client-side routing */}
              <BrowserRouter>
                {/* Notification toasters */}
                <Toaster />
                <Sonner />
                <Routes>
                  {/* Redirect root to dashboard */}
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  {/* Define all main routes */}
                  <Route path="/commite" element={<Commite />} />
                  <Route path="/profile/:userId" element={<UserProfile />} />
                  <Route path="/dashboard" element={<Index />} />
                  <Route path="/mandi-prices" element={<MandiPrices />} />
                  <Route path="/schemes" element={<Schemes />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                  <Route path="/agri-assistant" element={<Chatbot />} />
                  <Route path="/price-prediction" element={<PricePrediction />} />
                  <Route path="/farm-finance" element={<FarmFinance />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* Fallback for undefined routes */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </UserPreferencesProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;

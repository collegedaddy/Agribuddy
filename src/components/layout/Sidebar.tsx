import { 
  Home,
  Calendar, 
  IndianRupee, 
  FileText, 
  MessageCircle, 
  AlertTriangle,
  Settings,
  TrendingUp,
  BarChart,
  UsersRound
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 w-52 min-h-screen bg-sidebar border-r", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 mb-6">
            <Home className="h-6 w-6 text-agribuddy-primary" />
            <h2 className="text-lg font-semibold tracking-tight text-agribuddy-primary">
              AgriBuddy
            </h2>
          </div>
          <div className="space-y-1">
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/dashboard" className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/mandi-prices" className="flex items-center">
                <IndianRupee className="mr-2 h-5 w-5" />
                Mandi Prices
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/price-prediction" className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Price Prediction
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/farm-finance" className="flex items-center">
                <BarChart className="mr-2 h-5 w-5" />
                Farm Finance
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/commite" className="flex items-center">
                <UsersRound className="mr-2 h-5 w-5" />
                Commite
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/schemes" className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Govt. Schemes
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/calendar" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Farming Calendar
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/chatbot" className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                AI Assistant
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/alerts" className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Notifications
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-4 py-2 mt-auto">
          <div className="space-y-1">
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/settings" className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

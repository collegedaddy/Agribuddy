
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sun, CloudRain, BarChart3, ArrowUpRight } from "lucide-react";

export const LandingHero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2092&q=80')] bg-cover bg-center opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-medium text-sm mb-2">
              Smart Farming Solutions
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
              Grow Smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">AgriBuddy</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Your intelligent farming companion that helps you maximize yields, track market prices, and make data-driven decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => navigate("/auth")} 
                size="lg" 
                className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const featuresElement = document.getElementById('features');
                  featuresElement?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                Learn More
              </Button>
            </div>
            
            <div className="pt-8 grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Crop Management</h3>
                  <p className="text-sm text-muted-foreground">Track and optimize your farm's output</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Sun className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Weather Insights</h3>
                  <p className="text-sm text-muted-foreground">Plan ahead with accurate forecasts</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Market Prices</h3>
                  <p className="text-sm text-muted-foreground">Get real-time mandi data</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <CloudRain className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Price Prediction</h3>
                  <p className="text-sm text-muted-foreground">Predict future crop prices</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/90 to-emerald-200/90 dark:from-green-900/90 dark:to-emerald-800/90"></div>
            
            <div className="absolute inset-0 p-8 flex flex-col">
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Weather Dashboard</h3>
                  <Button variant="ghost" size="icon" className="text-green-600">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow">
                    <div className="flex items-center">
                      <Sun className="h-8 w-8 text-amber-500 mr-3" />
                      <div>
                        <p className="text-xs text-muted-foreground">Temperature</p>
                        <p className="text-xl font-bold">32°C</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow">
                    <div className="flex items-center">
                      <CloudRain className="h-8 w-8 text-blue-500 mr-3" />
                      <div>
                        <p className="text-xs text-muted-foreground">Humidity</p>
                        <p className="text-xl font-bold">65%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-6 mb-4 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Price Prediction</h3>
                  <Button variant="ghost" size="icon" className="text-green-600">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="h-48 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/20 backdrop-blur-sm p-4">
                    <h4 className="font-medium text-white">Tomato Price Forecast</h4>
                    <p className="text-white/80 text-sm">Projected to increase by 15% next month</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Agri Assistant</h3>
                  <Button variant="ghost" size="icon" className="text-green-600">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2 bg-green-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Leaf className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-sm">When is the best time to plant tomatoes in my region?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Diagonal divider */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-background transform -skew-y-2"></div>
    </section>
  );
};


import { 
  BarChart3, 
  Calendar, 
  CloudSun, 
  MessageSquare, 
  TrendingUp, 
  Bell 
} from "lucide-react";

export const LandingFeatures = () => {
  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Mandi Prices",
      description: "Track current market prices across various agricultural markets."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Price Prediction",
      description: "AI-powered predictions for vegetable prices over the next 3 months."
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Crop Calendar",
      description: "Plan your farming activities with our interactive crop calendar."
    },
    {
      icon: <CloudSun className="h-10 w-10 text-primary" />,
      title: "Weather Forecasts",
      description: "Get weather forecasts tailored to your farm's location."
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Agri Assistant",
      description: "Chat with our AI assistant for farming advice and tips."
    },
    {
      icon: <Bell className="h-10 w-10 text-primary" />,
      title: "Alerts & Notifications",
      description: "Stay informed with customized alerts for price changes and weather."
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">All-in-One Farming Solution</h2>
          <p className="text-xl text-muted-foreground">
            AgriBuddy combines powerful tools to help you make informed decisions for your farm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md hover:border-primary/50 transition-all duration-300"
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

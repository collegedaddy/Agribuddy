import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PricePredictionCardProps {
  vegetable: string;
  region: string;
}

export const PricePredictionCard = ({ vegetable, region }: PricePredictionCardProps) => {
  // Updated wholesale vegetable prices in Bangalore (April 18, 2025)
  const mockPredictions = {
    north: {
      tomato: { current: 18, predicted: 22, trend: "up" },
      potato: { current: 29, predicted: 27, trend: "down" },
      onion: { current: 36, predicted: 40, trend: "up" },
      cucumber: { current: 28, predicted: 32, trend: "up" },
      carrot: { current: 44, predicted: 48, trend: "up" },
      cabbage: { current: 21, predicted: 24, trend: "up" },
      cauliflower: { current: 29, predicted: 32, trend: "up" },
      broccoli: { current: 60, predicted: 65, trend: "up" },
      spinach: { current: 14, predicted: 16, trend: "up" },
      okra: { current: 43, predicted: 46, trend: "up" },
      eggplant: { current: 37, predicted: 40, trend: "up" },
      bell_pepper: { current: 41, predicted: 38, trend: "down" },
      bitter_gourd: { current: 34, predicted: 37, trend: "up" },
      bottle_gourd: { current: 35, predicted: 38, trend: "up" },
      pumpkin: { current: 22, predicted: 20, trend: "down" },
      radish: { current: 30, predicted: 33, trend: "up" },
      green_beans: { current: 43, predicted: 47, trend: "up" },
      peas: { current: 60, predicted: 64, trend: "up" },
      beetroot: { current: 41, predicted: 38, trend: "down" },
      garlic: { current: 136, predicted: 128, trend: "down" },
      ginger: { current: 62, predicted: 68, trend: "up" },
      green_chilli: { current: 45, predicted: 49, trend: "up" },
      lettuce: { current: 25, predicted: 27, trend: "up" },
      mushroom: { current: 94, predicted: 101, trend: "up" },
      sweet_potato: { current: 58, predicted: 62, trend: "up" },
      taro_root: { current: 27, predicted: 25, trend: "down" },
    },
    south: {
      tomato: { current: 18, predicted: 22, trend: "up" },
      potato: { current: 29, predicted: 27, trend: "down" },
      onion: { current: 36, predicted: 40, trend: "up" },
      cucumber: { current: 28, predicted: 32, trend: "up" },
      carrot: { current: 44, predicted: 48, trend: "up" },
      cabbage: { current: 21, predicted: 24, trend: "up" },
      cauliflower: { current: 29, predicted: 32, trend: "up" },
      broccoli: { current: 60, predicted: 65, trend: "up" },
      spinach: { current: 14, predicted: 16, trend: "up" },
      okra: { current: 43, predicted: 46, trend: "up" },
      eggplant: { current: 37, predicted: 40, trend: "up" },
      bell_pepper: { current: 41, predicted: 38, trend: "down" },
      bitter_gourd: { current: 34, predicted: 37, trend: "up" },
      bottle_gourd: { current: 35, predicted: 38, trend: "up" },
      pumpkin: { current: 22, predicted: 20, trend: "down" },
      radish: { current: 30, predicted: 33, trend: "up" },
      green_beans: { current: 43, predicted: 47, trend: "up" },
      peas: { current: 60, predicted: 64, trend: "up" },
      beetroot: { current: 41, predicted: 38, trend: "down" },
      garlic: { current: 136, predicted: 128, trend: "down" },
      ginger: { current: 62, predicted: 68, trend: "up" },
      green_chilli: { current: 45, predicted: 49, trend: "up" },
      lettuce: { current: 25, predicted: 27, trend: "up" },
      mushroom: { current: 94, predicted: 101, trend: "up" },
      sweet_potato: { current: 58, predicted: 62, trend: "up" },
      taro_root: { current: 27, predicted: 25, trend: "down" },
    }
  };

  const regionData = mockPredictions[region as keyof typeof mockPredictions] || mockPredictions.north;
  const prediction = regionData[vegetable as keyof typeof regionData] || { current: 0, predicted: 0, trend: "up" };
  const percentageChange = ((prediction.predicted - prediction.current) / prediction.current * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Prediction ({region === "north" ? "North India" : "South India"})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Current Price</p>
            <p className="text-2xl font-bold">₹{prediction.current}/kg</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Predicted Price</p>
            <p className="text-2xl font-bold">₹{prediction.predicted}/kg</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {prediction.trend === "up" ? (
            <Badge variant="default" className="bg-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              +{percentageChange}%
            </Badge>
          ) : (
            <Badge variant="default" className="bg-red-500">
              <TrendingDown className="h-4 w-4 mr-1" />
              {percentageChange}%
            </Badge>
          )}
          <span className="text-sm text-muted-foreground">Expected in 3 months</span>
        </div>
      </CardContent>
    </Card>
  );
};

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart, TooltipProps } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface PricePredictionChartProps {
  vegetable: string;
  region: string;
}

export const PricePredictionChart = ({ vegetable, region }: PricePredictionChartProps) => {
  // Generate mock data with more realistic seasonal variations
  const generateMockData = (vegetable: string, region: string) => {
    // Base prices per vegetable and region with randomization
    const getBasePrice = () => {
      // Updated wholesale vegetable prices in Bangalore (April 18, 2025)
      const basePrices: Record<string, Record<string, number>> = {
        north: {
          tomato: 18, potato: 29, onion: 36, cucumber: 28, carrot: 44, cabbage: 21,
          cauliflower: 29, broccoli: 60, spinach: 14, okra: 43, eggplant: 37,
          bell_pepper: 41, bitter_gourd: 34, bottle_gourd: 35, pumpkin: 22,
          radish: 30, green_beans: 43, peas: 60, beetroot: 41, garlic: 136,
          ginger: 62, green_chilli: 45, lettuce: 25, mushroom: 94, sweet_potato: 58,
          taro_root: 27
        },
        south: {
          tomato: 18, potato: 29, onion: 36, cucumber: 28, carrot: 44, cabbage: 21,
          cauliflower: 29, broccoli: 60, spinach: 14, okra: 43, eggplant: 37,
          bell_pepper: 41, bitter_gourd: 34, bottle_gourd: 35, pumpkin: 22,
          radish: 30, green_beans: 43, peas: 60, beetroot: 41, garlic: 136,
          ginger: 62, green_chilli: 45, lettuce: 25, mushroom: 94, sweet_potato: 58,
          taro_root: 27
        }
      };
      
      return basePrices[region]?.[vegetable] || 30;
    };

    const basePrice = getBasePrice();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    
    // Seasonal variations - each vegetable has different seasons
    const seasonalFactor = (vegType: string, monthIdx: number) => {
      const seasons: Record<string, number[]> = {
        // Each array has 12 values, one per month, indicating seasonal price variation
        tomato: [1.1, 1.0, 0.9, 0.85, 0.9, 1.0, 1.1, 1.2, 1.3, 1.2, 1.1, 1.1],
        potato: [0.9, 0.95, 1.0, 1.1, 1.2, 1.1, 1.0, 0.9, 0.85, 0.9, 0.9, 0.9],
        onion: [0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8, 0.8],
        // Default seasonal pattern
        default: [1.0, 1.05, 1.1, 1.15, 1.1, 1.05, 1.0, 0.95, 0.9, 0.95, 1.0, 1.05]
      };
      
      return seasons[vegType] ? seasons[vegType][monthIdx] : seasons.default[monthIdx];
    };
    
    return months.map((month, index) => {
      const seasonFactor = seasonalFactor(vegetable, index);
      const randomFactor = 0.95 + Math.random() * 0.1; // Random factor between 0.95 and 1.05
      
      const actualPrice = index <= currentMonth
        ? Math.round(basePrice * seasonFactor * randomFactor)
        : null;
      
      // For predictions, add a trend factor
      const trendFactor = index > currentMonth ? 1 + (index - currentMonth) * 0.01 : 1;
      const predictedPrice = index > currentMonth
        ? Math.round(basePrice * seasonFactor * randomFactor * trendFactor)
        : null;
      
      // Historical data for previous year
      const historicalPrice = Math.round(basePrice * seasonFactor * 0.9 * (0.95 + Math.random() * 0.1));
      
      return {
        name: month,
        actual: actualPrice,
        predicted: predictedPrice,
        historical: historicalPrice
      };
    });
  };

  const data = generateMockData(vegetable, region);
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-sm">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ₹${entry.value}/kg`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="line">
        <div className="flex justify-between items-center">
          <CardTitle>Price Trend & Prediction ({region === "north" ? "North India" : "South India"})</CardTitle>
          <TabsList>
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="area">Area</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="line" className="mt-4">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis 
                  label={{ value: 'Price (₹/kg)', angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="historical"
                  name="Last Year"
                  stroke="#9CA3AF"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual Price"
                  stroke="#2E7D32"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  name="Predicted Price"
                  stroke="#FFC107"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="area" className="mt-4">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis 
                  label={{ value: 'Price (₹/kg)', angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="historical"
                  name="Last Year"
                  stroke="#9CA3AF"
                  fill="#9CA3AF"
                  fillOpacity={0.2}
                  activeDot={{ r: 6 }}
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  name="Actual Price"
                  stroke="#2E7D32"
                  fill="#2E7D32"
                  fillOpacity={0.2}
                  activeDot={{ r: 6 }}
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  name="Predicted Price"
                  stroke="#FFC107"
                  fill="#FFC107"
                  fillOpacity={0.2}
                  strokeDasharray="5 5"
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

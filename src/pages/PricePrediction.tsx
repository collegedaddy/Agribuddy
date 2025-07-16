
import { Dashboard } from "@/components/layout/Dashboard";
import { PricePredictionChart } from "@/components/prediction/PricePredictionChart";
import { VegetableSelector } from "@/components/prediction/VegetableSelector";
import { PricePredictionCard } from "@/components/prediction/PricePredictionCard";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PricePrediction = () => {
  const [selectedVegetable, setSelectedVegetable] = useState("tomato");
  const [selectedRegion, setSelectedRegion] = useState("north");

  return (
    <Dashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vegetable Price Prediction</h1>
          <p className="text-muted-foreground mt-2">
            Predict vegetable prices for the next 3 months based on historical data and market trends
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <VegetableSelector 
            selectedVegetable={selectedVegetable} 
            selectedRegion={selectedRegion}
            onSelect={setSelectedVegetable} 
            onRegionChange={setSelectedRegion}
          />
          <PricePredictionCard 
            vegetable={selectedVegetable} 
            region={selectedRegion}
          />
        </div>

        <Card>
          <CardContent className="pt-6">
            <PricePredictionChart 
              vegetable={selectedVegetable} 
              region={selectedRegion}
            />
          </CardContent>
        </Card>
      </div>
    </Dashboard>
  );
};

export default PricePrediction;

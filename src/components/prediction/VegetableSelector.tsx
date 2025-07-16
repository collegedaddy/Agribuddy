
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VegetableSelectorProps {
  selectedVegetable: string;
  selectedRegion: string;
  onSelect: (value: string) => void;
  onRegionChange: (value: string) => void;
}

export const VegetableSelector = ({ 
  selectedVegetable, 
  selectedRegion, 
  onSelect, 
  onRegionChange 
}: VegetableSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVegetables, setFilteredVegetables] = useState<{id: string, name: string}[]>([]);
  
  const vegetables = [
    { id: "tomato", name: "Tomato" },
    { id: "potato", name: "Potato" },
    { id: "onion", name: "Onion" },
    { id: "cucumber", name: "Cucumber" },
    { id: "carrot", name: "Carrot" },
    { id: "cabbage", name: "Cabbage" },
    { id: "cauliflower", name: "Cauliflower" },
    { id: "broccoli", name: "Broccoli" },
    { id: "spinach", name: "Spinach" },
    { id: "okra", name: "Okra" },
    { id: "eggplant", name: "Eggplant" },
    { id: "bell_pepper", name: "Bell Pepper" },
    { id: "bitter_gourd", name: "Bitter Gourd" },
    { id: "bottle_gourd", name: "Bottle Gourd" },
    { id: "pumpkin", name: "Pumpkin" },
    { id: "radish", name: "Radish" },
    { id: "green_beans", name: "Green Beans" },
    { id: "peas", name: "Peas" },
    { id: "beetroot", name: "Beetroot" },
    { id: "garlic", name: "Garlic" },
    { id: "ginger", name: "Ginger" },
    { id: "green_chilli", name: "Green Chilli" },
    { id: "lettuce", name: "Lettuce" },
    { id: "mushroom", name: "Mushroom" },
    { id: "sweet_potato", name: "Sweet Potato" },
    { id: "taro_root", name: "Taro Root" },
  ];

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredVegetables(vegetables);
    } else {
      const filtered = vegetables.filter(veg => 
        veg.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVegetables(filtered);
    }
  }, [searchTerm]);

  // Initialize with all vegetables
  useEffect(() => {
    setFilteredVegetables(vegetables);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Vegetable</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Region</label>
          <Select value={selectedRegion} onValueChange={onRegionChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="north">North India</SelectItem>
              <SelectItem value="south">South India</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vegetables..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <ScrollArea className="h-[200px]">
          <div className="space-y-1">
            {filteredVegetables.map((veg) => (
              <Badge 
                key={veg.id}
                variant={selectedVegetable === veg.id ? "default" : "outline"}
                className="mr-1 mb-1 cursor-pointer"
                onClick={() => onSelect(veg.id)}
              >
                {selectedVegetable === veg.id && <Check className="mr-1 h-3 w-3" />}
                {veg.name}
              </Badge>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

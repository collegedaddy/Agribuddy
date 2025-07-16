
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// List of Indian states for the dropdown
const indianStates = [
  { value: "andhra", label: "Andhra Pradesh" },
  { value: "arunachal", label: "Arunachal Pradesh" },
  { value: "assam", label: "Assam" },
  { value: "bihar", label: "Bihar" },
  { value: "chattisgarh", label: "Chattisgarh" },
  { value: "delhi", label: "Delhi" },
  { value: "goa", label: "Goa" },
  { value: "gujarat", label: "Gujarat" },
  { value: "haryana", label: "Haryana" },
  { value: "himachal", label: "Himachal Pradesh" },
  { value: "j&k", label: "Jammu & Kashmir" },
  { value: "jharkhand", label: "Jharkhand" },
  { value: "karnataka", label: "Karnataka" },
  { value: "kerala", label: "Kerala" },
  { value: "mp", label: "Madhya Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "manipur", label: "Manipur" },
  { value: "meghalaya", label: "Meghalaya" },
  { value: "mizoram", label: "Mizoram" },
  { value: "nagaland", label: "Nagaland" },
  { value: "orissa", label: "Orissa" },
  { value: "punjab", label: "Punjab" },
  { value: "rajasthan", label: "Rajasthan" },
  { value: "sikkim", label: "Sikkim" },
  { value: "tamil", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
  { value: "tripura", label: "Tripura" },
  { value: "up", label: "Uttar Pradesh" },
  { value: "uttarakhand", label: "Uttarakhand" },
  { value: "wb", label: "West Bengal" },
];

// Major districts mapped to states for the dropdown
const districtsMap: Record<string, Array<{ value: string, label: string }>> = {
  "haryana": [
    { value: "sonipat", label: "Sonipat" },
    { value: "karnal", label: "Karnal" },
    { value: "panipat", label: "Panipat" },
    { value: "hisar", label: "Hisar" },
    { value: "gurugram", label: "Gurugram" },
    { value: "faridabad", label: "Faridabad" },
    { value: "ambala", label: "Ambala" },
  ],
  "punjab": [
    { value: "amritsar", label: "Amritsar" },
    { value: "ludhiana", label: "Ludhiana" },
    { value: "jalandhar", label: "Jalandhar" },
    { value: "patiala", label: "Patiala" },
    { value: "bathinda", label: "Bathinda" },
  ],
  "rajasthan": [
    { value: "jaipur", label: "Jaipur" },
    { value: "jodhpur", label: "Jodhpur" },
    { value: "udaipur", label: "Udaipur" },
    { value: "kota", label: "Kota" },
    { value: "bikaner", label: "Bikaner" },
    { value: "ajmer", label: "Ajmer" },
  ],
  "up": [
    { value: "lucknow", label: "Lucknow" },
    { value: "kanpur", label: "Kanpur" },
    { value: "agra", label: "Agra" },
    { value: "varanasi", label: "Varanasi" },
    { value: "meerut", label: "Meerut" },
    { value: "ghaziabad", label: "Ghaziabad" },
    { value: "noida", label: "Noida" },
  ],
  "default": [
    { value: "district1", label: "District 1" },
    { value: "district2", label: "District 2" },
    { value: "district3", label: "District 3" },
  ]
};

export function FarmSettings({ onSave }: { onSave: () => void }) {
  const { session } = useAuth();
  const { toast } = useToast();
  const [farmName, setFarmName] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [state, setState] = useState("haryana");
  const [district, setDistrict] = useState("sonipat");
  const [village, setVillage] = useState("");
  const [crops, setCrops] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [availableDistricts, setAvailableDistricts] = useState(districtsMap.haryana);
  
  // Update districts when state changes
  const handleStateChange = (stateValue: string) => {
    setState(stateValue);
    
    // Set available districts for the selected state
    const stateDistricts = districtsMap[stateValue] || districtsMap.default;
    setAvailableDistricts(stateDistricts);
    
    // Default to first district if current one isn't available
    if (!stateDistricts.some(d => d.value === district)) {
      setDistrict(stateDistricts[0].value);
    }
  };
  
  useEffect(() => {
    const fetchFarmData = async () => {
      if (!session?.user.id) return;
      
      try {
        setLoading(true);
        // Get user metadata from auth
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;
        
        if (userData.user) {
          const metadata = userData.user.user_metadata;
          if (metadata) {
            setFarmSize(metadata.farm_size || "25");
          }
        }
        
        // Get profile data
        const { data, error } = await supabase
          .from("profiles")
          .select("location, crops, farm_name, village, district, state")
          .eq("id", session.user.id)
          .maybeSingle();
        
        if (error) throw error;
        
        if (data) {
          if (data.farm_name) {
            setFarmName(data.farm_name);
          }
          
          // Use direct fields if available
          if (data.village) {
            setVillage(data.village);
          }
          
          if (data.district) {
            // First set state to ensure districts are available
            if (data.state) {
              setState(data.state);
              const stateDistricts = districtsMap[data.state] || districtsMap.default;
              setAvailableDistricts(stateDistricts);
            }
            setDistrict(data.district);
          }
          
          if (data.state) {
            setState(data.state);
          }
          
          // Fallback to parsing location if direct fields aren't set
          if ((!data.village || !data.district || !data.state) && data.location) {
            // Try to extract district and state from location (if formatted as "Village, District, State")
            const parts = data.location.split(',').map(part => part.trim());
            
            if (parts.length >= 1 && !data.village) {
              setVillage(parts[0]);
            }
            
            if (parts.length >= 2 && !data.district) {
              // Try to match district name to available districts
              const districtPart = parts[parts.length - 2].toLowerCase();
              for (const [stateKey, districts] of Object.entries(districtsMap)) {
                for (const district of districts) {
                  if (districtPart.includes(district.label.toLowerCase())) {
                    if (!data.state) setState(stateKey);
                    setDistrict(district.value);
                    break;
                  }
                }
              }
            }
            
            if (parts.length >= 3 && !data.state) {
              // Try to match state name to available states
              const statePart = parts[parts.length - 1].toLowerCase();
              for (const state of indianStates) {
                if (statePart.includes(state.label.toLowerCase())) {
                  setState(state.value);
                  break;
                }
              }
            }
          }
          
          if (data.crops) {
            setCrops(data.crops);
          }
        }
      } catch (error) {
        console.error("Error fetching farm data:", error);
        toast({
          title: "Error",
          description: "Failed to load farm data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchFarmData();
  }, [session, toast]);
  
  const handleCropToggle = (cropId: string) => {
    setCrops(prev => 
      prev.includes(cropId)
        ? prev.filter(id => id !== cropId)
        : [...prev, cropId]
    );
  };
  
  // Get state display name
  const getStateDisplayName = (stateCode: string) => {
    const state = indianStates.find(s => s.value === stateCode);
    return state ? state.label : stateCode;
  };
  
  // Get district display name
  const getDistrictDisplayName = (districtCode: string) => {
    const district = availableDistricts.find(d => d.value === districtCode);
    return district ? district.label : districtCode;
  };
  
  const handleSaveSettings = async () => {
    if (!session?.user.id) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save your farm details.",
        variant: "destructive",
      });
      return;
    }
    
    if (!farmName) {
      toast({
        title: "Farm name required",
        description: "Please enter a name for your farm.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Get display names for state and district
      const districtDisplayName = getDistrictDisplayName(district);
      const stateDisplayName = getStateDisplayName(state);
      
      // Construct full address from components
      const fullAddress = `${village ? village + ", " : ""}${districtDisplayName}, ${stateDisplayName}`;
      
      // Update profile in the database with both location and individual fields
      const { error } = await supabase
        .from("profiles")
        .update({
          location: fullAddress,
          village: village,
          district: district,
          state: state,
          crops: crops,
          farm_name: farmName,
          updated_at: new Date().toISOString()
        })
        .eq("id", session.user.id);
      
      if (error) throw error;
      
      // Update metadata for farm size
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { 
          farm_size: farmSize
        }
      });
      
      if (metadataError) throw metadataError;
      
      toast({
        title: "Farm details saved",
        description: "Your farm information has been updated successfully.",
      });
      
      onSave();
    } catch (error: any) {
      console.error("Error saving farm settings:", error);
      toast({
        title: "Save failed",
        description: error.message || "Failed to save farm details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Farm Details</CardTitle>
        <CardDescription>
          Information about your farming operations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="farm-name">Farm Name</Label>
            <Input 
              id="farm-name" 
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              placeholder="Enter your farm name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="farm-size">Total Land Area (in acres)</Label>
            <Input 
              id="farm-size" 
              type="number" 
              value={farmSize}
              onChange={(e) => setFarmSize(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="village">City/Village/Town</Label>
          <Input 
            id="village" 
            placeholder="Enter your city, village or town" 
            value={village}
            onChange={(e) => setVillage(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="farm-state">State</Label>
            <Select 
              value={state}
              onValueChange={handleStateChange}
            >
              <SelectTrigger id="farm-state">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {indianStates.map(state => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="farm-district">District</Label>
            <Select 
              value={district}
              onValueChange={setDistrict}
            >
              <SelectTrigger id="farm-district">
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {availableDistricts.map(district => (
                  <SelectItem key={district.value} value={district.value}>
                    {district.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Separator />
        <div className="space-y-2">
          <Label>Primary Crops</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="wheat" 
                checked={crops.includes("wheat")}
                onCheckedChange={() => handleCropToggle("wheat")}
              />
              <Label htmlFor="wheat">Wheat</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="rice" 
                checked={crops.includes("rice")}
                onCheckedChange={() => handleCropToggle("rice")}
              />
              <Label htmlFor="rice">Rice</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="cotton" 
                checked={crops.includes("cotton")}
                onCheckedChange={() => handleCropToggle("cotton")}
              />
              <Label htmlFor="cotton">Cotton</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="sugarcane" 
                checked={crops.includes("sugarcane")}
                onCheckedChange={() => handleCropToggle("sugarcane")}
              />
              <Label htmlFor="sugarcane">Sugarcane</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="maize" 
                checked={crops.includes("maize")}
                onCheckedChange={() => handleCropToggle("maize")}
              />
              <Label htmlFor="maize">Maize</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="pulses" 
                checked={crops.includes("pulses")}
                onCheckedChange={() => handleCropToggle("pulses")}
              />
              <Label htmlFor="pulses">Pulses</Label>
            </div>
          </div>
          
          {/* Show custom crops */}
          {crops.filter(crop => !["wheat", "rice", "cotton", "sugarcane", "maize", "pulses"].includes(crop)).length > 0 && (
            <div className="pt-4">
              <Label>Other Crops:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {crops
                  .filter(crop => !["wheat", "rice", "cotton", "sugarcane", "maize", "pulses"].includes(crop))
                  .map(crop => (
                    <div 
                      key={crop} 
                      className="bg-muted px-3 py-1 rounded-full flex items-center"
                    >
                      <span className="mr-1 capitalize">{crop}</span>
                      <button 
                        onClick={() => handleCropToggle(crop)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        ×
                      </button>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings} disabled={loading}>
          {loading ? "Saving..." : "Save Farm Details"}
        </Button>
      </CardFooter>
    </Card>
  );
}


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, MapIcon, Loader2 } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { StepProps } from "./types";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function LocationStep({ data, updateData }: StepProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [locationFetched, setLocationFetched] = useState(false);

  // Fetch location data from pincode
  const fetchLocationFromPincode = async () => {
    const pincode = data.postalCode.trim();
    
    if (!pincode || !/^\d{6}$/.test(pincode)) {
      toast({
        title: "Invalid pincode",
        description: "Please enter a valid 6-digit pincode",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
        const postOfficeData = data[0].PostOffice[0];
        
        updateData({
          district: postOfficeData.District,
          state: postOfficeData.State,
          village: postOfficeData.Name || postOfficeData.Block || ""
        });
        
        setLocationFetched(true);
        
        toast({
          title: "Location found",
          description: `Found ${postOfficeData.Name}, ${postOfficeData.District}, ${postOfficeData.State}`,
        });
      } else {
        toast({
          title: "Location not found",
          description: "Please check your pincode and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      toast({
        title: "Error fetching location",
        description: "Please check your internet connection and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardContent>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code (Pincode)</Label>
          <div className="flex space-x-2">
            <Input 
              id="postalCode" 
              placeholder="Enter your 6-digit pincode" 
              value={data.postalCode}
              onChange={(e) => updateData({ postalCode: e.target.value })}
              className="flex-1"
              maxLength={6}
            />
            <Button 
              type="button"
              onClick={fetchLocationFromPincode}
              disabled={isLoading || !data.postalCode || data.postalCode.length !== 6}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <MapPin className="h-4 w-4 mr-2" />
              )}
              {isLoading ? "Fetching..." : "Find"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Enter your pincode to automatically fetch your location details
          </p>
        </div>
        
        {locationFetched && (
          <div className="rounded-md border p-4 bg-muted/50">
            <div className="flex items-center">
              <MapIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <p className="text-sm font-medium">Location Details</p>
            </div>
            <div className="mt-2 space-y-1 text-sm">
              <p><span className="font-medium">Village/Area:</span> {data.village}</p>
              <p><span className="font-medium">District:</span> {data.district}</p>
              <p><span className="font-medium">State:</span> {data.state}</p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              This location will be used for weather forecasts and agricultural recommendations
            </p>
          </div>
        )}
      </div>
    </CardContent>
  );
}

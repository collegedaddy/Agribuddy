
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

import { PersonalInfoStep } from "./PersonalInfoStep";
import { ContactStep } from "./ContactStep";
import { LocationStep } from "./LocationStep";
import { FarmSizeStep } from "./FarmSizeStep";
import { CropsStep } from "./CropsStep";
import { StepNavigation } from "./StepNavigation";
import { OnboardingFormData } from "./types";
import { LanguageStep } from "./LanguageStep";

// Create a new component for Farm Name input
const FarmNameStep = ({ data, updateData }: { 
  data: OnboardingFormData; 
  updateData: (data: Partial<OnboardingFormData>) => void 
}) => {
  return (
    <div className="px-6 py-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="farm-name" className="block text-sm font-medium">
            Farm Name
          </label>
          <input
            id="farm-name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your farm name"
            value={data.farmName}
            onChange={(e) => updateData({ farmName: e.target.value })}
            required
          />
          <p className="text-xs text-muted-foreground">
            This name will identify your farm in our system
          </p>
        </div>
      </div>
    </div>
  );
};

export function AccountSetupWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps] = useState(7); // 7 total steps including Language preference
  const [loading, setLoading] = useState(false);
  const { session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<OnboardingFormData>({
    fullName: "",
    phoneNumber: "",
    postalCode: "",
    state: "",
    district: "",
    village: "",
    farmSize: "",
    selectedCrops: [],
    farmName: "",
    preferredLanguage: "english" // Default to English
  });

  const updateFormData = (newData: Partial<OnboardingFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  useEffect(() => {
    // Check if user already has a profile
    const fetchUserData = async () => {
      if (!session?.user.id) return;
      
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("location, crops, farm_name, state, district, village")
          .eq("id", session.user.id)
          .maybeSingle();
          
        if (error) throw error;
        
        // Get user metadata from auth
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;
        
        if (userData.user) {
          const metadata = userData.user.user_metadata;
          if (metadata) {
            updateFormData({
              fullName: metadata.full_name || "",
              phoneNumber: metadata.phone_number || "",
              postalCode: metadata.postal_code || "",
              farmSize: metadata.farm_size || "",
              preferredLanguage: metadata.preferred_language || "english"
            });
          }
        }
        
        if (data) {
          // If farm_name exists, set it
          if (data.farm_name) {
            updateFormData({ farmName: data.farm_name });
          }
          
          // If state and district exist, set them
          if (data.state) {
            updateFormData({ state: data.state });
          }
          
          if (data.district) {
            updateFormData({ district: data.district });
          }
          
          if (data.village) {
            updateFormData({ village: data.village });
          }
          
          // If crops exist, set them
          if (data.crops) {
            updateFormData({ selectedCrops: data.crops });
          }
        }
      } catch (error) {
        console.error("Error checking profile:", error);
      }
    };
    
    fetchUserData();
  }, [session]);

  const goToNextStep = () => {
    // Validation per step
    if (currentStep === 1 && !formData.preferredLanguage) {
      toast({
        title: "Language selection required",
        description: "Please select your preferred language.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 2 && !formData.fullName) {
      toast({
        title: "Name required",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 3 && !formData.phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 4 && !formData.farmName) {
      toast({
        title: "Farm name required",
        description: "Please enter a name for your farm.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 5 && !formData.farmSize) {
      toast({
        title: "Farm size required",
        description: "Please enter your farm size in acres.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 6 && !formData.postalCode) {
      toast({
        title: "Postal code required",
        description: "Please enter your postal code and fetch your location details.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 6 && (!formData.state || !formData.district)) {
      toast({
        title: "Location details required",
        description: "Please fetch your location details using your postal code.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!session?.user.id) {
      toast({
        title: "Authentication error",
        description: "Please log in to complete your profile.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    if (formData.selectedCrops.length === 0) {
      toast({
        title: "Crops required",
        description: "Please select at least one crop you grow.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Construct full location from components
      const location = `${formData.village.trim()}, ${formData.district}, ${formData.state}`;
      
      const { error } = await supabase
        .from("profiles")
        .update({
          location,
          crops: formData.selectedCrops,
          farm_name: formData.farmName,
          village: formData.village,
          district: formData.district,
          state: formData.state,
          onboarding_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq("id", session.user.id);
      
      if (error) throw error;
      
      // Store full name, phone number, and preferred language in Supabase auth metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { 
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          postal_code: formData.postalCode,
          farm_size: formData.farmSize,
          preferred_language: formData.preferredLanguage
        }
      });
      
      if (metadataError) throw metadataError;
      
      toast({
        title: "Profile updated",
        description: "Your farming profile has been saved.",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Modified the step order to match requirements - Language step is first
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <LanguageStep data={formData} updateData={updateFormData} />;
      case 2:
        return <PersonalInfoStep data={formData} updateData={updateFormData} />;
      case 3:
        return <ContactStep data={formData} updateData={updateFormData} />;
      case 4:
        return <FarmNameStep data={formData} updateData={updateFormData} />;
      case 5:
        return <FarmSizeStep data={formData} updateData={updateFormData} />;
      case 6:
        return <LocationStep data={formData} updateData={updateFormData} />;
      case 7:
        return <CropsStep data={formData} updateData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <div className="p-4 sm:p-6 md:p-8 w-full max-w-md">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <CardDescription>
              Step {currentStep} of {totalSteps}: {
                currentStep === 1 ? "Language Preference" :
                currentStep === 2 ? "Personal Information" : 
                currentStep === 3 ? "Contact Details" : 
                currentStep === 4 ? "Farm Name" :
                currentStep === 5 ? "Farm Size" : 
                currentStep === 6 ? "Location" : "Crops"
              }
            </CardDescription>
          </CardHeader>
          
          {renderCurrentStep()}
          
          <StepNavigation 
            currentStep={currentStep}
            totalSteps={totalSteps}
            goToPrevious={goToPreviousStep}
            goToNext={goToNextStep}
            isSubmitting={loading}
            isFinalStep={currentStep === totalSteps}
          />
        </Card>
      </div>
    </div>
  );
}

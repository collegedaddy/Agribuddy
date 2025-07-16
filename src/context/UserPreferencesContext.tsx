import { createContext, useState, useEffect, ReactNode, useContext, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

// Define the user preferences type
export interface UserPreferences {
  mapStyle: "satellite" | "topographic" | "standard";
  units: "metric" | "imperial";
  notifications: boolean;
  dataRefreshInterval: number; // in seconds
  mandiRange: number;
  pushNotifications: boolean;
  emailUpdates: boolean;
  autoRefreshWeather: boolean;
  language: "en" | "hi";
}

// Default user preferences
const defaultPreferences: UserPreferences = {
  mapStyle: "standard",
  units: "metric",
  notifications: true,
  dataRefreshInterval: 60,
  mandiRange: 25,
  pushNotifications: true,
  emailUpdates: true,
  autoRefreshWeather: true,
  language: "en",
};

// Context type with both state and update functions
interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => void;
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
  savePreferences: () => void;
  isLoading: boolean;
  hasError: boolean;
}

// Create the context with a default undefined value
export const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

// Props for the provider component
interface UserPreferencesProviderProps {
  children: ReactNode;
}

// Storage key for persisting preferences
const STORAGE_KEY = "agribuddy-user-preferences";

/**
 * Provider component that manages and provides user preferences state
 */
export const UserPreferencesProvider = ({ children }: UserPreferencesProviderProps) => {
  // Initialize state from localStorage or use defaults
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { toast } = useToast();

  // Update a specific preference
  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Update multiple preferences at once
  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  };

  // Reset preferences to defaults
  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  // Display a success message when preferences are saved
  const savePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your preferences have been successfully saved.",
    });
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      preferences,
      updatePreference,
      updatePreferences,
      resetPreferences,
      savePreferences,
      isLoading,
      hasError
    }),
    [preferences, isLoading, hasError]
  );

  return (
    <UserPreferencesContext.Provider value={contextValue}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

/**
 * Custom hook to access and update user preferences
 * @returns User preferences context with preference values and update functions
 */
export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  
  if (context === undefined) {
    throw new Error("useUserPreferences must be used within a UserPreferencesProvider");
  }
  
  return context;
}; 
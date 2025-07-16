import React, { createContext, useState, useContext, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

// Define supported languages
export type SupportedLanguage = "en" | "hi";

// Simple translations for common UI elements (fallback for loading states)
const commonTranslations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    save: "Save",
    cancel: "Cancel",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    settings: "Settings",
    preferences: "Preferences",
    profile: "Profile"
  },
  hi: {
    save: "सहेजें",
    cancel: "रद्द करें",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    settings: "सेटिंग्स",
    preferences: "प्राथमिकताएँ",
    profile: "प्रोफ़ाइल"
  }
};

// Context type
type LanguageContextType = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  translate: (key: string) => string;
  isTranslating: boolean;
  availableLanguages: { value: SupportedLanguage; label: string }[];
};

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider props
type LanguageProviderProps = {
  children: React.ReactNode;
};

// Provider component
export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();
  
  // Available languages
  const availableLanguages = [
    { value: "en" as SupportedLanguage, label: "English" },
    { value: "hi" as SupportedLanguage, label: "हिंदी (Hindi)" }
  ];

  // Set language with animation
  const setLanguage = (lang: SupportedLanguage) => {
    if (lang === language) return;
    
    setIsTranslating(true);
    
    // Short delay to show animation
    setTimeout(() => {
      setLanguageState(lang);
      setIsTranslating(false);
      
      toast({
        title: lang === "en" ? "Language Changed" : "भाषा बदली गई",
        description: lang === "en" 
          ? "Application language has been set to English" 
          : "एप्लिकेशन की भाषा हिंदी पर सेट की गई है",
      });
    }, 300);
  };

  // Translation function
  const translate = (key: string): string => {
    // If key exists in commonTranslations, use it
    if (commonTranslations[language] && commonTranslations[language][key]) {
      return commonTranslations[language][key];
    }
    
    // Fall back to the key itself
    return key;
  };

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      translate,
      isTranslating,
      availableLanguages,
    }),
    [language, isTranslating]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language
export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  
  return context;
} 
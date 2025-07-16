import { useState } from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserPreferences } from "@/context/UserPreferencesContext";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { preferences, updatePreference } = useUserPreferences();
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageChange = (newLanguage: "en" | "hi") => {
    if (preferences.language === newLanguage || isChanging) return;
    
    setIsChanging(true);
    updatePreference("language", newLanguage);
    
    // Reset animation state after a short delay
    setTimeout(() => {
      setIsChanging(false);
    }, 500);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          disabled={isChanging}
        >
          <Languages className={`h-5 w-5 ${isChanging ? 'animate-pulse' : ''}`} />
          <span className="sr-only">{t("languages.changeLanguage")}</span>
          <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
            {preferences.language === "en" ? "EN" : "हि"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("en")} 
          className={preferences.language === "en" ? "bg-muted font-semibold" : ""}
          disabled={isChanging || preferences.language === "en"}
        >
          🇬🇧 {t("languages.english")}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("hi")} 
          className={preferences.language === "hi" ? "bg-muted font-semibold" : ""}
          disabled={isChanging || preferences.language === "hi"}
        >
          🇮🇳 {t("languages.hindi")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
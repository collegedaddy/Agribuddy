
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useUserPreferences } from "@/context/UserPreferencesContext";
import { useTranslation } from "react-i18next";

export function PreferencesSettings({ onSave }: { onSave: () => void }) {
  const { t } = useTranslation();
  const { preferences, updatePreference } = useUserPreferences();

  const handleLanguageChange = (value: string) => {
    updatePreference("language", value as "en" | "hi");
  };

  const handleMandiRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePreference("mandiRange", parseInt(e.target.value) || 25);
  };

  const handleToggleChange = (key: "pushNotifications" | "emailUpdates" | "autoRefreshWeather") => {
    return (checked: boolean) => {
      updatePreference(key, checked);
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("common.preferences")}</CardTitle>
        <CardDescription>
          {t("preferences.customizeExperience")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="language">{t("languages.language")}</Label>
          <Select value={preferences.language} onValueChange={handleLanguageChange}>
            <SelectTrigger id="language">
              <SelectValue placeholder={t("languages.selectLanguage")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">{t("languages.english")}</SelectItem>
              <SelectItem value="hi">{t("languages.hindi")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="nearby-mandis">{t("preferences.mandiRange")}</Label>
          <Input 
            id="nearby-mandis" 
            type="number" 
            value={preferences.mandiRange}
            onChange={handleMandiRangeChange}
          />
        </div>
        <Separator />
        <div className="space-y-4">
          <h4 className="text-sm font-medium">{t("preferences.appSettings")}</h4>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">{t("preferences.pushNotifications")}</Label>
            <Switch 
              id="push-notifications" 
              checked={preferences.pushNotifications}
              onCheckedChange={handleToggleChange("pushNotifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-updates">{t("preferences.emailUpdates")}</Label>
            <Switch 
              id="email-updates" 
              checked={preferences.emailUpdates}
              onCheckedChange={handleToggleChange("emailUpdates")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-refresh">{t("preferences.autoRefreshWeather")}</Label>
            <Switch 
              id="auto-refresh" 
              checked={preferences.autoRefreshWeather}
              onCheckedChange={handleToggleChange("autoRefreshWeather")}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave}>{t("common.save")}</Button>
      </CardFooter>
    </Card>
  );
}

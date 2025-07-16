
import { CardContent } from "@/components/ui/card";
import { StepProps } from "./types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

export function LanguageStep({ data, updateData }: StepProps) {
  const { t } = useTranslation();
  
  return (
    <CardContent>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">{t("languages.selectLanguage")}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select the language you would prefer to use within the application.
          </p>
        </div>
        
        <RadioGroup
          value={data.preferredLanguage}
          onValueChange={(value) => updateData({ preferredLanguage: value })}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="en" id="english" />
            <Label htmlFor="english" className="flex-1 cursor-pointer">
              <div className="font-medium">{t("languages.english")}</div>
              <div className="text-sm text-muted-foreground">Use English as the application language</div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="hi" id="hindi" />
            <Label htmlFor="hindi" className="flex-1 cursor-pointer">
              <div className="font-medium">हिन्दी (Hindi)</div>
              <div className="text-sm text-muted-foreground">एप्लिकेशन भाषा के रूप में हिंदी का उपयोग करें</div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </CardContent>
  );
}

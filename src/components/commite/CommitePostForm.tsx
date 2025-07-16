
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

type Props = {
  onComplete?: () => void;
};

export function CommitePostForm({ onComplete }: Props) {
  const { session } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("commite_posts").insert({
      user_id: session?.user.id,
      title,
      content,
    });
    setLoading(false);
    if (error) {
      toast({ title: t("common.error"), description: error.message, variant: "destructive" });
    } else {
      toast({ title: t("common.success"), variant: "default" });
      setTitle("");
      setContent("");
      // Could trigger a refetch or rely on real-time updates
      window.dispatchEvent(new Event("commite-posted"));
      if (onComplete) onComplete();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-lg">Create Post</h3>
        {onComplete && (
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={onComplete} 
            className="h-8 w-8"
          >
            <X size={18} />
          </Button>
        )}
      </div>
      
      <Input
        placeholder="Title (be specific)..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        maxLength={120}
        required
        className="border-input focus-visible:ring-primary"
      />
      <Textarea
        placeholder="What do you want to share or ask?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        disabled={loading}
        className="min-h-24 border-input focus-visible:ring-primary"
      />
      <div className="flex justify-end pt-1">
        <Button type="submit" disabled={loading || !title}>
          {loading ? t("common.loading") : "Post"}
        </Button>
      </div>
    </form>
  );
}

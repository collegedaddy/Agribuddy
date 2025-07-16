
import { useState } from "react";
import { Reply, MessageSquare, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type ReplyType = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  post_id: string;
};

interface CommiteReplyProps {
  postId: string;
  reply?: ReplyType;
  userName?: string;
  onReplySubmitted?: () => void;
  isEditing?: boolean;
}

export function CommiteReply({ postId, reply, userName, onReplySubmitted, isEditing = false }: CommiteReplyProps) {
  const { session } = useAuth();
  const { toast } = useToast();
  const [content, setContent] = useState(reply?.content || "");
  const [isReplying, setIsReplying] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!session?.user) {
      toast({ title: "Please sign in to reply", variant: "destructive" });
      return;
    }
    
    if (!content.trim()) {
      toast({ title: "Reply cannot be empty", variant: "destructive" });
      return;
    }

    setLoading(true);
    
    try {
      if (reply) {
        // Update existing reply
        const { error } = await supabase
          .from("commite_replies")
          .update({ content, updated_at: new Date().toISOString() })
          .eq("id", reply.id);
          
        if (error) throw error;
      } else {
        // Create new reply
        const { error } = await supabase
          .from("commite_replies")
          .insert({
            post_id: postId,
            user_id: session.user.id,
            content
          });
          
        if (error) throw error;
      }

      toast({ title: reply ? "Reply updated" : "Reply posted" });
      setContent("");
      setIsReplying(false);
      if (onReplySubmitted) onReplySubmitted();
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!reply) return;
    
    try {
      const { error } = await supabase
        .from("commite_replies")
        .delete()
        .eq("id", reply.id);
        
      if (error) throw error;
      
      toast({ title: "Reply deleted" });
      if (onReplySubmitted) onReplySubmitted();
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (reply && !isEditing) {
    return (
      <div className="pl-6 py-2 border-l-2 border-muted mt-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{userName || "User"}</p>
            <p className="text-sm whitespace-pre-line">{reply.content}</p>
          </div>
          {session?.user.id === reply.user_id && (
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setIsReplying(!isReplying)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive" 
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!isReplying && !isEditing) {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        className="mt-2" 
        onClick={() => setIsReplying(true)}
      >
        <Reply className="mr-2 h-4 w-4" />
        Reply
      </Button>
    );
  }

  return (
    <div className="mt-2 space-y-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your reply..."
        className="min-h-[80px]"
      />
      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setIsReplying(false);
            setContent(reply?.content || "");
          }}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Posting..." : (reply ? "Update" : "Reply")}
        </Button>
      </div>
    </div>
  );
}

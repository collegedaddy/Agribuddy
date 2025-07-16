import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { formatDistanceToNow, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CommiteReply } from "./CommiteReply";

type Post = {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  created_at: string;
};

type UserProfile = {
  id: string;
  district?: string | null;
  state?: string | null;
};

type CommitePostListProps = {
  hardcodedPosts?: Post[];
};

export function CommitePostList({ hardcodedPosts = [] }: CommitePostListProps) {
  const { session } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfiles, setUserProfiles] = useState<Record<string, UserProfile>>({});
  const [userNames, setUserNames] = useState<Record<string, string>>({});
  const [repliesByPost, setRepliesByPost] = useState<Record<string, any[]>>({});
  const navigate = useNavigate();

  const fetchUserProfiles = async (userIds: string[]) => {
    const realUserIds = userIds.filter(id => !id.startsWith('guest_user'));
    
    if (realUserIds.length === 0) return;

    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, district, state')
        .in('id', realUserIds);

      if (error) {
        console.error("Error fetching profiles:", error);
        return;
      }

      const newProfiles: Record<string, UserProfile> = {};
      profiles?.forEach(profile => {
        newProfiles[profile.id] = {
          id: profile.id,
          district: profile.district,
          state: profile.state
        };
      });

      setUserProfiles(prev => ({...prev, ...newProfiles}));
      
      if (session) {
        const { data: currentUser } = await supabase.auth.getUser();
        if (currentUser && currentUser.user) {
          const userId = currentUser.user.id;
          const fullName = currentUser.user.user_metadata?.full_name || 
                          currentUser.user.user_metadata?.name || 
                          "User";
          
          setUserNames(prev => ({
            ...prev,
            [userId]: fullName
          }));
        }
      }
    } catch (error) {
      console.error("Error in fetchUserProfiles:", error);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("commite_posts")
      .select("*")
      .order("created_at", { ascending: false });
    
    let dbPosts: Post[] = [];
    if (!error && data) {
      dbPosts = data;
    }
    
    const allPosts = [...hardcodedPosts, ...dbPosts];
    setPosts(allPosts);
    
    const userIds = Array.from(new Set(allPosts.map(p => p.user_id)));
    await fetchUserProfiles(userIds);
    
    setLoading(false);
  };

  const fetchReplies = async () => {
    const { data: replies, error } = await supabase
      .from("commite_replies")
      .select("*")
      .order("created_at", { ascending: true });
      
    if (!error && replies) {
      const grouped = replies.reduce((acc: Record<string, any[]>, reply) => {
        if (!acc[reply.post_id]) acc[reply.post_id] = [];
        acc[reply.post_id].push(reply);
        return acc;
      }, {});
      setRepliesByPost(grouped);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchReplies();
    const handler = () => {
      fetchPosts();
      fetchReplies();
    };
    window.addEventListener("commite-posted", handler);
    const channel = supabase
      .channel('commite-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'commite_posts' }, handler)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'commite_replies' }, handler)
      .subscribe();

    return () => {
      window.removeEventListener("commite-posted", handler);
      supabase.removeChannel(channel);
    };
  }, []);

  const handleUserClick = (userId: string) => {
    if (userId.startsWith('guest_user')) return;
    navigate(`/profile/${userId}`);
  };

  const getUserDisplayName = (userId: string) => {
    if (session?.user.id === userId) {
      return "You";
    } else if (userId.startsWith('guest_user')) {
      return `Farmer${userId.slice(-1)}`;
    } else {
      return userNames[userId] || userId.slice(0, 6);
    }
  };

  if (loading) return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="animate-pulse h-24 rounded-xl bg-muted"></div>
      <div className="animate-pulse h-20 rounded-xl bg-muted"></div>
    </div>
  );
  
  if (!posts.length) return (
    <div className="text-muted-foreground text-center py-12">No posts yet. Be the first to create a post!</div>
  );

  return (
    <div className="flex flex-col gap-4 pb-24 max-w-3xl mx-auto">
      {posts.map((p, idx) => (
        <Card
          key={p.id}
          className={cn(
            "transition-all duration-200 hover:shadow-md",
            "animate-in fade-in slide-in-from-bottom-4",
            idx < 3 && "ring-1 ring-primary/10"
          )}
          style={{ animationDelay: `${idx * 55}ms` }}
        >
          <CardContent className="py-4 px-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-primary/10 rounded-full p-1.5 flex items-center justify-center">
                <UsersRound className="text-primary h-3.5 w-3.5" />
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(parseISO(p.created_at), { addSuffix: true })}
              </span>
              <div 
                className={cn(
                  "ml-auto flex items-center gap-2",
                  !p.user_id.startsWith('guest_user') && "cursor-pointer hover:text-primary transition-colors"
                )}
                onClick={() => handleUserClick(p.user_id)}
              >
                <span className="text-sm font-semibold">
                  {getUserDisplayName(p.user_id)}
                </span>
                {userProfiles[p.user_id]?.district && (
                  <span className="text-xs text-muted-foreground">
                    from {userProfiles[p.user_id].district}
                  </span>
                )}
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
            {p.content && (
              <p className="text-sm text-foreground/90 whitespace-pre-line">{p.content}</p>
            )}
            
            <div className="mt-4 space-y-2">
              {repliesByPost[p.id]?.map((reply) => (
                <CommiteReply
                  key={reply.id}
                  postId={p.id}
                  reply={reply}
                  userName={getUserDisplayName(reply.user_id)}
                  onReplySubmitted={fetchReplies}
                />
              ))}
              <CommiteReply
                postId={p.id}
                onReplySubmitted={fetchReplies}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

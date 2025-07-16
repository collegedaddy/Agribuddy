import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { CommitePostForm } from "@/components/commite/CommitePostForm";
import { CommitePostList } from "@/components/commite/CommitePostList";
import { useState } from "react";
import { CommiteNavbar } from "@/components/commite/CommiteNavbar";
import { CommiteFloatingButton } from "@/components/commite/CommiteFloatingButton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";

const hardcodedPosts = [
  {
    id: "hardcoded1",
    user_id: "guest_user_1",
    title: "What is the best fertilizer for wheat?",
    content: "I've been using urea, but open to suggestions for better yields!",
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
  },
  {
    id: "hardcoded2",
    user_id: "guest_user_2",
    title: "How to prevent mango fruit drop?",
    content:
      "My mangoes keep dropping before ripening. Tips please!",
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 min ago
  },
  {
    id: "hardcoded3",
    user_id: "guest_user_3",
    title: "Show us your fields!",
    content:
      "Let's post some pics of the farm :) (AgriBuddy should add photo upload!)",
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 min ago
  },
];

export default function Commite() {
  const { session } = useAuth();
  const [showPostForm, setShowPostForm] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/auth');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar className="hidden md:block" />
      
      <div className="flex-1">
        <CommiteNavbar />
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="relative">
            {showPostForm && (
              <Card className="mb-6 animate-in fade-in slide-in-from-top-4 duration-300 shadow-md">
                <CardContent className="pt-4 pb-2">
                  <CommitePostForm onComplete={() => setShowPostForm(false)} />
                </CardContent>
              </Card>
            )}
            
            {!session && (
              <Card className="mb-6 border-primary/20">
                <CardContent className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-sm text-center sm:text-left">
                    <p className="font-medium text-foreground">Join the community</p>
                    <p className="text-muted-foreground">Sign in to post or join the discussion</p>
                  </div>
                  <Button onClick={handleSignIn} size="sm" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </CardContent>
              </Card>
            )}

            <CommitePostList hardcodedPosts={hardcodedPosts} />

            <CommiteFloatingButton 
              onClick={() => session ? setShowPostForm(prev => !prev) : handleSignIn()} 
              active={showPostForm} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

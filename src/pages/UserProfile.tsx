import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, User, MapPin, Users } from "lucide-react";

// Mock user data for demo
const MOCK_USERS = {
  "user-1": {
    id: "user-1",
    email: "farmer.singh@example.com",
    fullName: "Farmer Singh",
    created_at: "2023-03-15T10:30:00Z",
    district: "Amritsar",
    state: "Punjab",
    posts: [
      {
        id: "post-1",
        title: "Best practices for wheat cultivation",
        content: "I've been experimenting with new wheat varieties and wanted to share my experiences with the community...",
        created_at: "2023-05-20T08:45:00Z"
      },
      {
        id: "post-2",
        title: "Monsoon preparation tips",
        content: "With monsoon approaching, here are some steps I'm taking to prepare my fields...",
        created_at: "2023-06-10T15:20:00Z"
      }
    ]
  },
  "user-2": {
    id: "user-2",
    email: "priya.patel@example.com",
    fullName: "Priya Patel",
    created_at: "2023-02-10T14:20:00Z",
    district: "Ahmedabad",
    state: "Gujarat",
    posts: [
      {
        id: "post-3",
        title: "Organic farming success story",
        content: "After switching to organic methods last year, I've seen a significant improvement in soil health...",
        created_at: "2023-04-05T11:30:00Z"
      }
    ]
  },
  "current-user": {
    id: "current-user",
    email: "prabjyotsingh996@gmail.com",
    fullName: "Prabjyotsingh996",
    created_at: "2023-01-01T09:00:00Z",
    district: "Bengaluru",
    state: "Karnataka",
    posts: []
  }
};

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const loadingTimer = setTimeout(() => {
      const userIdToUse = userId || "current-user";
      
      // Check if this is the current user
      setIsCurrentUser(userIdToUse === "current-user");
      
      // Get mock user data
      const userData = MOCK_USERS[userIdToUse as keyof typeof MOCK_USERS];
      
      if (userData) {
        setProfile({
          id: userData.id,
          email: userData.email,
          fullName: userData.fullName,
          created_at: userData.created_at,
          district: userData.district,
          state: userData.state
        });
        
        setUserPosts(userData.posts || []);
      }
      
      setLoading(false);
    }, 800); // Simulate network delay
    
    return () => clearTimeout(loadingTimer);
  }, [userId]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded-md w-1/3"></div>
            <div className="h-40 bg-muted rounded-lg"></div>
            <div className="h-20 bg-muted rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto text-center mt-12">
          <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
          <p className="text-muted-foreground mb-6">The user profile you're looking for doesn't exist or is not accessible.</p>
          <Button asChild>
            <Link to="/commite">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Community
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/commite">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Community
          </Link>
        </Button>
        
        <Card className="mb-8 overflow-hidden">
          <div className="h-24 bg-primary/10"></div>
          <div className="-mt-12 px-6">
            <Avatar className="h-20 w-20 border-4 border-background">
              <AvatarFallback className="text-xl">
                {getInitials(profile.fullName || profile.email)}
              </AvatarFallback>
            </Avatar>
          </div>
          // website done by @sachin 
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{profile.fullName}</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center text-muted-foreground">
                <Mail className="mr-2 h-4 w-4" />
                <span>{profile.email}</span>
              </div>
              
              {profile.district && profile.state && (
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{profile.district}, {profile.state}</span>
                </div>
              )}
              
              {isCurrentUser && (
                <div className="pt-2">
                  <Button asChild size="sm" variant="outline">
                    <Link to="/settings">
                      <User className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Community Posts
          </h2>
          <Separator className="my-4" />
        </div>
        
        {userPosts.length > 0 ? (
          <div className="space-y-4">
            {userPosts.map(post => (
              <Card key={post.id}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Posted {new Date(post.created_at).toLocaleDateString()}
                  </p>
                  {post.content && (
                    <p className="text-foreground/90">{post.content}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            {isCurrentUser ? "You haven't created any posts yet." : "This user hasn't created any posts yet."}
          </div>
        )}
      </div>
    </div>
  );
}

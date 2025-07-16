import { useState, useRef, useEffect } from "react";
import { Dashboard } from "@/components/layout/Dashboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send, ArrowDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

// Hardcoded responses for demo mode
const demoResponses: Record<string, string> = {
  "default": "I understand your question about farming. Could you provide more details so I can assist you better?",
  "weather": "Currently, the weather forecast shows sunny conditions for the next 3 days with temperatures ranging from 25-32°C. It's a good time for field work, but be sure to stay hydrated.",
  "crops": "For this season, rice, cotton, and maize are showing good market potential. Consider your soil type and water availability before making a decision.",
  "pest": "Based on your description, it sounds like aphid infestation. I recommend using neem oil spray (15-20 ml per liter of water) early in the morning. It's organic and effective for controlling aphids.",
  "fertilizer": "For balanced nutrition, I recommend applying NPK 10-26-26 at 100kg/hectare before sowing, followed by urea application at tillering stage. Always follow soil test recommendations for best results.",
  "irrigation": "Given the current conditions, drip irrigation would be most efficient. For your crop, maintain soil moisture at field capacity with irrigation every 3-4 days depending on temperature.",
  "market": "Current mandi prices show wheat at ₹2100-2250 per quintal and rice at ₹1950-2100 per quintal. Prices are expected to remain stable for the next week.",
  "scheme": "You may qualify for the PM-KISAN scheme which provides ₹6000 per year in three installments. Registration is done at your local agriculture office with your Aadhaar card and land records.",
  "loan": "KCC (Kisan Credit Card) offers crop loans up to ₹3 lakh at 7% interest rate with an additional 3% rebate for timely repayment. Visit your nearest bank branch with land records and ID proof to apply.",
  "seed": "For your region, the recommended wheat varieties are HD-2967 and PBW-550, which have good disease resistance and yield potential. Seed treatment with Thiram@2g/kg is recommended before sowing."
};

// Function to find a matching response based on keywords
const findMatchingResponse = (userInput: string): string => {
  const lowerInput = userInput.toLowerCase();
  
  if (lowerInput.includes("weather") || lowerInput.includes("forecast") || lowerInput.includes("rain")) {
    return demoResponses.weather;
  } else if (lowerInput.includes("crop") || lowerInput.includes("grow") || lowerInput.includes("plant")) {
    return demoResponses.crops;
  } else if (lowerInput.includes("pest") || lowerInput.includes("insect") || lowerInput.includes("disease")) {
    return demoResponses.pest;
  } else if (lowerInput.includes("fertilizer") || lowerInput.includes("nutrients") || lowerInput.includes("npk")) {
    return demoResponses.fertilizer;
  } else if (lowerInput.includes("water") || lowerInput.includes("irrigation")) {
    return demoResponses.irrigation;
  } else if (lowerInput.includes("price") || lowerInput.includes("market") || lowerInput.includes("sell")) {
    return demoResponses.market;
  } else if (lowerInput.includes("scheme") || lowerInput.includes("subsidy") || lowerInput.includes("government")) {
    return demoResponses.scheme;
  } else if (lowerInput.includes("loan") || lowerInput.includes("credit") || lowerInput.includes("finance")) {
    return demoResponses.loan;
  } else if (lowerInput.includes("seed") || lowerInput.includes("variety") || lowerInput.includes("sowing")) {
    return demoResponses.seed;
  }
  
  return demoResponses.default;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [preferredLanguage, setPreferredLanguage] = useState("english");

  // website done by @sachin 
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = preferredLanguage === "hindi" 
        ? "नमस्ते! मैं AgriBuddy हूँ, आपका कृषि सहायक। आज मैं आपकी खेती से संबंधित प्रश्नों में कैसे मदद कर सकता हूँ?"
        : "Hello! I'm AgriBuddy, your agriculture assistant. How can I help you with your farming questions today?";
      
      setMessages([
        {
          id: "welcome",
          content: welcomeMessage,
          role: "assistant",
          timestamp: new Date()
        }
      ]);
    }
  }, [preferredLanguage]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputMessage.trim(),
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setIsError(false);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get appropriate response based on user message
      const responseText = findMatchingResponse(userMessage.content);
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: responseText,
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error: any) {
      console.error("Chat error:", error);
      setIsError(true);
      setErrorMessage("Something went wrong. Please try again.");
      
      toast({
        title: "Chat Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage();
    }
  };

  const scrollToBottomButton = () => {
    if (!messagesContainerRef.current) return null;
      // website done by @sachin 
    const container = messagesContainerRef.current;
    const isScrolledToBottom = 
      container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
    
    if (!isScrolledToBottom && messages.length > 2) {
      return (
        <Button
          className="absolute bottom-20 right-8 rounded-full shadow-lg"
          size="icon"
          onClick={scrollToBottom}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      );
    }
    
    return null;
  };

  return (
    <Dashboard>
      <div className="container mx-auto px-4 h-full flex flex-col">
        <Card className="flex flex-col flex-1 shadow-md">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-agribuddy-primary text-white">AB</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>AgriBuddy Assistant</CardTitle>
                <CardDescription>
                  {preferredLanguage === "hindi" 
                    ? "आपका कृषि सहायक" 
                    : "Your agriculture companion"}
                </CardDescription>
              </div>
              <Badge className="ml-auto">
                {preferredLanguage === "hindi" ? "AI-संचालित" : "AI-Powered"}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden">
            <div 
              ref={messagesContainerRef}
              className="h-full overflow-y-auto pr-4"
              style={{ maxHeight: "calc(100vh - 300px)" }}
            >
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === "user"
                          ? "bg-agribuddy-primary text-white"
                          : "bg-muted"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <ReactMarkdown className="prose prose-sm max-w-none dark:prose-invert">
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        <p>{message.content}</p>
                      )}
                      <div
                        className={`text-xs mt-1 ${
                          message.role === "user" ? "text-agribuddy-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-lg px-4 py-2 bg-muted flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p className="text-sm">
                        {preferredLanguage === "hindi" 
                          ? "AgriBuddy सोच रहा है..." 
                          : "AgriBuddy is thinking..."}
                      </p>
                    </div>
                  </div>
                )}
                
                {isError && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}
                
                <div ref={endOfMessagesRef} />
              </div>
            </div>
            {scrollToBottomButton()}
          </CardContent>
          
          <CardFooter className="border-t p-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder={preferredLanguage === "hindi" ? "अपना प्रश्न यहां टाइप करें..." : "Type your message here..."}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={sendMessage} 
                    disabled={isLoading || !inputMessage.trim()}
                    size="icon"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send message</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Dashboard>
  );
};

export default Chatbot;

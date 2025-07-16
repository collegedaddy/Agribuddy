
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { Leaf, User } from "lucide-react";

export type MessageType = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} max-w-[80%] gap-3`}>
        <Avatar className={`${isUser ? "bg-green-100" : "bg-green-600"} h-8 w-8`}>
          <AvatarFallback className={`${isUser ? "text-green-600" : "text-white"}`}>
            {isUser ? <User className="h-4 w-4" /> : <Leaf className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
        
        <div className={`rounded-lg px-4 py-2 shadow-sm ${
          isUser 
            ? "bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-100" 
            : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        }`}>
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <ReactMarkdown className="prose dark:prose-invert prose-sm max-w-none">
              {message.content}
            </ReactMarkdown>
          )}
          <div className={`text-xs mt-1 ${isUser ? "text-green-700/70" : "text-gray-500"}`}>
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>
    </div>
  );
};

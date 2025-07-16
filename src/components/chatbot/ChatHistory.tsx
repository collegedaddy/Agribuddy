
import { useEffect, useRef } from "react";
import { ChatMessage, MessageType } from "./ChatMessage";

interface ChatHistoryProps {
  messages: MessageType[];
}

export const ChatHistory = ({ messages }: ChatHistoryProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">👋 Welcome to AgriBuddy AI Assistant!</p>
            <p>Ask me anything about farming, crops, or market prices.</p>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

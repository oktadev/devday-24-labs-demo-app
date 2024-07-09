"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MessagesSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { askChatbot } from "@/app/actions";
import { FormEvent, useState } from "react";

type Message = {
  text: string;
  isBot: boolean;
};

const initialState: Message[] = [
  { text: "Hello, how can I help you?", isBot: true },
];

export default function Chatbot() {
  const [messages, setMessages] = useState(initialState);
  const [newMessage, setNewMessage] = useState("");

  async function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    setMessages((prev) => [...prev, { text: newMessage, isBot: false }]);
    const answer = await askChatbot(newMessage);
    console.log(answer.data);
    setNewMessage("");
    setMessages((prev) => [...prev, { text: answer.data || "", isBot: true }]);
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 mr-4 mb-4">
      <Popover data-side="right">
        <PopoverTrigger>
          <Button className="rounded-full h-14 w-14">
            <MessagesSquare />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col">
          <div className="h-96 overflow-y-scroll space-5-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-md ${
                  message.isBot ? "bg-gray-100" : "bg-blue-100"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={onFormSubmit} className="flex space-x-4">
            <Input
              type="text"
              placeholder="Type a message"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
            />
            <Button type="submit">Send</Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}

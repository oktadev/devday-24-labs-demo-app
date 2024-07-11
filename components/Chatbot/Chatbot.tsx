"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { AlertCircle, MessagesSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { askChatbot } from "@/app/actions";
import { ChatbotMessage } from "@/data/ai";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type ChatbotState = {
  messages: ChatbotMessage[];
  newMessage: string;
  answering: boolean;
};

const initialState: ChatbotState = {
  messages: [],
  newMessage: "",
  answering: false,
};

export default function Chatbot() {
  const [chatbotState, setChatbotState] = useState(initialState);

  function AlwaysScrollToBottom() {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => elementRef.current?.scrollIntoView());
    return <div ref={elementRef} />;
  }

  async function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    const { newMessage } = chatbotState;
    const newMessages: ChatbotMessage[] = [
      ...chatbotState.messages,
      { content: newMessage, role: "user" },
    ];

    setChatbotState((prev) => ({
      ...prev,
      messages: newMessages,
      newMessage: "",
      answering: true,
    }));

    const answer = await askChatbot(newMessages);

    setChatbotState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        { content: answer.data || "", role: "assistant" },
      ],
      answering: false,
    }));
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 mr-4 mb-4">
      <Popover data-side="right">
        <PopoverTrigger>
          <Button className="rounded-full h-14 w-14">
            <MessagesSquare />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col w-96 mr-4 mb-4">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              Complete the &quot;Building Safe & Reliable AI Systems&quot; to
              secure this chatbot!
            </AlertDescription>
          </Alert>
          <div className="h-96 flex flex-col overflow-y-scroll space-y-4">
            {chatbotState.messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-md w-64 ${
                  message.role === "assistant"
                    ? "bg-gray-100"
                    : "bg-blue-100 self-end"
                }`}
              >
                {message.content}
              </div>
            ))}
            <AlwaysScrollToBottom />
          </div>
          <form onSubmit={onFormSubmit} className="flex space-x-4">
            <Input
              type="text"
              placeholder="Type a message"
              value={chatbotState.newMessage}
              onChange={(event) =>
                setChatbotState({
                  ...chatbotState,
                  newMessage: event.target.value,
                })
              }
            />
            <Button type="submit" disabled={chatbotState.answering}>
              Send
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}

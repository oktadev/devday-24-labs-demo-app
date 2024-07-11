"use server";
import "server-only";

import {
  pipeline,
  Message,
  AllTasks,
  TextGenerationSingle,
} from "@xenova/transformers";

export type ChatbotMessage = Message;

// Use the Singleton pattern to enable lazy construction of the pipeline.
class TokenizerSingleton {
  static instance: Promise<AllTasks["text-generation"]> | null = null;

  static async getInstance() {
    if (this.instance === null) {
      this.instance = pipeline("text-generation", "Xenova/Qwen1.5-0.5B-Chat");
    }
    return this.instance;
  }
}

export async function getAIResponse(chat: ChatbotMessage[]): Promise<string> {
  console.log("Loading model...");
  console.time("Model loaded in");
  const textGenerator = await TokenizerSingleton.getInstance();
  console.timeEnd("Model loaded in");

  const messages = [
    {
      role: "assistant",
      content:
        "You are a friendly chatbot that helps with identity, authentication and authorization related questions.",
    },
    ...chat,
  ];

  console.log("Generating response...");
  console.time("Response generated in");
  const result = await textGenerator(messages, { max_new_tokens: 128 });
  console.time("Response generated in");

  if (!Array.isArray(result) || result.length === 0) {
    throw Error("Error generating a response");
  }

  const generated_text = (result[0] as TextGenerationSingle).generated_text;

  if (typeof generated_text === "string") {
    return generated_text;
  }

  if (Array.isArray(generated_text) && generated_text.length > 0) {
    return generated_text[generated_text.length - 1].content;
  }

  throw Error("Error generating a response");
}

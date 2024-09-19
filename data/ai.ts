"use server";
import "server-only";

import {
  pipeline,
  Message,
  AllTasks,
} from "@xenova/transformers";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Embeddings } from "@langchain/core/embeddings";
import { Document } from "@langchain/core/documents";
import OpenAI from "openai";

export type ChatbotMessage = Message;

const useOpenAI = process.env.OPENAI_API_KEY !== undefined;
const openai = useOpenAI ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

class DistilBERTEmbeddings implements Embeddings {
  private model: any;

  constructor() {
    this.model = null;
  }

  async initialize() {
    if (!this.model) {
      this.model = await pipeline('feature-extraction', 'Xenova/distilbert-base-uncased');
    }
  }

  async embedDocuments(documents: string[]): Promise<number[][]> {
    await this.initialize();
    return Promise.all(documents.map(doc => this.embedQuery(doc)));
  }

  async embedQuery(text: string): Promise<number[]> {
    await this.initialize();
    const output = await this.model(text);
    const embeddingArray = Array.from(output.data);
    const [, numTokens, embeddingSize] = output.dims;

    const sentenceEmbedding = new Array(embeddingSize).fill(0);
    for (let i = 0; i < numTokens; i++) {
      const start = i * embeddingSize;
      for (let j = 0; j < embeddingSize; j++) {
        sentenceEmbedding[j] += embeddingArray[start + j];
      }
    }
    return sentenceEmbedding.map(val => val / numTokens);
  }
}

class TokenizerSingleton {
  private static instance: Promise<AllTasks["text-generation"]> | null = null;

  static async getInstance() {
    if (!this.instance) {
      this.instance = pipeline("text-generation", "Xenova/Qwen1.5-0.5B-Chat");
    }
    return this.instance;
  }
}

class MemoryVectorStoreSingleton {
  private static instance: MemoryVectorStore | null = null;

  static async getInstance() {
    if (!this.instance) {
      const embeddings = new DistilBERTEmbeddings();
      await embeddings.initialize();
      this.instance = new MemoryVectorStore(embeddings);

      const documents = [
        new Document({ pageContent: "Authentication is the process of verifying the identity of a user or system.", metadata: { source: "https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization" } }),
        new Document({ pageContent: "Authorization determines what resources an authenticated user or system can access and what actions they can perform.", metadata: { source: "https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization" } }),
        new Document({ pageContent: "Identity verification may involve various methods such as passwords, biometrics, or multi-factor authentication.", metadata: { source: "https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization" } }),
        new Document({ pageContent: "Multi-factor authentication (MFA) requires two or more verification factors, increasing security.", metadata: { source: "https://auth0.com/docs/secure/multi-factor-authentication" } }),
        new Document({ pageContent: "Single Sign-On (SSO) allows users to access multiple applications with one set of login credentials.", metadata: { source: "https://auth0.com/docs/authenticate/single-sign-on" } }),
      ];

      await this.instance.addDocuments(documents);
    }
    return this.instance;
  }
}

export async function getAIResponse(chat: ChatbotMessage[]): Promise<string> {
  console.log("Starting getAIResponse function...");

  const vectorStore = await MemoryVectorStoreSingleton.getInstance();
  const userQuery = chat[chat.length - 1].content;

  console.log("User query:", userQuery);

  const searchResults = await vectorStore.asRetriever({
    searchType: "mmr",
    searchKwargs: { fetchK: 3 },
    k: 2,
  }).getRelevantDocuments(userQuery);

  console.log("Search results:", searchResults);

  const numberedContext = searchResults.map((doc, index) => 
    `[${index + 1}] ${doc.pageContent}\nSource: ${doc.metadata.source}`
  ).join('\n\n');

  console.log("Numbered context:", numberedContext);

  const systemMessage = {
    role: "system",
    content: `You are a chatbot that answers questions about identity, authentication, and authorization.`,
  };

  const messages = [systemMessage, { role: "user", content: userQuery }];

  console.log("Messages for AI:", messages);

  let assistantResponse: string;

  if (useOpenAI && openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 100,
        temperature: 0.4,
      });
      assistantResponse = completion.choices[0].message.content || "Error: No response generated";
    } catch (error) {
      console.error("Error using OpenAI:", error);
      assistantResponse = "An error occurred while generating the response.";
    }
  } else {
    const textGenerator = await TokenizerSingleton.getInstance();
    const result = await textGenerator(messages, { 
      max_new_tokens: 100,
      do_sample: true,
      temperature: 0.4,
      top_p: 0.95,
      repetition_penalty: 1.2,
    });

    console.log("Raw result from text generator:", result);

    if (!Array.isArray(result) || result.length === 0 || !result[0].generated_text) {
      throw new Error("Error generating a response");
    }

    assistantResponse = Array.isArray(result[0].generated_text)
      ? result[0].generated_text.find(msg => msg.role === 'assistant')?.content || "Error: No assistant response found"
      : result[0].generated_text;
  }

  console.log("Assistant response before processing:", assistantResponse);

  // Process citations
  const processedResponse = processCitations(assistantResponse, searchResults);


  return processedResponse;
}

// Function to process citations
function processCitations(assistantResponse: string, searchResults: any[]): string {
  let processedResponse = assistantResponse;

  // TODO: Implement citation processing logic here
  // This function should:
  // 1. Replace citation numbers with URLs
  // 2. Add a footer with the sources used
  
  return processedResponse;
}
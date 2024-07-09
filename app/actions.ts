"use server";
import "server-only";

import { pipeline, Text2TextGenerationSingle } from "@xenova/transformers";
import { DataAPI } from "@/data/data";

type ActionResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export async function askChatbot(
  question: string
): Promise<ActionResponse<string>> {
  const textGenerator = await pipeline(
    "text2text-generation",
    "Xenova/LaMini-Flan-T5-77M"
  );
  const result = await textGenerator(question);

  if (!Array.isArray(result) || result.length === 0) {
    return {
      success: false,
      message: "Error generating response",
      data: "Ups, something went wrong",
    };
  }

  return {
    success: true,
    message: "Chatbot response",
    data: (result[0] as Text2TextGenerationSingle).generated_text,
  };
}

export async function enrollToCourse(
  courseSlug: string
): Promise<ActionResponse<undefined>> {
  try {
    DataAPI.enrollToCourse(courseSlug);
  } catch (error) {
    return {
      success: false,
      message: "Error enrolling you to the course, are you logged in?",
    };
  }

  return {
    success: true,
    message: "You are now enrolled in the course",
  };
}

export async function sendInvite(
  email: string
): Promise<ActionResponse<undefined>> {
  if (!email) {
    return {
      success: false,
      message: "Invalid email",
    };
  }

  //FIXME: complete the "Invite Workflow Using the Auth0 Organizations Invitation Feature" to grant the user access to the course

  return {
    success: false,
    message: "Method not implemented",
  };
}

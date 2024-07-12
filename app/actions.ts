"use server";
import "server-only";

import { DataAPI } from "@/data/data";
import { ChatbotMessage, getAIResponse } from "@/data/ai";

type ActionResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export async function askChatbot(
  chat: ChatbotMessage[]
): Promise<ActionResponse<string>> {
  try {
    const response = await getAIResponse(chat);

    return {
      success: true,
      message: "Chatbot response",
      data: response,
    };
  } catch (e) {
    return {
      success: false,
      message: "Ups, something went wrong",
      data: (e as Error).message,
    };
  }
}

export async function enrollToCourse(
  courseSlug: string
): Promise<ActionResponse<undefined>> {
  try {
    await DataAPI.enrollToCourse(courseSlug);
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

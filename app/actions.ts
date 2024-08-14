"use server";
import "server-only";

import { DataAPI } from "@/data/data";
import { ChatbotMessage, getAIResponse } from "@/data/ai";

import { getSession } from "@auth0/nextjs-auth0";
import { ManagementClient } from 'auth0';

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

  if (process.env.AUTH0_MANAGEMENT_API_DOMAIN &&
      process.env.AUTH0_ORGANIZATION_ID &&
      process.env.AUTH0_CLIENT_SECRET &&
      process.env.AUTH0_CLIENT_ID) {

    // https://auth0.github.io/node-auth0/classes/management.ManagementClient.html
    const managementClient = new ManagementClient({
      domain: process.env.AUTH0_MANAGEMENT_API_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
    });

    try {
      const session = await getSession();

      // https://auth0.github.io/node-auth0/classes/management.OrganizationsManager.html#createInvitation
      await managementClient.organizations.createInvitation({
        id: process.env.AUTH0_ORGANIZATION_ID
      }, {
        client_id: process.env.AUTH0_CLIENT_ID,
        invitee: {
          email
        },
        inviter: {
          name: session?.user['name'] || ''
        }
      });
    } catch (error) {
      console.error("failed to create Invitation", error)
      return {
        success: false,
        message: "Failed to create Invitation.",
      }
    }

    return {
      success: true,
      message: "Invitation sent",
    };
  } else {
    return {
      success: false,
      message: "Environment not configured",
    };      
  }  
}

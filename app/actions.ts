"use server";
import "server-only";


import { getSession } from '@auth0/nextjs-auth0'

type ActionResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
}

export async function enrollToCourse(courseSlug: string): Promise<ActionResponse<undefined>> {
  const session = await getSession();
  if (!session) {
    return {
      success: false,
      message: 'You are not logged in!'
    }
  }
  const userId = session.user['sub'];

  //FIXME: complete the "Fine-Grained Permissions with FGA: Securing Access to Courses and Content" to grant the user access to the course

  return {
    success: true,
    message: 'You are now enrolled in the course',
  }
}

export async function sendInvite(email: string): Promise<ActionResponse<undefined>> {
  if (!email) {
    return {
      success: false,
      message: 'Invalid email'
    }
  }

  //FIXME: complete the "Invite workflow using the Auth0 Organizations Invitation feature" to grant the user access to the course

  return {
    success: false,
    message: 'Method not implemented'
  };
}

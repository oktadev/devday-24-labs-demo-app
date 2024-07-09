import "server-only";

import db from "./db.json";
import { Course, Lesson } from "@/data/models";
import { getSession } from "@auth0/nextjs-auth0";
import { fgaClient, stripObjectName } from "@/lib/fga";

async function getCourses(): Promise<Course[]> {
  return db.courses;
}

async function getRecommendedCourses(userLevel: string) {
  return db.courses.filter((course) => course.level === userLevel);
}

async function getMyCourses(): Promise<Course[]> {
  const session = await getSession();
  if (!session) {
    return [];
  }
  const userId = session.user["sub"];

  const { responses } = await fgaClient.batchCheck(
    db.courses.map((course) => {
      return {
        user: `user:${userId}`,
        object: `course:${course.id}`,
        relation: "can_read",
      };
    })
  );

  return responses
    .map(
      (check) =>
        check.allowed &&
        db.courses.find(
          (course) => course.id === stripObjectName(check._request.object)
        )
    )
    .filter(Boolean) as Course[];
}

async function getCourse(slug: string): Promise<Course | undefined> {
  const session = await getSession();
  if (!session) {
    return;
  }
  const userId = session.user["sub"];

  const course = db.courses.find((course) => course["slug"] === slug);

  if (!course) {
    return;
  }

  const { allowed } = await fgaClient.check({
    user: `user:${userId}`,
    relation: "can_read",
    object: `course:${course.id}`,
  });

  if (allowed) {
    return course;
  }
}

async function getCourseLesson(
  courseSlug: string,
  lessonSlug: string
): Promise<Lesson | undefined> {
  const course = await getCourse(courseSlug);
  if (!course) {
    return;
  }

  return course.lessons.find((lesson) => lesson.slug === lessonSlug);
}

async function enrollToCourse(courseSlug: string) {
  const session = await getSession();
  if (!session) {
    throw Error("You are not logged in!");
  }

  const userId = session.user["sub"];

  const course = db.courses.find((course) => course["slug"] === courseSlug);
  if (!course) {
    throw Error("Course not found");
  }

  // Check if the  user is already enrolled in the course
  const { allowed } = await fgaClient.check({
    user: `user:${userId}`,
    relation: "can_read",
    object: `course:${course.id}`,
  });

  // If the user is not enrolled, then enroll them
  if (!allowed) {
    fgaClient.writeTuples([
      {
        user: `user:${userId}`,
        relation: "student",
        object: `course:${course.id}`,
      },
    ]);
  }
}

export const DataAPI = {
  getCourses,
  getRecommendedCourses,
  getMyCourses,
  getCourse,
  getCourseLesson,
  enrollToCourse,
};

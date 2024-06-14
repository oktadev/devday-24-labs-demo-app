import 'server-only';

import db from './db.json'
import { Course, Lesson } from '@/data/models'
import { getSession } from '@auth0/nextjs-auth0'
import { ActionResponse } from '@/app/actions'

async function getCourses(): Promise<Course[]> {
  return db.courses;
}

async function getRecommendedCourses(userLevel: string) {
  return db.courses.filter(course => course.level === userLevel);
}

async function getMyCourses(): Promise<Course[]> {
  const session = await getSession();
  if (!session) {
    return [];
  }
  const userId = session.user['sub'];
  //FIXME: complete the "Fine-Grained Permissions with FGA: Securing Access to Courses and Content" to retrieve only the courses the user has access to
  return db.courses;
}

async function getCourse(slug: string): Promise<Course | undefined> {
  const session = await getSession();
  if (!session) {
    return undefined;
  }
  const userId = session.user['sub'];

  //FIXME: complete the "Fine-Grained Permissions with FGA: Securing Access to Courses and Content" to validate if the user has access to the course
  return db.courses.find(course => course['slug'] === slug);
}

async function getCourseLesson(courseSlug: string, lessonSlug: string): Promise<Lesson | undefined> {
  const course = await getCourse(courseSlug);
  if (!course) {
    return;
  }

  return course.lessons.find(lesson => lesson.slug === lessonSlug);
}

export const DataAPI = {
  getCourses,
  getRecommendedCourses,
  getMyCourses,
  getCourse,
  getCourseLesson,
}

import { DataAPI } from '@/data/data'
import { notFound } from 'next/navigation'
import AtomRenderer from '@/app/my-courses/[courseSlug]/[lessonSlug]/AtomRenderer'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

interface Props {
  params: {
    courseSlug: string;
    lessonSlug: string;
  }
}

export async function generateMetadata({ params: { courseSlug, lessonSlug } } : Props) {
  const lesson = await DataAPI.getCourseLesson(courseSlug, lessonSlug);

  return {
    title: lesson?.title,
  }
}

export default async function MyCoursePage({ params: { courseSlug, lessonSlug } } : Props) {
  const course = await DataAPI.getCourse(courseSlug);
  const lesson = await DataAPI.getCourseLesson(courseSlug, lessonSlug);

  if (!course || !lesson) {
    return notFound();
  }

  return (
    <main className="container mt-8">
      <Breadcrumb className="mt-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/my-courses">My Courses</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/my-courses/${courseSlug}`}>{course.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{lesson.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-4">{lesson.title}</h1>
        {lesson.atoms.map((atom, i) => (
          <AtomRenderer key={i} atom={atom}/>
        ))}
      </div>
    </main>
)
}

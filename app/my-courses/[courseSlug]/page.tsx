import { DataAPI } from '@/data/data'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { notFound } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

interface Props {
  params: {
    courseSlug: string;
  }
}

export async function generateMetadata({ params: { courseSlug } } : Props) {
  const course = await DataAPI.getCourse(courseSlug);

  return {
    title: course?.title,
  }
}

export default async function MyCoursePage({ params: { courseSlug } } : Props) {
  const course = await DataAPI.getCourse(courseSlug);

  if (!course) {
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
            <BreadcrumbPage>{course.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-4">{course.title}</h1>
      <p className="text-xl text-muted-foreground my-4">{course.description}</p>

      <section className="mt-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4">Lessons</h2>

        <ul className="space-y-6">
          {course?.lessons.map(lesson => (
            <li key={lesson.slug}>
              <Card>
                <CardHeader>
                  <span>
                    <Link
                      href={`/my-courses/${course.slug}/${lesson.slug}`}
                      className={`${buttonVariants({ variant: "link", size: "fit" })}`}
                    >
                      <CardTitle>{lesson.title}</CardTitle>
                    </Link>
                  </span>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

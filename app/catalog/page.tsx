import { DataAPI } from '@/data/data'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import EnrollButton from '@/app/catalog/EnrollButton'
import type { Metadata } from 'next'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getSession } from '@auth0/nextjs-auth0'

export const metadata: Metadata = {
  title: "Course Catalog",
};

export default async function CatalogPage() {
  const courses = await DataAPI.getCourses();
  const user = (await getSession())?.user

  //FIXME: complete the Forms for Action lab to get the user's assigned experience
  const recommendedCourses = await DataAPI.getRecommendedCourses("beginner");

  return (
    <main className="container mt-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-4">Course Catalog</h1>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4"/>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Complete the "Beyond Login: Personalize and Protect with Auth0 Forms for Actions" guide to create an onboarding form to capture the user's current experience level
          and filter the recommended courses based on their selection.
        </AlertDescription>
      </Alert>

      <section className="mt-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4">Recommended
          Courses</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedCourses.map(course => (
            <Card key={course.slug}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <EnrollButton course={course}/>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4">All Courses</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map(course => (
            <Card key={course.slug}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <EnrollButton course={course}/>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
)
}

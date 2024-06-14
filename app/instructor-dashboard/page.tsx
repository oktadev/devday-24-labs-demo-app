import { DataAPI } from '@/data/data'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getSession } from '@auth0/nextjs-auth0'
import { notFound } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Instructor Dashboard",
};

export default async function MyCoursesPage() {
  const session = await getSession();

  if (!session) return notFound();
  //FIXME: complete the lab "Securing Instructor Accounts with Auth0 Actions and Custom MFA" to get the user's roles as part of the user claims and validate
  // if the user is an instructor

  const courses = await DataAPI.getCourses();

  return (
    <main className="container mt-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-4">Instructor Dashboard</h1>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4"/>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          By default you'll have access to this dashboard whether you are an instructor or not, complete the "Securing Instructor Accounts with Auth0 Actions and Custom MFA"
          to validate the user's groups and deny access to those who are not instructors
        </AlertDescription>
      </Alert>

      <section className="mt-8 space-y-6">
        {courses.map(course => (
          <Card key={course.slug} className="flex justify-between items-center">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardFooter className="h-full pt-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button>
                      Edit
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Method not yet implemented!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  )
}

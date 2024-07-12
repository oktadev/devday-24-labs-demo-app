import { DataAPI } from "@/data/data";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Courses",
};

export default async function MyCoursesPage() {
  const courses = await DataAPI.getMyCourses();

  return (
    <main className="container mt-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-4">
        My Courses
      </h1>

      {courses.length === 0 && (
        <section className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>
                You are currently not enrolled in any course
              </CardTitle>
              <CardDescription>
                Explore our catalog of courses and enroll to learn about
                identity.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link
                href="/catalog"
                className={`border ${buttonVariants({ variant: "default" })}`}
              >
                Visit the Catalog
              </Link>
            </CardFooter>
          </Card>
        </section>
      )}

      <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card key={course.slug}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link
                href={`/my-courses/${course.slug}`}
                className={`border ${buttonVariants({ variant: "default" })}`}
              >
                Learn
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}

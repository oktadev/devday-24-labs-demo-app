import {Button, buttonVariants} from '@/components/ui/button'
import { getSession } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import InviteForm from '@/components/InviteForm/InviteForm'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

const labs = [{
  title: "Pre-Labs: Project Setup",
  description: "Welcome to your Auth0 journey! Before we dive into the exciting world of identity management and authentication, it's essential to have your App and Auth0 account up and running. This pre-lab will guide you through the initial setup process so you're ready to tackle the hands-on challenges ahead. In this lab, you'll:",
  url: "",
  details: [{
    title: "Account Creation",
    description: "We'll walk you through creating your free Auth0 developer account. It's a quick and easy process."
  }, {
    title: "Tenant Setup",
    description: "Your Auth0 tenant is your personal space for managing applications, users, and authentication flows. We'll show you how to set up your first tenant and set things up to run this application."
  }, {
    title: "Project Setup",
    description: "Configure and get this project up and running on your local environment."
  }]
}, {
  title: "Unlock the Future: Passwordless Login with Passkeys",
  description: "Tired of remembering complex passwords? Ready for a more secure and convenient way to log in? In this lab, you'll:",
  url: "",
  details: [{
    title: "Discover Passkeys",
    description: "Learn how passkeys replace traditional passwords with secure cryptographic keys tied to your devices."
  }, {
    title: "Test Drive Auth0 Passkey Integration",
    description: "Explore how to leverage Auth0 to implement passkey authentication, ensuring the highest level of security for your user accounts in just a few minutes."
  }, {
    title: "Get Hands-On",
    description: "Participate in a guided walkthrough to set up and use passkeys on your own device."
  }]
}, {
  title: "Securing Instructor Accounts with Auth0 Actions and Custom MFA",
  description: "Protect the knowledge-keepers! Join our hands-on lab and dive into the world of adaptive authentication. You'll:",
  url: "",
  details: [{
    title: "Harness the Power of Auth0 Actions",
    description: "Discover how to tailor your authentication workflows with code, creating a more secure environment for instructors and their valuable course content."
  }, {
    title: "Use Actions to Enrich the Data Available in the UI",
    description: "Create an Action to customize the ID Token, including information about the roles the user has assgined."
  }, {
    title: "Implement Stronger MFA for Instructors",
    description: "Learn how to enforce multi-factor authentication (MFA) specifically for instructor accounts, using methods like OTP or security keys to add an extra layer of protection. (Only if they are not using passkeys, as passkeys won’t need a 2FA)."
  }]
}, {
  title: "Fine-Grained Permissions with FGA: Securing Access to Courses and Content",
  description: "Dive into the world of granular permissions and ensure that the right people have access to the right resources. In this hands-on lab, you'll:",
  url: "",
  details: [{
    title: "Discover Auth0 Fine-Grained Authorization (FGA)",
    description: "Explore how FGA empowers you to define precise access rules for your application, safeguarding your data and user experience."
  }, {
    title: "Implement Instructor-Specific Permissions",
    description: "Learn how to configure FGA to allow instructors to edit only the courses they have created, preventing unauthorized modifications."
  }, {
    title: "Protect Student Access",
    description: "Ensure that students can only access the courses they are enrolled in, maintaining the integrity of your learning environment."
  }, {
    title: "Explore Best Practices",
    description: "Discuss strategies for designing a secure and scalable authorization system using FGA."
  }]
}, {
  title: "Beyond Login: Personalize and Protect with Auth0 Forms",
  description: "Transform your authentication experience! Join us for a hands-on exploration of Auth0 Forms for Actions, a new tool that empowers you to seamlessly integrate custom forms and logic into your login and signup flows. In this lab, you'll:",
  url: "",
  details: [{
    title: "Discover the Power of Auth0 Forms",
    description: "Learn how this feature lets you gather valuable user data, present terms and conditions, or create multi-step registration processes – all within the secure Auth0 environment."
  }, {
    title: "Craft a User Profiling Form",
    description: "Design a form to capture additional information from new users (interests, experience levels, etc.) to personalize their onboarding and course recommendations."
  }, {
    title: "Explore Best Practices",
    description: "Discuss strategies for designing user-friendly forms that enhance the registration and login process while protecting user privacy."
  }]
}, {
  title: "Invite Workflow Using the Auth0 Organizations Invitation Feature",
  description: "Whether you're building a B2B SaaS or a B2C application, in this lab, you'll learn how to leverage the Member Invitation workflow provided by Auth0 Organizations to make onboarding users a whole lot easier!",
  url: "",
  details: [{
    title: "Discover the Flexibility of Invitation",
    description: "to bring customers into your application(s) in a flexible yet safe and secure manner - especially when it comes to building collaborations that operate in a team-oriented fashion."
  }, {
    title: "Leverage Branding",
    description: "that allows the creation of bespoke email invitations to match the look and feel of your product identity."
  }, {
    title: "Explore Best Practices",
    description: "and strategies for implementing invitations as part of registration workflows that help mitigate many of the common vulnerabilities from an attack surface perspective."
  }]
},]

export default async function Home() {
  const session = await getSession();

  return (
    <main>
      <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
        <div className="text-center lg:text-start space-y-6">
          <main className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
              Learn Identity
            </span>{" "}
              from the world&apos;s greatest
            </h1>{" "}
            <h2 className="inline">
            <span
              className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Identity
            </span>{" "}
              experts
            </h2>
          </main>

          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Learn Identity  is an educative web platform designed to bridge the gap between identity experts and eager students.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            {session?.user ? (
              <Link href="/catalog" className={`border w-full md:w-1/3 ${buttonVariants({ variant: "default" })}`}>
                To the Catalog
              </Link>
            ) : (
              <a
                href="/api/auth/signup"
                className={`border w-full md:w-1/3 ${buttonVariants({ variant: "default" })}`}
              >
                Get Started
              </a>
            )}

            <a
              rel="noreferrer noopener"
              href="https://github.com/auth0-developer-hub/devday-24-labs-demo-app.git"
              target="_blank"
              className={`w-full md:w-1/3 ${buttonVariants({
                variant: "outline",
              })}`}
            >
              Github Repository
              
            </a>
          </div>

          {session && (
            <div className="space-y-4 md:space-y-0 border-t pt-8">
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mb-4">Invite your friends</h2>
              <InviteForm />
            </div>
          )}
        </div>

        {/* Hero cards sections */}
        <div className="z-10">
        </div>

        {/* Shadow effect */}
        <div className="shadow"></div>
      </section>
      <section className="container">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mb-4">
          Complete the Labs to add missing functionality
        </h2>
        <p className="text-muted-foreground mb-4">
          The application as it stands is not secure, anyone can access and edit any content. We have received complains from users who want to get rid of passwords, but that’s all we offer right now. Admins are eage to enforce instructors would to use additional authentication factors such as OTP and security keys.
        </p>
        <div className="grid lg:grid-cols-2 gap-10">
          {labs.map((lab, i) => (
            <Card key={i} className="flex flex-col justify-between">
              <div>
                <CardHeader>
                  <CardTitle>{lab.title}</CardTitle>
                  <CardDescription>{lab.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="ml-4 list-disc space-y-2">
                    {lab.details.map((detail, j) => (
                      <li key={j} className="text-sm text-muted-foreground">
                        <b>{detail.title}</b>: {detail.description}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
              <CardFooter>
                <Link
                  href={lab.url}
                  className={`w-full ${buttonVariants({ variant: "default" })}`}
                  target="_blank"
                >
                  Visit the Lab
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

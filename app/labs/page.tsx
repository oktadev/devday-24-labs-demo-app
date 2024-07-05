import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Check, Circle } from "lucide-react";

const labs = [
  {
    title: "Pre-Labs: Project Setup",
    description:
      "Welcome to your Auth0 journey! Before we dive into the exciting world of identity management and authentication, it's essential to have your App and Auth0 account up and running. This pre-lab will guide you through the initial setup process so you're ready to tackle the hands-on challenges ahead. In this lab, you'll:",
    url: "",
    details: [
      {
        title: "Account Creation",
        description:
          "We'll walk you through creating your free Auth0 developer account. It's a quick and easy process.",
      },
      {
        title: "Tenant Setup",
        description:
          "Your Auth0 tenant is your personal space for managing applications, users, and authentication flows. We'll show you how to set up your first tenant and set things up to run this application.",
      },
      {
        title: "Project Setup",
        description:
          "Configure and get this project up and running on your local environment.",
      },
    ],
  },
  {
    title: "Unlock the Future: Passwordless Login with Passkeys",
    description:
      "Tired of remembering complex passwords? Ready for a more secure and convenient way to log in? In this lab, you'll:",
    url: "",
    details: [
      {
        title: "Discover Passkeys",
        description:
          "Learn how passkeys replace traditional passwords with secure cryptographic keys tied to your devices.",
      },
      {
        title: "Test Drive Auth0 Passkey Integration",
        description:
          "Explore how to leverage Auth0 to implement passkey authentication, ensuring the highest level of security for your user accounts in just a few minutes.",
      },
      {
        title: "Get Hands-On",
        description:
          "Participate in a guided walkthrough to set up and use passkeys on your own device.",
      },
    ],
  },
  {
    title: "Securing Instructor Accounts with Auth0 Actions and Custom MFA",
    description:
      "Protect the knowledge-keepers! Join our hands-on lab and dive into the world of adaptive authentication. You'll:",
    url: "",
    details: [
      {
        title: "Harness the Power of Auth0 Actions",
        description:
          "Discover how to tailor your authentication workflows with code, creating a more secure environment for instructors and their valuable course content.",
      },
      {
        title: "Use Actions to Enrich the Data Available in the UI",
        description:
          "Create an Action to customize the ID Token, including information about the roles the user has assgined.",
      },
      {
        title: "Implement Stronger MFA for Instructors",
        description:
          "Learn how to enforce multi-factor authentication (MFA) specifically for instructor accounts, using methods like OTP or security keys to add an extra layer of protection. (Only if they are not using passkeys, as passkeys won’t need a 2FA).",
      },
    ],
  },
  {
    title:
      "Fine-Grained Permissions with FGA: Securing Access to Courses and Content",
    description:
      "Dive into the world of granular permissions and ensure that the right people have access to the right resources. In this hands-on lab, you'll:",
    url: "",
    details: [
      {
        title: "Discover Auth0 Fine-Grained Authorization (FGA)",
        description:
          "Explore how FGA empowers you to define precise access rules for your application, safeguarding your data and user experience.",
      },
      {
        title: "Implement Instructor-Specific Permissions",
        description:
          "Learn how to configure FGA to allow instructors to edit only the courses they have created, preventing unauthorized modifications.",
      },
      {
        title: "Protect Student Access",
        description:
          "Ensure that students can only access the courses they are enrolled in, maintaining the integrity of your learning environment.",
      },
      {
        title: "Explore Best Practices",
        description:
          "Discuss strategies for designing a secure and scalable authorization system using FGA.",
      },
    ],
  },
  {
    title: "Beyond Login: Personalize and Protect with Auth0 Forms",
    description:
      "Transform your authentication experience! Join us for a hands-on exploration of Auth0 Forms for Actions, a new tool that empowers you to seamlessly integrate custom forms and logic into your login and signup flows. In this lab, you'll:",
    url: "",
    details: [
      {
        title: "Discover the Power of Auth0 Forms",
        description:
          "Learn how this feature lets you gather valuable user data, present terms and conditions, or create multi-step registration processes – all within the secure Auth0 environment.",
      },
      {
        title: "Craft a User Profiling Form",
        description:
          "Design a form to capture additional information from new users (interests, experience levels, etc.) to personalize their onboarding and course recommendations.",
      },
      {
        title: "Explore Best Practices",
        description:
          "Discuss strategies for designing user-friendly forms that enhance the registration and login process while protecting user privacy.",
      },
    ],
  },
  {
    title: "Invite Workflow Using the Auth0 Organizations Invitation Feature",
    description:
      "Whether you're building a B2B SaaS or a B2C application, in this lab, you'll learn how to leverage the Member Invitation workflow provided by Auth0 Organizations to make onboarding users a whole lot easier!",
    url: "",
    details: [
      {
        title: "Discover the Flexibility of Invitation",
        description:
          "to bring customers into your application(s) in a flexible yet safe and secure manner - especially when it comes to building collaborations that operate in a team-oriented fashion.",
      },
      {
        title: "Leverage Branding",
        description:
          "that allows the creation of bespoke email invitations to match the look and feel of your product identity.",
      },
      {
        title: "Explore Best Practices",
        description:
          "and strategies for implementing invitations as part of registration workflows that help mitigate many of the common vulnerabilities from an attack surface perspective.",
      },
    ],
  },
];

export default async function Home() {
  return (
    <main className="container mt-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-4">
        Labs
      </h1>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Dev Days 24</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Complete all the labs</p>
              <p className="mt-6 text-base leading-7 text-gray-600">
              The application as it stands is not secure, anyone can access and edit
              any content. We have received complains from users who want to get rid
              of passwords, but that’s all we offer right now. Admins are eage to
              enforce instructors would to use additional authentication factors such
              as OTP and security keys.
              </p>
            </div>
            <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
              {labs.map((lab, labId) => (
                <div key={labId} className="relative pl-9">
                  <dt className="font-semibold text-gray-900">
                    {/* <Check aria-hidden="true" className="absolute left-0 top-1 h-5 w-5 text-indigo-500" /> */}
                    <Circle aria-hidden="true" className="absolute left-0 top-1 h-5 w-5 text-indigo-500" />
                    {lab.title}
                  </dt>
                  <dd className="mt-2">{lab.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}

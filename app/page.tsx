import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Image from "next/image";
import InviteForm from "@/components/InviteForm/InviteForm";

export default async function Home() {
  const session = await getSession();

  return (
    <main>
      <div className="relative isolate">
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg
            x="50%"
            y={-1}
            className="overflow-visible fill-gray-50 dark:fill-gray-900"
          >
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#1f432ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            width="100%"
            height="100%"
            strokeWidth={0}
            className="hidden dark:block"
          />
          <rect
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            width="100%"
            height="100%"
            strokeWidth={0}
            className="dark:hidden"
          />
        </svg>
        <div
          aria-hidden="true"
          className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        >
          <div
            style={{
              clipPath:
                "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
            }}
            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-32 pt-14 sm:pt-32 lg:px-8 lg:pt-14">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <div className="mb-10">
                  <a
                    href="https://auth0.com"
                    className="inline-flex space-x-4 align-middle"
                    target="_blank"
                  >
                    <img
                      src="auth0_logo_header.svg"
                      className="hidden dark:block"
                      alt="Auth0 by Okta"
                    />
                    <img
                      src="auth0_logo_header.svg"
                      className="dark:hidden"
                      alt="Auth0 by Okta"
                    />
                  </a>
                </div>

                <h1 className="inline text-5xl md:text-6xl font-bold">
                  <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                    Learn Identity
                  </span>{" "}
                  from the world&apos;s greatest{" "}
                  <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                    Identity
                  </span>{" "}
                  experts
                </h1>
                <div className="mt-10 flex items-center gap-x-6">
                  {session?.user ? (
                    <Link
                      href="/catalog"
                      className={`border w-full md:w-1/3 ${buttonVariants({
                        variant: "default",
                      })}`}
                    >
                      To the Catalog
                    </Link>
                  ) : (
                    <a
                      href="/api/auth/signup"
                      className={`border w-full md:w-1/3 ${buttonVariants({
                        variant: "default",
                      })}`}
                    >
                      Get Started
                    </a>
                  )}

                  <a
                    rel="noreferrer noopener"
                    href="https://github.com/oktadev/devday-24-labs-demo-app"
                    target="_blank"
                    className={`w-full md:w-1/3 ${buttonVariants({
                      variant: "outline",
                    })}`}
                  >
                    Github Repository
                  </a>
                </div>

                {session && (
                  <div className="space-y-4 md:space-y-0 pt-20">
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mb-4">
                      Invite your friends
                    </h2>
                    <InviteForm />
                  </div>
                )}
              </div>
              <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                  <div className="relative">
                    <Image
                      src={"/featured1.jpg"}
                      width={200}
                      height={356}
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl object-cover shadow-lg border-gray-600 border-2 shadow-gray-800"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
                <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                  <div className="relative">
                    <Image
                      src={"/featured2.jpg"}
                      width={500}
                      height={889}
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl object-cover shadow-lg border-gray-600 border-2 shadow-gray-800"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="relative">
                    <Image
                      src={"/featured3.jpg"}
                      width={500}
                      height={889}
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl object-cover shadow-lg border-gray-600 border-2 shadow-gray-800"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
                <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                  <div className="relative">
                    <Image
                      src={"/featured4.jpg"}
                      width={500}
                      height={889}
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl object-cover shadow-lg border-gray-600 border-2 shadow-gray-800"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="relative">
                    <Image
                      src={"/featured5.jpg"}
                      width={200}
                      height={356}
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl object-cover shadow-lg border-gray-600 border-2 shadow-gray-800"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

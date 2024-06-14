import { buttonVariants } from '@/components/ui/button'
import { getSession } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import InviteForm from '@/components/InviteForm/InviteForm'

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
              from the world's greatest
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
            Build your React landing page effortlessly with the required sections
            to your project.
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
    </main>
  );
}

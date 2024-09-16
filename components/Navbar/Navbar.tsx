"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Claims } from "@auth0/nextjs-auth0";
import { useState } from "react";
import UserMenu from "@/components/Navbar/UserMenu";

interface RouteProps {
  href: string;
  label: string;
}

interface Props {
  user?: Claims;
}

export const Navbar = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const routeList: RouteProps[] = user
    ? [
        {
          href: "/catalog",
          label: "Catalog",
        },
        {
          href: "/my-courses",
          label: "My Courses",
        },
        {
          href: "/instructor-dashboard",
          label: "Instructor Dashboard",
        },
        {
          href: "https://developerday.com/event/labs/",
          label: "Labs",
        },
      ]
    : [
        {
          href: "/catalog",
          label: "Catalog",
        },
        {
          href: "https://developerday.com/event/labs/",
          label: "Labs",
        },
      ];

  return (
    <div className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem>
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 text-xl flex items-center"
            >
              <svg
                className="h-6"
                viewBox="0 0 507 130"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M58.9333 37.4111V0H74.5333V101.111H60.9555L59.0778 89.9889C54.3111 96.4889 46.6556 101.978 34.9556 101.978C14.8778 101.978 0 87.8222 0 64.1333C0 41.3111 14.8778 26.2889 34.9556 26.2889C46.2222 26.2889 54.1667 30.9111 58.9333 37.4111ZM37.5555 88.8333C50.5555 88.8333 59.0778 78.7222 59.0778 64.4222C59.0778 49.6889 50.5555 39.5778 37.5555 39.5778C24.5556 39.5778 16.0333 49.6889 16.0333 64.1333C16.0333 78.7222 24.5556 88.8333 37.5555 88.8333Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M119.822 101.978C96.5667 101.978 81.9778 86.9556 81.9778 64.2778C81.9778 41.4556 96.5667 26.2889 118.378 26.2889C139.756 26.2889 154.056 39.8667 154.489 61.5333C154.489 63.4111 154.345 65.4333 154.056 67.4556H98.3001V68.4667C98.7334 81.0333 106.678 89.2667 118.956 89.2667C128.489 89.2667 135.422 84.5 137.589 76.2667H153.189C150.589 90.8556 138.167 101.978 119.822 101.978ZM98.8778 56.0444H138.311C137.011 45.0667 129.356 38.8556 118.522 38.8556C108.556 38.8556 100.033 45.5 98.8778 56.0444Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M181.979 101.111L154.679 27.1556H171.434L191.801 84.3556L211.879 27.1556H228.345L201.045 101.111H181.979Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M339.748 37.4111V0H355.348V101.111H341.77L339.892 89.9889C335.126 96.4889 327.47 101.978 315.77 101.978C295.692 101.978 280.815 87.8222 280.815 64.1333C280.815 41.3111 295.692 26.2889 315.77 26.2889C327.037 26.2889 334.981 30.9111 339.748 37.4111ZM318.37 88.8333C331.37 88.8333 339.892 78.7222 339.892 64.4222C339.892 49.6889 331.37 39.5778 318.37 39.5778C305.37 39.5778 296.848 49.6889 296.848 64.1333C296.848 78.7222 305.37 88.8333 318.37 88.8333Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M433.859 87.5333H437.037V101.111H428.804C418.692 101.111 415.226 96.6333 415.226 89.2667C410.315 96.7778 402.804 101.978 390.815 101.978C374.637 101.978 363.37 94.0333 363.37 80.3111C363.37 65.1444 374.348 56.6222 395.004 56.6222H413.637V52.1444C413.637 43.9111 407.715 38.8556 397.459 38.8556C388.215 38.8556 382.004 43.1889 380.848 49.6889H365.537C367.126 35.2444 379.548 26.2889 398.181 26.2889C417.826 26.2889 429.092 35.6778 429.092 53.1556V82.7667C429.092 86.5222 430.681 87.5333 433.859 87.5333ZM413.637 70.7778V68.1778H394.281C384.604 68.1778 379.259 71.7889 379.259 79.3C379.259 85.5111 384.459 89.8444 392.981 89.8444C405.981 89.8444 413.492 82.1889 413.637 70.7778Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M460.92 101.544L432.175 27.1556H448.787L469.442 83.3444L489.52 27.1556H506.131L472.62 112.667C467.998 124.656 464.82 130 453.987 130H437.231V116.278H448.209C454.275 116.278 455.72 114.833 458.031 108.767L460.92 101.544Z"
                  fill="currentColor"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M275.773 101.111H221.618V91.8647H275.773V101.111Z"
                  fill="currentColor"
                ></path>
              </svg>
              &nbsp;- Labs
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                ></Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    DevDay 24 - Labs
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                  <UserMenu user={user} />
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <Link
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <UserMenu user={user} />

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

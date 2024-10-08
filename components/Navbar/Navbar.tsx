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
              Identiflix
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

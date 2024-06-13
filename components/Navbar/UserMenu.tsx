import { Claims } from '@auth0/nextjs-auth0'
import { Button, buttonVariants } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Props {
  user?: Claims;
}

export default function UserMenu({ user } : Props) {
  console.log(user);
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="ghost"
          >
            <Avatar>
              <AvatarImage src={user['picture']} />
              <AvatarFallback>{user['name'].slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <a href="/api/auth/logout">
              Log Out
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <a
        rel="noreferrer noopener"
        href="/api/auth/login"
        className={`border ${buttonVariants({ variant: "secondary" })}`}
      >
        Log In
      </a>

      <a
        rel="noreferrer noopener"
        href="/api/auth/signup"
        className={`border ${buttonVariants({ variant: "default" })}`}
      >
        Sign Up
      </a>
    </>
  )
}

import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

export default function Home() {
  return (
    <main className="flex flex-col h-full w-full">
      <NavigationMenu className="flex-1 max-w-none justify-between p-4">
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Todone
        </div>
        <NavigationMenuList className="space-x-4">
          <NavigationMenuItem>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/signup">
              <Button>Sign Up!</Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <h1>Hello World</h1>
    </main>
  );
}

import owl from "../../assets/lascuisine.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import React from "react";

export function NavbarComp() {
  return (
    <NavigationMenu
      className="bg-[#F17228] flex justify-between  items-center  h-full  px-40"
      style={{ width: "100%" }}
    >
      <NavigationMenuList>
        <div className="inline-flex items-center space-x-2">
          <Link to="/">
            <span>
              <img width={120} height={120} src={owl} />
            </span>
          </Link>
        </div>

        <NavigationMenuItem></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

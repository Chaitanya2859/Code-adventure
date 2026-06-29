'use client'

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import { UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils"
import Link from "next/link";
import React, { useState, useEffect } from "react";


const courses = [
  {
    id: 1,
    name: "HTML",
    desc: "Learn the fundamentals of HTML and build the structure of modern web pages.",
    path: "/courses/1",
  },
  {
    id: 2,
    name: "CSS",
    desc: "Master CSS to style and design responsive, visually appealing web layouts.",
    path: "/courses/2",
  },
  {
    id: 3,
    name: "JavaScript",
    desc: "Explore JavaScript topics such as closures, prototypes, async programming, and modern ES6+ features.",
    path: "/courses/6",
  },
  {
    id: 4,
    name: "React",
    desc: "Build dynamic and interactive web applications using the React JavaScript library.",
    path: "/courses/3",
  },
  {
    id: 5,
    name: "Python",
    desc: "Understand the core concepts of Python and start building interactive features on the web.",
    path: "/courses/5",
  },
  {
    id: 6,
    name: "Node.js",
    desc: "Learn backend development using Node.js and build scalable, high-performance server applications.",
    path: "/courses/7",
  },
];


const Header = () => {
    const {user} = useUser()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

  return (
    <div className="py-4 px-16  w-full flex justify-between items-center">
        <Link href="/">
          <div className="flex gap-4 items-center cursor-pointer">
            <img src="/crown.png" alt="Logo" className="w-10 h-10" />
            <h2 className="font-game text-3xl mt-2">Code Adventure</h2>
          </div>
        </Link>

        <NavigationMenu>
  <NavigationMenuList className="gap-8 font-game text-2xl">
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-game text-2xl">Courses</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid md:grid-cols-2 gap-2 lg:w-[600px] sm:w-[400px] md:w-[500px]">
            {courses.map((course, index)=>(
              <NavigationMenuLink asChild key={index}>
                <Link href={course.path}>
                  <div className="p-2 hover:bg-accent  rounded-lg cursor-pointer h-full">
                      <h2 className="font-bold">{course.name}</h2>
                      <p className="text-xs text-zinc-500">{course.desc}</p>
                  </div>
                </Link>
              </NavigationMenuLink>
            ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href={'/projects'} className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-game text-2xl hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none transition-colors">
          Projects
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href={'/pricing'} className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-game text-2xl hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none transition-colors">
          Pricing
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href={'/contactus'} className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-game text-2xl hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none transition-colors">
          Contact us
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
        
    { !user ? <Link href='/sign-in
    '><Button className="text-2xl font-game cursor-pointer" size={'lg'} variant="pixel">Sign up</Button></Link> :
     <div className="flex justify-center items-center gap-6">
        <Link href='/dashboard'>
        <Button className="text-2xl cursor-pointer font-game" size={'lg'} variant="pixel">Dashboard</Button>
        </Link>
        <UserButton />
     </div>
}
    </div>
  )
}

export default Header
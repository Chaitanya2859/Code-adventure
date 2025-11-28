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
} from "@/components/ui/navigation-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";


const courses = [
  {
    id: 1,
    name: "HTML",
    desc: "Learn the fundamentals of HTML and build the structure of modern web pages.",
    path: "/course/1/detail",
  },
  {
    id: 2,
    name: "CSS",
    desc: "Master CSS to style and design responsive, visually appealing web layouts.",
    path: "/course/2/detail",
  },
  {
    id: 3,
    name: "React",
    desc: "Build dynamic and interactive web applications using the React JavaScript library.",
    path: "/course/3/detail",
  },
  {
    id: 4,
    name: "React Advanced",
    desc: "Deep dive into advanced React concepts including hooks, state management, performance optimization, and best practices.",
    path: "/course/4/detail",
  },
  {
    id: 5,
    name: "Python",
    desc: "Understand the core concepts of Python and start building interactive features on the web.",
    path: "/course/5/detail",
  },
  {
    id: 6,
    name: "JavaScript Advanced",
    desc: "Explore advanced JavaScript topics such as closures, prototypes, async programming, and modern ES6+ features.",
    path: "/course/6/detail",
  },
  {
    id: 7,
    name: "Node.js",
    desc: "Learn backend development using Node.js and build scalable, high-performance server applications.",
    path: "/course/7/detail",
  },
  {
    id: 8,
    name: "MongoDB",
    desc: "Master MongoDB and learn to design and manage NoSQL databases for modern applications.",
    path: "/course/8/detail",
  },
  {
    id: 9,
    name: "Next.js",
    desc: "Build full-stack web applications using Next.js — combining React, API routes, routing, and server-side rendering.",
    path: "/course/9/detail",
  },
];


const Header = () => {
    const {user} = useUser()
  return (
    <div className="py-4 px-16  w-full flex justify-between items-center">
        <div className="flex gap-4 items-center">
        <img src="/crown.png" alt="Logo" className="w-10 h-10" />
        <h2 className="font-game text-3xl mt-2">Code Adventure</h2>
        </div>

        <NavigationMenu>
  <NavigationMenuList className="gap-8">
    <NavigationMenuItem>
      <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid md:grid-cols-2 gap-2 lg:w-[600px] sm:w-[400px] md:w-[500px]">
            {courses.map((course, index)=>(
                <div className="p-2 hover:bg-accent rounded-lg cursor-pointer" key={index}>
                    <h2 className="font-bold">{course.name}</h2>
                    <p className="text-xs text-zinc-500">{course.desc}</p>
                </div>
            ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
        <NavigationMenuItem>
        <NavigationMenuLink>
            <Link href={'/projects'}>Project</Link>
        </NavigationMenuLink>
    </NavigationMenuItem>
            <NavigationMenuItem>
        <NavigationMenuLink>
            <Link href={'/pricing'}>Pricing</Link>
        </NavigationMenuLink>
    </NavigationMenuItem>
            <NavigationMenuItem>
        <NavigationMenuLink>
            <Link href={'/contactus'}>Contact us</Link>
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
'use client'

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User, LayoutDashboard, Menu, X } from "lucide-react";

const courses = [
  { id: 1, name: "HTML", desc: "Learn the fundamentals of HTML and build the structure of modern web pages.", path: "/courses/1" },
  { id: 2, name: "CSS", desc: "Master CSS to style and design responsive, visually appealing web layouts.", path: "/courses/2" },
  { id: 3, name: "JavaScript", desc: "Learn the basics of JavaScript and start adding interactivity to your web pages.", path: "/courses/3" },
];

const Header = () => {
  const { user, loading, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!mounted) return null;

  // Get initials for avatar
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div className="py-4 px-4 md:px-8 lg:px-16 w-full flex justify-between items-center gap-4">
      <Link href="/">
        <div className="flex gap-3 md:gap-4 items-center cursor-pointer">
          <img src="/crown.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
          <h2 className="font-game text-2xl md:text-3xl mt-1 md:mt-2">Code Adventure</h2>
        </div>
      </Link>

      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-8 font-game text-2xl justify-center">
          {user && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-game text-2xl hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none transition-colors text-yellow-400">
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-game text-2xl">Courses</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid md:grid-cols-2 gap-2 lg:w-[600px] sm:w-[400px] md:w-[500px]">
                {courses.map((course, index) => (
                  <NavigationMenuLink asChild key={index}>
                    <Link href={course.path}>
                      <div className="p-2 hover:bg-accent rounded-lg cursor-pointer h-full">
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
              <Link href="/pricing" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-game text-2xl hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none transition-colors">
                Pricing
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/contactus" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-game text-2xl hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none transition-colors">
                Assistance
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      </div>

      <div className="flex items-center gap-4">
        {/* Auth section */}
        {loading ? (
          <div className="w-24 h-10 bg-zinc-800 rounded-lg animate-pulse" />
        ) : !user ? (
          <Link href="/sign-in" className="hidden md:block">
            <Button className="text-2xl font-game cursor-pointer" size="lg" variant="pixel">
              Sign up
            </Button>
          </Link>
        ) : (
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              id="header-user-menu"
              onClick={() => setDropdownOpen(o => !o)}
              className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-yellow-600 flex items-center justify-center font-game text-black font-bold text-lg cursor-pointer hover:bg-yellow-300 transition-colors"
            >
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                initials
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-52 bg-zinc-900 border-2 border-zinc-700 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-zinc-800">
                  <p className="font-game text-white text-sm truncate">{user.name}</p>
                  <p className="text-zinc-500 text-xs truncate">{user.email}</p>
                </div>
                <Link href="/dashboard" onClick={() => setDropdownOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 cursor-pointer transition-colors">
                    <LayoutDashboard size={16} className="text-zinc-400" />
                    <span className="font-game text-zinc-300 text-sm">Dashboard</span>
                  </div>
                </Link>
                <button
                  id="header-logout"
                  onClick={() => { setDropdownOpen(false); logout(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 cursor-pointer transition-colors text-left"
                >
                  <LogOut size={16} className="text-red-400" />
                  <span className="font-game text-red-400 text-sm">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={32} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-64 h-full bg-zinc-900 border-l border-zinc-800 p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-right">
            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-4 font-game text-2xl">
              {user && (
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-yellow-400 hover:text-yellow-300">Dashboard</Link>
              )}
              <Link href="/courses" onClick={() => setMobileMenuOpen(false)} className="hover:text-yellow-400">Courses</Link>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-yellow-400">Pricing</Link>
              <Link href="/contactus" onClick={() => setMobileMenuOpen(false)} className="hover:text-yellow-400">Assistance</Link>
            </div>

            <div className="mt-auto border-t border-zinc-800 pt-6">
              {!user ? (
                <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full text-xl font-game" variant="pixel">Sign up</Button>
                </Link>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-game text-black font-bold">
                      {user.avatar ? <img src={user.avatar} className="w-full h-full rounded-full object-cover" alt="avatar" /> : initials}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-game text-sm truncate">{user.name}</p>
                      <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button onClick={() => { setMobileMenuOpen(false); logout(); }} className="flex items-center gap-2 text-red-400 font-game hover:text-red-300">
                    <LogOut size={20} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
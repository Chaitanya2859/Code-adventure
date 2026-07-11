"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

export default function HeroCTA() {
  const { user, loading } = useAuth()
  
  return (
    <Link href={user ? "/courses" : "/sign-up"}>
      <Button variant="pixel" className="font-game text-3xl mt-4 px-8 py-6 cursor-pointer">
        Get Started
      </Button>
    </Link>
  )
}

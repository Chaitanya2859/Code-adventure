'use client'

import Image from "next/image"
import { useAuth } from "@/hooks/useAuth"

const WelcomeBanner = () => {
  const { user } = useAuth()
  return (
    <div className="flex gap-2 md:gap-4 items-center">
      <Image unoptimized src={'/machine.webp'} alt='bot' width={100} height={100} className="w-16 h-16 md:w-[100px] md:h-[100px]" />
      <h2 className="font-game text-xl md:text-2xl p-3 md:p-4 border-zinc-600 border-2 bg-zinc-800 rounded-lg rounded-bl-none">
        Welcome back <span className="text-yellow-300">{user?.name}</span>, Start learning something new...
      </h2>
    </div>
  )
}

export default WelcomeBanner
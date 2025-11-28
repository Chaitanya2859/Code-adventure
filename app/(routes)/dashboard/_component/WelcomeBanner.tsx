'use client'

import { useUser } from "@clerk/nextjs"
import Image from "next/image"

const WelcomeBanner = () => {
    const {user}= useUser()
  return (
    <div className="flex gap-4 items-center">
        <Image src={'/machine.webp'} alt='bot' width={100} height={100} />
        <h2 className="font-game text-2xl p-4 border-zinc-600 border-2 bg-zinc-800 rounded-lg rounded-bl-none">Welcome back <span className="text-yellow-300">{user?.fullName}</span>, Start learning something new...</h2>
    </div>
  )
}

export default WelcomeBanner
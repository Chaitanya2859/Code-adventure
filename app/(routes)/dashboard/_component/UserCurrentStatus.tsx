'use client'
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { useEffect, useState } from "react"
import axios from "axios"


const UserCurrentStatus = () => {
    const {user} = useUser()
    const [stats, setStats] = useState({ xp: 0, badges: 0, streak: 0, level: 1, levelProgress: 0 })
    const [loading, setLoading] = useState(true)

    const fetchStats = async () => {
        try {
            const res = await axios.get('/api/user/status')
            setStats(res.data)
        } catch (err) {
            console.error("Failed to fetch user stats", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            fetchStats()
        }
    }, [user])

  return (
    <div className="bg-zinc-900 p-4 border-2 rounded-xl">
        <div className="flex gap-6  justify-center items-center">
        <Image src={'/trainer.gif'} alt='Your profile' width={60} height={60} unoptimized />
        <h2 className="font-game">{(user?.primaryEmailAddress?.emailAddress?.length ?? 0) > 20 ? <div className="text-xl">{user?.primaryEmailAddress?.emailAddress} </div>: <div className="text-2xl">{user?.primaryEmailAddress?.emailAddress} </div>} </h2>
        </div>
        
        <div className="grid gap-4 grid-cols-2 mt-4">
            <div className="">
                <div className="flex items-center gap-4 ">
                    <Image src={'/star2.gif'} className="mb-2" alt='Star' width={40} height={40} unoptimized />
                    <h2 className="text-3xl font-game">{loading ? "..." : stats.xp}</h2>
                </div>
                <div className="flex items-center gap-3">
                    <h1 className="text-gray-500 text-lg mt-2 font-game">Total XP</h1>
                </div>
            </div>
            
            <div className="">
                <div className="flex items-center gap-4">
                    <Image src={'/tresure.gif'} alt='Badge' width={40} className="mb-2" height={40} unoptimized />
                    <h2 className="text-3xl font-game">{loading ? "..." : stats.badges}</h2>
                </div>
                <div className="flex items-center gap-3">
                    <h1 className="text-gray-500 text-lg mt-2 font-game">Badges</h1>
                </div>
            </div>

            <div className="">
                <div className="flex items-center gap-4">
                    <Image src={'/star.gif'} alt='Level' width={40} className="mb-2" height={40} unoptimized />
                    <h2 className="text-3xl font-game">{loading ? "..." : stats.level}</h2>
                </div>
                <div className="flex items-center gap-3">
                    <h1 className="text-gray-500 text-lg mt-2 font-game">User Level</h1>
                </div>
            </div>

            <div className="">
                <div className="flex items-center gap-4">
                    <Image src={'/fire.gif'} alt='Streak' width={40} className="mb-2" height={40} unoptimized />
                    <h2 className="text-3xl font-game">{loading ? "..." : stats.streak}</h2>
                </div>
                <div className="flex items-center gap-3">
                    <h1 className="text-gray-500 text-lg mt-2 font-game">Streak</h1>
                </div>
            </div>
        </div>

        {!loading && (
          <div className="mt-6 pt-4 border-t border-zinc-800">
            <div className="flex justify-between items-center mb-2 text-xs font-game text-gray-400">
              <span>Next Level Progress</span>
              <span>{stats.levelProgress} / 100 XP</span>
            </div>
            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 transition-all duration-500" 
                style={{ width: `${stats.levelProgress}%` }}
              />
            </div>
          </div>
        )}
    </div>
  )
}

export default UserCurrentStatus
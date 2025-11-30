'use client'
import { useUser } from "@clerk/nextjs"
import Image from "next/image"


const UserCurrentStatus = () => {
    const {user} = useUser()
  return (
    <div className="bg-zinc-900 p-4 border-2 rounded-xl">
        <div className="flex gap-6  justify-center items-center">
        <Image src={'/trainer.gif'} alt='Your profile' width={60} height={60}/>
        <h2 className="font-game text-2xl">{user?.primaryEmailAddress?.emailAddress} </h2>
        </div>
        <div className="grid gap-4 grid-cols-2 mt-4">
            <div className="">
                <div className="flex items-center gap-4 ">
            <Image src={'/star2.gif'} className="mb-2" alt='Star' width={40} height={40} />
            <h2 className="text-3xl font-game">20</h2>
            </div>
            <div className="flex items-center gap-3">
                <h1 className="text-gray-500 text-xl mt-2 font-game">Total Rewards</h1>
            </div>
            </div>
            <div className="">
                <div className="flex items-center gap-4">
            <Image src={'/tresure.gif'} alt='Star' width={40} className="mb-2" height={40} />
            <h2 className="text-3xl font-game">20</h2>
            </div>
            <div className="flex items-center gap-3">
                <h1 className="text-gray-500 text-xl mt-2 font-game">Badge</h1>
            </div>
            </div>
            <div className="">
                <div className="flex items-center gap-4">
                <Image src={'/fire.gif'} alt='Star' width={40} className="mb-2" height={40} />
                <h2 className="text-3xl font-game">20</h2>
                </div>
            <div className="flex items-center gap-3">
                <h1 className="text-gray-500 text-xl mt-2 font-game">Daily Streak</h1>
            </div>
            </div>
        </div>
    </div>
  )
}

export default UserCurrentStatus
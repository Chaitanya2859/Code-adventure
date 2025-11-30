import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const InviteFriend = () => {
  return (
    <div className="mt-6 flex justify-center items-center border-2 bg-zinc-900 rounded-lg p-6 font-game flex-col">
        <div className="flex flex-col justify-center items-center">
        <Image src='/letter.gif' alt='mail' className="mb-4" width={100} height={100} />
        <h2 className="text-3xl ">Invite Friend</h2>
        </div>
        <p className="text-xl text-zinc-400">Having fun? Share the love with a friend ! Enter an email and we will send them a personal invite</p>
        <div className="flex justify-center mt-2 items-center gap-8">
            <Input placeholder="Enter Invitee Email" size={50} className="text-2xl" />
            <Button variant={'pixel'} size={'lg'} className="text-2xl font-game hover:bg-yellow-300 cursor-pointer">Invite</Button>
        </div>
    </div>
  )
}

export default InviteFriend
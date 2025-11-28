import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const Upgrade = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-4 border-2 bg-zinc-900 p-5 mt-8">
        <Image src='/crown.png' alt='logo' height={70} width={70} />
        <h2 className="text-3xl text-center font-game">Upgrade to premium membership</h2>
        <h2 className="text-gray-500 text-xl font-game">Join premium membership and get access to all courses</h2>
        <Link href={'/pricing'}>
            <Button variant={'pixel'} className="font-game text-2xl px-12 py-5" size={'lg'} >Join now</Button>
        </Link>
    </div>
  )
}

export default Upgrade
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const textShadow = {
  textShadow: "1px 1px 0 #000, -1px -1px 0 #000,1px -1px 0 #000, -1px 1px 0 #000"
}

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 md:px-24">
      <Image src="/hero4.gif" alt="Coming Soon" width={256} height={256} unoptimized className="mb-8 rounded-2xl border-4 border-zinc-700" />
      <h1 className="text-6xl md:text-7xl font-game text-center mb-4" style={textShadow}>Coming Soon!</h1>
      <p className="text-2xl text-zinc-400 font-game text-center max-w-2xl mb-12">
        We're working hard to bring you this new feature. Stay tuned, adventurer!
      </p>
      
      <Link href="/dashboard">
        <Button variant="pixel" className="text-2xl font-game py-6 px-10">
          Return to Dashboard
        </Button>
      </Link>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="relative w-full min-h-[calc(100vh-11vh)] overflow-hidden">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover absolute inset-0">
          <source src="/hero3.mp4" type="video/mp4" />
        </video>
        <div className="absolute w-full mt-24 md:mt-32 flex flex-col justify-center items-center text-center px-4">
            <h2 className="font-bold text-5xl md:text-7xl font-game" 
                        style={
                {
                    textShadow: "2px 2px 0 #000, -2px -2px 0 #000,2px -2px 0 #000, -2px 2px 0 #000"
                }
            }>Start Your</h2>
            <h2 className="font-bold text-5xl md:text-8xl text-yellow-500 font-game mt-2 md:mt-0" 
            style={
                {
                    textShadow: "2px 2px 0 #000, -2px -2px 0 #000,2px -2px 0 #000, -2px 2px 0 #000"
                }
            }>Coding Adventure</h2>
            <h2 className="mt-4 md:mt-7 font-game text-xl md:text-3xl max-w-2xl">Beginner friendly coding courses and projects</h2>
            <Link href="/courses">
              <Button variant="pixel" className="font-game text-3xl mt-4 px-8 py-6 cursor-pointer">Get Started</Button>
            </Link>
        </div>
    </div>
  )
}

export default Hero
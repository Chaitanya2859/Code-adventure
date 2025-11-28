import { Button } from "@/components/ui/button"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative w-full min-h-[calc(100vh-11vh)] overflow-hidden">
        <Image src={'/hero3.gif'} alt='Hero' width={1000} height={1000} className="w-full h-full object-cover absolute inset-0"></Image>
        <div className="absolute w-full mt-32 flex flex-col justify-center items-center">
            <h2 className="font-bold text-7xl font-game" 
                        style={
                {
                    textShadow: "2px 2px 0 #000, -2px -2px 0 #000,2px -2px 0 #000, -2px 2px 0 #000"
                }
            }>Start Your</h2>
            <h2 className="font-bold text-8xl text-yellow-500 font-game" 
            style={
                {
                    textShadow: "2px 2px 0 #000, -2px -2px 0 #000,2px -2px 0 #000, -2px 2px 0 #000"
                }
            }>Coding Adventure</h2>
            <h2 className="mt-7 font-game text-3xl">Beginner friendly coding courses and projects</h2>
            <Button variant="pixel" className="font-game text-3xl mt-4 px-8 py-6 ">Get Started</Button>
        </div>
    </div>
  )
}

export default Hero
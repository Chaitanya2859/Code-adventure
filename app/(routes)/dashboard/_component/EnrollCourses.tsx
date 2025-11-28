'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react"

const EnrollCourses = () => {
    const [enrollCourse, setEnrollCourse]= useState([]);

  return (
    <div className="mt-8">
        <h2 className="text-4xl px-3 pb-1 font-game">Your enrolled courses</h2>
        {enrollCourse.length===0 ?
         <div className="flex flex-col items-center gap-2 p-6 border-2 bg-zinc-900 rounded-2xl">
            <Image src='/books.png' alt='book' width={90} height={90} />
            <h1 className="font-game text-3xl">You don't have any enrolled courses</h1>
            <Button variant={'pixel'} size={'lg'} className="font-game text-2xl">Browse all courses</Button>
         </div>:
         <div className="">
         </div> 
        }
    </div>
  )
}

export default EnrollCourses
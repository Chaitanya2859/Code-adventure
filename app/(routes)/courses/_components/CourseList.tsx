'use client'

import axios from "axios"
import { ChartNoAxesColumnIncreasingIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import DinoLoader from "@/app/components/DinoLoader"

 type Course={
    id: number,
    courseId: number,
    title: string,
    desc: string,
    banner: string,
    difficulty: string,
    userEnroll?: boolean
}

 const CourseList = () => {

    const [courseList, setCourseList]= useState<Course[]>([])
    const [loading, setLoading]= useState(false)
    const getAllCourses= async ()=>{
        setLoading(true)
        const res = await axios.get('/api/course')
        setLoading(false)
        setCourseList(res?.data)
    }

    useEffect(()=>{
        getAllCourses()
    },[])

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center items-center py-20 w-full">
          <DinoLoader size={200} text="Loading Courses..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 cursor-pointer mx-4 px-2 py-4 md:mx-8 md:px-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
          {courseList?.map((key)=>(
            <Link href={'/courses/' + key.courseId}  key={key.courseId} >
            <div className="mx-0 md:mx-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 p-4 border border-zinc-700 h-full">
                <Image src={(key?.banner).trimEnd()} alt={key?.title} unoptimized width={400} className="h-35 w-full rounded-t-md" height={400} />
                <div className="font-game">
                    <h2  className="text-4xl">{key.title}</h2>
                    <p className="font-game text-xl text-gray-400 line-clamp-2">{key.desc}</p>
                    <h2 className="bg-zinc-800 mt-2 flex gap-4 p-2 px-4 font-game rounded-xl items-center inline-flex">
                        <ChartNoAxesColumnIncreasingIcon className="h-4 w-4" />
                            {key.difficulty}
                    </h2>
                </div>
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default CourseList
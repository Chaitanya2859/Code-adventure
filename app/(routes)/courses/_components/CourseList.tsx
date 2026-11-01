'use client'

import axios from "axios"
import { ChartNoAxesColumnIncreasingIcon, Lock } from "lucide-react"
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
    free?: boolean,
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
            <Link href={'/courses/' + key.courseId} key={key.courseId}>
              <div className="mx-0 md:mx-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 p-4 border border-zinc-700 h-full flex flex-col justify-between transition-all">
                <div>
                  <div className="relative">
                    <Image
                      src={(key?.banner).trimEnd()}
                      alt={key?.title}
                      width={400}
                      height={140}
                      unoptimized
                      loading="lazy"
                      className="h-35 w-full rounded-t-md object-cover"
                    />
                    {(key.courseId === 3 || key.free === false) && (
                      <span className="absolute top-2 right-2 bg-black/80 backdrop-blur-md text-yellow-400 border border-yellow-500/60 px-2.5 py-1 rounded-lg text-xs font-game flex items-center gap-1 shadow-lg">
                        <Lock className="w-3 h-3" /> Paid
                      </span>
                    )}
                  </div>
                  <div className="font-game mt-2">
                    <h2 className="text-4xl">{key.title}</h2>
                    <p className="font-game text-xl text-gray-400 line-clamp-2">{key.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  <h2 className="bg-zinc-800 flex gap-2 p-2 px-3 font-game text-sm rounded-xl items-center inline-flex">
                    <ChartNoAxesColumnIncreasingIcon className="h-4 w-4" />
                    {key.difficulty}
                  </h2>
                  {key.courseId === 3 || key.free === false ? (
                    <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 px-3 py-1 rounded-xl text-sm font-game flex items-center gap-1.5">
                      Adventurer &amp; Legend
                    </span>
                  ) : (
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-3 py-1 rounded-xl text-sm font-game">
                      Free
                    </span>
                  )}
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
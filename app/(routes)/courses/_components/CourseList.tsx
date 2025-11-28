'use client'

import axios from "axios"
import { ChartNoAxesColumnIncreasingIcon } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"


type Course={
    id: number,
    courseId: number,
    title: string,
    desc: string,
    banner: string,
    difficulty: string
}

const CourseList = () => {

    const [courseList, setCourseList]= useState<Course[]>([])
    const [loading, setLoading]= useState(false)
    useEffect(()=>{
        getAllCourses()
    },[])

    const getAllCourses= async ()=>{
        setLoading(true)
        const res= await axios.get('/api/course')
        setLoading(false)
        console.log(res)
        setCourseList(res?.data)
    }

  return (
    <div className="grid grid-cols-1 cursor-pointer mx-8 px-8 py-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {
        courseList?.map((key, index)=>(
            <div className=" mx-4 rounded-xl hover:bg-zinc-900 p-4" key={index}>
                <Image src={(key?.banner).trimEnd()} alt={key?.title} width={400} className="h-45 rounded-t-md" height={400} />
                <div className="font-game">
                    <h2  className="text-4xl">{key.title}</h2>
                    <p className="font-game text-xl text-gray-400 line-clamp-2">{key.desc}</p>
                    <h2 className="bg-zinc-800 mt-2 flex gap-4 p-2 px-4 font-game rounded-xl items-center inline-flex">
                        <ChartNoAxesColumnIncreasingIcon className="h-4 w-4" />
                            {key.difficulty}
                    </h2>
                </div>
            </div>
        ))
        }
    </div>
  )
}

export default CourseList
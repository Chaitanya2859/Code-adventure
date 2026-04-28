'use client'

import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import course from "../page"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"


import Link from "next/link"


type Course={
    id: number,
    courseId: number,
    title: string,
    desc: string,
    banner: string,
    difficulty: string,
    chapter: Chapter[],
    userEnroll?: boolean,
    free?: boolean
}

type Chapter={
    chapterId: number,
    courseId: number,
    desc: string,
    id:number,
    exercises: Exercise[],
    title: string,
}

type Exercise={
    name:string,
    slug: string,
    xp: number,
    difficulty: string
}

type Props= {
    courseDetail: Course | undefined,
    loading: boolean,
    refreshData : ()=> void
}

const CourseDetail = ({loading , courseDetail, refreshData}: Props) => {

    const [load, setLoad]= useState(false)
    const enrollCourse = async ()=>{
        setLoad(true)
        const res= await axios.post('/api/enroll/',{
            courseId: courseDetail?.courseId
        })
        console.log(res)
        toast.success('Course Enrolled Sucessfully')
        refreshData()
        setLoad(false)
    }

  return (
    <div className="">
        {
            !courseDetail ? <Skeleton className="w-full h-90" />:
            <div className="font-game relative">
                <Image src={courseDetail?.banner?.trimEnd()} alt={courseDetail?.title} width={1400} height={350} unoptimized className="w-full h-85 object-cover" />
                <div className="absolute top-0 pt-24 h-full px-8 md:px-24 lg:32 xl:px-40 bg-linear-to-r from-black/80 to-white-50/50">
                    <h2 className="text-7xl"style={
                {
                    textShadow: "1px 1px 0 #000, -1px -1px 0 #000,1px -1px 0 #000, -1px 1px 0 #000"
                }
            }>{courseDetail?.title}</h2>
                <p className="text-2xl " style={
                {
                    textShadow: "1px 1px 0 #000, -1px -1px 0 #000,1px -1px 0 #000, -1px 1px 0 #000"
                }
            } >{courseDetail?.desc}</p>
                {courseDetail.userEnroll ? <></> : 
                    courseDetail.free ? 
                    <Button className="text-2xl font-game" size={'lg'} variant={'pixel'} disabled={load} onClick={enrollCourse}>Enroll now</Button> :
                    <Link href="/pricing"><Button className="text-2xl font-game" size={'lg'} variant={'pixel'}>Upgrade now</Button></Link>
                }
                
                </div>
            </div>
        }
    </div>
  )
}

export default CourseDetail
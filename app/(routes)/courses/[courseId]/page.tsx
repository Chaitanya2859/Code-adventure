'use client'
import { useParams } from "next/navigation"
import CourseDetail from "./_component/CourseDetail"
import CourseChapters from "./_component/CourseChapters"
import axios from "axios"
import { useEffect, useState } from "react"
import CourseStatus from "./_component/CourseStatus"
import Upgrade from "../../dashboard/_component/Upgrade"
import CommunityHelpSection from "./_component/CommunityHelpSection"

type Course={
    id: number,
    courseId: number,
    title: string,
    desc: string,
    banner: string,
    difficulty: string,
    chapter: Chapter[]
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
    loading: boolean
}

const course = () => {

    const {courseId}= useParams()
    const [loading, setLoading]= useState(false)
    const [courseDetail, setCourseDetail]= useState<Course>()

    useEffect(()=>{
        courseId && getCourseDetail()
    },[courseId])

    const getCourseDetail = async ()=>{
        setLoading(true)
        const res=await axios.get('/api/course?courseid='+courseId)
        console.log(res.data)
        setCourseDetail(res?.data)
        setLoading(false)
    }
  return (
    <div className="">
        <CourseDetail
        loading={loading}
        courseDetail= {courseDetail}
        />
        <div className="grid grid-cols-3 gap-7 p-10 md:px-24 lg:px-40">
            <div className="col-span-2">
                <CourseChapters loading={loading}
        courseDetail= {courseDetail} />
            </div>
            <div className="">
                <CourseStatus courseDetail= {courseDetail} />
                <Upgrade />
                <CommunityHelpSection />
            </div>
        </div>
    </div>
  )
}

export default course
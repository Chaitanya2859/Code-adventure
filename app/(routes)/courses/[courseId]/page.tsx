'use client'
import { useParams, useRouter } from "next/navigation"
import CourseDetail from "./_component/CourseDetail"
import CourseChapters from "./_component/CourseChapters"
import axios from "axios"
import { useEffect, useState } from "react"
import CourseStatus from "./_component/CourseStatus"
import Upgrade from "../../dashboard/_component/Upgrade"

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
    loading: boolean,
    refreshData: ()=> void
}

const course = () => {

    const {courseId}= useParams()
    const router = useRouter()
    const [loading, setLoading]= useState(false)
    const [courseDetail, setCourseDetail]= useState<Course>()

    useEffect(()=>{
        courseId && getCourseDetail()
    },[courseId])

    const getCourseDetail = async ()=>{
        try {
            setLoading(true)
            const res = await axios.get('/api/course?courseid=' + courseId)
            setCourseDetail(res?.data)
        } catch (error) {
            router.push('/courses')
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className="">
        <CourseDetail
        refreshData={()=> getCourseDetail()}
        loading={loading}
        courseDetail= {courseDetail}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 p-4 sm:p-10 md:px-24 lg:px-40">
            <div className="col-span-1 md:col-span-2">
                <CourseChapters loading={loading}
        courseDetail= {courseDetail} />
            </div>
            <div className="">
                <CourseStatus courseDetail= {courseDetail} />
                <Upgrade />
            </div>
        </div>
    </div>
  )
}

export default course
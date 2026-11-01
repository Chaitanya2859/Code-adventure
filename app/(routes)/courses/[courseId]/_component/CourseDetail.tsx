'use client'

import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import course from "../page"
import { Button } from "@/components/ui/button"
import { useState, useContext } from "react"
import axios from "axios"
import { toast } from "sonner"
import { UserDetailsContext } from "@/context/UserDetailsContext"

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
 free?: boolean,
 userPlan?: string
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

 const { userDetail } = useContext(UserDetailsContext)
 const isPremium = userDetail?.plan === 'Adventurer' || 
 userDetail?.plan === 'Legend' || 
 courseDetail?.userPlan === 'Adventurer' || 
 courseDetail?.userPlan === 'Legend';
 const isPaidCourse = courseDetail?.courseId === 3 || courseDetail?.free === false;
 const [load, setLoad]= useState(false)
 const enrollCourse = async ()=>{
 try {
 setLoad(true)
 await axios.post('/api/enroll/',{
 courseId: courseDetail?.courseId
 })
 toast.success('Course Enrolled Successfully')
 refreshData()
 } catch (error: any) {
 toast.error(error.response?.data?.error || 'Failed to enroll in course')
 } finally {
 setLoad(false)
 }
 }

 return (
 <div className="">
 {
 !courseDetail ? <Skeleton className="w-full h-90" />:
 <div className="font-game relative">
 <Image 
 src={courseDetail?.banner?.trimEnd()} 
 alt={courseDetail?.title || "Course Banner"} 
 width={1400} 
 height={350} 
 priority 
 unoptimized
 className="w-full h-85 object-cover" 
 />
 <div className="absolute top-0 pt-24 h-full px-8 md:px-24 lg:32 xl:px-40 bg-linear-to-r from-black/80 to-white-50/50 flex flex-col justify-center">
 <div className="flex items-center gap-3 mb-2">
 {isPaidCourse && (
 <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 px-3 py-1 rounded-xl text-lg font-game">
 Adventurer &amp; Legend Exclusive
 </span>
 )}
 </div>
 <h2 className="text-7xl"style={
 {
 textShadow: "1px 1px 0 #000, -1px -1px 0 #000,1px -1px 0 #000, -1px 1px 0 #000"
 }
 }>{courseDetail?.title}</h2>
 <p className="text-2xl max-w-3xl mb-4" style={
 {
 textShadow: "1px 1px 0 #000, -1px -1px 0 #000,1px -1px 0 #000, -1px 1px 0 #000"
 }
 } >{courseDetail?.desc}</p>
 {isPaidCourse && !isPremium ? (
 <div className="flex flex-wrap items-center gap-4">
 <Link href="/pricing">
 <Button className="text-2xl font-game bg-yellow-400 hover:bg-yellow-500 text-black border-4 border-b-8 border-yellow-600" size={'lg'} variant={'pixel'}>
 Unlock with Adventurer or Legend
 </Button>
 </Link>
 </div>
 ) : courseDetail.userEnroll ? (
 <div>
 <span className="font-game text-2xl text-emerald-400 flex items-center gap-2 drop-shadow-md">
 Enrolled
 </span>
 </div>
 ) : (
 <div>
 <Button className="text-2xl font-game" size={'lg'} variant={'pixel'} disabled={load} onClick={enrollCourse}>
 {load ? 'Enrolling...' : 'Enroll now'}
 </Button>
 </div>
 )}
 
 </div>
 </div>
 }
 </div>
 )
}

export default CourseDetail
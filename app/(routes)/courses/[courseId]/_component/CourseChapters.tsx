'use client'

import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Lock } from "lucide-react"
import { useContext } from "react"
import { UserDetailsContext } from "@/context/UserDetailsContext"

import {
 Tooltip,
 TooltipContent,
 TooltipTrigger,
} from "@/components/ui/tooltip"

type Course={
 id: number,
 courseId: number,
 title: string,
 desc: string,
 banner: string,
 difficulty: string,
 chapter: Chapter[],
 completedExercises?: string[],
 earnedXp?: number,
 userPlan?: string,
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
 loading: boolean
}

const CourseChapters = ({loading , courseDetail}: Props) => {
 const { userDetail } = useContext(UserDetailsContext);
 const isUserPremium = courseDetail?.userPlan === 'Adventurer' || 
 courseDetail?.userPlan === 'Legend' || 
 userDetail?.plan === 'Adventurer' || 
 userDetail?.plan === 'Legend';
 const isPaidCourse = courseDetail?.courseId === 3 || courseDetail?.free === false;
 const isLocked = isPaidCourse && !isUserPremium;

 const sortedChapters = [...(courseDetail?.chapter || [])].sort(
 (a, b) => a.chapterId - b.chapterId
 );

 return (
 <div className="font-game ">
 {sortedChapters.length === 0 ? <Skeleton className="w-full h-35 rounded-2xl" />:
 <div className="rounded-xl border-4 p-4">
 {sortedChapters.map((chapter, idx)=>(
 <div className="rounded-xl" key={idx}>
<Accordion type="single" collapsible>
 <AccordionItem value="item-1">
 <AccordionTrigger className="p-6 hover:underline-0 hover:bg-zinc-800 text-3xl">
 <div className="flex gap-4 items-center text-left">
 <h2>{chapter.chapterId}</h2>
 <h2>{chapter.title}</h2>
 </div>
 </AccordionTrigger>
 <AccordionContent className="p-6 text-xl text-gray-300">
 <div className="bg-zinc-900 p-2 rounded-2xl">
 {chapter.exercises.map((exercise, idx)=>{
 const isCompleted = courseDetail?.completedExercises?.includes(exercise.slug)
 const isNotEnrolled = !courseDetail?.userEnroll;

 const buttonHref = isLocked
 ? '/pricing'
 : isNotEnrolled
 ? '#enroll-section'
 : `/courses/${courseDetail?.courseId}/practice/${exercise.slug}`;

 return <div className="flex p-4 text-lg md:text-2xl justify-between items-center hover:bg-zinc-800 rounded-2xl" key={idx}>
 <div className="flex gap-2 md:gap-4 items-center overflow-hidden">
 <h2 className="whitespace-nowrap shrink-0"> Exercise {idx+1}: </h2>
 <h1 className="line-clamp-1"> {exercise.name}</h1>
 </div>
 <Link href={buttonHref} className="shrink-0 ml-4">
 {isLocked ? (
 <Button className="font-game text-lg md:text-2xl bg-zinc-800 hover:bg-yellow-500 hover:text-black text-yellow-400 border-4 border-b-8 border-zinc-950 active:border-b-4 active:mt-1 px-3 py-1 md:px-6 md:py-2 flex items-center gap-2">
 <Lock size={20} />
 <span className="hidden md:inline">Locked</span>
 <span className="md:hidden"></span>
 </Button>
 ) : isCompleted ? (
 <Button className="font-game text-lg md:text-2xl bg-emerald-500 hover:bg-emerald-600 text-white border-4 border-b-8 border-emerald-700 active:border-b-4 active:mt-1 px-3 py-1 md:px-6 md:py-2">
 <span className="hidden md:inline">Completed</span>
 <span className="md:hidden"></span>
 </Button>
 ) : isNotEnrolled ? (
 <Button disabled className="font-game text-lg md:text-2xl bg-zinc-600 text-zinc-300 border-4 border-b-8 border-zinc-800 active:border-b-4 active:mt-1 px-3 py-1 md:px-6 md:py-2">
 <span className="hidden md:inline">???</span>
 <span className="md:hidden">???</span>
 </Button>
 ) : (
 <Button className="font-game text-lg md:text-2xl bg-yellow-400 hover:bg-yellow-500 text-black border-4 border-b-8 border-yellow-600 active:border-b-4 active:mt-1 px-3 py-1 md:px-6 md:py-2">
 <span className="hidden md:inline">Practice Now</span>
 <span className="md:hidden">-&gt;</span>
 </Button>
 )}
 </Link>
 </div>
 })}
 </div>
 </AccordionContent>
 </AccordionItem>
 </Accordion>
 </div>
 ))}
 </div>
 }
 </div>
 )
}

export default CourseChapters
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
    earnedXp?: number
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


  return (
    <div className="font-game ">
        {courseDetail?.chapter.length===0 ? <Skeleton className="w-full h-35 rounded-2xl" />:
                <div className="rounded-xl border-4 p-4">
            {courseDetail?.chapter.map((chapter, idx)=>(
                <div className="rounded-xl" key={idx}>
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="p-6 hover:underline-0 hover:bg-zinc-800 text-3xl">
        <h2>{chapter.chapterId}</h2>
        {chapter.title}
        </AccordionTrigger>
    <AccordionContent className="p-6 text-xl text-gray-300">
        <div className="bg-zinc-900 p-2 rounded-2xl">
            {chapter.exercises.map((exercise, idx)=>{
                const isCompleted = courseDetail?.completedExercises?.includes(exercise.slug)

                return <div className="flex p-4  text-2xl justify-between hover:bg-zinc-800 rounded-2xl" key={idx}>
                    <div className="flex gap-4">
                    <h2> Exercise: {idx+1} : </h2>
                    <h1> {exercise.name}</h1>
                    </div>
                        <Link href={`/courses/${courseDetail?.courseId}/practice/${exercise.slug}`}>
                            {isCompleted ? (
                                <Button className="font-game text-2xl bg-emerald-500 hover:bg-emerald-600 text-white border-4 border-b-8 border-emerald-700 active:border-b-4 active:mt-1">
                                    Completed
                                </Button>
                            ) : (
                                <Button className="font-game text-2xl bg-yellow-400 hover:bg-yellow-500 text-black border-4 border-b-8 border-yellow-600 active:border-b-4 active:mt-1">
                                    Practice Now
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
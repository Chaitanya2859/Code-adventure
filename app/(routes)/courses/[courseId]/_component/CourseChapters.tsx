'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

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
                return <div className="flex p-4  text-2xl justify-between hover:bg-zinc-800 rounded-2xl" key={idx}>
                    <div className="flex gap-4">
                    <h2> Exercise: {idx+1} : </h2>
                    <h1> {exercise.name}</h1>
                    </div>
                    <div className="">
                        <Tooltip >
                            <TooltipTrigger>
                                <Button variant={'locked'} size={'lg'} className="font-game text-2xl">
                                    ???
                                    {/* {exercise.xp} xp */}
                                </Button></TooltipTrigger>
                            <TooltipContent>
                        <p className="font-game text-lg">Enroll course first</p>
                    </TooltipContent>
                </Tooltip>
                    </div>
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
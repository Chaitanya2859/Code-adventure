'use client'

import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { useEffect, useState } from "react"

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

type Course={
    id: number,
    courseId: number,
    title: string,
    desc: string,
    banner: string,
    difficulty: string,
    chapter: Chapter[]
}

type Props={
    courseDetail: Course | undefined
}

const CourseStatus = ({courseDetail}: Props) => {

    const [count, setCount]= useState<{
        totalExercise:number,
        totalXP: number
    }>()

    useEffect(()=>{
        courseDetail && getCount()
    },[courseDetail])

    const getCount = ()=>{
        let total= 0;
        let xp=0;
        courseDetail?.chapter.forEach((chapter)=>{
            total+= chapter.exercises.length
            chapter.exercises.forEach((c)=>{
                xp+= c.xp
            })
        })
        setCount({
            totalExercise : total,
            totalXP:xp
        })
    }

  return (
    <div className="font-game p-4 border-4 rounded-lg w-full">
        <h2 className="text-3xl px-4">Course Progress</h2>
        <div className="p-2 mt-2">
            <div className="flex gap-4 px-2">
                <Image src='/books.png' alt='books' width={50} height={50} />
                <div className="flex w-full flex-col gap-5">
                    <h2 className="text-2xl flex justify-between">Exercises <span className="text-gray-300">1/{count?.totalExercise}</span> </h2>
                    <Progress className="w-full" value={67} />
                </div>
            </div>
        <div className="flex gap-4 p-2 mt-4">
                <Image src='/star.png' alt='books' width={50} height={50} />
                <div className="flex w-full flex-col gap-2">
                    <h2 className="text-2xl flex justify-between">XP earned <span className="text-gray-300">67/{count?.totalXP}</span> </h2>
                    <Progress className="w-full" value={67} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseStatus
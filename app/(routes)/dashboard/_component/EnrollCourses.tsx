'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

type Course = {
    courseId: number,
    title: string,
    desc: string,
    banner: string,
    difficulty: string,
}

const EnrollCourses = () => {
    const [enrollCourse, setEnrollCourse]= useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getEnrolled = async () => {
            try {
                const res = await axios.get('/api/enroll');
                setEnrollCourse(res.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        getEnrolled();

        const handleFocus = () => getEnrolled();
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

  return (
    <div className="mt-8">
        <h2 className="text-4xl px-3 pb-1 font-game">Your enrolled courses</h2>
        {loading ? (
             <div className="flex flex-col gap-2 p-6 border-2 bg-zinc-900 rounded-2xl">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-24 w-full mt-4" />
             </div>
        ) : enrollCourse.length===0 ? (
         <div className="flex flex-col items-center gap-2 p-6 border-2 bg-zinc-900 rounded-2xl">
            <Image src='/books.png' alt='book' width={90} height={90} />
            <h1 className="font-game text-3xl">You don't have any enrolled courses</h1>
            <Link href={'/courses'}>
            <Button variant={'pixel'} size={'lg'} className="font-game text-2xl">Browse all courses</Button>
            </Link>
         </div>
        ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {enrollCourse.map((course, idx) => (
                <Link key={idx} href={`/courses/${course.courseId}`}>
                    <div className="bg-zinc-900 border-2 border-zinc-800 p-4 rounded-2xl hover:bg-zinc-800 transition-colors cursor-pointer h-full">
                        {course.banner && <Image src={course.banner.trimEnd()} alt={course.title} width={300} height={150} className="w-full h-40 object-cover rounded-xl mb-4" unoptimized />}
                        <h2 className="text-3xl font-game">{course.title}</h2>
                        <p className="text-zinc-400 line-clamp-2 mt-2 font-game">{course.desc}</p>
                    </div>
                </Link>
            ))}
         </div> 
        )}
    </div>
  )
}

export default EnrollCourses
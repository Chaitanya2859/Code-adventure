import Image from 'next/image'
import CourseList from './_components/CourseList'

const Courses = () => {
  return (
    <div className=''>
        <div className="relative ">
            <Image src={'/hero12.gif'} alt='course-banner' height={100} width={1200} className='w-full object-cover h-85'  />
            <div style={
                {
                    textShadow: "1px 1px 0 #000, -1px -1px 0 #000,1px -1px 0 #000, -1px 1px 0 #000"
                }
            } className="absolute top-0 h-full pt-24 px-8 md:px-24 lg:32 xl:px-40 bg-linear-to-r from-black/80 to-white-50/50  ">
                <h2 className='text-7xl font-game'>Explore all courses</h2>
                <h2 className='text-3xl font-game'>Explore all courses and enroll to learn and inprove your skills</h2>
            </div>
        </div>

        <div className="">
            <h2 className='font-game text-4xl pt-8 px-8 md:px-24 '>All courses</h2>
            <CourseList />
        </div>
    </div>
    
  )
}

export default Courses
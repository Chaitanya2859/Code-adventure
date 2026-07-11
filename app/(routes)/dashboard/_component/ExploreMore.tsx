import Image from "next/image";
import Link from "next/link";

const ExploreMoreOptions = [
  {
    id: 1,
    title: "Quiz Pack",
    desc: "Practice what you learned with bite-sized code challenges.",
    icon: "/heart.png",
    path: "/coming-soon"
  },
  {
    id: 2,
    title: "Video Courses",
    desc: "Learn with structured video lessons taught step-by-step.",
    icon: "/smile.png",
    path: "/coming-soon"
  },
  {
    id: 3,
    title: "Projects",
    desc: "Build real-world apps by collaborating with the community.",
    icon: "/rainbow.png",
    path: "/coming-soon"
  },
  {
    id: 4,
    title: "Community",
    desc: "Connect, share code, and discuss with fellow learners.",
    icon: "/plant.png",
    path: "/coming-soon"
  },
];

const ExploreMore = () => {
  return (
    <div className="mt-4">
        <p className="text-zinc-500 text-lg font-game mb-3">Coming soon...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ExploreMoreOptions.map((key, index)=>(
                    <Link href={key.path} key={index}>
                    <div className="p-4 bg-zinc-900 rounded-xl border-2 hover:bg-zinc-800 cursor-pointer h-full">
                        
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center">
                        <Image src={key.icon} alt={key.title} width={80} height={80} className="w-16 h-16 md:w-20 md:h-20" />
                        <h2 className="font-game text-2xl md:text-3xl">{key.title}</h2>
                        </div>
                        <h2 className="font-game font-medium pt-2 text-zinc-400 text-sm md:text-base">{key.desc}</h2>
                    </div>
                    </Link>
                ))}
        </div>
    </div>
  )
}

export default ExploreMore
import Image from "next/image";
import Link from "next/link";

const ExploreMoreOptions = [
  {
    id: 1,
    title: "Quiz Pack",
    desc: "Practice what you learned with bite-sized code challenges.",
    icon: "/heart.png",
    path: "#"
  },
  {
    id: 2,
    title: "Video Courses",
    desc: "Learn with structured video lessons taught step-by-step.",
    icon: "/smile.png",
    path: "#"
  },
  {
    id: 3,
    title: "Community Project",
    desc: "Build real-world apps by collaborating with the community.",
    icon: "/rainbow.png",
    path: "/projects"
  },
  {
    id: 4,
    title: "Community",
    desc: "Connect, share code, and discuss with fellow learners.",
    icon: "/plant.png",
    path: "/community"
  },
];

const ExploreMore = () => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
        {ExploreMoreOptions.map((key, index)=>(
                <Link href={key.path} key={index}>
                <div className="p-4 bg-zinc-900 rounded-xl border-2 hover:bg-zinc-800 cursor-pointer h-full">
                    
                    <div className="flex gap-8 items-center">
                    <Image src={key.icon} alt={key.title} width={80} height={80} />
                    <h2 className="font-game text-3xl">{key.title}</h2>
                    </div>
                    <h2 className="font-game font-medium  pt-2 text-zinc-400">{key.desc}</h2>
                </div>
                </Link>
            ))}
    </div>
  )
}

export default ExploreMore
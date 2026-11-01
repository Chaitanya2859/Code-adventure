import Image from "next/image";
import Link from "next/link";

const ExploreMoreOptions = [
  {
    id: 1,
    title: "Quiz Pack",
    desc: "Practice HTML, CSS, and JS with bite-sized quiz challenges.",
    icon: "/heart.png",
    path: "/quizzes",
    badge: "ACTIVE"
  },
  {
    id: 2,
    title: "Crash Courses",
    desc: "Byte-sized crash courses on HTML, CSS, and JavaScript.",
    icon: "/rainbow.png",
    path: "/crashcourse",
    badge: "ACTIVE"
  },
  {
    id: 3,
    title: "Video Courses",
    desc: "Watch in-depth video tutorials and coding walkthroughs.",
    icon: "/smile.png",
    path: "/coming-soon",
    badge: "COMING SOON"
  },
  {
    id: 4,
    title: "Projects",
    desc: "Build real-world apps by collaborating with the community.",
    icon: "/plant.png",
    path: "/coming-soon",
    badge: "COMING SOON"
  },
];

const ExploreMore = () => {
  return (
    <div className="mt-4">
        <p className="text-zinc-500 text-lg font-game mb-3">More Adventures</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ExploreMoreOptions.map((key: any, index)=>(
                    <Link href={key.path} key={index}>
                    <div className="p-4 bg-zinc-900 rounded-xl border-2 hover:bg-zinc-800 cursor-pointer h-full relative">
                        {key.badge && (
                          <span className={`absolute top-3 right-3 text-xs px-2.5 py-0.5 rounded-full font-game border ${
                            key.badge === 'COMING SOON'
                              ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/40'
                              : key.badge === 'NEW'
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/50'
                              : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                          }`}>
                            {key.badge}
                          </span>
                        )}
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
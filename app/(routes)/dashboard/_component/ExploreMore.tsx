import Image from "next/image";

const ExploreMoreOptions = [
  {
    id: 1,
    title: "Quiz Pack",
    desc: "Practice what you learned with bite-sized code challenges.",
    icon: "/heart.png",
  },
  {
    id: 2,
    title: "Video Courses",
    desc: "Learn with structured video lessons taught step-by-step.",
    icon: "/smile.png",
  },
  {
    id: 3,
    title: "Community Project",
    desc: "Build real-world apps by collaborating with the community.",
    icon: "/rainbow.png",
  },
  {
    id: 4,
    title: "Talk with AI",
    desc: "Chat with an AI to boost your learning speed.",
    icon: "/plant.png",
  },
];

const ExploreMore = () => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
        {ExploreMoreOptions.map((key, index)=>(
                <div className="p-4 bg-zinc-900 rounded-xl border-2 hover:bg-zinc-800 cursor-pointer " key={index}>
                    
                    <div className="flex gap-8 items-center">
                    <Image src={key.icon} alt={key.title} width={80} height={80} />
                    <h2 className="font-game text-3xl">{key.title}</h2>
                    </div>
                    <h2 className="font-game font-medium  pt-2 text-zinc-400">{key.desc}</h2>
                </div>
            ))}
    </div>
  )
}

export default ExploreMore
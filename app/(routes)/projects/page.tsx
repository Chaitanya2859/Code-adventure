import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const textShadow = {
  textShadow: "1px 1px 0 #000, -1px -1px 0 #000,1px -1px 0 #000, -1px 1px 0 #000"
}

const TAGS = {
  beginner: "bg-green-800 text-green-200",
  intermediate: "bg-yellow-800 text-yellow-200",
  advanced: "bg-red-900 text-red-200",
}

const projects = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    desc: "Build a sleek portfolio site to showcase your skills, projects, and contact info using HTML & CSS.",
    difficulty: "Beginner",
    xp: 200,
    tech: ["HTML", "CSS"],
    banner: "/hero9.gif",
    chapters: 5,
  },
  {
    id: 2,
    title: "JavaScript Quiz App",
    desc: "Create a timed quiz application with score tracking, multiple-choice questions, and a results screen.",
    difficulty: "Intermediate",
    xp: 400,
    tech: ["HTML", "CSS", "JavaScript"],
    banner: "/hero10.gif",
    chapters: 7,
  },
  {
    id: 3,
    title: "React Todo Board",
    desc: "Build a Kanban-style todo board with drag-and-drop support using React hooks and local state.",
    difficulty: "Intermediate",
    xp: 500,
    tech: ["React"],
    banner: "/hero11.gif",
    chapters: 8,
  },
  {
    id: 4,
    title: "Python Data Dashboard",
    desc: "Scrape public data with Python and visualise it in a browser-friendly dashboard with charts.",
    difficulty: "Advanced",
    xp: 700,
    tech: ["Python"],
    banner: "/hero13.gif",
    chapters: 10,
  },
  {
    id: 5,
    title: "REST API with Node.js",
    desc: "Design and build a fully functional REST API for a blog platform with authentication using Express & JWT.",
    difficulty: "Advanced",
    xp: 800,
    tech: ["Node.js"],
    banner: "/hero14.gif",
    chapters: 12,
  },
  {
    id: 6,
    title: "CSS Animation Playground",
    desc: "Master keyframes, transitions, and transforms by building an interactive animation showcase page.",
    difficulty: "Beginner",
    xp: 250,
    tech: ["CSS"],
    banner: "/hero6.gif",
    chapters: 4,
  },
  {
    id: 7,
    title: "Chat App UI Clone",
    desc: "Recreate a Discord-style chat interface with channels, messages, and user avatars using React.",
    difficulty: "Intermediate",
    xp: 550,
    tech: ["React"],
    banner: "/hero-8.gif",
    chapters: 9,
  },
  {
    id: 8,
    title: "City Weather App",
    desc: "Fetch live weather data from a public API and display it with animated weather icons and a city map.",
    difficulty: "Intermediate",
    xp: 450,
    tech: ["JavaScript", "CSS"],
    banner: "/city.gif",
    chapters: 6,
  },
]

export default function ProjectsPage() {
  return (
    <div>
      {/* Banner */}
      <div className="relative">
        <Image
          src="/hero2.gif"
          alt="Projects Banner"
          width={1920}
          height={400}
          unoptimized
          className="w-full object-cover h-80"
        />
        <div
          className="absolute top-0 h-full w-full flex flex-col justify-center px-8 md:px-24 xl:px-40 bg-gradient-to-r from-black/80 to-transparent"
          style={textShadow}
        >
          <h1 className="text-7xl font-game">Community Projects</h1>
          <p className="text-3xl font-game mt-2">Build real things. Level up faster.</p>
        </div>
      </div>

      {/* Header */}
      <div className="px-8 md:px-24 pt-10">
        <h2 className="font-game text-4xl">All Projects</h2>
        <p className="text-zinc-400 font-game text-xl mt-1">
          Pick a project, earn XP, and add it to your portfolio.
        </p>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-8 md:px-24 py-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-zinc-900 border-2 rounded-xl overflow-hidden hover:border-zinc-500 transition-colors cursor-pointer"
          >
            <Image
              src={project.banner}
              alt={project.title}
              width={600}
              height={200}
              unoptimized
              className="w-full h-40 object-cover"
            />
            <div className="p-4 font-game">
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-sm px-3 py-1 rounded-full font-semibold ${TAGS[project.difficulty.toLowerCase() as keyof typeof TAGS]}`}
                >
                  {project.difficulty}
                </span>
                <span className="text-yellow-400 text-lg">+{project.xp} XP</span>
              </div>
              <h2 className="text-2xl mt-2">{project.title}</h2>
              <p className="text-zinc-400 text-base mt-1 line-clamp-2">{project.desc}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tech.map((t) => (
                  <span key={t} className="bg-zinc-800 text-zinc-300 text-sm px-2 py-1 rounded-md">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-zinc-500 text-sm">{project.chapters} chapters</span>
                <Button variant="pixel" className="font-game text-lg px-5 py-2">
                  Start Project
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { QUIZ_PACKS } from '@/quizzes-data'
import { UserDetailsContext } from '@/context/UserDetailsContext'
import { Lock, Award, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react'

const textShadow = {
  textShadow: "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
}

export default function QuizzesHubPage() {
  const { userDetail } = useContext(UserDetailsContext)
  const [quizStatus, setQuizStatus] = useState<any>({
    authenticated: false,
    userPlan: 'Explorer',
    attempts: {}
  })
  const [localScores, setLocalScores] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get('/api/quiz/status')
        setQuizStatus(res.data)
      } catch (err) {
        console.error('Failed to load quiz status', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStatus()

    try {
      const scores: Record<string, number> = {}
      for (const key of Object.keys(QUIZ_PACKS)) {
        const val = localStorage.getItem(`quiz_highscore_${key}`)
        if (val !== null) {
          scores[key] = Number(val)
        }
      }
      setLocalScores(scores)
    } catch (e) {
      // ignore
    }
  }, [])

  const currentPlan = userDetail?.plan || quizStatus.userPlan || 'Explorer'
  const isPremiumUser = currentPlan === 'Adventurer' || currentPlan === 'Legend'

  const packs = Object.values(QUIZ_PACKS)

  return (
    <div className="min-h-screen pb-16 font-game">
      {/* Hero Banner */}
      <div className="relative">
        <Image
          src="/hero3.gif"
          alt="Quiz Pack Banner"
          width={1920}
          height={400}
          priority
          sizes="100vw"
          className="w-full object-cover h-[350px] md:h-[400px]"
        />
        <div
          style={textShadow}
          className="absolute top-0 h-full w-full pt-16 md:pt-24 px-6 md:px-20 lg:px-36 bg-linear-to-r from-black/85 via-black/60 to-transparent flex flex-col justify-center"
        >
          <h1 className="text-5xl md:text-7xl font-game text-white tracking-wide">
            Quiz Battleground
          </h1>
          <p className="text-xl md:text-3xl text-zinc-300 mt-2 max-w-2xl font-game">
            Test your HTML, CSS, and JavaScript skills with interactive bite-sized challenges and earn XP!
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl text-white">Choose Your Quiz Pack</h2>
            <p className="text-zinc-400 text-lg">Pick a track, answer 10 questions, and claim your victory rewards.</p>
          </div>
        </div>

        {/* Quiz Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packs.map((pack) => {
            const isLocked = pack.isPaid && !isPremiumUser
            const attemptInfo = quizStatus?.attempts?.[pack.id]

            return (
              <div
                key={pack.id}
                className={`relative flex flex-col justify-between rounded-2xl bg-zinc-900 border-4 p-6 transition-all duration-300 hover:border-yellow-500/80 hover:shadow-2xl ${
                  isLocked ? 'border-zinc-800 opacity-90' : 'border-zinc-700'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-full border ${
                      pack.isPaid
                        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                    }`}
                  >
                    {pack.badge}
                  </span>

                  <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full border border-zinc-700">
                    {pack.difficulty}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="mb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-16 h-16 rounded-xl bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center p-2 shadow-inner shrink-0">
                      <Image
                        src={pack.icon}
                        alt={pack.title}
                        width={48}
                        height={48}
                        unoptimized={pack.icon.endsWith('.gif')}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-3xl text-white">{pack.title}</h3>
                      <p className="text-yellow-400 text-sm">{pack.tagline}</p>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-base leading-relaxed line-clamp-3">
                    {pack.desc}
                  </p>
                </div>

                {/* Details Meta */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-zinc-800 my-4 text-sm">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <HelpCircle className="w-4 h-4 text-zinc-500" />
                    <span>{pack.questions.length} Questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Award className="w-4 h-4 text-emerald-500" />
                    <span>+{pack.xpReward} Max XP</span>
                  </div>
                </div>

                {/* Progress / Status Indicator */}
                <div className="mt-4">
                  {/* High Score tracker */}
                  {(() => {
                    const serverBest = attemptInfo?.bestScore ?? 0
                    const localBest = localScores[pack.id] ?? 0
                    const displayedBest = Math.max(serverBest, localBest)

                    if (displayedBest > 0) {
                      return (
                        <div className="flex items-center justify-between text-sm bg-yellow-500/10 border border-yellow-500/30 px-3 py-1.5 rounded-lg mb-4 text-yellow-300">
                          <span className="text-xs font-mono uppercase">High Score</span>
                          <span className="font-bold text-yellow-400">
                            {displayedBest} / {pack.questions.length}
                          </span>
                        </div>
                      )
                    }
                    return null
                  })()}

                  {attemptInfo?.completed && (
                    <div className="flex items-center gap-2 text-emerald-400 text-sm mb-3">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Conquered! Best: {attemptInfo.bestScore}/{pack.questions.length}</span>
                    </div>
                  )}

                  {isLocked ? (
                    <Link href="/pricing" className="block w-full">
                      <Button
                        className="w-full text-xl font-game bg-zinc-800 hover:bg-zinc-700 text-yellow-400 border-2 border-yellow-500/40 flex items-center justify-center gap-2 py-6 cursor-pointer"
                        variant="pixel"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Unlock Track</span>
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/quizzes/${pack.id}`} className="block w-full">
                      <Button
                        className="w-full text-xl font-game bg-yellow-400 hover:bg-yellow-500 text-black border-4 border-b-8 border-yellow-600 flex items-center justify-center gap-2 py-6 cursor-pointer"
                        variant="pixel"
                      >
                        <span>
                          {((attemptInfo?.bestScore ?? 0) > 0 || (localScores[pack.id] ?? 0) > 0)
                            ? 'Play Again'
                            : 'Start Quest'}
                        </span>
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

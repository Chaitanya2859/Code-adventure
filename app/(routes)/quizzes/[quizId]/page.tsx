'use client'

import { useState, useEffect, useContext, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { QUIZ_PACKS, QuizPack, QuizQuestion } from '@/quizzes-data'
import { UserDetailsContext } from '@/context/UserDetailsContext'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
 ArrowLeft,
 ArrowRight,
 CheckCircle2,
 XCircle,
 RotateCcw,
 Lock,
 Heart,
 Sparkles
} from 'lucide-react'

const textShadow = {
 textShadow: "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
}

export default function QuizEnginePage({ params }: { params: Promise<{ quizId: string }> }) {
 const resolvedParams = use(params)
 const quizId = resolvedParams.quizId.toLowerCase()
 const router = useRouter()
 const { userDetail, setUserDetail } = useContext(UserDetailsContext)

 const quiz: QuizPack | undefined = QUIZ_PACKS[quizId]

 // Game state
 const [currentIndex, setCurrentIndex] = useState(0)
 const [selectedOption, setSelectedOption] = useState<number | null>(null)
 const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
 const [score, setScore] = useState(0)
 const [lives, setLives] = useState(3)
 const [streak, setStreak] = useState(0)
 const [answersLog, setAnswersLog] = useState<{ questionId: number; chosen: number; correct: number; isCorrect: boolean }[]>([])
 const [isQuizCompleted, setIsQuizCompleted] = useState(false)
 const [isGameOver, setIsGameOver] = useState(false)
 const [xpAwarded, setXpAwarded] = useState<number | null>(null)
 const [savingResult, setSavingResult] = useState(false)
 const [highScore, setHighScore] = useState(0)
 const [isNewHighScore, setIsNewHighScore] = useState(false)

 useEffect(() => {
 if (quiz) {
 try {
 const saved = localStorage.getItem(`quiz_highscore_${quiz.id}`)
 if (saved !== null) {
 setHighScore(Number(saved))
 }
 } catch (e) {}
 }
 }, [quiz?.id])

 const currentPlan = userDetail?.plan || 'Explorer'
 const isPremiumUser = currentPlan === 'Adventurer' || currentPlan === 'Legend'
 const isLocked = quiz?.isPaid && !isPremiumUser

 if (!quiz) {
 return (
 <div className="min-h-[60vh] flex flex-col items-center justify-center font-game px-4 text-center">
 <h1 className="text-4xl text-yellow-400 mb-3">Quiz Pack Not Found</h1>
 <p className="text-lg text-zinc-400 mb-5">The requested quiz realm does not exist.</p>
 <Link href="/quizzes">
 <Button variant="pixel" className="text-base font-game py-3 px-6">
 ← Back to Quizzes
 </Button>
 </Link>
 </div>
 )
 }

 // If locked behind Adventurer / Legend plan
 if (isLocked) {
 return (
 <div className="min-h-[75vh] flex items-center justify-center font-game px-3">
 <div className="max-w-lg w-full bg-zinc-900 border-2 md:border-4 border-yellow-500/60 rounded-2xl p-6 md:p-8 text-center shadow-2xl relative overflow-hidden">
 <div className="absolute -top-10 -right-10 w-36 h-36 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />
 <Image
 src="/tresure.gif"
 alt="Locked Treasure"
 width={80}
 height={80}
 unoptimized
 className="mx-auto mb-4 drop-shadow-lg"
 />

 <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 px-3 py-0.5 rounded-full text-xs font-game inline-flex items-center gap-1.5 mb-3">
 <Lock className="w-3.5 h-3.5" /> Adventurer &amp; Legend Exclusive
 </span>

 <h1 className="text-3xl md:text-4xl text-white mb-3" style={textShadow}>
 {quiz.title} is Locked!
 </h1>

 <p className="text-sm md:text-base text-zinc-300 mb-6 max-w-md mx-auto">
 The JavaScript Quiz Pack tests advanced coding logic, functions, promises, and the event loop. Unlock it by upgrading to the <strong className="text-yellow-400">Adventurer</strong> or <strong className="text-yellow-400">Legend</strong> pack.
 </p>

 <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
 <Link href="/pricing" className="w-full sm:w-auto">
 <Button
 variant="pixel"
 className="w-full sm:w-auto text-base font-game py-3.5 px-6 bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-b-4 border-yellow-600"
 >
 View Plans &amp; Upgrade
 </Button>
 </Link>

 <Link href="/quizzes" className="w-full sm:w-auto">
 <Button variant="pixel" className="w-full sm:w-auto text-base font-game py-3.5 px-6">
 ← Other Quizzes
 </Button>
 </Link>
 </div>
 </div>
 </div>
 )
 }

 const currentQuestion: QuizQuestion = quiz.questions[currentIndex]
 const totalQuestions = quiz.questions.length
 const progressPercent = ((currentIndex + 1) / totalQuestions) * 100

 const handleSelectOption = (index: number) => {
 if (isAnswerSubmitted) return
 setSelectedOption(index)
 setIsAnswerSubmitted(true)

 const isCorrect = index === currentQuestion.correctAnswer

 if (isCorrect) {
 setScore((prev) => prev + 1)
 setStreak((prev) => prev + 1)
 toast.success(' Correct Answer! +Combo')
 } else {
 const nextLives = lives - 1
 setLives(nextLives)
 setStreak(0)
 if (nextLives <= 0) {
 toast.error(' 0 Hearts remaining! Game Over.')
 } else {
 toast.error(' Not quite! Review the explanation below.')
 }
 }

 setAnswersLog((prev) => [
 ...prev,
 {
 questionId: currentQuestion.id,
 chosen: index,
 correct: currentQuestion.correctAnswer,
 isCorrect
 }
 ])
 }

 const finishQuiz = async (finalScore: number, isGameOverRun: boolean = false) => {
 try {
 // Manage High Score
 const previousBest = Number(localStorage.getItem(`quiz_highscore_${quiz.id}`) || '0')
 if (finalScore > previousBest) {
 localStorage.setItem(`quiz_highscore_${quiz.id}`, String(finalScore))
 setHighScore(finalScore)
 setIsNewHighScore(true)
 toast.success(` New High Score: ${finalScore}/${totalQuestions}!`)
 } else {
 setHighScore(previousBest)
 }

 setSavingResult(true)
 const res = await axios.post('/api/quiz/complete', {
 quizId: quiz.id,
 score: finalScore,
 totalQuestions
 })
 if (res.data?.success) {
 setXpAwarded(res.data.xpEarned)
 if (!isGameOverRun) {
 toast.success(` Quiz Complete! +${res.data.xpEarned} XP Earned!`)
 }
 }
 } catch (err: any) {
 console.warn('Could not record score to server:', err?.response?.data?.error || err.message)
 } finally {
 setSavingResult(false)
 }
 }

 const handleNext = async () => {
 // If hearts ran out after 3 wrong answers -> trigger Game Over
 if (lives <= 0) {
 setIsGameOver(true)
 await finishQuiz(score, true)
 return
 }

 if (currentIndex < totalQuestions - 1) {
 setCurrentIndex((prev) => prev + 1)
 setSelectedOption(null)
 setIsAnswerSubmitted(false)
 } else {
 // Quiz Finished!
 setIsQuizCompleted(true)
 await finishQuiz(score, false)
 }
 }

 const handleRestart = () => {
 setCurrentIndex(0)
 setSelectedOption(null)
 setIsAnswerSubmitted(false)
 setScore(0)
 setLives(3)
 setStreak(0)
 setAnswersLog([])
 setIsQuizCompleted(false)
 setIsGameOver(false)
 setXpAwarded(null)
 setIsNewHighScore(false)
 }

 // Game Over Screen - Shown after 3 wrong answers
 if (isGameOver) {
 const displayedHighScore = Math.max(score, highScore)

 return (
 <div className="min-h-[75vh] flex items-center justify-center py-6 px-3 font-game max-w-md mx-auto">
 <div className="w-full bg-zinc-900 border-2 md:border-4 border-red-600/70 rounded-2xl p-5 md:p-6 shadow-2xl text-center relative overflow-hidden">
 <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

 {/* Game Over Graphic */}
 <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-red-500/10 border-2 border-red-500/40 flex items-center justify-center shadow-inner">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>

 <span className="text-xs uppercase font-mono px-3 py-0.5 rounded-full border border-red-500/50 bg-red-500/20 text-red-400 inline-block mb-2">
 0 Hearts Remaining
 </span>

 <h1 className="text-4xl md:text-5xl text-red-500 mb-1" style={textShadow}>
 GAME OVER
 </h1>

 <p className="text-sm text-zinc-400 mb-4">
 You missed 3 challenges. Dust yourself off and try again!
 </p>

 {isNewHighScore && (
 <div className="inline-flex items-center gap-1.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 px-3 py-1 rounded-full text-xs mb-4 animate-pulse">
 <Sparkles className="w-4 h-4" /> NEW HIGH SCORE ACHIEVED!
 </div>
 )}

 {/* High Score & Current Score Box */}
 <div className="grid grid-cols-2 gap-2.5 bg-black/60 p-3 rounded-xl border border-zinc-800 mb-5">
 <div className="text-center p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
 <p className="text-xs text-zinc-400 font-mono">This Run</p>
 <p className="text-2xl text-white mt-0.5">{score} / {totalQuestions}</p>
 </div>
 <div className="text-center p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
 <p className="text-xs text-yellow-400 font-mono">High Score</p>
 <p className="text-2xl text-yellow-400 mt-0.5">{displayedHighScore} / {totalQuestions}</p>
 </div>
 </div>

 {/* Try Again and Back Buttons */}
 <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
 <Button
 onClick={handleRestart}
 variant="pixel"
 className="w-full sm:w-auto flex-1 text-base md:text-lg font-game py-3.5 bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-b-4 border-yellow-600 flex items-center justify-center gap-2"
 >
 <RotateCcw className="w-4 h-4" />
 <span>Try Again</span>
 </Button>

 <Link href="/quizzes" className="w-full sm:w-auto flex-1">
 <Button
 variant="pixel"
 className="w-full text-base md:text-lg font-game py-3.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-2 border-zinc-700 flex items-center justify-center gap-2"
 >
 <ArrowLeft className="w-4 h-4" />
 <span>Back</span>
 </Button>
 </Link>
 </div>
 </div>
 </div>
 )
 }

 // Quiz Results Screen - Quest Complete
 if (isQuizCompleted) {
 const percentage = Math.round((score / totalQuestions) * 100)
 let rankTitle = 'Apprentice Coder'
 let rankBadge = ' Rank C'
 let rankColor = 'text-zinc-300 border-zinc-500'

 if (percentage === 100) {
 rankTitle = 'Legendary Code Archmage'
 rankBadge = ' S-RANK'
 rankColor = 'text-yellow-400 border-yellow-500'
 } else if (percentage >= 80) {
 rankTitle = 'Master Code Knight'
 rankBadge = ' A-RANK'
 rankColor = 'text-emerald-400 border-emerald-500'
 } else if (percentage >= 60) {
 rankTitle = 'Skilled Adventurer'
 rankBadge = '️ B-RANK'
 rankColor = 'text-cyan-400 border-cyan-500'
 }

 const displayedHighScore = Math.max(score, highScore)

 return (
 <div className="min-h-screen py-8 px-3 md:px-4 font-game max-w-2xl mx-auto">
 <div className="bg-zinc-900 border-2 md:border-4 border-zinc-700 rounded-2xl p-5 md:p-8 shadow-2xl text-center">
 <Image
 src="/hero100.webp"
 alt="Results"
 width={100}
 height={100}
 className="mx-auto rounded-2xl border-4 border-zinc-700 mb-4 object-cover"
 />

 <span className={`text-xs md:text-sm font-mono px-3 py-1 rounded-full border ${rankColor} inline-block mb-2`}>
 {rankBadge}
 </span>

 <h1 className="text-4xl md:text-5xl text-white mb-1" style={textShadow}>
 Quest Complete!
 </h1>

 <p className="text-xl text-yellow-400 mb-3">{rankTitle}</p>

 {isNewHighScore && (
 <div className="inline-flex items-center gap-1.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 px-3 py-1 rounded-full text-xs md:text-sm mb-4 animate-pulse">
 <Sparkles className="w-4 h-4" /> NEW HIGH SCORE ACHIEVED!
 </div>
 )}

 {/* Stats Bar */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-xl mx-auto mb-6">
 <div className="bg-zinc-800/80 border border-zinc-700 p-2.5 rounded-xl">
 <p className="text-xs text-zinc-400">Score</p>
 <p className="text-2xl text-white font-bold">{score} / {totalQuestions}</p>
 </div>
 <div className="bg-zinc-800/80 border border-zinc-700 p-2.5 rounded-xl">
 <p className="text-xs text-zinc-400">Accuracy</p>
 <p className="text-2xl text-emerald-400 font-bold">{percentage}%</p>
 </div>
 <div className="bg-zinc-800/80 border border-zinc-700 p-2.5 rounded-xl">
 <p className="text-xs text-zinc-400">High Score</p>
 <p className="text-2xl text-yellow-400 font-bold">
 {displayedHighScore} / {totalQuestions}
 </p>
 </div>
 <div className="bg-zinc-800/80 border border-zinc-700 p-2.5 rounded-xl">
 <p className="text-xs text-zinc-400">XP Reward</p>
 <p className="text-2xl text-emerald-400 font-bold">
 +{xpAwarded !== null ? xpAwarded : Math.round((score / totalQuestions) * quiz.xpReward)} XP
 </p>
 </div>
 </div>

 {/* Action Buttons */}
 <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
 <Button
 onClick={handleRestart}
 variant="pixel"
 className="text-base font-game py-3.5 px-6 flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-b-4 border-yellow-600"
 >
 <RotateCcw className="w-4 h-4" /> Play Again
 </Button>

 <Link href="/quizzes">
 <Button variant="pixel" className="text-base font-game py-3.5 px-6">
 Explore More Quizzes
 </Button>
 </Link>

 </div>

 {/* Question Breakdown Review */}
 <div className="text-left border-t border-zinc-800 pt-5 mt-4">
 <h3 className="text-2xl text-white mb-3">Question Review</h3>
 <div className="space-y-3">
 {quiz.questions.map((q, idx) => {
 const log = answersLog.find((a) => a.questionId === q.id)
 const isCorrect = log?.isCorrect

 return (
 <div
 key={q.id}
 className={`p-3.5 rounded-xl border ${
 isCorrect
 ? 'bg-emerald-950/20 border-emerald-800/50'
 : 'bg-red-950/20 border-red-800/50'
 }`}
 >
 <div className="flex items-center justify-between gap-2 mb-1.5">
 <span className="text-xs font-mono text-zinc-400">
 Question {idx + 1} • {q.topic}
 </span>
 {isCorrect ? (
 <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
 <CheckCircle2 className="w-3.5 h-3.5" /> Correct
 </span>
 ) : (
 <span className="text-xs text-red-400 flex items-center gap-1 font-mono">
 <XCircle className="w-3.5 h-3.5" /> Missed
 </span>
 )}
 </div>

 <p className="text-base text-white mb-1.5">{q.question}</p>

 {q.codeSnippet && (
 <pre className="bg-black/70 p-2.5 rounded-lg text-xs text-yellow-300 font-mono overflow-x-auto mb-2 border border-zinc-800">
 <code>{q.codeSnippet}</code>
 </pre>
 )}

 <div className="text-xs space-y-0.5">
 <p className="text-emerald-400">
 <strong>Correct Answer:</strong> {q.options[q.correctAnswer]}
 </p>
 {log && !log.isCorrect && (
 <p className="text-red-400">
 <strong>Your Answer:</strong> {q.options[log.chosen]}
 </p>
 )}
 </div>

 <div className="mt-2 p-2 bg-black/40 rounded-lg text-xs text-zinc-300 border border-zinc-800/80">
 <strong>Explanation:</strong> {q.explanation}
 </div>
 </div>
 )
 })}
 </div>
 </div>
 </div>
 </div>
 )
 }

 // Active Quiz Game Loop (Compact & Scaled)
 return (
 <div className="min-h-screen py-4 md:py-6 px-3 md:px-4 font-game max-w-2xl mx-auto">
 {/* Top Header & Navigation */}
 <div className="flex items-center justify-between gap-2 mb-3 md:mb-4">
 <Link href="/quizzes">
 <Button variant="pixel" className="text-xs md:text-sm font-game py-2 px-3 flex items-center gap-1">
 <ArrowLeft className="w-3.5 h-3.5" /> Exit
 </Button>
 </Link>

 <div className="flex items-center gap-2">
 {/* 3 Hearts Indicator */}
 <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-xl">
 {[...Array(3)].map((_, i) => (
 <Heart
 key={i}
 className={`w-4 h-4 transition-all duration-300 ${
 i < lives ? 'fill-red-500 text-red-500 scale-100' : 'fill-zinc-700 text-zinc-700 scale-90'
 }`}
 />
 ))}
 </div>

 {streak >= 2 && (
 <div className="bg-amber-500/20 text-yellow-400 border border-yellow-500/40 px-2.5 py-1 rounded-xl text-xs flex items-center gap-1 animate-pulse">
 <Sparkles className="w-3.5 h-3.5" /> {streak}x
 </div>
 )}

 <div className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-xl text-emerald-400 text-sm">
 Score: {score}
 </div>
 </div>
 </div>

 {/* Progress Bar */}
 <div className="w-full bg-zinc-800 h-2 rounded-full mb-4 overflow-hidden border border-zinc-700">
 <div
 className="bg-yellow-400 h-full transition-all duration-300"
 style={{ width: `${progressPercent}%` }}
 />
 </div>

 {/* Question Card (Compact) */}
 <div className="bg-zinc-900 border-2 md:border-4 border-zinc-700 rounded-2xl p-4 md:p-6 shadow-xl">
 {/* Meta Header */}
 <div className="flex items-center justify-between gap-2 mb-2 md:mb-3 text-xs text-zinc-400">
 <span className="text-yellow-400 uppercase tracking-widest text-[11px] font-mono">
 {quiz.title} • {currentQuestion.topic}
 </span>
 <span className="font-mono">
 Question {currentIndex + 1} of {totalQuestions}
 </span>
 </div>

 {/* Question Text */}
 <h2 className="text-xl md:text-2xl text-white leading-snug mb-3 md:mb-4" style={textShadow}>
 {currentQuestion.question}
 </h2>

 {/* Optional Code Snippet */}
 {currentQuestion.codeSnippet && (
 <div className="mb-3 md:mb-4 rounded-xl bg-black/90 p-3 md:p-3.5 border border-zinc-800 overflow-x-auto shadow-inner">
 <pre className="font-mono text-xs md:text-sm text-yellow-300">
 <code>{currentQuestion.codeSnippet}</code>
 </pre>
 </div>
 )}

 {/* 4 Options Grid */}
 <div className="grid grid-cols-1 gap-2 md:gap-2.5 mb-3 md:mb-4">
 {currentQuestion.options.map((option, idx) => {
 const isSelected = selectedOption === idx
 const isCorrectAnswer = idx === currentQuestion.correctAnswer

 let buttonStyles = 'bg-zinc-800/80 hover:bg-zinc-700 border-zinc-700 text-zinc-200'

 if (isAnswerSubmitted) {
 if (isCorrectAnswer) {
 buttonStyles = 'bg-emerald-600/30 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500'
 } else if (isSelected && !isCorrectAnswer) {
 buttonStyles = 'bg-red-600/30 border-red-500 text-red-300 ring-2 ring-red-500'
 } else {
 buttonStyles = 'bg-zinc-900 border-zinc-800 text-zinc-600 opacity-60'
 }
 }

 return (
 <button
 key={idx}
 disabled={isAnswerSubmitted}
 onClick={() => handleSelectOption(idx)}
 className={`w-full text-left p-2.5 md:p-3.5 rounded-xl border-2 font-game text-base md:text-xl transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer active:scale-[0.99] disabled:cursor-default ${buttonStyles}`}
 >
 <div className="flex items-center gap-2.5">
 <span className="w-6 h-6 rounded-md bg-zinc-900/80 border border-zinc-700 flex items-center justify-center text-xs font-mono shrink-0">
 {String.fromCharCode(65 + idx)}
 </span>
 <span>{option}</span>
 </div>

 {isAnswerSubmitted && isCorrectAnswer && (
 <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
 )}
 {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
 <XCircle className="w-5 h-5 text-red-400 shrink-0" />
 )}
 </button>
 )
 })}
 </div>

 {/* Feedback & Explanation Card */}
 {isAnswerSubmitted && (
 <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pt-3 border-t border-zinc-800">
 <div className={`p-3.5 rounded-xl border mb-3 md:mb-4 ${
 selectedOption === currentQuestion.correctAnswer
 ? 'bg-emerald-950/30 border-emerald-600 text-emerald-200'
 : 'bg-red-950/30 border-red-600 text-red-200'
 }`}>
 <div className="flex items-center gap-2 mb-1.5 font-bold text-base md:text-lg">
 {selectedOption === currentQuestion.correctAnswer ? (
 <>
 <CheckCircle2 className="w-5 h-5 text-emerald-400" />
 <span>Brilliant! That is correct.</span>
 </>
 ) : (
 <>
 <XCircle className="w-5 h-5 text-red-400" />
 <span>
 {lives <= 0 ? 'Out of hearts! 0 lives left.' : 'Not quite right!'}
 </span>
 </>
 )}
 </div>
 <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed">
 {currentQuestion.explanation}
 </p>
 </div>

 <Button
 onClick={handleNext}
 variant="pixel"
 className={`w-full text-base md:text-xl font-game py-3.5 md:py-4 flex items-center justify-center gap-2 ${
 lives <= 0
 ? 'bg-red-600 hover:bg-red-700 text-white border-2 border-b-4 border-red-800'
 : 'bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-b-4 border-yellow-600'
 }`}
 >
 <span>
 {lives <= 0
 ? 'View Game Over'
 : currentIndex === totalQuestions - 1
 ? 'Finish Battle'
 : 'Next Question'}
 </span>
 {lives <= 0 ? (
 <XCircle className="w-5 h-5" />
 ) : (
 <ArrowRight className="w-5 h-5" />
 )}
 </Button>
 </div>
 )}
 </div>
 </div>
 )
}

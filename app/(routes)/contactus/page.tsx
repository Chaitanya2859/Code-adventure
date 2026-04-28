'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const textShadow = {
  textShadow: "1px 1px 0 #000, -1px -1px 0 #000,1px -1px 0 #000, -1px 1px 0 #000"
}

const channels = [
  {
    icon: "/bot.gif",
    title: "AI Support Bot",
    desc: "Get instant answers to common coding questions 24/7 from our smart assistant.",
  },
  {
    icon: "/star2.gif",
    title: "Community Discord",
    desc: "Join 4,000+ learners. Share code, ask questions, and build projects together.",
  },
  {
    icon: "/fire.gif",
    title: "Weekly Office Hours",
    desc: "Live Q&A sessions every Friday at 6 PM IST with our instructors.",
  },
  {
    icon: "/tresure.gif",
    title: "Bug Bounty",
    desc: "Found a bug or issue in a lesson? Report it and earn bonus XP.",
  },
]

const team = [
  { name: "Arjun Sharma", role: "Founder & Lead Instructor", avatar: "/trainer.gif" },
  { name: "Priya Mehta", role: "Curriculum Designer", avatar: "/alex_walk.gif" },
  { name: "Rahul Nair", role: "Community Manager", avatar: "/logo.gif" },
]

export default function ContactUsPage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div>
      {/* Banner */}
      <div className="relative">
        <Image
          src="/hero4.gif"
          alt="Contact Banner"
          width={1920}
          height={400}
          unoptimized
          className="w-full object-cover h-72"
        />
        <div
          className="absolute top-0 h-full w-full flex flex-col justify-center px-8 md:px-24 xl:px-40 bg-gradient-to-r from-black/80 to-transparent"
          style={textShadow}
        >
          <h1 className="text-7xl font-game">Contact Us</h1>
          <p className="text-3xl font-game mt-2">We're here to help on your adventure.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-8 md:px-24 py-14">
        {/* Contact Form */}
        <div>
          <h2 className="font-game text-4xl mb-6">Send us a Message</h2>
          {sent ? (
            <div className="flex flex-col items-center gap-4 bg-zinc-900 border-2 border-green-700 rounded-xl p-10 text-center font-game">
              <Image src="/star2.gif" alt="Success" width={80} height={80} unoptimized />
              <h3 className="text-3xl text-green-400">Message Sent!</h3>
              <p className="text-zinc-400 text-xl">
                We'll get back to you within 24 hours. Check your inbox!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-game">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-zinc-400 text-lg">Your Name</label>
                  <Input required placeholder="e.g. Chaitanya" className="text-lg py-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-zinc-400 text-lg">Email Address</label>
                  <Input required type="email" placeholder="you@email.com" className="text-lg py-5" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-zinc-400 text-lg">Subject</label>
                <Input required placeholder="e.g. Issue with React chapter 3" className="text-lg py-5" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-zinc-400 text-lg">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-md text-lg p-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <Button type="submit" variant="pixel" className="font-game text-xl py-5 mt-2 w-fit px-10">
                Send Message
              </Button>
            </form>
          )}
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-8">
          {/* Support Channels */}
          <div>
            <h2 className="font-game text-4xl mb-4">Other Ways to Reach Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {channels.map((ch) => (
                <div
                  key={ch.title}
                  className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-4 flex flex-col gap-2 hover:border-zinc-500 transition-colors cursor-pointer font-game"
                >
                  <Image src={ch.icon} alt={ch.title} width={48} height={48} unoptimized />
                  <h3 className="text-xl">{ch.title}</h3>
                  <p className="text-zinc-400 text-base">{ch.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <h2 className="font-game text-4xl mb-4">Meet the Team</h2>
            <div className="flex flex-col gap-4">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center gap-4 bg-zinc-900 border-2 border-zinc-700 rounded-xl p-4 font-game"
                >
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={56}
                    height={56}
                    unoptimized
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-2xl">{member.name}</h3>
                    <p className="text-zinc-400 text-lg">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

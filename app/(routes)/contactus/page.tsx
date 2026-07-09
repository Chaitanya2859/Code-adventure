'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Message = {
  role: 'bot' | 'user'
  text: string
}

const textShadow = {
  textShadow: "1px 1px 0 #000, -1px -1px 0 #000,1px -1px 0 #000, -1px 1px 0 #000"
}



const team = [
  { name: "Chaitanya Bhagat", role: "Creator", avatar: "/trainer.gif" },
]

export default function ContactUsPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi there! I'm your friendly coding assistant bot. How can I help you on your adventure today?" }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isTyping) return

    const userMsg = inputValue.trim()
    const newMessages: Message[] = [...messages, { role: 'user', text: userMsg }]
    
    setMessages(newMessages)
    setInputValue('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })
      
      const data = await response.json()
      
      if (data.text) {
        setMessages(prev => [...prev, { role: 'bot', text: data.text }])
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I had trouble connecting to my brain. Please try again later!" }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I encountered an error. Please try again!" }])
    } finally {
      setIsTyping(false)
    }
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
          <h1 className="text-7xl font-game">Support</h1>
          <p className="text-3xl font-game mt-2">We're here to help on your adventure.</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 px-8 md:px-24 py-14">
        {/* Contact Form */}
        <div className="flex flex-col w-full max-w-4xl h-[600px] bg-zinc-900 border-2 border-zinc-700 rounded-xl font-game">
          <div className="p-4 border-b-2 border-zinc-700 bg-zinc-800 rounded-t-xl flex items-center gap-3">
            <Image src="/bot.gif" alt="Bot" width={40} height={40} unoptimized className="rounded-full bg-zinc-900" />
            <div>
              <h2 className="text-2xl">Timothy</h2>
              <p className="text-green-400 text-sm">Online</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 text-lg ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 rounded-br-none text-white' 
                    : 'bg-zinc-700 rounded-bl-none text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-700 rounded-2xl rounded-bl-none p-4 text-zinc-400 flex gap-2 items-center">
                  <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t-2 border-zinc-700 flex gap-2 bg-zinc-800 rounded-b-xl">
            <Input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..." 
              className="text-lg py-6 bg-zinc-900 border-zinc-700 text-white flex-1" 
            />
            <Button type="submit" variant="pixel" className="text-xl py-6 px-8">
              Send
            </Button>
          </form>
        </div>

        {/* Creator */}
        <div className="w-full max-w-4xl flex items-center justify-between bg-zinc-900 border-2 border-zinc-700 rounded-xl p-4 font-game">
          <div className="flex items-center gap-4">
            <Image
              src={team[0].avatar}
              alt={team[0].name}
              width={56}
              height={56}
              unoptimized
              className="rounded-full"
            />
            <div>
              <h3 className="text-2xl">{team[0].name}</h3>
              <p className="text-zinc-400 text-lg">{team[0].role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

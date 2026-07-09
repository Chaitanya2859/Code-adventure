import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: "You are a friendly and helpful coding assistant bot for Code Adventure, created by Chaitanya Bhagat. Keep your answers EXTREMELY concise, ideally 1-3 sentences maximum. Do not provide long explanations or massive code blocks unless specifically requested. You are chatting in a small chat window."
    })

    // Convert our message format to Gemini's format
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }))
    
    // Gemini startChat requires the first message to be from 'user'
    while (history.length > 0 && history[0].role === 'model') {
      history.shift()
    }
    
    const latestMessage = messages[messages.length - 1].text

    const chat = model.startChat({ history })
    const result = await chat.sendMessage(latestMessage)
    
    return NextResponse.json({ text: result.response.text() })
  } catch (error) {
    console.error('Gemini API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch response' }, { status: 500 })
  }
}

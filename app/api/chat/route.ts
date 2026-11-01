import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 })
    }

    const preferredModel = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
    const modelsToTry = [preferredModel, 'gemini-3.5-flash-lite', 'gemini-3-flash-preview', 'gemini-3.8-flash'];
    // Deduplicate while preserving order
    const candidateModels = Array.from(new Set(modelsToTry));

    const systemInstruction = "You are a friendly and helpful coding assistant bot for Code Adventure, created by Chaitanya Bhagat and Nitin Bhandari. Keep your answers EXTREMELY concise, ideally 1-3 sentences maximum. Do not provide long explanations or massive code blocks unless specifically requested. You are chatting in a small chat window.";

    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }))
    
    while (history.length > 0 && history[0].role === 'model') {
      history.shift()
    }
    
    const latestMessage = messages[messages.length - 1].text

    let lastError: any = null;
    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction,
        });

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(latestMessage);
        const reply = result.response.text();
        return NextResponse.json({ text: reply });
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed, trying fallback if available:`, err?.message || err);
      }
    }

    throw lastError || new Error('All models failed to respond');
  } catch (error) {
    console.error('Gemini API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch response' }, { status: 500 })
  }
}

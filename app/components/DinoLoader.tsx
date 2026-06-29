'use client'

import Script from 'next/script'

interface DinoLoaderProps {
  className?: string;
  size?: number;
  text?: string;
}

export default function DinoLoader({ className = '', size = 256, text = 'Loading Adventure...' }: DinoLoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className} text-zinc-300 font-game`}>
      <Script 
        src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" 
        type="module" 
        strategy="afterInteractive"
      />
      
      <div style={{ width: `${size}px`, height: `${size}px` }} className="flex items-center justify-center">
        {/* @ts-ignore */}
        <dotlottie-player
          src="/Dino Loading.lottie"
          background="transparent"
          speed="1"
          style={{ width: '100%', height: '100%' }}
          loop
          autoplay
        />
      </div>
      {text && <h2 className="text-3xl mt-4 animate-pulse">{text}</h2>}
    </div>
  )
}

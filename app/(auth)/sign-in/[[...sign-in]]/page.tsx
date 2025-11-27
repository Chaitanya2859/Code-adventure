'use client';
import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function PixelDarkSignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 font-mono">

      <div className="w-full max-w-md flex flex-col items-center justify-center bg-[#1a1a1a] p-6 border-4 border-black shadow-[10px_10px_0_0_#000]">

        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 border-4 flex justify-center border-yellow-600 bg-yellow-300 shadow-[4px_4px_0_0_#000]">
            <Image src={'/crown.png'} alt='Crown Image' width={15} height={15} className='w-full p-2 h-full'></Image>
          </div>
        </div>

        <SignIn forceRedirectUrl="/"
          appearance={{
            elements: {
              card:
                "bg-[#1a1a1a] border-none shadow-none px-0",

              headerTitle:
                "text-yellow-300 font-bold tracking-widest uppercase text-lg text-center",

              headerSubtitle:
                "text-gray-300 text-center",

              socialButtons:
                "w-full text-center px-4 py-2 bg-yellow-400 border-2 border-black text-black font-bold shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none",

              socialButtonsProviderIcon__google: "w-5 h-5",

              dividerLine: "bg-gray-500 h-[2px]",
              dividerText: "text-gray-300 font-bold ",

              formFieldLabel:
                "text-gray-300 font-bold tracking-wide",
              formFieldInput:
                "w-full px-3 py-2 bg-[#3a3a3a] text-white border-2 border-black shadow-[3px_3px_0_0_#000] focus:outline-none placeholder-gray-400",

              footer: "text-center text-gray-300 mt-4",
              footerActionText: "text-yellow-300 underline font-bold",

              poweredBy: "opacity-60 text-gray-400 font-bold",

formButtonPrimary:
  "w-full px-4 py-2 bg-yellow-400 border-2 border-black text-black font-bold shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none",

formButton:
  "w-full px-4 py-2 bg-yellow-400 border-2 border-black text-black font-bold shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none",

formButtonReset:
  "w-full px-4 py-2 bg-yellow-400 border-2 border-black text-black font-bold shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none",


              formFieldError:
                "text-red-400 font-bold text-xs mt-1",
            },
          }}
        />

      </div>
    </div>
  );
}

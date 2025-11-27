'use client';

import { SignUp } from '@clerk/nextjs';

export default function PixelSignUpPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#0d0d0d] font-mono">

      {/* RESPONSIVE PIXEL CARD */}
      <div className="
        w-full 
        flex justify-center items-center
        max-w-md 
        bg-white 
        p-6 
        border-4 border-black 
        shadow-[8px_8px_0_0_#000] 
        sm:p-6 
        md:p-8
        rounded-lg
      ">

        <SignUp forceRedirectUrl="/"
          appearance={{
            elements: {
              // Card inner container
              card:
                "bg-white border-none shadow-none px-0 w-full",

              headerTitle:
                "text-black font-bold tracking-widest uppercase text-lg text-center",

              headerSubtitle:
                "text-black opacity-70 text-center",

              // GOOGLE
              socialButtons:
                "w-full flex items-center justify-center gap-3 px-4 py-3 bg-yellow-300 border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-y-[2px] active:shadow-none font-bold text-black text-sm sm:text-base",

              socialButtonsProviderIcon__google: "w-5 h-5",

              // Divider
              dividerLine: "bg-black h-[2px] opacity-40",
              dividerText: "text-black font-bold text-sm",

              // INPUTS
              formFieldLabel:
                "text-black font-bold tracking-wide text-sm sm:text-base",

              formFieldInput:
                "w-full px-3 py-2 border-2 border-black bg-white shadow-[3px_3px_0_0_#000] focus:outline-none text-sm sm:text-base",

              // BUTTONS
              formButtonPrimary:
                "w-full px-4 py-2 bg-yellow-300 border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-y-[2px] active:shadow-none font-bold text-black text-sm sm:text-base",

              // Footer
              footer: "text-center text-black mt-4",
              footerActionText: "text-blue-600 underline font-bold",

              poweredBy: "opacity-70 text-black font-bold",

              // Error text
              formFieldError:
                "text-red-600 font-bold text-xs mt-1",
            },
          }}
        />
      </div>
    </div>
  );
}

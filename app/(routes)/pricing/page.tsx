import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const textShadow = {
  textShadow: "1px 1px 0 #000, -1px -1px 0 #000,1px -1px 0 #000, -1px 1px 0 #000"
}

const plans = [
  {
    id: 1,
    name: "Explorer",
    price: "Free",
    period: "",
    badge: "/hero11.gif",
    badgeAlt: "Free",
    highlight: false,
    features: [
      "Access to 2 free courses (HTML & CSS)",
      "Community forum access",
      "Basic progress tracking",
      "100 XP cap per month",
      "Ads supported",
    ],
    cta: "Get Started",
    href: "/sign-up",
  },
  {
    id: 2,
    name: "Adventurer",
    price: "₹299",
    period: "/ month",
    badge: "/star2.gif",
    badgeAlt: "Popular",
    highlight: true,
    features: [
      "Access to ALL 6 courses",
      "Access to ALL 8 projects",
      "Priority community support",
      "Unlimited XP & streaks",
      "Completion certificates",
      "No ads",
    ],
    cta: "Join Now",
    href: "/sign-up",
  },
  {
    id: 3,
    name: "Legend",
    price: "₹1,999",
    period: "/ year",
    badge: "/tresure.gif",
    badgeAlt: "Best Value",
    highlight: false,
    features: [
      "Everything in Adventurer",
      "1:1 mentor session (monthly)",
      "Early access to new courses",
      "Private Discord channel",
      "Custom profile badge",
      "Lifetime access on purchase",
    ],
    cta: "Go Legend",
    href: "/sign-up",
  },
]

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes — Adventurer is billed monthly and you can cancel before your next renewal with no penalty.",
  },
  {
    q: "Is there a student discount?",
    a: "Absolutely. Email us your student ID at hello@codeadventure.dev and we'll apply a 40% discount.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, all major credit/debit cards, and net banking through Razorpay.",
  },
  {
    q: "Do certificates expire?",
    a: "No — your completion certificates are permanent and shareable via a public link.",
  },
]

export default function PricingPage() {
  return (
    <div>
      {/* Banner */}
      <div className="relative">
        <Image
          src="/hero7.gif"
          alt="Pricing Banner"
          width={1920}
          height={400}
          unoptimized
          className="w-full object-cover h-72"
        />
        <div
          className="absolute top-0 h-full w-full flex flex-col justify-center px-8 md:px-24 xl:px-40 bg-gradient-to-r from-black/80 to-transparent"
          style={textShadow}
        >
          <h1 className="text-7xl font-game">Pricing</h1>
          <p className="text-3xl font-game mt-2">Simple plans. No surprises.</p>
        </div>
      </div>

      {/* Plans */}
      <div className="px-8 md:px-24 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl border-2 p-6 font-game flex flex-col gap-4 relative ${
                plan.highlight
                  ? "border-yellow-400 bg-zinc-800 shadow-lg shadow-yellow-400/20"
                  : "border-zinc-700 bg-zinc-900"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black font-bold text-sm px-4 py-1 rounded-full font-game">
                  Most Popular
                </div>
              )}
              <div className="flex items-center gap-3">
                <Image
                  src={plan.badge}
                  alt={plan.badgeAlt}
                  width={48}
                  height={48}
                  unoptimized
                />
                <h2 className="text-3xl">{plan.name}</h2>
              </div>

              <div className="flex items-end gap-1">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-zinc-400 text-xl mb-1">{plan.period}</span>
              </div>

              <ul className="flex flex-col gap-2 mt-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xl text-zinc-300">
                    <span className="text-green-400 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4">
                <Link href={plan.href}>
                  <Button
                    variant={plan.highlight ? "pixel" : "default"}
                    className="w-full font-game text-xl py-5"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="px-8 md:px-24 pb-16">
        <h2 className="font-game text-4xl mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-6 font-game">
              <h3 className="text-2xl mb-2">{faq.q}</h3>
              <p className="text-zinc-400 text-lg">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

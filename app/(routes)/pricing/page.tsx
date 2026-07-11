"use client"

import { useState, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { UserDetailsContext } from '@/context/UserDetailsContext'

const textShadow = {
  textShadow: "1px 1px 0 #000, -1px -1px 0 #000,1px -1px 0 #000, -1px 1px 0 #000"
}

const plans = [
  {
    id: 1,
    name: "Explorer",
    priceText: "Free",
    price: 0,
    period: "",
    badge: "/hero11.gif",
    badgeAlt: "Free",
    highlight: false,
    features: [
      "Access to 2 free courses (HTML & CSS)",
      "progress tracking",
      "100 XP cap per month",
    ],
    cta: "Get Started",
    href: "/courses",
    buttonClass: "",
  },
  {
    id: 2,
    name: "Adventurer",
    priceText: "₹99",
    price: 99,
    period: "/ month",
    badge: "/star2.gif",
    badgeAlt: "Popular",
    highlight: true,
    features: [
      "Access to ALL 3 courses",
      "Unlimited XP",
      "Completion certificates",
    ],
    cta: "Join Now",
    buttonClass: "",
  },
  {
    id: 3,
    name: "Legend",
    priceText: "₹699",
    price: 699,
    period: "/ year",
    badge: "/tresure.gif",
    badgeAlt: "Best Value",
    highlight: false,
    features: [
      "Everything in Adventurer and more",
      "Early access to new courses",
      "1:1 mentor session (monthly)",
    ],
    cta: "Go Legend",
    buttonClass: "",
  },
]

export default function PricingPage() {
  const router = useRouter()
  const { setUserDetail } = useContext(UserDetailsContext)
  const [loadingPlan, setLoadingPlan] = useState<number | null>(null)

  const handlePayment = async (plan: typeof plans[0]) => {
    if (plan.price === 0) {
      router.push(plan.href || '/sign-up')
      return
    }

    try {
      setLoadingPlan(plan.id)

      // Create order
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planName: plan.name, price: plan.price })
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Please sign in to continue")
          router.push('/sign-in') // Adjust to actual sign-in route
        } else {
          toast.error(data.error || "Failed to initiate payment")
        }
        return
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY || "rzp_test_TBcxmvPm2725lx", // Fallback to your test key
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Code Adventure",
        description: `${plan.name} Plan`,
        order_id: data.order.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planName: plan.name
              })
            })

            const verifyData = await verifyRes.json()
            if (verifyRes.ok) {
              toast.success("Payment successful! Welcome to " + plan.name)
              try {
                const userRes = await fetch('/api/user', { method: 'POST' })
                if (userRes.ok) {
                  const updatedUser = await userRes.json()
                  setUserDetail(updatedUser)
                }
              } catch (_) {}
              router.push('/dashboard')
            } else {
              toast.error(verifyData.error || "Payment verification failed")
            }
          } catch (e) {
            toast.error("An error occurred while verifying payment")
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        toast.error(response.error.description);
      });
      rzp1.open();

    } catch (error) {
      console.error(error)
      toast.error("An unexpected error occurred")
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
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
              className={`rounded-xl border-2 p-6 font-game flex flex-col gap-4 relative ${plan.highlight
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
                <span className="text-5xl font-bold">{plan.priceText}</span>
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
                <Button
                  variant={plan.highlight || plan.id === 3 ? "pixel" : "default"}
                  className={`w-full font-game text-xl py-5 ${plan.buttonClass}`}
                  onClick={() => handlePayment(plan)}
                  disabled={loadingPlan === plan.id}
                >
                  {loadingPlan === plan.id ? "Loading..." : plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

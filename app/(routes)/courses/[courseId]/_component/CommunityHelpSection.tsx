import { Button } from "@/components/ui/button"

function CommunityHelpSection() {
  return (
    <div className="font-game flex flex-col items-center bg-zinc-900 mt-6 py-5 rounded-md border-4">
        <h2 className="text-3xl items-center">Feeling stuck? </h2>
        <p className="text-2xl">Ask question in our community</p>
        <Button variant={'pixel'} className="font-game mt-3 px-10 text-xl">Go to community</Button>
    </div>
  )
}

export default CommunityHelpSection
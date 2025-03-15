import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative bg-black text-white">
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 z-10"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
        }}
      />
      <div className="relative z-20 container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Share Your Vision. Earn Your Worth.</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Upload your films, grow your audience, and earn money with every view. The platform that values creators.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/signup">Start Creating</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/videos">Explore Videos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}


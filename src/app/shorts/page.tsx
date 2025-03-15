"use client"

import { useSearchParams } from "next/navigation"
import { ShortsPlayer } from "@/components/shorts-player"

export default function ShortsPage() {
  const searchParams = useSearchParams()
  const initialShortId = searchParams.get("id")

  // Mock shorts data with portrait videos
  const shorts = [
    {
      id: "1",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      title: "Amazing sunset timelapse",
      creator: "NatureLover",
      creatorId: "nature123",
      creatorAvatar: "/placeholder.svg?height=150&width=150",
      views: 1250000,
      likes: 85000,
      comments: 1200,
      description: "Captured this beautiful sunset at the beach. The colors were absolutely stunning!",
    },
    {
      id: "2",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      title: "Quick recipe: 1-minute pasta",
      creator: "ChefExpress",
      creatorId: "chef456",
      creatorAvatar: "/placeholder.svg?height=150&width=150",
      views: 890000,
      likes: 67000,
      comments: 950,
      description: "The fastest pasta recipe you'll ever make! Perfect for busy days when you need a quick meal.",
    },
    {
      id: "3",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      title: "Dance tutorial: easy moves",
      creator: "DanceWithMe",
      creatorId: "dance789",
      creatorAvatar: "/placeholder.svg?height=150&width=150",
      views: 675000,
      likes: 54000,
      comments: 820,
      description: "Learn these simple dance moves that anyone can do! Great for beginners.",
    },
    {
      id: "4",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      title: "Morning routine for productivity",
      creator: "ProductivityGuru",
      creatorId: "guru123",
      creatorAvatar: "/placeholder.svg?height=150&width=150",
      views: 425000,
      likes: 38000,
      comments: 620,
      description: "My morning routine that helps me stay productive all day. Try these simple habits!",
    },
  ]

  return (
    <div className="h-screen bg-[hsl(196, 84.60%, 7.60%)]">
      <ShortsPlayer shorts={shorts} initialShortId={initialShortId || undefined} />
    </div>
  )
}


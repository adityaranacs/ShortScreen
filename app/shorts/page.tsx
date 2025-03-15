"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ShortsPlayer } from "../../components/shorts-player"
import { Home } from "lucide-react"
import Link from "next/link"
import { Button } from "../../components/ui/button"

export default function ShortsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialShortId = searchParams.get("id")
  const [currentSeries, setCurrentSeries] = useState<string | null>(searchParams.get("series") || null)

  useEffect(() => {
    // Disable body scrolling
    document.body.style.overflow = "hidden"

    // Cleanup to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  // All shorts data
  const allShorts = {
    featured: [
      {
        id: "f1",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        title: "Amazing sunset timelapse",
        creator: "NatureLover",
        creatorId: "nature123",
        creatorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
        views: 1250000,
        likes: 85000,
        comments: 1200,
        description: "Captured this beautiful sunset at the beach. The colors were absolutely stunning!",
        isPortrait: false,
      },
      {
        id: "f2",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        title: "Quick recipe: 1-minute pasta",
        creator: "ChefExpress",
        creatorId: "chef456",
        creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        views: 890000,
        likes: 67000,
        comments: 950,
        description: "The fastest pasta recipe you'll ever make! Perfect for busy days when you need a quick meal.",
        isPortrait: false,
      },
      {
        id: "f3",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        title: "Dance tutorial: easy moves",
        creator: "DanceWithMe",
        creatorId: "dance789",
        creatorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop",
        views: 675000,
        likes: 54000,
        comments: 820,
        description: "Learn these simple dance moves that anyone can do! Great for beginners.",
        isPortrait: false,
      },
      {
        id: "f4",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        title: "Morning routine for productivity",
        creator: "ProductivityGuru",
        creatorId: "guru123",
        creatorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
        views: 425000,
        likes: 38000,
        comments: 620,
        description: "My morning routine that helps me stay productive all day. Try these simple habits!",
        isPortrait: false,
      },
    ],
    // New portrait mode series
    "stranger-things": [
      {
        id: "st1",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        title: "Stranger Things: S1E1 - The Disappearance",
        creator: "NetflixOriginals",
        creatorId: "netflix",
        creatorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop",
        views: 15250000,
        likes: 985000,
        comments: 42000,
        description:
          "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
        isPortrait: true,
        seriesName: "Stranger Things",
        episode: 1,
        season: 1,
      },
      {
        id: "st2",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        title: "Stranger Things: S1E2 - The Weirdo on Maple Street",
        creator: "NetflixOriginals",
        creatorId: "netflix",
        creatorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop",
        views: 14800000,
        likes: 945000,
        comments: 38000,
        description:
          "Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about an unsettling phone call.",
        isPortrait: true,
        seriesName: "Stranger Things",
        episode: 2,
        season: 1,
      },
      {
        id: "st3",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        title: "Stranger Things: S1E3 - Holly, Jolly",
        creator: "NetflixOriginals",
        creatorId: "netflix",
        creatorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop",
        views: 14200000,
        likes: 925000,
        comments: 36000,
        description:
          "An increasingly concerned Nancy looks for Barb and finds out what Jonathan's been up to. Joyce is convinced Will is trying to talk to her.",
        isPortrait: true,
        seriesName: "Stranger Things",
        episode: 3,
        season: 1,
      },
    ],
    "the-crown": [
     
      {
        id: "tc2",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        title: "The Crown: S1E2 - Hyde Park Corner",
        creator: "NetflixOriginals",
        creatorId: "netflix",
        creatorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop",
        views: 11800000,
        likes: 745000,
        comments: 28000,
        description:
          "With King George too ill to travel, Elizabeth and Philip embark on a four-continent Commonwealth tour. Party leaders attempt to undermine Churchill.",
        isPortrait: true,
        seriesName: "The Crown",
        episode: 2,
        season: 1,
      },
    ],
    "breaking-bad": [
      {
        id: "bb1",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        title: "Breaking Bad: S1E1 - Pilot",
        creator: "AMCOriginals",
        creatorId: "amc",
        creatorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop",
        views: 18500000,
        likes: 1285000,
        comments: 52000,
        description:
          "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family's future.",
        isPortrait: true,
        seriesName: "Breaking Bad",
        episode: 1,
        season: 1,
      },
      {
        id: "bb2",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
        title: "Breaking Bad: S1E2 - Cat's in the Bag...",
        creator: "AMCOriginals",
        creatorId: "amc",
        creatorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop",
        views: 17800000,
        likes: 1245000,
        comments: 48000,
        description:
          "Walt and Jesse attempt to dispose of the bodies of two rivals, but they're forced to deal with an increasingly suspicious Marie.",
        isPortrait: true,
        seriesName: "Breaking Bad",
        episode: 2,
        season: 1,
      },
    ],
  }

  // Get the appropriate shorts based on the series parameter
  const getShorts = () => {
    if (currentSeries && allShorts[currentSeries as keyof typeof allShorts]) {
      return allShorts[currentSeries as keyof typeof allShorts]
    }
    return allShorts.featured
  }

  const shorts = getShorts()

  // Get available series for the series selector
  const availableSeries = Object.keys(allShorts)
    .filter((series) => series !== "featured")
    .map((key) => ({
      id: key,
      name: key
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    }))

  return (
    <div className="h-screen bg-[hsl(180, 2.90%, 6.90%)] relative">
      {/* Series selector */}


      <ShortsPlayer
        shorts={shorts}
        initialShortId={initialShortId || undefined}
        seriesName={currentSeries ? availableSeries.find((s) => s.id === currentSeries)?.name : undefined}
      />
    </div>
  )
}


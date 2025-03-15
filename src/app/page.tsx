"use client"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ClipPreview } from "@/components/clip-preview"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"

// Mock featured clips with portrait dimensions
const featuredClips = [
  {
    id: "1",
    title: "Epic battle scene finale",
    creator: "MovieBuff",
    views: 1250000,
    likes: 85000,
    thumbnail: "/placeholder.svg?height=1920&width=1080",
    creatorAvatar: "/placeholder.svg?height=150&width=150",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: "2",
    title: "Emotional reunion moment",
    creator: "CinematicArt",
    views: 890000,
    likes: 67000,
    thumbnail: "/placeholder.svg?height=1920&width=1080",
    creatorAvatar: "/placeholder.svg?height=150&width=150",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: "3",
    title: "Suspenseful plot twist",
    creator: "FilmFanatic",
    views: 675000,
    likes: 54000,
    thumbnail: "/placeholder.svg?height=1920&width=1080",
    creatorAvatar: "/placeholder.svg?height=150&width=150",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: "4",
    title: "Hilarious comedy scene",
    creator: "LaughFactory",
    views: 1120000,
    likes: 92000,
    thumbnail: "/placeholder.svg?height=1920&width=1080",
    creatorAvatar: "/placeholder.svg?height=150&width=150",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
  {
    id: "5",
    title: "Breathtaking nature documentary",
    creator: "WildExplorer",
    views: 980000,
    likes: 78000,
    thumbnail: "/placeholder.svg?height=1920&width=1080",
    creatorAvatar: "/placeholder.svg?height=150&width=150",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "6",
    title: "Sci-fi special effects showcase",
    creator: "VFXMaster",
    views: 1350000,
    likes: 95000,
    thumbnail: "/placeholder.svg?height=1920&width=1080",
    creatorAvatar: "/placeholder.svg?height=150&width=150",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: "7",
    title: "Heartwarming family moment",
    creator: "LifeStories",
    views: 870000,
    likes: 72000,
    thumbnail: "/placeholder.svg?height=1920&width=1080",
    creatorAvatar: "/placeholder.svg?height=150&width=150",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: "8",
    title: "Extreme sports compilation",
    creator: "AdventurePro",
    views: 1180000,
    likes: 88000,
    thumbnail: "/placeholder.svg?height=1920&width=1080",
    creatorAvatar: "/placeholder.svg?height=150&width=150",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
]

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Featured Clips</h2>
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full"
              onClick={scrollLeft}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 py-2 px-8 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {featuredClips.map((clip) => (
                <div key={clip.id} className="flex-shrink-0 w-[200px]">
                  <ClipPreview clip={clip} onClick={() => (window.location.href = `/shorts?id=${clip.id}`)} />
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full"
              onClick={scrollRight}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Popular Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredClips.slice(0, 4).map((clip) => (
              <div key={clip.id}>
                <ClipPreview clip={clip} onClick={() => (window.location.href = `/shorts?id=${clip.id}`)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


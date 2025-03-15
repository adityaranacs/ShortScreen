"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Heart, MessageSquare, Share2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { VideoCard } from "@/components/video-card"

interface VideoPageProps {
  params: {
    id: string
  }
}

export default function VideoPage({ params }: VideoPageProps) {
  const [video, setVideo] = useState<any>(null)
  const [relatedVideos, setRelatedVideos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch the video data from an API
    setIsLoading(true)

    // Mock data for demonstration
    const mockVideo = {
      id: params.id,
      title: "The Art of Filmmaking: Advanced Techniques",
      creator: "FilmMaster",
      creatorAvatar: "/placeholder.svg?height=150&width=150",
      views: 125000,
      likes: 8700,
      comments: 342,
      description:
        "In this comprehensive guide, we explore advanced filmmaking techniques used by professional directors. Learn about camera movements, lighting setups, and storytelling methods that will elevate your films to the next level.",
      uploadDate: "March 5, 2025",
      subscribers: 450000,
    }

    const mockRelatedVideos = [
      {
        id: "r1",
        title: "Lighting Techniques for Indie Filmmakers",
        creator: "FilmMaster",
        views: 89000,
        thumbnail: "/placeholder.svg?height=720&width=1280",
        duration: "15:20",
        createdAt: "3 days ago",
      },
      {
        id: "r2",
        title: "Sound Design: Creating Atmosphere",
        creator: "AudioPro",
        views: 67500,
        thumbnail: "/placeholder.svg?height=720&width=1280",
        duration: "22:15",
        createdAt: "1 week ago",
      },
      {
        id: "r3",
        title: "Color Grading Masterclass",
        creator: "ColoristPro",
        views: 112000,
        thumbnail: "/placeholder.svg?height=720&width=1280",
        duration: "12:30",
        createdAt: "5 days ago",
      },
    ]

    setTimeout(() => {
      setVideo(mockVideo)
      setRelatedVideos(mockRelatedVideos)
      setIsLoading(false)
    }, 500)
  }, [params.id])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-xl">Loading video...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-4" asChild>
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white">
                {/* In a real app, this would be a video player */}
                <div className="text-center">
                  <Image
                    src="/placeholder.svg?height=720&width=1280"
                    alt="Video thumbnail"
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <h1 className="text-2xl font-bold mb-2">{video.title}</h1>

          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src={video.creatorAvatar} alt={video.creator} />
                <AvatarFallback>{video.creator[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Link href={`/creator/${video.creator}`} className="font-medium hover:text-primary">
                  {video.creator}
                </Link>
                <p className="text-sm text-muted-foreground">{formatNumber(video.subscribers)} subscribers</p>
              </div>
              <Button>Subscribe</Button>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Heart className="mr-1 h-4 w-4" />
                {formatNumber(video.likes)}
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="mr-1 h-4 w-4" />
                {formatNumber(video.comments)}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="bg-muted/40 rounded-lg p-4 mb-6">
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Eye className="mr-1 h-4 w-4" />
              {formatNumber(video.views)} views • {video.uploadDate}
            </div>
            <p className="text-sm">{video.description}</p>
          </div>

          <Separator className="my-6" />

          {/* Comments section would go here */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Comments ({formatNumber(video.comments)})</h3>
            {/* Comment form and list would go here */}
          </div>
        </div>

        {/* Related Videos */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Related Videos</h3>
          <div className="space-y-4">
            {relatedVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


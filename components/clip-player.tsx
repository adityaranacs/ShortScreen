"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"


interface Clip {
  id: string
  title: string
  creator: string
  views: number
  likes: number
  thumbnail: string
  creatorAvatar: string
  videoUrl: string
  category: string
}

interface ClipPreviewProps {
  clip: Clip
  onClick?: () => void
}

export function ClipPreview({ clip, onClick }: ClipPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <div
      className="group relative w-full cursor-pointer transition-transform duration-200 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg">
        <Image
          src={clip.thumbnail || "/placeholder.svg"}
          alt={clip.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

        {/* Play button overlay on hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <div className="rounded-full bg-black/50 p-3 backdrop-blur-sm">
            <Play className="h-8 w-8 text-white" fill="white" />
          </div>
        </div>

        {/* Category badge */}
        <Badge className="absolute top-2 right-2 bg-primary/80 text-white border-0">{clip.category}</Badge>

        {/* Duration */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
          <Clock className="h-3 w-3" />
          <span>2:45</span>
        </div>

        {/* Creator avatar */}
        <div className="absolute bottom-2 left-2">
          <Avatar className="h-8 w-8 border border-white/20">
            <AvatarImage src={clip.creatorAvatar} alt={clip.creator} />
            <AvatarFallback>{clip.creator[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="mt-2 space-y-1 px-1">
        <h3 className="line-clamp-1 font-medium text-white">{clip.title}</h3>
        <div className="flex items-center justify-between text-xs text-white/70">
          <span>{clip.creator}</span>
          <div className="flex items-center gap-2">
            <span>{formatNumber(clip.views)} views</span>
          </div>
        </div>
      </div>
    </div>
  )
}


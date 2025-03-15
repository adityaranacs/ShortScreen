"use client"

import Image from "next/image"
import { Heart } from "lucide-react"

interface Clip {
  id: string
  title: string
  creator: string
  views: number
  likes: number
  thumbnail: string
  creatorAvatar: string
  videoUrl: string
}

interface ClipPreviewProps {
  clip: Clip
  onClick: () => void
}

export function ClipPreview({ clip, onClick }: ClipPreviewProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <div className="cursor-pointer" onClick={onClick}>
      <div className="relative aspect-[9/16] rounded-lg overflow-hidden group">
        <Image
          src={clip.thumbnail || "/placeholder.svg"}
          alt={clip.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 rounded-full p-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
          <p className="text-white font-medium line-clamp-2 text-sm mb-6">{clip.title}</p>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
          <Image
            src={clip.creatorAvatar || "/placeholder.svg"}
            alt={clip.creator}
            width={24}
            height={24}
            className="rounded-full border border-white"
          />
          <span className="text-white text-xs font-medium truncate max-w-[120px]">{clip.creator}</span>
        </div>
        <div className="absolute top-3 right-3 bg-black/50 text-white rounded-full px-2 py-1 text-xs flex items-center gap-1">
          <Heart className="w-3 h-3 fill-white" />
          <span>{formatNumber(clip.likes)}</span>
        </div>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { Badge } from "./ui/badge"

interface Series {
  id: string
  title: string
  creator: string
  episodes: number
  seasons: number
  views: number
  likes: number
  thumbnail: string
  coverPhoto: string
  creatorAvatar: string
  description: string
  category: string
  isPortrait: boolean
  year: number
  rating: string
}

interface SeriesCardProps {
  series: Series
}

export function SeriesCard({ series }: SeriesCardProps) {
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
    >
      <Link href={`/shorts?series=${series.id}`}>
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
          <Image
            src={series.thumbnail || "/placeholder.svg"}
            alt={series.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 180px, 220px"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80" />

          {/* Play button overlay on hover */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <div className="rounded-full bg-primary/80 p-3 backdrop-blur-sm">
              <Play className="h-8 w-8 text-white" fill="white" />
            </div>
          </div>

          {/* Category badge */}
          <Badge className="absolute top-2 right-2 bg-primary/80 text-white border-0">{series.category}</Badge>

          {/* Rating */}
          <div className="absolute top-2 left-2 bg-black/70 px-1.5 py-0.5 text-xs text-white rounded">
            {series.rating}
          </div>

          {/* Series info */}
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h3 className="font-bold text-base line-clamp-1">{series.title}</h3>
            <div className="flex items-center justify-between text-xs mt-1">
              <span>{series.year}</span>
              <div className="flex items-center gap-1">
                <span>{series.seasons} Seasons</span>
                <span>•</span>
                <span>{series.episodes} Episodes</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}


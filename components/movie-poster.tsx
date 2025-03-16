"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Star, Clock } from "lucide-react"
import { Badge } from "./ui/badge"

interface Movie {
  id: string
  title: string
  director: string
  year: number
  rating: string
  duration: string
  poster: string
  backdrop: string
  description: string
  genre: string
  stars: string[]
}

interface MoviePosterProps {
  movie: Movie
}

export function MoviePoster({ movie }: MoviePosterProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative w-full cursor-pointer transition-transform duration-200 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href="/shorts">
        {/* Content inside Link */}
      </Link>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image
            src={movie.poster || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 320px, 380px"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />

          {/* Play button overlay on hover */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <div className="rounded-full bg-primary/80 p-3 backdrop-blur-sm">
              <Play className="h-8 w-8 text-white" fill="white" />
            </div>
          </div>

          {/* Rating badge */}
          <Badge className="absolute top-2 right-2 bg-yellow-600/80 text-white border-0 flex items-center gap-1">
            <Star className="h-3 w-3 fill-white" />
            <span>8.4</span>
          </Badge>

          {/* Duration */}
          <div className="absolute top-2 left-2 flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
            <Clock className="h-3 w-3" />
            <span>{movie.duration}</span>
          </div>

          {/* Movie info */}
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h3 className="font-bold text-lg line-clamp-1">{movie.title}</h3>
            <div className="flex items-center justify-between text-xs mt-1">
              <span>{movie.year}</span>
              <Badge variant="outline" className="bg-primary/20 border-primary/30">
                {movie.genre}
              </Badge>
            </div>
            <p className="text-xs text-white/80 mt-2 line-clamp-2">{movie.description}</p>
          </div>
        </div>
    </div>
  )
}

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

interface Short {
  id: string
  title: string
  creator: string
  views: number
  likes: number
  thumbnail: string
  creatorAvatar: string
}

interface ShortsPreviewProps {
  short: Short
}

export function ShortsPreview({ short }: ShortsPreviewProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <Link href={`/shorts/${short.id}`} className="block">
      <div className="relative aspect-[9/16] rounded-lg overflow-hidden group">
        <Image
          src={short.thumbnail || "/placeholder.svg"}
          alt={short.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
          <p className="text-white font-medium line-clamp-2 text-sm">{short.title}</p>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <Image
            src={short.creatorAvatar || "/placeholder.svg"}
            alt={short.creator}
            width={24}
            height={24}
            className="rounded-full border border-white"
          />
          <span className="text-white text-xs font-medium">{short.creator}</span>
        </div>
        <div className="absolute top-3 right-3 bg-black/50 text-white rounded-full px-2 py-1 text-xs flex items-center gap-1">
          <Heart className="w-3 h-3 fill-white" />
          <span>{formatNumber(short.likes)}</span>
        </div>
      </div>
    </Link>
  )
}


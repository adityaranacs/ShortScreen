import Link from "next/link"
import Image from "next/image"
import { Eye, Clock } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Video {
  id: string
  title: string
  creator: string
  views: number
  thumbnail: string
  duration: string
  createdAt: string
}

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/video/${video.id}`}>
        <div className="relative aspect-video">
          <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
            {video.duration}
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/video/${video.id}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">{video.title}</h3>
        </Link>
        <Link href={`/creator/${video.creator}`}>
          <p className="text-sm text-muted-foreground mt-1 hover:text-primary transition-colors">{video.creator}</p>
        </Link>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Eye className="w-3 h-3" />
          <span>{formatViews(video.views)} views</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{video.createdAt}</span>
        </div>
      </CardFooter>
    </Card>
  )
}


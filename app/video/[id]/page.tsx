"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Heart, MessageSquare, Share2, Eye, ThumbsUp, ThumbsDown, Save, MoreHorizontal } from "lucide-react"

import { Button } from "../../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Separator } from "../../../components/ui/separator"
import { Card, CardContent } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Badge } from "../../../components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip"
import { Skeleton } from "../../../components/ui/skeleton"

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

    // Enhanced mock data for demonstration
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
      thumbnail: "/api/placeholder/1280/720",
      tags: ["filmmaking", "tutorial", "advanced", "cinema"],
      duration: "18:42"
    }

    const mockRelatedVideos = [
      {
        id: "r1",
        title: "Lighting Techniques for Indie Filmmakers",
        creator: "FilmMaster",
        views: 89000,
        thumbnail: "/api/placeholder/1280/720?text=Lighting+Techniques",
        duration: "15:20",
        createdAt: "3 days ago",
      },
      {
        id: "r2",
        title: "Sound Design: Creating Atmosphere",
        creator: "AudioPro",
        views: 67500,
        thumbnail: "/api/placeholder/1280/720?text=Sound+Design",
        duration: "22:15",
        createdAt: "1 week ago",
      },
      {
        id: "r3",
        title: "Color Grading Masterclasss",
        creator: "ColoristPro",
        views: 112000,
        thumbnail: "/api/placeholder/1280/720?text=Color+Grading",
        duration: "12:30",
        createdAt: "5 days ago",
      },
      {
        id: "r4",
        title: "Camera Movement: Dynamic Shots",
        creator: "CinemaTech",
        views: 75800,
        thumbnail: "/api/placeholder/1280/720?text=Camera+Movement",
        duration: "19:45",
        createdAt: "2 weeks ago",
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
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            B
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="w-full aspect-video rounded-lg mb-4" />
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
            <Skeleton className="w-full h-32 rounded-lg mb-6" />
          </div>
          <div>
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-40 h-24 rounded-md" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-3 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
          <Card className="mb-4 border-0 shadow-md overflow-hidden">
            <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                  {video.duration}
                </div>
              </div>
            </div>
            <CardContent className="p-4 bg-card">
              <div className="flex gap-2 flex-wrap mb-2">
                {video.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-2xl font-bold mb-4">{video.title}</h1>

              <div className="flex flex-wrap items-center justify-between mb-4 gap-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                    <AvatarImage src={video.creatorAvatar} alt={video.creator} />
                    <AvatarFallback>{video.creator[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/creator/${video.creator}`} className="font-medium hover:text-primary">
                      {video.creator}
                    </Link>
                    <p className="text-sm text-muted-foreground">{formatNumber(video.subscribers)} subscribers</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
                </div>

                <div className="flex space-x-2">
                  <TooltipProvider>
                    <div className="flex bg-secondary rounded-full">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="rounded-l-full px-4">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            {formatNumber(video.likes)}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Like</TooltipContent>
                      </Tooltip>
                      <Separator orientation="vertical" className="h-8 my-auto" />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="rounded-r-full px-3">
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Dislike</TooltipContent>
                      </Tooltip>
                    </div>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="rounded-full">
                          <Share2 className="mr-1 h-4 w-4" />
                          Share
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Share this video</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="rounded-full">
                          <Save className="mr-1 h-4 w-4" />
                          Save
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Save to playlist</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="rounded-full px-2">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>More options</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <Card className="bg-muted/40 rounded-lg p-4 mb-6 border-0">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Eye className="mr-1 h-4 w-4" />
                  {formatNumber(video.views)} views • {video.uploadDate}
                </div>
                <p className="text-sm">{video.description}</p>
              </Card>
            </CardContent>
          </Card>

          <Tabs defaultValue="comments" className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comments">Comments ({formatNumber(video.comments)})</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
            </TabsList>
            <TabsContent value="comments" className="mt-4">
              {/* Comment form would go here */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <textarea
                      className="w-full p-2 rounded-md border border-input bg-background min-h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Add a comment..."
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <Button variant="ghost">Cancel</Button>
                      <Button>Comment</Button>
                    </div>
                  </div>
                </div>
                <Separator />
                {/* Placeholder for comments */}
                <p className="text-center text-muted-foreground py-8">Comments will appear here</p>
              </div>
            </TabsContent>
            <TabsContent value="transcript" className="mt-4">
              <p className="text-center text-muted-foreground py-8">Transcript not available for this video</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Videos */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Related Videos</h3>
          <div className="space-y-4">
            {relatedVideos.map((relatedVideo) => (
              <Link href={`/video/${relatedVideo.id}`} key={relatedVideo.id} className="group">
                <div className="flex gap-3">
                  <div className="relative w-40 rounded-md overflow-hidden">
                    <Image
                      src={relatedVideo.thumbnail}
                      alt={relatedVideo.title}
                      width={160}
                      height={90}
                      className="w-full aspect-video object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 text-xs rounded">
                      {relatedVideo.duration}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedVideo.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{relatedVideo.creator}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatNumber(relatedVideo.views)} views • {relatedVideo.createdAt}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState, useRef, useEffect } from "react"
import { useSwipeable } from "react-swipeable"
import {
  Heart,
  MessageCircle,
  Share2,
  ChevronUp,
  ChevronDown,
  X,
  User,
  ThumbsUp,
  ThumbsDown,
  SkipForward,
  SkipBack,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Info,
  ListVideo,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Input } from "./ui/input"



interface Short {
  id: string
  videoUrl: string
  title: string
  creator: string
  creatorId: string
  creatorAvatar: string
  views: number
  likes: number
  comments: number
  description: string
  isPortrait?: boolean
  seriesName?: string
  episode?: number
  season?: number
}

interface ShortsPlayerProps {
  shorts: Short[]
  initialShortId?: string
  seriesName?: string
}

export function ShortsPlayer({ shorts, initialShortId, seriesName }: ShortsPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (initialShortId) {
      const index = shorts.findIndex((s) => s.id === initialShortId)
      return index >= 0 ? index : 0
    }
    return 0
  })
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [liked, setLiked] = useState<Record<string, boolean>>({})
  const [showComments, setShowComments] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showEpisodes, setShowEpisodes] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [uiVisible, setUiVisible] = useState(true);
const uiVisibilityTimeout = useRef<NodeJS.Timeout | null>(null);

  const currentShort = shorts[currentIndex]
  // Always use portrait mode
  const isPortraitMode = true
  const isSeries = !!currentShort?.seriesName

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is typical tablet breakpoint
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  useEffect(() => {
    if (uiVisible && !showComments && !showInfo && !showEpisodes) {
      if (uiVisibilityTimeout.current) {
        clearTimeout(uiVisibilityTimeout.current);
      }
      
      uiVisibilityTimeout.current = setTimeout(() => {
        setUiVisible(false);
      }, 3000);
    }
    
    return () => {
      if (uiVisibilityTimeout.current) {
        clearTimeout(uiVisibilityTimeout.current);
      }
    };
  }, [uiVisible, showComments, showInfo, showEpisodes]);

  // Handle video playback
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, shorts.length)

    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          if (isPlaying) {
            video.play().catch((err) => console.error("Error playing video:", err))
          } else {
            video.pause()
          }
          video.muted = isMuted
          video.volume = volume

          // Update duration once metadata is loaded
          if (video.readyState >= 1) {
            setDuration(video.duration)
          } else {
            video.onloadedmetadata = () => {
              setDuration(video.duration)
            }
          }

          // Start progress tracking
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current)
          }

          progressIntervalRef.current = setInterval(() => {
            setCurrentTime(video.currentTime)
          }, 250)
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [currentIndex, isPlaying, isMuted, volume, shorts.length])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setUiVisible(true);

      if (e.key === "ArrowUp") {
        goToPrevVideo()
      } else if (e.key === "ArrowDown") {
        goToNextVideo()
      } else if (e.key === "Escape") {
        setShowComments(false)
        setShowInfo(false)
        setShowEpisodes(false)
        if (isFullscreen) {
          exitFullscreen()
        }
      } else if (e.key === " ") {
        togglePlayPause()
        e.preventDefault() // Prevent page scroll
      } else if (e.key === "m") {
        toggleMute()
      } else if (e.key === "f") {
        toggleFullscreen()
      } else if (e.key === "ArrowLeft") {
        skipBackward()
      } else if (e.key === "ArrowRight") {
        skipForward()
      } else if (e.key === "i") {
        setShowInfo(!showInfo)
      } else if (e.key === "e") {
        setShowEpisodes(!showEpisodes)
      }
    }

    // Handle scroll to navigate
    const handleScroll = (e: WheelEvent) => {
      setUiVisible(true);

      if (showComments || showInfo || showEpisodes) return

      if (e.deltaY > 0) {
        // Scrolling down
        goToNextVideo()
      } else if (e.deltaY < 0) {
        // Scrolling up
        goToPrevVideo()
      }
    }

   
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("wheel", handleScroll)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("wheel", handleScroll)
    }
  }, [isPlaying, currentIndex, showComments, showInfo, showEpisodes, isFullscreen])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      exitFullscreen()
    }
  }

  const handleMouseMove = () => {
    setUiVisible(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  const skipForward = () => {
    const video = videoRefs.current[currentIndex]
    if (video) {
      video.currentTime = Math.min(video.currentTime + 10, video.duration)
    }
  }

  const skipBackward = () => {
    const video = videoRefs.current[currentIndex]
    if (video) {
      video.currentTime = Math.max(video.currentTime - 10, 0)
    }
  }
  const handleVideoClick = () => {
    setUiVisible(!uiVisible);
    
    if (uiVisible) {
      togglePlayPause();
    }
  };
  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0]
    setVolume(vol)

    if (vol === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }

    const video = videoRefs.current[currentIndex]
    if (video) {
      video.volume = vol
    }
  }

  const handleProgressChange = (newProgress: number[]) => {
    const video = videoRefs.current[currentIndex]
    if (video) {
      const newTime = (newProgress[0] / 100) * video.duration
      video.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const goToNextVideo = () => {
    if (currentIndex < shorts.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handlers = useSwipeable({
    onSwipedUp: () => goToNextVideo(),
    onSwipedDown: () => goToPrevVideo(),
    onSwipedLeft: () => skipForward(),
    onSwipedRight: () => skipBackward(),
    trackMouse: false,
  })

  const toggleLike = (id: string) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
<div 
  className="relative h-full w-full max-w-[400px] mx-auto bg-[hsl(240, 9.10%, 2.20%)] flex" 
  ref={containerRef}
  onMouseMove={handleMouseMove}
  onMouseLeave={() => setUiVisible(false)}
>      {/* Main video container */}
      <div className="relative h-full w-full transition-all duration-300" {...handlers}>
        {/* Close button */}
        <Link href="/" className={`absolute top-4 left-4 z-20 text-white bg-black/30 rounded-full p-2 transition-opacity duration-300 ${uiVisible ? 'opacity-100' : 'opacity-0'}`}>
  <X className="h-6 w-6" />
</Link>

        {/* Series title if applicable */}


        {/* Videos */}
        <div className="h-full w-full flex justify-center items-center bg-black">
          {shorts.map((short, index) => (
            <div
              key={short.id}
              className={`absolute h-full w-full flex justify-center items-center transition-opacity duration-300 ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el
                }}
                src={short.videoUrl}
                className="h-full max-h-[calc(100vh-120px)] w-auto max-w-[100%] object-contain mx-auto"
                loop
                playsInline
                onClick={handleVideoClick}
              />

              {/* Video info overlay */}
              <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${uiVisible ? 'opacity-100' : 'opacity-0'}`}>
              {/* Episode info for series */}
                {short.seriesName && short.episode && (
                  <div className="mb-2">
                    <Badge className="bg-primary/30 text-white border-0">
                      Season {short.season} • Episode {short.episode}
                    </Badge>
                  </div>
                )}

                <div className="flex items-start gap-3 mb-2">
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarImage src={short.creatorAvatar} alt={short.creator} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                  <h2 className="text-white font-medium mb-1">{short.title}</h2>
                  </div>
                  <Button
                      variant="outline"
                      size="sm"
                      className="ml-2 h-7 text-xs bg-primary/20 hover:bg-primary/40 text-white border-white/20"
                    >
                      Follow
                    </Button>
                </div>

                {/* Video controls */}
                <div className="mt-4 space-y-2">
                  {/* Progress bar */}
                  <div className="w-full">
                    <Slider
                      value={[progressPercentage]}
                      min={0}
                      max={100}
                      step={0.1}
                      onValueChange={handleProgressChange}
                      className="h-1.5 [&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
                    />
                  </div>

                  {/* Control buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-full text-white hover:bg-white/10"
                              onClick={togglePlayPause}
                            >
                              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{isPlaying ? "Pause" : "Play"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-full text-white hover:bg-white/10"
                              onClick={skipBackward}
                            >
                              <SkipBack className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Rewind 10s</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-full text-white hover:bg-white/10"
                              onClick={skipForward}
                            >
                              <SkipForward className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Forward 10s</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <div className="flex items-center gap-2 ml-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-full text-white hover:bg-white/10"
                                onClick={toggleMute}
                              >
                                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{isMuted ? "Unmute" : "Mute"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <div className="w-24 hidden sm:block">
                          <Slider
                            value={[volume]}
                            min={0}
                            max={1}
                            step={0.01}
                            onValueChange={handleVolumeChange}
                            className="h-1.5 [&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0"
                          />
                        </div>
                      </div>

                      <div className="text-white text-xs ml-2">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                     

                      
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Side actions */}
        <div className={`absolute right-4 bottom-40 z-20 flex flex-col items-center gap-6 transition-opacity duration-300 ${uiVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-primary/50"
              onClick={() => toggleLike(currentShort.id)}
            >
              <Heart className={`h-7 w-7 ${liked[currentShort.id] ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <span className="text-white text-xs mt-1">{formatNumber(currentShort.likes)}</span>
          </div>

          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-primary/50"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-7 w-7" />
            </Button>
            <span className="text-white text-xs mt-1">{formatNumber(currentShort.comments)}</span>
          </div>

          {isSeries && (
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-primary/50"
                onClick={() => setShowEpisodes(!showEpisodes)}
              >
                <ListVideo className="h-7 w-7" />
              </Button>
              <span className="text-white text-xs mt-1">Episodes</span>
            </div>
          )}

          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-primary/50"
            >
              <Share2 className="h-7 w-7" />
            </Button>
            <span className="text-white text-xs mt-1">Share</span>
          </div>
        </div>

        {/* Episode navigation for series */}
        {isSeries && (
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 transition-opacity duration-300 ${uiVisible ? 'opacity-100' : 'opacity-0'}`}>
          <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-primary/50 disabled:opacity-50"
                    onClick={goToPrevVideo}
                    disabled={currentIndex === 0}
                  >
                    <ChevronUp className="h-7 w-7" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Previous Episode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-primary/50 disabled:opacity-50"
                    onClick={goToNextVideo}
                    disabled={currentIndex === shorts.length - 1}
                  >
                    <ChevronDown className="h-7 w-7" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Next Episode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>

      {/* Comments panel */}
      <Sheet open={showComments} onOpenChange={setShowComments}>
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className="w-full sm:w-[400px] bg-[#121212] text-white border-l border-white/10"
        >
          <SheetHeader>
            <SheetTitle className="text-white">Comments ({formatNumber(currentShort.comments)})</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">@user123</span>
                  <span className="text-xs text-white/60">2 days ago</span>
                </div>
                <p className="text-sm mt-1">This is absolutely amazing! The cinematography is breathtaking.</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-white/60">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>245</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </div>
                  <button className="hover:text-white">Reply</button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">@filmfan42</span>
                  <span className="text-xs text-white/60">1 week ago</span>
                </div>
                <p className="text-sm mt-1">
                  I've watched this episode at least 5 times. The story gets better every time!
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-white/60">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>189</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </div>
                  <button className="hover:text-white">Reply</button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">@director_dreams</span>
                  <span className="text-xs text-white/60">3 weeks ago</span>
                </div>
                <p className="text-sm mt-1">The lighting in this scene is perfect. As a filmmaker, I'm taking notes!</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-white/60">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>97</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </div>
                  <button className="hover:text-white">Reply</button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#121212] border-t border-white/10">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  placeholder="Add a comment..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Info panel */}
      <Sheet open={showInfo} onOpenChange={setShowInfo}>
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className="w-full sm:w-[400px] bg-[#121212] text-white border-l border-white/10"
        >
          <SheetHeader>
            <SheetTitle className="text-white">Video Information</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-bold">{currentShort.title}</h2>
           
            {currentShort.seriesName && (
              <div className="bg-primary/10 p-3 rounded-md">
                <h3 className="font-semibold">{currentShort.seriesName}</h3>
                <p className="text-sm text-white/70">
                  Season {currentShort.season} • Episode {currentShort.episode}
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 py-3 border-b border-white/10">
              <Avatar className="h-12 w-12">
                <AvatarImage src={currentShort.creatorAvatar} />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{currentShort.creator}</h3>
                <p className="text-sm text-white/70">{formatNumber(currentShort.views)} views</p>
              </div>
              <Button className="ml-auto" variant="default" size="sm">
                Subscribe
              </Button>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-white/80 whitespace-pre-line">{currentShort.description}</p>
            </div>

            

            <div className="pt-4">
              <h3 className="font-semibold mb-2">Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-md">
                  <p className="text-xs text-white/60">Views</p>
                  <p className="font-semibold">{formatNumber(currentShort.views)}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-md">
                  <p className="text-xs text-white/60">Likes</p>
                  <p className="font-semibold">{formatNumber(currentShort.likes)}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-md">
                  <p className="text-xs text-white/60">Comments</p>
                  <p className="font-semibold">{formatNumber(currentShort.comments)}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-md">
                  <p className="text-xs text-white/60">Duration</p>
                  <p className="font-semibold">{formatTime(duration)}</p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Episodes panel */}
      <Sheet open={showEpisodes} onOpenChange={setShowEpisodes}>
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className="w-full sm:w-[400px] bg-[#121212] text-white border-l border-white/10"
        >
          <SheetHeader>
            <SheetTitle className="text-white">
              {currentShort.seriesName ? `${currentShort.seriesName} Episodes` : "Episodes"}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {currentShort.seriesName && currentShort.season && (
              <div className="bg-primary/10 p-3 rounded-md mb-4">
                <h3 className="font-semibold">Season {currentShort.season}</h3>
                <p className="text-sm text-white/70">{shorts.length} Episodes</p>
              </div>
            )}

            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
              {shorts.map((episode, index) => (
                <div
                  key={episode.id}
                  className={`flex gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                    index === currentIndex ? "bg-primary/20 border border-primary/30" : "hover:bg-white/5"
                  }`}
                  onClick={() => {
                    setCurrentIndex(index)
                    setShowEpisodes(false)
                  }}
                >
                  <div className="relative w-24 h-16 rounded overflow-hidden flex-shrink-0">
                    {/* Use a thumbnail or a frame from the video */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-lg font-bold">{episode.episode}</span>
                    </div>
                    <video src={episode.videoUrl} className="w-full h-full object-cover" muted />
                    {index === currentIndex && (
                      <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" fill="white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-1">{episode.title}</h4>
                    <p className="text-xs text-white/60 mt-1">
                      {episode.season && episode.episode
                        ? `S${episode.season}:E${episode.episode}`
                        : `Episode ${index + 1}`}
                    </p>
                    <p className="text-xs text-white/60 mt-1 line-clamp-1">{episode.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Video progress indicator */}
      <div className={`absolute top-4 left-0 right-0 z-20 flex justify-center gap-1 transition-opacity duration-300 ${uiVisible ? 'opacity-100' : 'opacity-0'}`}>

    
      </div>

      
    </div>
  )
}


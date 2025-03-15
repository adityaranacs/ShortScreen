"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { X, Send, ThumbsUp } from "lucide-react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Input } from "./ui/input"

interface CommentsPanelProps {
  isOpen: boolean
  onClose: () => void
  shortId: string
  commentCount: number
}

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
  }
  text: string
  likes: number
  time: string
  replies?: Comment[]
}

const currentUserAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"


export function CommentsPanel({ isOpen, onClose, shortId, commentCount }: CommentsPanelProps) {
  const [commentText, setCommentText] = useState("")
  const [isMobile, setIsMobile] = useState(false)

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

  // Mock comments data
  const comments: Comment[] = [
    {
      id: "c1",
      user: {
        name: "JaneSmith",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      },
      text: "This is absolutely amazing! How long did it take you to film this?",
      likes: 245,
      time: "2 hours ago",
      replies: [
        {
          id: "r1",
          user: {
            name: "CreatorName",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
          },
          text: "Thank you! It took about 3 days to get the perfect shot.",
          likes: 89,
          time: "1 hour ago",
        },
      ],
    },
    {
      id: "c2",
      user: {
        name: "TechGuy42",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
      },
      text: "What camera did you use for this? The quality is incredible!",
      likes: 132,
      time: "5 hours ago",
    },
    {
      id: "c3",
      user: {
        name: "FilmLover",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
      },
      text: "The colors in this video are so vibrant. Did you use any special filters?",
      likes: 98,
      time: "1 day ago",
    },
    {
      id: "c4",
      user: {
        name: "TravelBug",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      },
      text: "Where was this filmed? I need to add this location to my bucket list!",
      likes: 76,
      time: "2 days ago",
    },
  ]

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      // In a real app, you would send this to your API
      console.log("Submitting comment:", commentText)
      setCommentText("")
    }
  }

  if (!isOpen) return null

  // Mobile version (bottom sheet)
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-end">
        <div className="bg-black rounded-t-xl w-full max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="font-semibold text-white">Comments ({commentCount})</h3>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:text-white/80">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Add Comment Section - Below Title */}
          <form
            onSubmit={handleSubmitComment}
            className="p-4 border-b border-white/10 flex items-center justify-between gap-3 bg-black"
          >
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={currentUserAvatar} alt="Your profile" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <Input
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 bg-zinc-900 border-0 text-white"
              />
            </div>
            <Button
              type="submit"
              size="icon"
              disabled={!commentText.trim()}
              className="flex-shrink-0 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20"
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </form>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 bg-black">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-3">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-white">{comment.user.name}</span>
                      <span className="text-xs text-white/60">{comment.time}</span>
                    </div>
                    <p className="text-sm mt-1 text-white/90">{comment.text}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs sm:flex hidden text-white/60 hover:text-white">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-white/60 hover:text-white">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>

                {comment.replies && comment.replies.length > 0 && (
                  <div className="pl-10 space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                          <AvatarFallback>{reply.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-white">{reply.user.name}</span>
                            <span className="text-xs text-white/60">{reply.time}</span>
                          </div>
                          <p className="text-sm mt-1 text-white/90">{reply.text}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs sm:flex hidden text-white/60 hover:text-white">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {reply.likes}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Separator className="opacity-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Tablet/Desktop version (side panel)
  return (
    <div className="h-full w-[50%] bg-black border-l border-white/10">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="font-semibold text-white">Comments ({commentCount})</h3>
        <Button variant="ghost" size="icon" className="text-white hover:text-white/80" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Add Comment Section - Below Title */}
      <form
        onSubmit={handleSubmitComment}
        className="p-4 border-b border-white/10 flex items-center justify-between gap-3 bg-black"
      >
        <div className="flex items-center gap-3 flex-1">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={currentUserAvatar} alt="Your profile" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <Input
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 bg-zinc-900 border-0 text-white"
          />
        </div>
        <Button 
          type="submit" 
          size="icon" 
          disabled={!commentText.trim()} 
          className="flex-shrink-0 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20"
        >
          <Send className="h-4 w-4 text-white" />
        </Button>
      </form>

      {/* Comments List */}
      <div className="h-[calc(100%-145px)] overflow-y-auto px-4 py-2 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-3">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-white">{comment.user.name}</span>
                  <span className="text-xs text-white/60">{comment.time}</span>
                </div>
                <p className="text-sm mt-1 text-white/90">{comment.text}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-white/60 hover:text-white">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {comment.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-white/60 hover:text-white">
                    Reply
                  </Button>
                </div>
              </div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
              <div className="pl-10 space-y-3">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-3">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                      <AvatarFallback>{reply.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-white">{reply.user.name}</span>
                        <span className="text-xs text-white/60">{reply.time}</span>
                      </div>
                      <p className="text-sm mt-1 text-white/90">{reply.text}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-white/60 hover:text-white">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {reply.likes}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Separator className="opacity-20" />
          </div>
        ))}
      </div>
    </div>
  )
}

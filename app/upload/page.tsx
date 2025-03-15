"use client"

import { useState, useRef, ChangeEvent } from "react"

import { cn } from "@/lib/utils"
import { Button } from "../../components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert"
import { AlertCircle, CheckCircle2, Clock, Film, Globe, ImageIcon, Link, Lock, Plus, PlusCircle, Tag, Upload, Users, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Progress } from "../../components/ui/progress"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { Switch } from "../../components/ui/switch"
import { MainNav } from "../../components/main-nav"

export default function UploadPage() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [visibility, setVisibility] = useState("public")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [monetize, setMonetize] = useState(true)
  const [allowComments, setAllowComments] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const videoInputRef = useRef<HTMLInputElement>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)

  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is a video
    if (!file.type.startsWith("video/")) {
      setError("Please upload a valid video file")
      return
    }

    // Check file size (100MB max for this example)
    if (file.size > 100 * 1024 * 1024) {
      setError("Video file size must be less than 100MB")
      return
    }

    setError(null)
    setVideoFile(file)

    // Create a preview URL for the video
    const videoURL = URL.createObjectURL(file)
    setVideoPreview(videoURL)

    // Auto-generate title from filename if empty
    if (!title) {
      const fileName = file.name.replace(/\.[^/.]+$/, "")
      setTitle(fileName.replace(/-|_/g, " "))
    }
  }

  const handleThumbnailUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file for the thumbnail")
      return
    }

    setError(null)
    setThumbnailFile(file)

    // Create a preview URL for the thumbnail
    const imageURL = URL.createObjectURL(file)
    setThumbnailPreview(imageURL)
  }

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag) && tags.length < 10) {
      setTags([...tags, currentTag])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!videoFile) {
      setError("Please upload a video file")
      return
    }

    if (!title) {
      setError("Please enter a title for your video")
      return
    }

    setError(null)
    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress > 100) {
        progress = 100
        clearInterval(interval)

        // Simulate processing delay
        setTimeout(() => {
          setUploadComplete(true)
          setIsUploading(false)
        }, 1500)
      }
      setUploadProgress(progress)
    }, 500)

    // In a real app, you would upload the file to your server/storage here
    // const formData = new FormData()
    // formData.append('video', videoFile)
    // if (thumbnailFile) formData.append('thumbnail', thumbnailFile)
    // formData.append('title', title)
    // formData.append('description', description)
    // formData.append('category', category)
    // formData.append('visibility', visibility)
    // formData.append('tags', JSON.stringify(tags))
    // formData.append('monetize', monetize.toString())
    // formData.append('allowComments', allowComments.toString())

    // try {
    //   const response = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: formData,
    //   })
    //   const data = await response.json()
    //   // Handle response
    // } catch (error) {
    //   setError("Upload failed. Please try again.")
    //   setIsUploading(false)
    // }
  }

  return (
<div className="min-h-screen bg-black text-white">
<div className="bg-black">
        <MainNav />
      </div>
      <div className="container px-4 py-8 mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Upload Video</h1>
          {!isUploading && !uploadComplete && (
            <Button
              onClick={handleSubmit}
              disabled={!videoFile || !title}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0"
            >
              <Upload className="mr-2 h-4 w-4" />
              Publish Video
            </Button>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 border-red-500/50 bg-red-500/10">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {uploadComplete ? (
          <Card className="mb-8 border-green-500 bg-green-500/10 border shadow-lg">
            <CardHeader className="bg-green-500/20">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <CardTitle>Upload Complete!</CardTitle>
              </div>
              <CardDescription className="text-gray-300">
                Your video has been uploaded successfully and is now being processed.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="relative w-40 h-24 bg-black/30 rounded-md overflow-hidden">
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview || "/placeholder.svg"}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : videoPreview ? (
                    <video src={videoPreview} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Film className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-sm text-gray-300">
                    {videoFile?.name} • {videoFile?.size ? (videoFile.size / (1024 * 1024)).toFixed(2) : 0} MB
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/dashboard")}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Go to Dashboard
              </Button>
              <Button
                onClick={() => {
                  setVideoFile(null)
                  setThumbnailFile(null)
                  setVideoPreview(null)
                  setThumbnailPreview(null)
                  setTitle("")
                  setDescription("")
                  setCategory("")
                  setTags([])
                  setUploadComplete(false)
                  setUploadProgress(0)
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0"
              >
                Upload Another Video
              </Button>
            </CardFooter>
          </Card>
        ) : isUploading ? (
          <Card className="mb-8 border-blue-500/30 bg-blue-500/5 shadow-lg">
            <CardHeader>
              <CardTitle>Uploading Video</CardTitle>
              <CardDescription className="text-gray-300">
                Please wait while your video is being uploaded...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress
                  value={uploadProgress}
                  className="h-3 bg-blue-950 bg-gradient-to-r from-blue-600 to-blue-400"
                />
                <p className="text-sm text-gray-300 mt-2">Uploading: {title}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Card className="border-white/10 bg-white/5 backdrop-blur-sm shadow-lg">
                <CardHeader className="border-b border-white/10 bg-white/5">
                  <CardTitle>Video Details</CardTitle>
                  <CardDescription className="text-gray-300">Provide information about your video</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">
                      Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Add a title that describes your video"
                      maxLength={100}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-blue-500"
                    />
                    <div className="flex justify-end">
                      <span className="text-xs text-gray-400">{title.length}/100</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell viewers about your video"
                      rows={5}
                      maxLength={5000}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-blue-500"
                    />
                    <div className="flex justify-end">
                      <span className="text-xs text-gray-400">{description.length}/5000</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thumbnail" className="text-white">
                      Thumbnail
                    </Label>
                    <div className="flex items-center space-x-4">
                      <div
                        className={cn(
                          "relative w-40 h-24 bg-black/30 rounded-md overflow-hidden cursor-pointer border-2 border-dashed border-white/25 hover:border-blue-500/50 transition-colors",
                          thumbnailPreview && "border-solid border-blue-500/50",
                        )}
                        onClick={() => thumbnailInputRef.current?.click()}
                      >
                        {thumbnailPreview ? (
                          <img
                            src={thumbnailPreview || "/placeholder.svg"}
                            alt="Thumbnail preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full">
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                            <span className="text-xs text-gray-400 mt-1">Upload thumbnail</span>
                          </div>
                        )}
                        <input
                          type="file"
                          ref={thumbnailInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleThumbnailUpload}
                        />
                      </div>
                      <div className="text-sm text-gray-300">
                        <p>Select or upload a picture that shows what's in your video.</p>
                        <p>A good thumbnail stands out and draws viewers' attention.</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-white">
                        Category
                      </Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category" className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-[hsl(197,78.9%,14.9%)] border-white/20 text-white">
                          <SelectItem value="film">Film & Animation</SelectItem>
                          <SelectItem value="music">Music</SelectItem>
                          <SelectItem value="gaming">Gaming</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="tech">Science & Technology</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                          <SelectItem value="howto">How-to & Style</SelectItem>
                          <SelectItem value="travel">Travel & Events</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="visibility" className="text-white">
                        Visibility
                      </Label>
                      <Select value={visibility} onValueChange={setVisibility}>
                        <SelectTrigger id="visibility" className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent className="bg-[hsl(197,78.9%,14.9%)] border-white/20 text-white">
                          <SelectItem value="public">
                            <div className="flex items-center">
                              <Globe className="mr-2 h-4 w-4" />
                              <span>Public</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="unlisted">
                            <div className="flex items-center">
                              <Link className="mr-2 h-4 w-4" />
                              <span>Unlisted</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="private">
                            <div className="flex items-center">
                              <Lock className="mr-2 h-4 w-4" />
                              <span>Private</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="members">
                            <div className="flex items-center">
                              <Users className="mr-2 h-4 w-4" />
                              <span>Members Only</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-white">
                      Tags
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="tags"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="Add tags to help viewers find your video"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-blue-500"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addTag()
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={addTag}
                        disabled={!currentTag || tags.length >= 10}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center gap-1 bg-blue-500/20 hover:bg-blue-500/30 text-white"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="text-white/70 hover:text-white"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-400">{tags.length}/10 tags</p>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="monetize" className="text-white">
                          Monetization
                        </Label>
                        <p className="text-sm text-gray-300">Allow ads to be shown on your video</p>
                      </div>
                      <Switch
                        id="monetize"
                        checked={monetize}
                        onCheckedChange={setMonetize}
                        className="data-[state=checked]:bg-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="comments" className="text-white">
                          Comments
                        </Label>
                        <p className="text-sm text-gray-300">Allow viewers to comment on your video</p>
                      </div>
                      <Switch
                        id="comments"
                        checked={allowComments}
                        onCheckedChange={setAllowComments}
                        className="data-[state=checked]:bg-blue-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-white/10 bg-white/5 backdrop-blur-sm shadow-lg">
                <CardHeader className="border-b border-white/10 bg-white/5">
                  <CardTitle>Video Upload</CardTitle>
                  <CardDescription className="text-gray-300">Upload your video file</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {videoFile ? (
                    <div className="space-y-4">
                      <div className="relative aspect-video bg-black/30 rounded-md overflow-hidden">
                        {videoPreview && <video src={videoPreview} controls className="w-full h-full object-contain" />}
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium truncate">{videoFile.name}</p>
                        <p className="text-sm text-gray-300">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/10"
                        onClick={() => {
                          setVideoFile(null)
                          setVideoPreview(null)
                          if (videoInputRef.current) {
                            videoInputRef.current.value = ""
                          }
                        }}
                      >
                        Change Video
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed border-white/25 rounded-lg p-12 text-center hover:border-blue-500/50 transition-colors cursor-pointer bg-gradient-to-b from-white/5 to-transparent"
                      onClick={() => videoInputRef.current?.click()}
                    >
                      <Upload className="h-12 w-12 mx-auto text-blue-400" />
                      <h3 className="mt-4 text-lg font-semibold">Drag and drop or click to upload</h3>
                      <p className="mt-2 text-sm text-gray-300">MP4, WebM, or MOV files up to 100MB</p>
                      <input
                        type="file"
                        ref={videoInputRef}
                        className="hidden"
                        accept="video/*"
                        onChange={handleVideoUpload}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/5 backdrop-blur-sm shadow-lg">
                <CardHeader className="border-b border-white/10 bg-white/5">
                  <CardTitle>Video Tips</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4 text-sm">
                    <li className="flex items-start gap-3 bg-blue-500/10 p-3 rounded-md">
                      <Clock className="h-5 w-5 mt-0.5 text-blue-400 flex-shrink-0" />
                      <span>Videos under 10 minutes tend to get more engagement</span>
                    </li>
                    <li className="flex items-start gap-3 bg-blue-500/10 p-3 rounded-md">
                      <Tag className="h-5 w-5 mt-0.5 text-blue-400 flex-shrink-0" />
                      <span>Use relevant tags to help viewers discover your content</span>
                    </li>
                    <li className="flex items-start gap-3 bg-blue-500/10 p-3 rounded-md">
                      <ImageIcon className="h-5 w-5 mt-0.5 text-blue-400 flex-shrink-0" />
                      <span>Custom thumbnails with clear visuals perform better</span>
                    </li>
                    <li className="flex items-start gap-3 bg-blue-500/10 p-3 rounded-md">
                      <Film className="h-5 w-5 mt-0.5 text-blue-400 flex-shrink-0" />
                      <span>Higher resolution videos (1080p or 4K) provide better viewing experience</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


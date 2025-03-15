"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Heart, MessageSquare, Share2, Search } from "lucide-react"

export function TopPerformingContent() {
  const [contentType, setContentType] = useState("all")
  const [sortBy, setSortBy] = useState("earnings")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for top performing content
  const contentData = [
    {
      id: "1",
      title: "The Midnight Chronicles: Episode 1",
      type: "series",
      views: 125000,
      likes: 8700,
      comments: 342,
      shares: 1250,
      earnings: 540.23,
      date: "2025-02-15",
    },
    {
      id: "2",
      title: "Neon City Nights",
      type: "movie",
      views: 98000,
      likes: 6500,
      comments: 280,
      shares: 950,
      earnings: 420.45,
      date: "2025-01-20",
    },
    {
      id: "3",
      title: "Beyond the Horizon: Director's Cut",
      type: "movie",
      views: 85000,
      likes: 5800,
      comments: 210,
      shares: 820,
      earnings: 380.67,
      date: "2025-03-05",
    },
    {
      id: "4",
      title: "Silent Shadows: The Beginning",
      type: "series",
      views: 110000,
      likes: 7200,
      comments: 310,
      shares: 1050,
      earnings: 460.34,
      date: "2025-02-28",
    },
    {
      id: "5",
      title: "Urban Legends: The Truth Revealed",
      type: "clip",
      views: 245000,
      likes: 15200,
      comments: 620,
      shares: 2100,
      earnings: 320.67,
      date: "2025-03-10",
    },
    {
      id: "6",
      title: "60-Second Filmmaking Tips",
      type: "short",
      views: 310000,
      likes: 22500,
      comments: 780,
      shares: 3200,
      earnings: 280.34,
      date: "2025-03-12",
    },
  ]

  // Filter and sort content
  const filteredContent = contentData
    .filter((item) => contentType === "all" || item.type === contentType)
    .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "earnings") return b.earnings - a.earnings
      if (sortBy === "views") return b.views - a.views
      if (sortBy === "engagement") {
        const engagementA = (a.likes + a.comments + a.shares) / a.views
        const engagementB = (b.likes + b.comments + b.shares) / b.views
        return engagementB - engagementA
      }
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime()
      return 0
    })

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "series":
        return "bg-blue-500/20 text-blue-500"
      case "movie":
        return "bg-purple-500/20 text-purple-500"
      case "clip":
        return "bg-green-500/20 text-green-500"
      case "short":
        return "bg-orange-500/20 text-orange-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>Your highest earning and most engaging content</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                className="pl-8 h-9 w-full sm:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger className="h-9 w-full sm:w-[130px]">
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="series">Series</SelectItem>
                  <SelectItem value="movie">Movies</SelectItem>
                  <SelectItem value="clip">Clips</SelectItem>
                  <SelectItem value="short">Shorts</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-9 w-full sm:w-[130px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="earnings">Earnings</SelectItem>
                  <SelectItem value="views">Views</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Engagement</TableHead>
                <TableHead className="text-right">Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.map((item) => {
                const engagement = (((item.likes + item.comments + item.shares) / item.views) * 100).toFixed(1)

                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(item.type)}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatNumber(item.views)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Heart className="h-3 w-3 mr-1" />
                          {formatNumber(item.likes)}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {formatNumber(item.comments)}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Share2 className="h-3 w-3 mr-1" />
                          {formatNumber(item.shares)}
                        </div>
                        <span className="text-sm font-medium">{engagement}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">${item.earnings.toFixed(2)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}


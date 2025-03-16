"use client"

import type React from "react"

import { DollarSign, Eye, ArrowUpRight, ArrowDownRight, Heart, MessageSquare, Share2, Clock } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export function StatsCards() {
  // Mock data
  const stats = {
    earnings: {
      total: "$1,245.89",
      change: 12.5,
      isPositive: true,
    },
    views: {
      total: "245,678",
      change: 8.3,
      isPositive: true,
    },
    likes: {
      total: "32,456",
      change: 15.2,
      isPositive: true,
    },
    comments: {
      total: "5,678",
      change: -2.1,
      isPositive: false,
    },
    shares: {
      total: "1,892",
      change: 24.3,
      isPositive: true,
    },
    watchTime: {
      total: "12,345 hrs",
      change: 5.7,
      isPositive: true,
    },
  }

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
      <StatsCard
        title="Total Earnings"
        value={stats.earnings.total}
        change={stats.earnings.change}
        isPositive={stats.earnings.isPositive}
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Total Views"
        value={stats.views.total}
        change={stats.views.change}
        isPositive={stats.views.isPositive}
        icon={<Eye className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Total Likes"
        value={stats.likes.total}
        change={stats.likes.change}
        isPositive={stats.likes.isPositive}
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Total Comments"
        value={stats.comments.total}
        change={stats.comments.change}
        isPositive={stats.comments.isPositive}
        icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Total Shares"
        value={stats.shares.total}
        change={stats.shares.change}
        isPositive={stats.shares.isPositive}
        icon={<Share2 className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Watch Time"
        value={stats.watchTime.total}
        change={stats.watchTime.change}
        isPositive={stats.watchTime.isPositive}
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string
  change: number
  isPositive: boolean
  icon: React.ReactNode
}

function StatsCard({ title, value, change, isPositive, icon }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex flex-col mt-1">
          <div className="flex items-center text-xs">
            {isPositive ? (
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            )}
            <span className={isPositive ? "text-green-500" : "text-red-500"}>{change}%</span>
          </div>
          <p className="text-xs text-muted-foreground">from previous period</p>
        </div>
      </CardContent>
    </Card>
  )
}
"use client"

import { useState } from "react"
import { DollarSign, Eye, ArrowUpRight, ArrowDownRight, Heart, MessageSquare } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { CreatorEarningsChart } from "../../../components/creator-earnings-chart"
import { CreatorEngagementChart } from "../../../components/creator-engagement-chart"
import { CreatorClipsTable } from "../../../components/creator-clips-table"

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("30days")

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
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Creator Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
                <SelectItem value="alltime">All time</SelectItem>
              </SelectContent>
            </Select>
            <Button>Download Report</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.earnings.total}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stats.earnings.isPositive ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={stats.earnings.isPositive ? "text-green-500" : "text-red-500"}>
                  {stats.earnings.change}%
                </span>{" "}
                from previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.views.total}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stats.views.isPositive ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={stats.views.isPositive ? "text-green-500" : "text-red-500"}>
                  {stats.views.change}%
                </span>{" "}
                from previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.likes.total}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stats.likes.isPositive ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={stats.likes.isPositive ? "text-green-500" : "text-red-500"}>
                  {stats.likes.change}%
                </span>{" "}
                from previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.comments.total}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stats.comments.isPositive ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={stats.comments.isPositive ? "text-green-500" : "text-red-500"}>
                  {stats.comments.change}%
                </span>{" "}
                from previous period
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="earnings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="clips">Top Clips</TabsTrigger>
          </TabsList>

          <TabsContent value="earnings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Your earnings over the selected time period</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <CreatorEarningsChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Overview</CardTitle>
                <CardDescription>Your likes, comments, and shares over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <CreatorEngagementChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Clips</CardTitle>
                <CardDescription>Your most viewed and highest earning clips</CardDescription>
              </CardHeader>
              <CardContent>
                <CreatorClipsTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


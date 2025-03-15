"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"

export function EngagementOverview() {
  // Mock data for engagement metrics over time
  const engagementData = [
    { date: "2025-01-01", likes: 1200, comments: 320, shares: 150 },
    { date: "2025-01-15", likes: 1350, comments: 380, shares: 180 },
    { date: "2025-02-01", likes: 1500, comments: 420, shares: 210 },
    { date: "2025-02-15", likes: 1650, comments: 460, shares: 240 },
    { date: "2025-03-01", likes: 1800, comments: 500, shares: 270 },
    { date: "2025-03-15", likes: 1950, comments: 540, shares: 300 },
  ]

  const chartConfig = {
    likes: {
      label: "Likes",
      color: "hsl(var(--chart-1))",
    },
    comments: {
      label: "Comments",
      color: "hsl(var(--chart-2))",
    },
    shares: {
      label: "Shares",
      color: "hsl(var(--chart-3))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Overview</CardTitle>
        <CardDescription>Track likes, comments, and shares over time</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="h-[300px]">
          <LineChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
            />
            <YAxis tickLine={false} axisLine={false} width={40} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) =>
                    new Date(label).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                  }
                />
              }
            />
            <Line
              type="monotone"
              dataKey="likes"
              stroke="var(--color-likes)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="comments"
              stroke="var(--color-comments)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="shares"
              stroke="var(--color-shares)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


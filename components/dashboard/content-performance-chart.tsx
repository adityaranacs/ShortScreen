"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

export function ContentPerformanceChart() {
  // Mock data for content performance
  const contentData = [
    {
      name: "Series",
      views: 125000,
      earnings: 540.23,
      engagement: 8.7,
    },
    {
      name: "Movies",
      views: 98000,
      earnings: 420.45,
      engagement: 7.2,
    },
    {
      name: "Clips",
      views: 245000,
      earnings: 320.67,
      engagement: 9.5,
    },
    {
      name: "Shorts",
      views: 310000,
      earnings: 280.34,
      engagement: 12.3,
    },
  ]

  const chartConfig = {
    views: {
      label: "Views",
      color: "hsl(var(--chart-1))",
    },
    earnings: {
      label: "Earnings",
      color: "hsl(var(--chart-2))",
    },
    engagement: {
      label: "Engagement Rate",
      color: "hsl(var(--chart-3))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Performance</CardTitle>
        <CardDescription>Compare performance across different content types</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="h-[300px]">
          <BarChart data={contentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 15]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    if (name === "earnings") return `$${value.toFixed(2)}`
                    if (name === "engagement") return `${value.toFixed(1)}%`
                    return value.toLocaleString()
                  }}
                />
              }
            />
            <Bar dataKey="earnings" fill="var(--color-earnings)" yAxisId="left" radius={[4, 4, 0, 0]} />
            <Bar dataKey="engagement" fill="var(--color-engagement)" yAxisId="right" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


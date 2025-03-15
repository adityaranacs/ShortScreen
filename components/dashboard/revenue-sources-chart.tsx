"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Cell, Pie, PieChart } from "recharts"

export function RevenueSourcesChart() {
  // Mock data for revenue sources
  const revenueData = [
    { name: "Views", value: 540.23, color: "hsl(var(--chart-1))" },
    { name: "Likes", value: 320.45, color: "hsl(var(--chart-2))" },
    { name: "Comments", value: 180.67, color: "hsl(var(--chart-3))" },
    { name: "Shares", value: 120.34, color: "hsl(var(--chart-4))" },
    { name: "Subscriptions", value: 84.2, color: "hsl(var(--chart-5))" },
  ]

  const chartConfig = {
    views: {
      label: "Views",
      color: "hsl(var(--chart-1))",
    },
    likes: {
      label: "Likes",
      color: "hsl(var(--chart-2))",
    },
    comments: {
      label: "Comments",
      color: "hsl(var(--chart-3))",
    },
    shares: {
      label: "Shares",
      color: "hsl(var(--chart-4))",
    },
    subscriptions: {
      label: "Subscriptions",
      color: "hsl(var(--chart-5))",
    },
  }

  const total = revenueData.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Sources</CardTitle>
        <CardDescription>Breakdown of your earnings by engagement type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => `$${value.toFixed(2)} (${((value / total) * 100).toFixed(1)}%)`}
                  />
                }
              />
            </PieChart>
          </ChartContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {revenueData.map((item) => (
            <div key={item.name} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
              <div className="flex justify-between w-full">
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-medium">${item.value.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


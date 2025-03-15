"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function ViewsChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock data for views chart
  const data = [
    { date: "Jan 1", views: 2450 },
    { date: "Jan 2", views: 1890 },
    { date: "Jan 3", views: 3200 },
    { date: "Jan 4", views: 2780 },
    { date: "Jan 5", views: 3450 },
    { date: "Jan 6", views: 3890 },
    { date: "Jan 7", views: 2980 },
    { date: "Jan 8", views: 3240 },
    { date: "Jan 9", views: 4120 },
    { date: "Jan 10", views: 3780 },
    { date: "Jan 11", views: 4350 },
    { date: "Jan 12", views: 3920 },
    { date: "Jan 13", views: 4810 },
    { date: "Jan 14", views: 5240 },
    { date: "Jan 15", views: 4580 },
    { date: "Jan 16", views: 5130 },
    { date: "Jan 17", views: 5560 },
    { date: "Jan 18", views: 4890 },
    { date: "Jan 19", views: 5420 },
    { date: "Jan 20", views: 5950 },
    { date: "Jan 21", views: 6210 },
    { date: "Jan 22", views: 5680 },
    { date: "Jan 23", views: 6130 },
    { date: "Jan 24", views: 6570 },
    { date: "Jan 25", views: 5940 },
    { date: "Jan 26", views: 6390 },
    { date: "Jan 27", views: 6820 },
    { date: "Jan 28", views: 6450 },
    { date: "Jan 29", views: 6910 },
    { date: "Jan 30", views: 7280 },
  ]

  if (!mounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.split(" ")[1]}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value.toLocaleString()}`}
        />
        <Tooltip
          formatter={(value) => [`${value.toLocaleString()}`, "Views"]}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
        />
        <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}


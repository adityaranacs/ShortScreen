"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function CreatorEarningsChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock data for earnings chart
  const data = [
    { date: "Jan 1", earnings: 45.2 },
    { date: "Jan 2", earnings: 38.5 },
    { date: "Jan 3", earnings: 52.1 },
    { date: "Jan 4", earnings: 41.8 },
    { date: "Jan 5", earnings: 55.3 },
    { date: "Jan 6", earnings: 59.9 },
    { date: "Jan 7", earnings: 48.7 },
    { date: "Jan 8", earnings: 52.4 },
    { date: "Jan 9", earnings: 61.2 },
    { date: "Jan 10", earnings: 57.8 },
    { date: "Jan 11", earnings: 63.5 },
    { date: "Jan 12", earnings: 59.2 },
    { date: "Jan 13", earnings: 68.1 },
    { date: "Jan 14", earnings: 72.4 },
    { date: "Jan 15", earnings: 65.8 },
    { date: "Jan 16", earnings: 71.3 },
    { date: "Jan 17", earnings: 75.6 },
    { date: "Jan 18", earnings: 68.9 },
    { date: "Jan 19", earnings: 74.2 },
    { date: "Jan 20", earnings: 79.5 },
    { date: "Jan 21", earnings: 82.1 },
    { date: "Jan 22", earnings: 76.8 },
    { date: "Jan 23", earnings: 81.3 },
    { date: "Jan 24", earnings: 85.7 },
    { date: "Jan 25", earnings: 79.4 },
    { date: "Jan 26", earnings: 83.9 },
    { date: "Jan 27", earnings: 88.2 },
    { date: "Jan 28", earnings: 84.5 },
    { date: "Jan 29", earnings: 89.1 },
    { date: "Jan 30", earnings: 92.8 },
  ]

  if (!mounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#ffffff"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.split(" ")[1]}
        />
        <YAxis
          stroke="#ffffff"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value) => [`$${value}`, "Earnings"]}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
        />
        <Line type="monotone" dataKey="earnings" stroke="#ffffff" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
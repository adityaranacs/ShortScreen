"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"

export function CreatorEngagementChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock data for engagement chart
  const data = [
    { date: "Jan 1", likes: 450, comments: 120, shares: 80 },
    { date: "Jan 2", likes: 380, comments: 95, shares: 65 },
    { date: "Jan 3", likes: 520, comments: 145, shares: 110 },
    { date: "Jan 4", likes: 410, comments: 105, shares: 75 },
    { date: "Jan 5", likes: 550, comments: 160, shares: 120 },
    { date: "Jan 6", likes: 590, comments: 175, shares: 130 },
    { date: "Jan 7", likes: 480, comments: 130, shares: 95 },
    { date: "Jan 8", likes: 520, comments: 150, shares: 105 },
    { date: "Jan 9", likes: 610, comments: 180, shares: 135 },
    { date: "Jan 10", likes: 570, comments: 165, shares: 125 },
    { date: "Jan 11", likes: 630, comments: 190, shares: 145 },
    { date: "Jan 12", likes: 590, comments: 175, shares: 130 },
    { date: "Jan 13", likes: 680, comments: 210, shares: 160 },
    { date: "Jan 14", likes: 720, comments: 230, shares: 175 },
  ]

  if (!mounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#ffffff"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.split(" ")[1]}
        />
        <YAxis stroke="#ffffff" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(240 3.7% 15.9%)",
            borderColor: "#222222",
            color: "#ffffff",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
          }}
          labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
          itemStyle={{ color: "#ffffff" }}
        />
        <Legend />
        <Bar dataKey="likes" name="Likes" fill="#2C2C2C" radius={[4, 4, 0, 0]} stackId="a" />
        <Bar dataKey="comments" name="Comments" fill="#7C7C7C" radius={[4, 4, 0, 0]} stackId="a" />
        <Bar dataKey="shares" name="Shares" fill="#CCCCCC" radius={[4, 4, 0, 0]} stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  )
}
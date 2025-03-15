"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

export function EarningsOverview() {
  // Mock data for earnings over time
  const earningsData = [
    { date: "2024-01-01", earnings: 120.45, projected: 0 },
    { date: "2024-01-15", earnings: 145.78, projected: 0 },
    { date: "2024-02-01", earnings: 190.23, projected: 0 },
    { date: "2024-02-15", earnings: 210.56, projected: 0 },
    { date: "2024-03-01", earnings: 245.89, projected: 0 },
    { date: "2024-03-15", earnings: 280.34, projected: 0 },
    { date: "2024-04-01", earnings: 310.67, projected: 0 },
    { date: "2024-04-15", earnings: 345.12, projected: 0 },
    { date: "2024-05-01", earnings: 390.45, projected: 0 },
    { date: "2024-05-15", earnings: 420.78, projected: 0 },
    { date: "2024-06-01", earnings: 450.23, projected: 0 },
    { date: "2024-06-15", earnings: 490.56, projected: 0 },
    { date: "2024-07-01", earnings: 520.89, projected: 0 },
    { date: "2024-07-15", earnings: 560.34, projected: 0 },
    { date: "2024-08-01", earnings: 590.67, projected: 0 },
    { date: "2024-08-15", earnings: 630.12, projected: 0 },
    { date: "2024-09-01", earnings: 670.45, projected: 0 },
    { date: "2024-09-15", earnings: 710.78, projected: 0 },
    { date: "2024-10-01", earnings: 750.23, projected: 0 },
    { date: "2024-10-15", earnings: 790.56, projected: 0 },
    { date: "2024-11-01", earnings: 830.89, projected: 0 },
    { date: "2024-11-15", earnings: 870.34, projected: 0 },
    { date: "2024-12-01", earnings: 910.67, projected: 0 },
    { date: "2024-12-15", earnings: 950.12, projected: 0 },
    { date: "2025-01-01", earnings: 1000.45, projected: 0 },
    { date: "2025-01-15", earnings: 1050.78, projected: 0 },
    { date: "2025-02-01", earnings: 1100.23, projected: 0 },
    { date: "2025-02-15", earnings: 1150.56, projected: 0 },
    { date: "2025-03-01", earnings: 1200.89, projected: 0 },
    { date: "2025-03-15", earnings: 1245.89, projected: 1300.34 },
    { date: "2025-04-01", earnings: 0, projected: 1350.67 },
    { date: "2025-04-15", earnings: 0, projected: 1400.12 },
    { date: "2025-05-01", earnings: 0, projected: 1450.45 },
    { date: "2025-05-15", earnings: 0, projected: 1500.78 },
    { date: "2025-06-01", earnings: 0, projected: 1550.23 },
  ]

  const chartConfig = {
    earnings: {
      label: "Earnings",
      color: "hsl(var(--chart-1))",
    },
    projected: {
      label: "Projected",
      color: "hsl(var(--chart-2))",
      strokeDasharray: "5 5",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings Overview</CardTitle>
        <CardDescription>Your earnings over time with projected future earnings</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="h-[300px]">
          <AreaChart data={earningsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-earnings)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-earnings)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-projected)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-projected)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", { month: "short" })
              }}
              minTickGap={30}
            />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => `$${value.toFixed(2)}`}
                  labelFormatter={(label) =>
                    new Date(label).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                  }
                />
              }
            />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="var(--color-earnings)"
              fillOpacity={1}
              fill="url(#colorEarnings)"
            />
            <Area
              type="monotone"
              dataKey="projected"
              stroke="var(--color-projected)"
              fillOpacity={1}
              fill="url(#colorProjected)"
              strokeDasharray="5 5"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


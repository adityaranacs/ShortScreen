"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Cell, Pie, PieChart } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export function AudienceDemographics() {
  // Mock data for audience demographics
  const ageData = [
    { name: "13-17", value: 15, color: "hsl(var(--chart-1))" },
    { name: "18-24", value: 35, color: "hsl(var(--chart-2))" },
    { name: "25-34", value: 25, color: "hsl(var(--chart-3))" },
    { name: "35-44", value: 15, color: "hsl(var(--chart-4))" },
    { name: "45+", value: 10, color: "hsl(var(--chart-5))" },
  ]

  const genderData = [
    { name: "Male", value: 55, color: "hsl(var(--chart-1))" },
    { name: "Female", value: 42, color: "hsl(var(--chart-2))" },
    { name: "Other", value: 3, color: "hsl(var(--chart-3))" },
  ]

  const locationData = [
    { name: "United States", value: 45, color: "hsl(var(--chart-1))" },
    { name: "India", value: 15, color: "hsl(var(--chart-2))" },
    { name: "UK", value: 10, color: "hsl(var(--chart-3))" },
    { name: "Canada", value: 8, color: "hsl(var(--chart-4))" },
    { name: "Other", value: 22, color: "hsl(var(--chart-5))" },
  ]

  const chartConfig = {
    age: {
      label: "Age",
      color: "hsl(var(--chart-1))",
    },
    gender: {
      label: "Gender",
      color: "hsl(var(--chart-2))",
    },
    location: {
      label: "Location",
      color: "hsl(var(--chart-3))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audience Demographics</CardTitle>
        <CardDescription>Understand who is watching your content</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="age" className="space-y-4">
          <TabsList className="grid grid-cols-3 h-9">
            <TabsTrigger value="age" className="text-xs">
              Age
            </TabsTrigger>
            <TabsTrigger value="gender" className="text-xs">
              Gender
            </TabsTrigger>
            <TabsTrigger value="location" className="text-xs">
              Location
            </TabsTrigger>
          </TabsList>

          <TabsContent value="age" className="space-y-4">
            <DemographicChart data={ageData} config={chartConfig} />
          </TabsContent>

          <TabsContent value="gender" className="space-y-4">
            <DemographicChart data={genderData} config={chartConfig} />
          </TabsContent>

          <TabsContent value="location" className="space-y-4">
            <DemographicChart data={locationData} config={chartConfig} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function DemographicChart({ data, config }: { data: any[]; config: any }) {
  return (
    <div className="h-[220px] flex items-center justify-center">
      <ChartContainer config={config} className="h-full w-full">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${value}%`} />} />
        </PieChart>
      </ChartContainer>
    </div>
  )
}


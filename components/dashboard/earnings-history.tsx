"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Download, ChevronLeft, ChevronRight } from "lucide-react"

export function EarningsHistory() {
  const [period, setPeriod] = useState("monthly")
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  // Mock data for earnings history
  const earningsHistory = [
    {
      id: "1",
      period: "March 2025",
      earnings: 1245.89,
      views: 245678,
      contentCount: 32,
      status: "current",
      breakdown: {
        series: 540.23,
        movies: 420.45,
        clips: 180.67,
        shorts: 104.54,
      },
    },
    {
      id: "2",
      period: "February 2025",
      earnings: 1120.45,
      views: 220345,
      contentCount: 30,
      status: "paid",
      breakdown: {
        series: 480.12,
        movies: 390.78,
        clips: 160.45,
        shorts: 89.1,
      },
    },
    {
      id: "3",
      period: "January 2025",
      earnings: 980.67,
      views: 195678,
      contentCount: 28,
      status: "paid",
      breakdown: {
        series: 420.34,
        movies: 350.12,
        clips: 140.21,
        shorts: 70.0,
      },
    },
    {
      id: "4",
      period: "December 2024",
      earnings: 1050.34,
      views: 210456,
      contentCount: 29,
      status: "paid",
      breakdown: {
        series: 450.67,
        movies: 370.45,
        clips: 150.22,
        shorts: 79.0,
      },
    },
    {
      id: "5",
      period: "November 2024",
      earnings: 920.78,
      views: 185234,
      contentCount: 27,
      status: "paid",
      breakdown: {
        series: 400.23,
        movies: 330.45,
        clips: 130.1,
        shorts: 60.0,
      },
    },
    {
      id: "6",
      period: "October 2024",
      earnings: 870.45,
      views: 175890,
      contentCount: 25,
      status: "paid",
      breakdown: {
        series: 380.12,
        movies: 310.23,
        clips: 120.1,
        shorts: 60.0,
      },
    },
    {
      id: "7",
      period: "September 2024",
      earnings: 830.23,
      views: 165432,
      contentCount: 24,
      status: "paid",
      breakdown: {
        series: 360.45,
        movies: 290.78,
        clips: 110.0,
        shorts: 69.0,
      },
    },
    {
      id: "8",
      period: "August 2024",
      earnings: 790.67,
      views: 155678,
      contentCount: 23,
      status: "paid",
      breakdown: {
        series: 340.23,
        movies: 270.44,
        clips: 100.0,
        shorts: 80.0,
      },
    },
    {
      id: "9",
      period: "July 2024",
      earnings: 750.34,
      views: 145890,
      contentCount: 22,
      status: "paid",
      breakdown: {
        series: 320.12,
        movies: 250.22,
        clips: 90.0,
        shorts: 90.0,
      },
    },
    {
      id: "10",
      period: "June 2024",
      earnings: 710.78,
      views: 135678,
      contentCount: 21,
      status: "paid",
      breakdown: {
        series: 300.45,
        movies: 230.33,
        clips: 80.0,
        shorts: 100.0,
      },
    },
    {
      id: "11",
      period: "May 2024",
      earnings: 670.45,
      views: 125456,
      contentCount: 20,
      status: "paid",
      breakdown: {
        series: 280.23,
        movies: 210.22,
        clips: 70.0,
        shorts: 110.0,
      },
    },
    {
      id: "12",
      period: "April 2024",
      earnings: 630.23,
      views: 115234,
      contentCount: 19,
      status: "paid",
      breakdown: {
        series: 260.12,
        movies: 190.11,
        clips: 60.0,
        shorts: 120.0,
      },
    },
  ]

  // Pagination
  const totalPages = Math.ceil(earningsHistory.length / itemsPerPage)
  const paginatedData = earningsHistory.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-blue-500/20 text-blue-500"
      case "paid":
        return "bg-green-500/20 text-green-500"
      case "pending":
        return "bg-yellow-500/20 text-yellow-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Earnings History</CardTitle>
            <CardDescription>Your historical earnings and payment status</CardDescription>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="h-9 w-full sm:w-[130px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Earnings</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Content</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.period}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${item.earnings.toFixed(2)}
                    <div className="flex justify-end gap-1 mt-1">
                      <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                        Series: ${item.breakdown.series.toFixed(2)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
                      >
                        Movies: ${item.breakdown.movies.toFixed(2)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{formatNumber(item.views)}</TableCell>
                  <TableCell className="text-right">{item.contentCount}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, earningsHistory.length)} of{" "}
            {earningsHistory.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {page} of {totalPages}
            </div>
            <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


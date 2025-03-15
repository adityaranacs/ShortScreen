"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function DateRangePicker() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  const [preset, setPreset] = useState("30days")

  const handlePresetChange = (value: string) => {
    setPreset(value)

    const today = new Date()
    let from = new Date()

    switch (value) {
      case "7days":
        from = new Date(today.setDate(today.getDate() - 7))
        break
      case "30days":
        from = new Date(today.setDate(today.getDate() - 30))
        break
      case "90days":
        from = new Date(today.setDate(today.getDate() - 90))
        break
      case "year":
        from = new Date(today.setFullYear(today.getFullYear() - 1))
        break
      default:
        from = new Date(today.setDate(today.getDate() - 30))
    }

    setDateRange({ from, to: new Date() })
  }

  return (
    <div className="flex items-center space-x-2">
      <Select value={preset} onValueChange={handlePresetChange}>
        <SelectTrigger className="h-9 w-[130px] sm:w-[180px]">
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

      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant={"outline"} className="h-9 w-9 p-0 hidden sm:flex">
            <CalendarIcon className="h-4 w-4" />
            <span className="sr-only">Open calendar</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}


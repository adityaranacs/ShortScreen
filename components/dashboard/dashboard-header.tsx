"use client"

import { Button } from "../ui/button"
import { Settings, HelpCircle } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 mb-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Creator Dashboard</h2>
        <p className="text-muted-foreground mt-1">Track your earnings, content performance, and audience engagement</p>
      </div>
      <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
        <Button variant="outline" size="sm" className="h-9">
          <HelpCircle className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Help</span>
        </Button>
        <Button variant="outline" size="sm" className="h-9">
          <Settings className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
        </Button>
      </div>
    </div>
  )
}


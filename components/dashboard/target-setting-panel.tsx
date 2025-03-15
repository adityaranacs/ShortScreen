"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Target, TrendingUp, Award, Edit2, CheckCircle, Calendar } from "lucide-react"
import { Separator } from "../ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function TargetSettingPanel() {
  const [showTargetDialog, setShowTargetDialog] = useState(false)
  const [targetAmount, setTargetAmount] = useState("2000")
  const [targetPeriod, setTargetPeriod] = useState("monthly")
  const [targetCategory, setTargetCategory] = useState("all")

  // Mock data
  const currentEarnings = 1245.89
  const targetGoal = 2000
  const progressPercentage = (currentEarnings / targetGoal) * 100
  const daysLeft = 15
  const projectedEarnings = 1950
  const projectedPercentage = (projectedEarnings / targetGoal) * 100

  const milestones = [
    {
      id: "m1",
      name: "First $1,000",
      amount: 1000,
      achieved: true,
      date: "March 10, 2025",
    },
    {
      id: "m2",
      name: "First Series Launch",
      amount: 1500,
      achieved: false,
      progress: 83,
    },
    {
      id: "m3",
      name: "10,000 Subscribers",
      amount: 2500,
      achieved: false,
      progress: 45,
    },
  ]

  const handleUpdateTarget = () => {
    // In a real app, this would update the target in the database
    setShowTargetDialog(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="mr-2 h-5 w-5" />
          Earnings Target
        </CardTitle>
        <CardDescription>Track your progress towards your earnings goal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Current Progress</span>
            <div className="flex items-center">
              <span className="text-xl font-bold">${currentEarnings.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground ml-1">/ ${targetGoal}</span>
            </div>
          </div>
          <div className="space-y-1">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{progressPercentage.toFixed(0)}% complete</span>
              <span>{daysLeft} days left</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center">
            <TrendingUp className="mr-2 h-4 w-4" />
            Projected Earnings
          </h3>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">By end of period</span>
              <div className="flex items-center">
                <span className="font-medium">${projectedEarnings.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground ml-1">/ ${targetGoal}</span>
              </div>
            </div>
            <Progress value={projectedPercentage} className="h-2" indicatorClassName="bg-blue-500" />
            <div className="flex justify-between text-xs">
              <span className="text-blue-500">{projectedPercentage.toFixed(0)}% projected</span>
              <span className="text-muted-foreground">
                {projectedEarnings >= targetGoal ? "On track" : `$${(targetGoal - projectedEarnings).toFixed(2)} short`}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center">
            <Award className="mr-2 h-4 w-4" />
            Milestones
          </h3>
          <div className="space-y-3">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center">
                    {milestone.achieved && <CheckCircle className="mr-1 h-3 w-3 text-green-500" />}
                    {milestone.name}
                  </span>
                  <span className="text-sm font-medium">
                    {milestone.achieved ? (
                      <span className="text-green-500 flex items-center">
                        Achieved
                        <Calendar className="ml-1 h-3 w-3" />
                        <span className="text-xs ml-1">{milestone.date}</span>
                      </span>
                    ) : (
                      <span>${milestone.amount}</span>
                    )}
                  </span>
                </div>
                {!milestone.achieved && (
                  <Progress value={milestone.progress} className="h-1" indicatorClassName="bg-purple-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={showTargetDialog} onOpenChange={setShowTargetDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <Edit2 className="mr-2 h-4 w-4" />
              Update Target
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Earnings Target</DialogTitle>
              <DialogDescription>Define your earnings goal and track your progress.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="target-amount">Target Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input
                    id="target-amount"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="pl-7"
                    type="number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-period">Target Period</Label>
                <Select value={targetPeriod} onValueChange={setTargetPeriod}>
                  <SelectTrigger id="target-period">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-category">Content Category</Label>
                <Select value={targetCategory} onValueChange={setTargetCategory}>
                  <SelectTrigger id="target-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Content</SelectItem>
                    <SelectItem value="series">Series</SelectItem>
                    <SelectItem value="movies">Movies</SelectItem>
                    <SelectItem value="clips">Clips</SelectItem>
                    <SelectItem value="shorts">Shorts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowTargetDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateTarget}>Save Target</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}


"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Wallet, CreditCard, AlertCircle, CheckCircle, BanknoteIcon as Bank, DollarSign } from "lucide-react"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export function WithdrawalPanel() {
  const [showWithdrawalDialog, setShowWithdrawalDialog] = useState(false)
  const [withdrawalMethod, setWithdrawalMethod] = useState("bank")
  const [withdrawalAmount, setWithdrawalAmount] = useState("1000.00")
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(false)

  // Mock data
  const currentBalance = 1245.89
  const withdrawalThreshold = 1000
  const pendingEarnings = 245.67
  const nextPayoutDate = "April 15, 2025"
  const withdrawalHistory = [
    {
      id: "w1",
      date: "March 1, 2025",
      amount: 980.45,
      method: "Bank Transfer",
      status: "completed",
    },
    {
      id: "w2",
      date: "February 1, 2025",
      amount: 850.23,
      method: "PayPal",
      status: "completed",
    },
    {
      id: "w3",
      date: "January 1, 2025",
      amount: 720.67,
      method: "Bank Transfer",
      status: "completed",
    },
  ]

  const handleWithdrawal = () => {
    // In a real app, this would make an API call to process the withdrawal
    setWithdrawalSuccess(true)
    setTimeout(() => {
      setShowWithdrawalDialog(false)
      setWithdrawalSuccess(false)
    }, 3000)
  }

  const canWithdraw = currentBalance >= withdrawalThreshold

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wallet className="mr-2 h-5 w-5" />
          Balance & Withdrawals
        </CardTitle>
        <CardDescription>Manage your earnings and withdrawals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Current Balance</span>
            <span className="text-2xl font-bold">${currentBalance.toFixed(2)}</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Withdrawal Threshold</span>
              <span>${withdrawalThreshold.toFixed(2)}</span>
            </div>
            <Progress
              value={(currentBalance / withdrawalThreshold) * 100}
              className="h-2"
              indicatorClassName={canWithdraw ? "bg-green-500" : ""}
            />
          </div>
          {canWithdraw ? (
            <Alert className="bg-green-500/10 border-green-500/50 text-green-500">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Ready to withdraw</AlertTitle>
              <AlertDescription>Your balance is above the withdrawal threshold.</AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-yellow-500/10 border-yellow-500/50 text-yellow-500">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Threshold not reached</AlertTitle>
              <AlertDescription>
                You need ${(withdrawalThreshold - currentBalance).toFixed(2)} more to reach the withdrawal threshold.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Pending Earnings</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">To be added on {nextPayoutDate}</span>
            <span className="font-medium">${pendingEarnings.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Recent Withdrawals</h3>
          <div className="space-y-2">
            {withdrawalHistory.slice(0, 2).map((withdrawal) => (
              <div key={withdrawal.id} className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm">{withdrawal.date}</span>
                  <span className="text-xs text-muted-foreground">{withdrawal.method}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">${withdrawal.amount.toFixed(2)}</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    {withdrawal.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={showWithdrawalDialog} onOpenChange={setShowWithdrawalDialog}>
          <DialogTrigger asChild>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={!canWithdraw}>
              <DollarSign className="mr-2 h-4 w-4" />
              Withdraw Funds
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Withdraw Funds</DialogTitle>
              <DialogDescription>Choose your withdrawal method and amount.</DialogDescription>
            </DialogHeader>

            {withdrawalSuccess ? (
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-medium">Withdrawal Successful!</h3>
                  <p className="text-sm text-muted-foreground">
                    Your withdrawal of ${withdrawalAmount} has been initiated and will be processed shortly.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdrawal-amount">Withdrawal Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="withdrawal-amount"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Available balance: ${currentBalance.toFixed(2)}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="withdrawal-method">Withdrawal Method</Label>
                    <Select value={withdrawalMethod} onValueChange={setWithdrawalMethod}>
                      <SelectTrigger id="withdrawal-method">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">
                          <div className="flex items-center">
                            <Bank className="mr-2 h-4 w-4" />
                            <span>Bank Transfer</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="paypal">
                          <div className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>PayPal</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Alert className="bg-blue-500/10 border-blue-500/50 text-blue-500">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>Withdrawals are typically processed within 3-5 business days.</AlertDescription>
                  </Alert>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowWithdrawalDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleWithdrawal} className="bg-green-600 hover:bg-green-700 text-white">
                    Confirm Withdrawal
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}


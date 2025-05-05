"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, RefreshCw, Send, Trash2 } from "lucide-react"
import { useWalletStore } from "@/lib/stores/wallet-store"
import { formatTokenAmount } from "@/lib/utils"

export default function Dashboard() {
  const { isConnected, publicKey } = useWalletStore()

  const [balance, setBalance] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [burnAmount, setBurnAmount] = useState("")
  const [isTransferring, setIsTransferring] = useState(false)
  const [isBurning, setIsBurning] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)

  const { toast } = useToast()

  // Memoize fetchBalance to avoid recreating it on every render
  const fetchBalance = useCallback(async () => {
    if (!isConnected) return

    setIsLoading(true)
    try {
      // Mock API call to fetch balance
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setBalance("1000.00")
    } catch (error) {
      console.error("Failed to fetch balance:", error)
      toast({
        title: "Error",
        description: "Failed to fetch token balance",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [isConnected, toast])

  useEffect(() => {
    // Only fetch on initial connection and when not already initialized
    if (isConnected && !hasInitialized) {
      fetchBalance()
      setHasInitialized(true)
    }

    // Reset state when disconnected
    if (!isConnected) {
      setBalance(null)
      setHasInitialized(false)
    }
  }, [isConnected, hasInitialized, fetchBalance])

  const refreshBalance = () => {
    setIsRefreshing(true)
    fetchBalance()
  }

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to transfer tokens",
        variant: "destructive",
      })
      return
    }

    if (!recipient || !amount) {
      toast({
        title: "Invalid Input",
        description: "Please provide both recipient address and amount",
        variant: "destructive",
      })
      return
    }

    setIsTransferring(true)

    try {
      // Mock API call to transfer tokens
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Transfer Successful",
        description: `Transferred ${amount} tokens to ${recipient.substring(0, 8)}...`,
      })

      setRecipient("")
      setAmount("")
      fetchBalance()
    } catch (error) {
      console.error("Failed to transfer tokens:", error)
      toast({
        title: "Transfer Failed",
        description: "Failed to transfer tokens. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsTransferring(false)
    }
  }

  const handleBurn = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to burn tokens",
        variant: "destructive",
      })
      return
    }

    if (!burnAmount) {
      toast({
        title: "Invalid Input",
        description: "Please provide an amount to burn",
        variant: "destructive",
      })
      return
    }

    setIsBurning(true)

    try {
      // Mock API call to burn tokens
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Burn Successful",
        description: `Burned ${burnAmount} tokens`,
      })

      setBurnAmount("")
      fetchBalance()
    } catch (error) {
      console.error("Failed to burn tokens:", error)
      toast({
        title: "Burn Failed",
        description: "Failed to burn tokens. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsBurning(false)
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>
            Please connect your wallet to view your token balance and perform transactions.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Token Balance</CardTitle>
          <Button variant="ghost" size="icon" onClick={refreshBalance} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading balance...</span>
            </div>
          ) : (
            <div>
              <div className="text-3xl font-bold">{balance ? formatTokenAmount(balance) : "0.00"}</div>
              <p className="text-xs text-muted-foreground">TOKEN</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transfer Tokens</CardTitle>
          <CardDescription>Send tokens to another account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTransfer}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input
                  id="recipient"
                  placeholder="G..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <Button className="mt-4 w-full" type="submit" disabled={isTransferring}>
              {isTransferring ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Transferring...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Transfer
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Burn Tokens</CardTitle>
          <CardDescription>Permanently remove tokens from circulation</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBurn}>
            <div className="grid gap-2">
              <Label htmlFor="burnAmount">Amount to Burn</Label>
              <Input
                id="burnAmount"
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={burnAmount}
                onChange={(e) => setBurnAmount(e.target.value)}
              />
            </div>
            <Button className="mt-4 w-full" type="submit" variant="destructive" disabled={isBurning}>
              {isBurning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Burning...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Burn Tokens
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

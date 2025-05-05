"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ArrowDownUp, ArrowUpRight, Loader2, RefreshCw, Trash2 } from "lucide-react"
import { useWalletStore } from "@/lib/stores/wallet-store"
import { formatTokenAmount, truncateAddress, formatDate } from "@/lib/utils"

type Transaction = {
  id: string
  type: "transfer" | "mint" | "burn" | "freeze" | "unfreeze"
  from: string | null
  to: string | null
  amount: string | null
  timestamp: number
}

export default function TransactionHistory() {
  const { isConnected, publicKey } = useWalletStore()

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)

  const { toast } = useToast()

  // Memoize fetchTransactions to avoid recreating it on every render
  const fetchTransactions = useCallback(async () => {
    if (!isConnected) return

    setIsLoading(true)
    try {
      // Mock API call to fetch transactions
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockTransactions: Transaction[] = [
        {
          id: "tx1",
          type: "transfer",
          from: publicKey,
          to: "GDNF5SXZFH6HPYFJVS3WBHYE3QZJMGBPQDSFKJ7XURGPEVPQMKJ7A3S",
          amount: "50.00",
          timestamp: Date.now() - 1000 * 60 * 5,
        },
        {
          id: "tx2",
          type: "mint",
          from: null,
          to: publicKey,
          amount: "1000.00",
          timestamp: Date.now() - 1000 * 60 * 60 * 2,
        },
        {
          id: "tx3",
          type: "burn",
          from: publicKey,
          to: null,
          amount: "25.00",
          timestamp: Date.now() - 1000 * 60 * 60 * 24,
        },
        {
          id: "tx4",
          type: "freeze",
          from: publicKey,
          to: "GBZV3XPQACFVEBFICZPYZLWGDXPQHZMRN4LJDLSIKB3LVPXSQIKVAI7G",
          amount: null,
          timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
        },
      ]

      setTransactions(mockTransactions)
    } catch (error) {
      console.error("Failed to fetch transactions:", error)
      toast({
        title: "Error",
        description: "Failed to fetch transaction history",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [isConnected, publicKey, toast])

  useEffect(() => {
    // Only fetch on initial connection and when not already initialized
    if (isConnected && !hasInitialized) {
      fetchTransactions()
      setHasInitialized(true)
    }

    // Reset state when disconnected
    if (!isConnected) {
      setTransactions([])
      setHasInitialized(false)
    }
  }, [isConnected, hasInitialized, fetchTransactions])

  const refreshTransactions = () => {
    setIsRefreshing(true)
    fetchTransactions()
  }

  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "transfer":
        return <ArrowUpRight className="h-4 w-4" />
      case "mint":
        return <ArrowDownUp className="h-4 w-4" />
      case "burn":
        return <Trash2 className="h-4 w-4" />
      case "freeze":
      case "unfreeze":
        return <RefreshCw className="h-4 w-4" />
      default:
        return <ArrowUpRight className="h-4 w-4" />
    }
  }

  const getTransactionDescription = (tx: Transaction) => {
    switch (tx.type) {
      case "transfer":
        return `Transferred ${formatTokenAmount(tx.amount || "0")} to ${truncateAddress(tx.to || "")}`
      case "mint":
        return `Received ${formatTokenAmount(tx.amount || "0")} from mint`
      case "burn":
        return `Burned ${formatTokenAmount(tx.amount || "0")}`
      case "freeze":
        return `Froze account ${truncateAddress(tx.to || "")}`
      case "unfreeze":
        return `Unfroze account ${truncateAddress(tx.to || "")}`
      default:
        return "Unknown transaction"
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>Please connect your wallet to view your transaction history.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent token transactions</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={refreshTransactions} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-start space-x-4 rounded-md border p-4">
                <div className="rounded-full bg-primary/10 p-2">{getTransactionIcon(tx.type)}</div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium leading-none">{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</p>
                  <p className="text-sm text-muted-foreground">{getTransactionDescription(tx)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatDate(new Date(tx.timestamp))}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

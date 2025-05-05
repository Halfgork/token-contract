"use client"

import { Button } from "@/components/ui/button"
import { Loader2, Wallet } from "lucide-react"
import { truncateAddress } from "@/lib/utils"
import { useWalletStore } from "@/lib/stores/wallet-store"

export default function WalletConnect() {
  // Use the wallet store directly - no local state
  const { isConnected, publicKey, isConnecting, connect, disconnect } = useWalletStore()

  return (
    <div>
      {isConnected ? (
        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-sm text-muted-foreground">{truncateAddress(publicKey)}</span>
          <Button variant="outline" onClick={disconnect}>
            Disconnect
          </Button>
        </div>
      ) : (
        <Button onClick={connect} disabled={isConnecting}>
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </>
          )}
        </Button>
      )}
    </div>
  )
}

"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { toast } from "@/hooks/use-toast"
import { truncateAddress } from "@/lib/utils"

interface WalletState {
  isConnected: boolean
  publicKey: string
  isConnecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      isConnected: false,
      publicKey: "",
      isConnecting: false,

      connect: async () => {
        const { isConnected } = get()

        // Don't connect if already connected
        if (isConnected) return

        set({ isConnecting: true })

        try {
          // Mock connection - in a real app, this would use Freighter or another wallet
          await new Promise((resolve) => setTimeout(resolve, 1500))

          const mockPublicKey = "GBZV3XPQACFVEBFICZPYZLWGDXPQHZMRN4LJDLSIKB3LVPXSQIKVAI7G"

          set({
            isConnected: true,
            publicKey: mockPublicKey,
            isConnecting: false,
          })

          toast({
            title: "Wallet Connected",
            description: `Connected to ${truncateAddress(mockPublicKey)}`,
          })
        } catch (error) {
          console.error("Failed to connect wallet:", error)

          toast({
            title: "Connection Failed",
            description: "Failed to connect to wallet. Please try again.",
            variant: "destructive",
          })

          set({ isConnecting: false })
        }
      },

      disconnect: () => {
        set({
          isConnected: false,
          publicKey: "",
        })

        toast({
          title: "Wallet Disconnected",
          description: "Your wallet has been disconnected.",
        })
      },
    }),
    {
      name: "wallet-storage",
    },
  ),
)

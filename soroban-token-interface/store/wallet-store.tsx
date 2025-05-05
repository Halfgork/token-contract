"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface WalletState {
  isConnected: boolean
  publicKey: string
  setConnected: (isConnected: boolean) => void
  setPublicKey: (publicKey: string) => void
  disconnect: () => void
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      isConnected: false,
      publicKey: "",
      setConnected: (isConnected) => set({ isConnected }),
      setPublicKey: (publicKey) => set({ publicKey }),
      disconnect: () => set({ isConnected: false, publicKey: "" }),
    }),
    {
      name: "wallet-storage",
    },
  ),
)

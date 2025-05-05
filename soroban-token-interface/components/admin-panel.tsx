"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, ShieldAlert, UserCheck, UserX } from "lucide-react"
import { useWalletStore } from "@/lib/stores/wallet-store"

export default function AdminPanel() {
  const { isConnected, publicKey } = useWalletStore((state) => ({
    isConnected: state.isConnected,
    publicKey: state.publicKey,
  }))

  const [mintAddress, setMintAddress] = useState("")
  const [mintAmount, setMintAmount] = useState("")
  const [isMinting, setIsMinting] = useState(false)

  const [accountAddress, setAccountAddress] = useState("")
  const [isFrozen, setIsFrozen] = useState(false)
  const [isUpdatingAccount, setIsUpdatingAccount] = useState(false)

  const [adminAddress, setAdminAddress] = useState("")
  const [isAddingAdmin, setIsAddingAdmin] = useState(false)

  const { toast } = useToast()

  // Mock function to check if the connected wallet is an admin
  const isAdmin = () => {
    // In a real implementation, you would check if the connected wallet is an admin
    // For this demo, we'll assume the connected wallet is an admin
    return isConnected
  }

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to mint tokens",
        variant: "destructive",
      })
      return
    }

    if (!isAdmin()) {
      toast({
        title: "Unauthorized",
        description: "Only admins can mint tokens",
        variant: "destructive",
      })
      return
    }

    if (!mintAddress || !mintAmount) {
      toast({
        title: "Invalid Input",
        description: "Please provide both recipient address and amount",
        variant: "destructive",
      })
      return
    }

    setIsMinting(true)

    try {
      // Mock API call to mint tokens
      setTimeout(() => {
        toast({
          title: "Mint Successful",
          description: `Minted ${mintAmount} tokens to ${mintAddress.substring(0, 8)}...`,
        })
        setMintAddress("")
        setMintAmount("")
        setIsMinting(false)
      }, 2000)
    } catch (error) {
      console.error("Failed to mint tokens:", error)
      toast({
        title: "Mint Failed",
        description: "Failed to mint tokens. Please try again.",
        variant: "destructive",
      })
      setIsMinting(false)
    }
  }

  const handleAccountUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to update account status",
        variant: "destructive",
      })
      return
    }

    if (!isAdmin()) {
      toast({
        title: "Unauthorized",
        description: "Only admins can update account status",
        variant: "destructive",
      })
      return
    }

    if (!accountAddress) {
      toast({
        title: "Invalid Input",
        description: "Please provide an account address",
        variant: "destructive",
      })
      return
    }

    setIsUpdatingAccount(true)

    try {
      // Mock API call to update account status
      setTimeout(() => {
        toast({
          title: "Account Updated",
          description: `Account ${accountAddress.substring(0, 8)}... is now ${isFrozen ? "frozen" : "unfrozen"}`,
        })
        setIsUpdatingAccount(false)
      }, 2000)
    } catch (error) {
      console.error("Failed to update account status:", error)
      toast({
        title: "Update Failed",
        description: "Failed to update account status. Please try again.",
        variant: "destructive",
      })
      setIsUpdatingAccount(false)
    }
  }

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to add an admin",
        variant: "destructive",
      })
      return
    }

    if (!isAdmin()) {
      toast({
        title: "Unauthorized",
        description: "Only admins can add other admins",
        variant: "destructive",
      })
      return
    }

    if (!adminAddress) {
      toast({
        title: "Invalid Input",
        description: "Please provide an admin address",
        variant: "destructive",
      })
      return
    }

    setIsAddingAdmin(true)

    try {
      // Mock API call to add admin
      setTimeout(() => {
        toast({
          title: "Admin Added",
          description: `${adminAddress.substring(0, 8)}... is now an admin`,
        })
        setAdminAddress("")
        setIsAddingAdmin(false)
      }, 2000)
    } catch (error) {
      console.error("Failed to add admin:", error)
      toast({
        title: "Failed to Add Admin",
        description: "Failed to add admin. Please try again.",
        variant: "destructive",
      })
      setIsAddingAdmin(false)
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>Please connect your wallet to access admin functions.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (!isAdmin()) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Unauthorized</CardTitle>
          <CardDescription>You do not have admin privileges to access this section.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Mint Tokens</CardTitle>
          <CardDescription>Create new tokens and assign them to an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleMint}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="mintAddress">Recipient Address</Label>
                <Input
                  id="mintAddress"
                  placeholder="G..."
                  value={mintAddress}
                  onChange={(e) => setMintAddress(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mintAmount">Amount</Label>
                <Input
                  id="mintAmount"
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                />
              </div>
            </div>
            <Button className="mt-4 w-full" type="submit" disabled={isMinting}>
              {isMinting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Minting...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Mint Tokens
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Management</CardTitle>
          <CardDescription>Freeze or unfreeze accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAccountUpdate}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="accountAddress">Account Address</Label>
                <Input
                  id="accountAddress"
                  placeholder="G..."
                  value={accountAddress}
                  onChange={(e) => setAccountAddress(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="freeze-account" checked={isFrozen} onCheckedChange={setIsFrozen} />
                <Label htmlFor="freeze-account">Freeze Account</Label>
              </div>
            </div>
            <Button className="mt-4 w-full" type="submit" disabled={isUpdatingAccount}>
              {isUpdatingAccount ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  {isFrozen ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
                  {isFrozen ? "Freeze Account" : "Unfreeze Account"}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admin Management</CardTitle>
          <CardDescription>Add new admin accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddAdmin}>
            <div className="grid gap-2">
              <Label htmlFor="adminAddress">New Admin Address</Label>
              <Input
                id="adminAddress"
                placeholder="G..."
                value={adminAddress}
                onChange={(e) => setAdminAddress(e.target.value)}
              />
            </div>
            <Button className="mt-4 w-full" type="submit" disabled={isAddingAdmin}>
              {isAddingAdmin ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Admin...
                </>
              ) : (
                <>
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  Add Admin
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

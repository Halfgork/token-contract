import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Dashboard from "@/components/dashboard"
import AdminPanel from "@/components/admin-panel"
import TransactionHistory from "@/components/transaction-history"
import WalletConnect from "@/components/wallet-connect"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Token Interface</h1>
            </div>
            <WalletConnect />
          </div>
        </header>
        <div className="container py-6">
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="admin">Admin Panel</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="space-y-4">
              <Suspense fallback={<DashboardSkeleton />}>
                <Dashboard />
              </Suspense>
            </TabsContent>
            <TabsContent value="admin" className="space-y-4">
              <Suspense fallback={<AdminPanelSkeleton />}>
                <AdminPanel />
              </Suspense>
            </TabsContent>
            <TabsContent value="history" className="space-y-4">
              <Suspense fallback={<TransactionHistorySkeleton />}>
                <TransactionHistory />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Token Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-[120px]" />
          <Skeleton className="mt-2 h-4 w-[80px]" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Transfer Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AdminPanelSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Mint Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Account Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TransactionHistorySkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

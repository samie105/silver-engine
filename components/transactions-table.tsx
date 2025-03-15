"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Search, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TransactionsSkeleton } from "@/components/transactions-skeleton"
import { fetchDashboardData, type UserTransaction } from "@/lib/api-service"

type SortField = "message" | "date"
type SortDirection = "asc" | "desc"

export function TransactionsTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<UserTransaction[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchDashboardData()
        if (data && data.user && data.user[0] && data.user[0].transactions) {
          setTransactions(data.user[0].transactions)
        } else {
          // If no transactions are found, set an empty array
          setTransactions([])
        }
      } catch (err) {
        console.error("Error loading transactions:", err)
        setError("Failed to load transactions. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadTransactions()
  }, [])

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(transaction.date).toISOString().includes(searchTerm),
  )

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortField === "date") {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    } else {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1
      } else {
        return a[sortField] < b[sortField] ? 1 : -1
      }
    }
  })

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  if (isLoading) {
    return <TransactionsSkeleton />
  }

  if (error) {
    return (
      <div className="rounded-md border p-6 text-center">
        <h2 className="text-xl font-semibold text-red-500 mb-2">Error</h2>
        <p>{error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search transactions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filter by Year
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSearchTerm("")}>All Years</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm("2023")}>2023</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm("2022")}>2022</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">
                <button className="flex items-center" onClick={() => handleSort("message")}>
                  Description
                  {sortField === "message" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </TableHead>
              <TableHead className="w-[50%]">
                <button className="flex items-center" onClick={() => handleSort("date")}>
                  Date
                  {sortField === "date" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.length > 0 ? (
              sortedTransactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4 text-green-500" />
                      <span>{transaction.message}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="h-24 text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


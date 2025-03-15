"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Search, FileIcon as FilePdf, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DocumentsSkeleton } from "@/components/documents-skeleton"

// Sample document data
const documents = [
  {
    id: 1,
    name: "Annual Report",
    type: "Agreement",
    year: "2023",
    shared: "2023-12-15",
  },
  {
    id: 2,
    name: "Tax Statement",
    type: "Agreement",
    year: "2023",
    shared: "2023-02-28",
  },
  {
    id: 3,
    name: "Investment Summary",
    type: "Agreement",
    year: "2023",
    shared: "2023-06-10",
  },
  {
    id: 4,
    name: "Property Acquisition",
    type: "Agreement",
    year: "2022",
    shared: "2022-09-05",
  },
  {
    id: 5,
    name: "Quarterly Report Q4",
    type: "Agreement",
    year: "2022",
    shared: "2022-12-31",
  },
  {
    id: 6,
    name: "Quarterly Report Q3",
    type: "Agreement",
    year: "2022",
    shared: "2022-09-30",
  },
  {
    id: 7,
    name: "Quarterly Report Q2",
    type: "Agreement",
    year: "2022",
    shared: "2022-06-30",
  },
  {
    id: 8,
    name: "Quarterly Report Q1",
    type: "Agreement",
    year: "2022",
    shared: "2022-03-31",
  },
  {
    id: 9,
    name: "Investment Performance",
    type: "Agreement",
    year: "2022",
    shared: "2022-07-15",
  },
  {
    id: 10,
    name: "Tax Documents",
    type: "Agreement",
    year: "2022",
    shared: "2022-02-15",
  },
]

type SortField = "name" | "type" | "year" | "shared"
type SortDirection = "asc" | "desc"

export function DocumentsTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("shared")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.year.includes(searchTerm),
  )

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1
    } else {
      return a[sortField] < b[sortField] ? 1 : -1
    }
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const handleDownload = (id: number, name: string) => {
    // In a real application, this would trigger a file download
    console.log(`Downloading document: ${name} (ID: ${id})`)
    alert(`Downloading ${name}...`)
  }

  if (isLoading) {
    return <DocumentsSkeleton />
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
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
              <TableHead className="w-[40%]">
                <button className="flex items-center" onClick={() => handleSort("name")}>
                  Name
                  {sortField === "name" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <button className="flex items-center" onClick={() => handleSort("type")}>
                  Type
                  {sortField === "type" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </TableHead>
              <TableHead className="hidden sm:table-cell">
                <button className="flex items-center" onClick={() => handleSort("year")}>
                  Year
                  {sortField === "year" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <button className="flex items-center" onClick={() => handleSort("shared")}>
                  Shared
                  {sortField === "shared" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDocuments.length > 0 ? (
              sortedDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FilePdf className="h-4 w-4 text-red-500" />
                      <span>{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{doc.type}</TableCell>
                  <TableCell className="hidden sm:table-cell">{doc.year}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(doc.shared)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(doc.id, doc.name)}
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No documents found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


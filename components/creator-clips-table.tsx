"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Play } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"



// Define the type for our clip data
type Clip = {
  id: string
  title: string
  thumbnail: string
  views: number
  likes: number
  comments: number
  shares: number
  earnings: number
  uploadDate: string
}

// Sample data
const data: Clip[] = [
  {
    id: "1",
    title: "Epic battle scene finale",
    thumbnail: "/placeholder.svg?height=1920&width=1080",
    views: 125000,
    likes: 85000,
    comments: 1200,
    shares: 3500,
    earnings: 1250.89,
    uploadDate: "2025-03-01",
  },
  {
    id: "2",
    title: "Emotional reunion moment",
    thumbnail: "/placeholder.svg?height=1920&width=1080",
    views: 89000,
    likes: 67000,
    comments: 950,
    shares: 2800,
    earnings: 890.45,
    uploadDate: "2025-02-15",
  },
  {
    id: "3",
    title: "Suspenseful plot twist",
    thumbnail: "/placeholder.svg?height=1920&width=1080",
    views: 67500,
    likes: 54000,
    comments: 820,
    shares: 1900,
    earnings: 675.2,
    uploadDate: "2025-02-10",
  },
  {
    id: "4",
    title: "Hilarious comedy scene",
    thumbnail: "/placeholder.svg?height=1920&width=1080",
    views: 112000,
    likes: 92000,
    comments: 1500,
    shares: 4200,
    earnings: 1120.75,
    uploadDate: "2025-01-28",
  },
  {
    id: "5",
    title: "Dramatic character monologue",
    thumbnail: "/placeholder.svg?height=1920&width=1080",
    views: 78000,
    likes: 63000,
    comments: 920,
    shares: 2100,
    earnings: 780.3,
    uploadDate: "2025-01-20",
  },
]

export function CreatorClipsTable() {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns: ColumnDef<Clip>[] = [
    {
      accessorKey: "thumbnail",
      header: "Clip",
      cell: ({ row }) => {
        const clip = row.original
        return (
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-20 overflow-hidden rounded">
              <Image src={clip.thumbnail || "/placeholder.svg"} alt={clip.title} fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                <Play className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="font-medium line-clamp-2 text-sm">{clip.title}</div>
          </div>
        )
      },
    },
    {
      accessorKey: "views",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Views
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const views = Number.parseInt(row.getValue("views"))
        const formatted = new Intl.NumberFormat().format(views)
        return <div className="text-right">{formatted}</div>
      },
    },
    {
      accessorKey: "likes",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Likes
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const likes = Number.parseInt(row.getValue("likes"))
        const formatted = new Intl.NumberFormat().format(likes)
        return <div className="text-right">{formatted}</div>
      },
    },
    {
      accessorKey: "earnings",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Earnings
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("earnings"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const clip = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={`/clips/${clip.id}`} className="w-full">
                  View Clip
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>View Analytics</DropdownMenuItem>
              <DropdownMenuItem>Edit Clip</DropdownMenuItem>
              <DropdownMenuItem>Delete Clip</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}


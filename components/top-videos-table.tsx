"use client"
import Image from "next/image"
import Link from "next/link"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Define the type for our video data
type Video = {
  id: string
  title: string
  thumbnail: string
  views: number
  earnings: number
  uploadDate: string
}

// Sample data
const data: Video[] = [
  {
    id: "1",
    title: "The Art of Filmmaking: Advanced Techniques",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    views: 125000,
    earnings: 1250.89,
    uploadDate: "2025-03-01",
  },
  {
    id: "2",
    title: "Travel Vlog: Exploring Japan",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    views: 89000,
    earnings: 890.45,
    uploadDate: "2025-02-15",
  },
  {
    id: "3",
    title: "Cooking Masterclass: Italian Cuisine",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    views: 67500,
    earnings: 675.2,
    uploadDate: "2025-02-10",
  },
  {
    id: "4",
    title: "Tech Review: Latest Gadgets",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    views: 112000,
    earnings: 1120.75,
    uploadDate: "2025-01-28",
  },
  {
    id: "5",
    title: "Fitness Routine for Beginners",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    views: 78000,
    earnings: 780.3,
    uploadDate: "2025-01-20",
  },
]

export function TopVideosTable() {
  const columns: ColumnDef<Video>[] = [
    {
      accessorKey: "thumbnail",
      header: "Video",
      cell: ({ row }) => {
        const video = row.original
        return (
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-9 overflow-hidden rounded">
              <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
            </div>
            <div className="font-medium line-clamp-1">{video.title}</div>
          </div>
        )
      },
    },
    {
      accessorKey: "views",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Views
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const views = Number.parseInt(row.getValue("views"))
        const formatted = new Intl.NumberFormat().format(views)
        return <div>{formatted}</div>
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
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "uploadDate",
      header: "Upload Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("uploadDate"))
        const formatted = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }).format(date)
        return <div>{formatted}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const video = row.original
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
                <Link href={`/video/${video.id}`} className="w-full">
                  View Video
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>View Analytics</DropdownMenuItem>
              <DropdownMenuItem>Edit Video</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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


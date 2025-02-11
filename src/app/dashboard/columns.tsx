"use client"

import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "keys.0",
    header: "Query",
  },
  {
    accessorKey: "keys.1",
    header: "Page",
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    accessorKey: "impressions",
    header: "Impressions",
  },
  {
    accessorKey: "ctr",
    header: "CTR",
    cell: ({ row }) => {
      const value = row.getValue("ctr") as number
      return `${(value * 100).toFixed(2)}%`
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => {
      const value = row.getValue("position") as number
      return value.toFixed(1)
    },
  },
]

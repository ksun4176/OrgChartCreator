"use client"

import { Team } from "@/lib/types"
import { createColumnHelper } from "@tanstack/react-table"

const columnHelper = createColumnHelper<Team>();
export const teamTableColumns = [
  columnHelper.accessor("name", {
    cell: info => info.getValue(),
    header: () => <span>Name</span>
  }),
  columnHelper.accessor("type", {
    cell: info => info.getValue().name,
    header: () => <span>Type</span>,
    filterFn: 'includesString'
  }),
  columnHelper.accessor("parent", {
    cell: info => info.getValue()?.name ?? '',
    header: () => <span>Belongs To</span>,
  }),
  columnHelper.accessor("children", {
    cell: info => info.getValue().length,
    header: () => <span>Teams</span>,
  }),
  columnHelper.accessor("members", {
    cell: info => info.getValue().length,
    header: () => <span>Members</span>,
  }),
]
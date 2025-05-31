"use client"

import { membersColumns } from "./columns";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useFetchMembers } from "@/lib/hooks/useFetchMembers";
import { DataTable } from "@/components/data-table";
import { MemberTableButton } from "./member-table-button";

export function MemberTable() {
  const { members, membersLoading } = useFetchMembers();

  const table = useReactTable({
    data: members,
    columns: membersColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (membersLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex">
        <div className="flex-1" />
        <MemberTableButton />
      </div>
      <DataTable table={table} />
    </div>
  )
}
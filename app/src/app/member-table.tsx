"use client"

import { membersColumns } from "./columns";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useFetchMembers } from "@/lib/hooks/useFetchMembers";
import { DataTable } from "@/components/data-table";
import { MemberTableButton } from "./member-table-button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function MemberTable() {
  const [numAdded, setNumAdded] = useState(0);
  const { members, membersLoading } = useFetchMembers(numAdded);
  const router = useRouter();

  const table = useReactTable({
    data: members,
    columns: membersColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onRowClicked = (rowId: string) => {
    router.push(`/members/${table.getRow(rowId).original.id}`);
  }

  if (membersLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex">
        <div className="flex-1" />
        <MemberTableButton setNumAdded={setNumAdded} />
      </div>
      <DataTable table={table} onRowClicked={onRowClicked} />
    </div>
  )
}
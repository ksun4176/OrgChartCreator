import { GetMembersObj, GetTeamsObj } from "@/lib/types"
import { createColumnHelper } from "@tanstack/react-table"

const teamsColumnHelper = createColumnHelper<GetTeamsObj>();
export const teamsColumns = [
  teamsColumnHelper.accessor("name", {
    cell: info => info.getValue(),
    header: () => <span>Name</span>
  }),
  teamsColumnHelper.accessor("type", {
    cell: info => info.getValue().name,
    header: () => <span>Type</span>,
  }),
  teamsColumnHelper.accessor("parent", {
    cell: info => info.getValue()?.name ?? '',
    header: () => <span>Belongs To</span>,
  }),
  teamsColumnHelper.accessor("children", {
    cell: info => info.getValue().length,
    header: () => <span># of Teams Under</span>,
  }),
  teamsColumnHelper.accessor("members", {
    cell: info => info.getValue().length,
    header: () => <span># of Members</span>,
  }),
]

const membersColumnHelper = createColumnHelper<GetMembersObj>();
export const membersColumns = [
  membersColumnHelper.accessor("firstName", {
    cell: info => info.getValue(),
    header: () => <span>First Name</span>
  }),
  membersColumnHelper.accessor("lastName", {
    cell: info => info.getValue(),
    header: () => <span>Last Name</span>,
  }),
  membersColumnHelper.accessor("email", {
    cell: info => info.getValue(),
    header: () => <span>Email</span>,
  }),
]
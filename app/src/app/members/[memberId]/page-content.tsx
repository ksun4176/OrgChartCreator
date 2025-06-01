"use client"

import { Separator } from "@/components/ui/separator";
import { TeamList } from "./team-list";
import { useFetchMember } from "@/lib/hooks/useFetchMember";
import { EditMemberButton } from "./edit-member-button";
import { MemberReport } from "./member-report";

interface PageContentProps {
  memberId: number
}
export default function PageContent(props: PageContentProps) {
  const { memberId } = props;
  const { member, memberLoading } = useFetchMember(memberId);

  if (memberLoading || !member) {
    return <div>Loading...</div>
  }

  return (
    <div className="px-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-1 flex flex-col">
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold">{`${member.firstName} ${member.lastName}`}</h1>
            <EditMemberButton member={member} />
          </div>
          <div>{`Email: ${member.email}`}</div>
        </div>
        <Separator className="my-2 pt-1"/>
        <div className="flex flex-col gap-8">
          <div>
            <TeamList assignments={member.teams} />
          </div>
          <MemberReport member={member} />
        </div>
      </main>
    </div>
  )
}
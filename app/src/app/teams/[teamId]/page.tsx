import { getTeam } from "@/lib/apis";
import { MemberList } from "./member-list";
import { Separator } from "@/components/ui/separator";
import { TeamList } from "./team-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EditTeamButton } from "./edit-team-button";

interface TeamPageProps {
  params: Promise<{ teamId: number }>
}
export default async function TeamPage(props: TeamPageProps) {
  const { teamId } = await props.params;
  const team = (await getTeam(teamId)).data;
  return (
    <div className="px-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-1 flex flex-col">
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold">{team.name}</h1>
            <EditTeamButton team={team} />
          </div>
          <div>{`Type: ${team.type.name}`}</div>

          <div>
            {`Belongs To: `}
            {team.parent ? 
              <Button variant="link" className="text-link p-0 h-auto text-base">
                <Link href={`/teams/${team.parent.id}`}>{team.parent.name}</Link> 
              </Button>
              : `None`
            }
          </div>
        </div>
        <Separator className="my-2 pt-1"/>
        <div className="grid grid-cols-[1fr_8_1fr] gap-2">
          <div>
            <MemberList team={team} />
          </div>
          <Separator orientation="vertical" className="pl-1" />
          <div>
            <TeamList teams={team.children} />
          </div>
        </div>
        <div>
          <h2 className="text-xl">Report</h2>
          <div className="border-4 border-solid flex items-center justify-center text-lg min-h-160">{`Some Reports About ${team.name}`}</div>
        </div>
      </main>
    </div>
  )
}
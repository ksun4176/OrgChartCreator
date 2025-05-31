import { getTeam } from "@/lib/apis";
import { MemberList } from "./member-list";
import { Separator } from "@/components/ui/separator";
import { TeamList } from "./team-list";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface TeamPageProps {
  params: Promise<{ teamId: number }>
}
export default async function TeamPage(props: TeamPageProps) {
  const { teamId } = await props.params;
  const team = (await getTeam(teamId)).data;
  
  return (
    <div className="grid grid-rows-[60px_1fr_20px] min-h-screen px-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 flex flex-wrap items-center">
        <h1 className="text-2xl font-semibold">{team.name}</h1>
        <Button variant="ghost" size="icon">
          <Pencil />
        </Button>
        <Separator />
      </header>
      <main className="row-start-2 flex flex-col gap-8">
        <div className="flex">
          <div className="flex-1">
            <MemberList members={team.members} />
          </div>
          <Separator orientation="vertical" className="mx-2" />
          <div className="flex-1">
            <TeamList teams={team.children} />
          </div>
        </div>
        <div>
          <h2 className="text-xl">Report</h2>
          <div className="border-1 border-solid flex items-center justify-center text-lg min-h-160">{`Some Reports About ${team.name}`}</div>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center">
      </footer>
    </div>
  )
}
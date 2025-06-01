import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemberTable } from "./member-table";
import { TeamTable } from "./team-table";

enum HomeTabs {
  Teams = 'teams',
  Members = 'members'
}

export default function Home() {
  return (
    <div className="p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2">
        <Tabs defaultValue={HomeTabs.Teams}>
          <TabsList>
            <TabsTrigger value={HomeTabs.Teams}>Teams</TabsTrigger>
            <TabsTrigger value={HomeTabs.Members}>Members</TabsTrigger>
          </TabsList>
          <TabsContent value={HomeTabs.Teams}>
            <TeamTable />
          </TabsContent>
          <TabsContent value={HomeTabs.Members}>
            <MemberTable />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

import { MemberTable } from "./member-table";
import { TeamTable } from "./team-table";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 flex flex-col gap-8">
        <TeamTable />
        <MemberTable />
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}

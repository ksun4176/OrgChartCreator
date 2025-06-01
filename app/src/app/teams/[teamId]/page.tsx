import PageContent from "./page-content";

interface TeamPageProps {
  params: Promise<{ teamId: number }>
}
export default async function TeamPage(props: TeamPageProps) {
  const { teamId } = await props.params;
  return <PageContent teamId={teamId}/>;
}
import PageContent from "./page-content";

interface MemberPageProps {
  params: Promise<{ memberId: number }>
}
export default async function MemberPage(props: MemberPageProps) {
  const { memberId } = await props.params;
  return <PageContent memberId={memberId}/>;
}
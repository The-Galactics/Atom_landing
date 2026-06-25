import DocsView from "@/components/docs/DocsView";

export const metadata = {
  title: "Atom — Docs",
  description:
    "Atom is an advanced ecosystem designed to simplify interaction with mobile devices by automating complex workflows through natural language.",
};

export default async function DocsPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section } = await searchParams;
  return <DocsView initialSection={section} />;
}

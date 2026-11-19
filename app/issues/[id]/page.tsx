import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IssueView } from "@/components/newsletter-views";
import { neighbours } from "@/components/reader-shell";
import { ISSUES } from "@/lib/newsletter";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return ISSUES.map((issue) => ({ id: issue.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const issue = ISSUES.find((entry) => entry.id === id);
  if (!issue) return {};
  return { title: `${issue.title} | The Letter`, description: issue.dek, alternates: { canonical: `/issues/${issue.id}` } };
}

export default async function IssuePage({ params }: Props) {
  const { id } = await params;
  const index = ISSUES.findIndex((entry) => entry.id === id);
  if (index < 0) notFound();
  const { previous, next } = neighbours(ISSUES, index);
  return <IssueView issue={ISSUES[index]} previous={previous} next={next} />;
}

import type { MetadataRoute } from "next";
import { SITE } from "@/components/newsletter-views";
import { ISSUES } from "@/lib/newsletter";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/`, changeFrequency: "monthly", priority: 1 },
    ...ISSUES.map((issue) => ({ url: `${SITE}/issues/${issue.id}`, lastModified: issue.published, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}

import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/projets", priority: 0.9 },
    { path: "/cv", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
  ];

  return [
    ...pages.map(({ path, priority }) => ({ url: `${siteUrl}${path}`, changeFrequency: "monthly" as const, priority })),
    ...projects.map((project) => ({
      url: `${siteUrl}/projets/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}

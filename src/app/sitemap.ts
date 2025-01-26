import { MetadataRoute } from "next";
import { getWords } from "./words";
import { promises as fs } from "fs";
import path from "path";

export const revalidate = 3600; // revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const timestamp = new Date().toISOString();
  console.log(`[Sitemap] Generating sitemap at ${timestamp}`);

  const words = await getWords();
  const baseUrl = "https://www.watbetekent.be";

  // Create debug file
  if (process.env.NODE_ENV === "development") {
    const debugPath = path.join(process.cwd(), "public", "sitemap-debug.txt");
    await fs.writeFile(
      debugPath,
      `Last generated: ${timestamp}\nTotal words: ${words.length}`
    );
  }
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/woorden`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  const wordUrls = words.map((word) => ({
    url: `${baseUrl}/woorden/${word.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...wordUrls];
}

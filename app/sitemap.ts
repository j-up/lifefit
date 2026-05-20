import { MetadataRoute } from "next";
import { posts } from "@/app/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  // 블로그 포스트 동적 라우팅
  const postRoutes = posts.map((post) => ({
    url: `https://lifefit.kr/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://lifefit.kr",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://lifefit.kr/tools/njob-tax",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lifefit.kr/tools/short-work",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lifefit.kr/tools/short-work/parking",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://lifefit.kr/tools/fit-youth",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lifefit.kr/tools/fit-youth/banks",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://lifefit.kr/tools/car-bond",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lifefit.kr/tools/savings-plan",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lifefit.kr/tools/tax-calculator",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...postRoutes,
  ];
}

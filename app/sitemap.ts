import { MetadataRoute } from "next";
import { posts as staticPosts } from "@/app/data/posts";

async function getDbPosts() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  try {
    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/posts?select=slug,date`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        next: { revalidate: 3600 }, // Sitemap can be cached longer
      }
    );

    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Sitemap DB fetch error:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dbPosts = await getDbPosts();

  // Merge static and dynamic posts, unique by slug
  const allPostsMap = new Map();
  staticPosts.forEach(p => allPostsMap.set(p.slug, p));
  dbPosts.forEach((p: any) => allPostsMap.set(p.slug, p));

  const allPosts = Array.from(allPostsMap.values());

  // 블로그 포스트 동적 라우팅
  const postRoutes = allPosts.map((post) => ({
    url: `https://lifefit.kr/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://lifefit.kr/",
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
      url: "https://lifefit.kr/tools/parking",
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
    {
      url: "https://lifefit.kr/tools/future-savings",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lifefit.kr/tools/child-tax-benefit",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lifefit.kr/tools/kpass-climate",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...postRoutes,
  ];
}

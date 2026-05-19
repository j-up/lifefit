import { posts } from "@/app/data/posts";

export async function GET() {
  const siteUrl = "https://lifefit.kr";

  const rssItems = posts
    .map((post) => {
      const url = `${siteUrl}/posts/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();

      // 네이버 서치어드바이저 권장사항에 따라 본문 전체를 CDATA로 감싸서 description에 포함
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <description><![CDATA[${post.content}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid>${url}</guid>
    </item>`;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>LifeFit</title>
    <link>${siteUrl}</link>
    <description>내 삶에 딱 맞는 맞춤형 정부지원금 &amp; 복지 가이드</description>
${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}

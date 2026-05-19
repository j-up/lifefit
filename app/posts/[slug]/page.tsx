import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { posts } from "@/app/data/posts";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function getOgImageUrl(imageUrl: string): string {
  // Unsplash URL을 1200×630 OG 최적화 크기로 변환
  if (imageUrl.includes("images.unsplash.com")) {
    const url = new URL(imageUrl);
    url.searchParams.set("w", "1200");
    url.searchParams.set("h", "630");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("q", "80");
    return url.toString();
  }
  return imageUrl;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "페이지를 찾을 수 없습니다 | LifeFit",
      robots: { index: false },
    };
  }

  const ogImage = getOgImageUrl(post.image);

  return {
    title: post.title,
    description: post.summary,
    keywords: `${post.category}, 2026 정책, 정부 지원, 복지 정보, LifeFit`,
    alternates: {
      canonical: `https://lifefit.kr/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://lifefit.kr/posts/${post.slug}`,
      siteName: "LifeFit",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "ko_KR",
      type: "article",
      publishedTime: post.date,
      authors: ["LifeFit"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [ogImage],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    image: getOgImageUrl(post.image),
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "LifeFit",
      url: "https://lifefit.kr",
    },
    publisher: {
      "@type": "Organization",
      name: "LifeFit",
      logo: {
        "@type": "ImageObject",
        url: "https://lifefit.kr/favicon.ico",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://lifefit.kr/posts/${post.slug}`,
    },
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: "https://lifefit.kr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "최신 정보 및 가이드",
        item: "https://lifefit.kr/#guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://lifefit.kr/posts/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* JSON-LD: Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-xl font-bold text-blue-600">
            LifeFit
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <Link href="/tools/short-work" className="hover:text-blue-600">
              육아수당 계산기
            </Link>
            <Link href="/tools/fit-youth" className="hover:text-blue-600">
              월세지원 계산기
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {/* Featured Image */}
          <div className="relative h-56 sm:h-72">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur-sm">
              {post.category}
            </span>
          </div>

          <div className="p-6 sm:p-10">
            {/* Meta */}
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <time dateTime={post.date}>{post.date}</time>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <span>{post.readTime} 소요</span>
            </div>

            {/* Title */}
            <h1 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              {post.title}
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:text-lg">
              {post.summary}
            </p>

            {/* Body */}
            <div
              className="prose prose-blue mt-8 max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Back link */}
            <div className="mt-12 border-t border-gray-100 pt-8">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                <svg
                  className="mr-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                목록으로 돌아가기
              </Link>
            </div>
          </div>
        </article>

      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <p className="text-center text-sm text-gray-400">
            © 2026 LifeFit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

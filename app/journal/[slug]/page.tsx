import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import BlogPost from "@/components/shared/BlogPost";
import { blogs, getBlogBySlug } from "@/constants/blogs";
import { SITE_NAME, SITE_URL, X_HANDLE } from "@/constants/site";

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};

  const url = `/journal/${post.slug}`;
  const images = post.coverImage?.src ? [{ url: post.coverImage.src, alt: post.coverImage.alt }] : undefined;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      locale: "en_US",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [SITE_NAME],
      tags: post.tags,
      ...(images && { images }),
    },
    twitter: { card: "summary_large_image", creator: X_HANDLE, title: post.title, description: post.excerpt, ...(images && { images }) },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) notFound();

  // the article itself, for search engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    url: `${SITE_URL}/journal/${post.slug}`,
    mainEntityOfPage: `${SITE_URL}/journal/${post.slug}`,
    keywords: post.tags.join(", "),
    ...(post.coverImage?.src && { image: post.coverImage.src }),
    author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: SITE_NAME, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <BlogPost post={post} />
    </main>
  );
}

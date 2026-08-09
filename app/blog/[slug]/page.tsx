import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import BlogPost from "@/components/shared/BlogPost";
import { blogs, getBlogBySlug } from "@/constants/blogs";

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Somkene Ojukwu`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) notFound();

  return (
    <main>
      <Navbar />
      <BlogPost post={post} />
    </main>
  );
}

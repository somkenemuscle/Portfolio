import Navbar from "@/components/shared/Navbar";
import BlogList from "@/components/shared/BlogList";
import BlogComingSoon from "@/components/shared/BlogComingSoon";
import { blogs } from "@/constants/blogs";

export const metadata = {
  title: "Blog — Somkene Ojukwu",
  description: "Writing about engineering, building products, and the occasional creative tangent.",
};

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      {blogs.length > 0 ? <BlogList /> : <BlogComingSoon />}
    </main>
  );
}

import Navbar from "@/components/shared/Navbar";
import BlogComingSoon from "@/components/shared/BlogComingSoon";

export const metadata = {
  title: "Blog — Somkene Ojukwu",
  description: "Writing about engineering, building products, and the occasional creative tangent.",
};

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      <BlogComingSoon />
    </main>
  );
}

import type { Metadata } from "next";
import { pageMeta } from "@/constants/site";
import Navbar from "@/components/shared/Navbar";
import BlogList from "@/components/shared/BlogList";
import BlogComingSoon from "@/components/shared/BlogComingSoon";
import { blogs } from "@/constants/blogs";

export const metadata: Metadata = pageMeta({
  title: "Journal",
  description:
    "Notes from the build by Somkene Ojukwu: engineering decisions, system design, things I got wrong and the occasional creative tangent.",
  path: "/journal",
});

export default function JournalPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      {blogs.length > 0 ? <BlogList /> : <BlogComingSoon />}
    </main>
  );
}

import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import "../../styles/underline.css";

export default function BlogPage() {
  const posts = getAllPosts("posts");

  return (
    <div className="mt-15 max-w-4xl mx-auto">
      <h1 className="text-3xl font-medium mb-4">
        All Posts<span className="text-[#fe8019]">.</span>
      </h1>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.frontmatter.slug}
            className="flex flex-col items-end md:items-center gap-2 md:flex-row md:gap-5 text-lg"
          >
            <p className="text-[#999]">{post.frontmatter.date}</p>
            <Link
              href={`/posts/${post.frontmatter.slug}`}
              className="linkWithUnderline"
            >
              <span className="text-[var(--accent)]">#</span>{" "}
              <span className="font-medium">{post.frontmatter.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

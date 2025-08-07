import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllPosts("posts");

  return (
    <div className="mt-20 max-w-4xl mx-auto">
      <h2 className="text-3xl font-medium mb-4">Posts<span className="text-[#fe8019]">.</span> </h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.frontmatter.slug}>
            <Link className="text-xl" href={`/posts/${post.frontmatter.slug}`}>
            <span className="text-[#a89984]">{post.frontmatter.date}</span> <span>#</span> <span>{post.frontmatter.title}</span>
              {/* <div className="text-xl font-semibold">{post.frontmatter.title}</div>
              <div className="text-sm text-gray-500">{post.frontmatter.date}</div> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

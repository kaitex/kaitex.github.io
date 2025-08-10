import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllPosts("posts");

  return (
    <div className="mt-20 max-w-4xl mx-auto">
      <h2 className="font-medium mb-4">All Posts<span className="text-[#fe8019]">.</span> </h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.frontmatter.slug}>
            <Link className="group" href={`/posts/${post.frontmatter.slug}`}>
              <span className="text-[#a89984]">{post.frontmatter.date}</span>  <span className="group-hover:underline">{post.frontmatter.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

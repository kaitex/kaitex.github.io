import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllPosts("posts");

  return (
    <div className="mt-20 max-w-4xl mx-auto">
      <h2 className="text-2xl font-medium mb-4">All Posts<span className="text-[#fe8019]">.</span> </h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li className="flex flex-col  gap-3 md:flex-row md:gap-5 text-lg" key={post.frontmatter.slug}>
           
            <p className="text-[#a89984]">{post.frontmatter.date}</p>   <Link className="links" href={`/posts/${post.frontmatter.slug}`}> <span className="text-[var(--accent)]">#</span> <span className="font-medium">{post.frontmatter.title}</span>
      
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

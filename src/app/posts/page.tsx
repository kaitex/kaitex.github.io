import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import "../../styles/underline.css"
export default function BlogPage() {
  const posts = getAllPosts("posts");

  return (
    <div className="mt-15 max-w-4xl mx-auto">
      <div className="text-3xl font-medium mb-4">All Posts<span className="text-[#fe8019]">.</span> </div>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li className="flex flex-col  gap-3 md:flex-row md:gap-5 text-lg" key={post.frontmatter.slug}>
           
            <p className="text-[#999]">{post.frontmatter.date}</p>   <Link className="linkWithUnderline" href={`/posts/${post.frontmatter.slug}`}> <span className="text-[var(--accent)]">#</span> <span className="font-medium">{post.frontmatter.title}</span>
      
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

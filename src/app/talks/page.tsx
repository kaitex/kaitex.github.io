import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import "../../styles/markdown.css"

export default function BlogPage() {
  const posts = getAllPosts("talks");
  return (
    <div className="mt-20  max-w-4xl mx-auto">
      <h2 className=" text-2xl font-medium mb-4">Talks<span className="text-[#fe8019]">.</span> </h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li className="flex flex-col  gap-3 md:flex-row md:gap-5 text-lg" key={post.frontmatter.slug}>
            
            <span className="text-[#a89984]">{post.frontmatter.date}</span><Link className="links" href={`/talks/${post.frontmatter.slug}`}>  <span className="text-[var(--accent)]">#</span> <span className="hover:underline">{post.frontmatter.title}</span>
              {/* <div className="text-xl font-semibold">{post.frontmatter.title}</div>
              <div className="text-sm text-gray-500">{post.frontmatter.date}</div> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

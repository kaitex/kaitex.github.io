import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { marked } from "marked";
import "../../../styles/markdown.css"
interface PageProps {
  params: Promise<{ slug: string }>;
}

// Required for `output: export` in dynamic routes
export async function generateStaticParams() {
  const posts = getAllPosts("talks");
  return posts.map((post) => ({
    slug: post.frontmatter.slug,
  }));
}

export default async function TalksPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug("talks", slug);
  if (!post) return notFound();

  return (
    <div className="mt-15 prose-enhanced max-w-4xl  mx-auto ">
      <div className="page-header">{post.frontmatter.title}</div>
      <div className="text-[#999] text-[1.5em]">{post.frontmatter.date}</div>
      <article
        className="prose-enhanced "
        dangerouslySetInnerHTML={{ __html: await marked.parse(post.content) }}
      />
    </div>
  );
}

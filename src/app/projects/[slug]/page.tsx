import { getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { marked } from "marked";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug("projects", slug);
  if (!post) return notFound();

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold mb-2">{post.frontmatter.title}</h1>
      <div className="text-sm text-gray-500 mb-4">{post.frontmatter.date}</div>
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: await marked.parse(post.content) }}
      />
    </div>
  );
}

import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { marked } from "marked";

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
    <div className="mt-20 mx-auto">
      <h1 className="text-2xl font-bold mb-2">{post.frontmatter.title}</h1>
      <div className="text-sm text-gray-500 mb-4">{post.frontmatter.date}</div>
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: await marked.parse(post.content) }}
      />
    </div>
  );
}

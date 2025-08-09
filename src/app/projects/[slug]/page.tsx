import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { marked } from "marked";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts("projects");
  return posts.map((post) => ({
    slug: post.frontmatter.slug,
  }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const post = getPostBySlug("projects", slug);

  if (!post) notFound();

  // Await parse to get string HTML (marked.parse returns Promise<string>)
  const htmlContent = await marked.parse(post.content);

  return (
    <article className="prose dark:prose-invert max-w-none mx-auto p-4">
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </article>
  );
}

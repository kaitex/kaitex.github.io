import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // already imported
import "@/styles/markdown.css"; // your custom markdown styles

type Props = { params: { slug: string } };

// Configure `marked` with highlight.js
marked.setOptions({
  highlight: function (code:any, lang:any) {
    // Try to use the language if specified and supported
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    // Fallback to auto-detection
    return hljs.highlightAuto(code).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects this
});

export async function generateStaticParams() {
  const posts = getAllPosts("posts");
  return posts.map((post) => ({
    slug: post.frontmatter.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug("posts", params.slug);
  if (!post) return notFound();

  const html = marked.parse(post.content); // parse with highlighting

  return (
   
    <div className="prose-enhanced  max-w-4xl mx-auto mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{post.frontmatter.title}</h1>
      <div className="text-sm text-gray-500 mb-4">{post.frontmatter.date}</div>
      <article
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

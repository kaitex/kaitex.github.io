import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { marked } from "marked";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

import "../../../styles/markdown.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts("posts");
  return posts.map((post) => ({
    slug: post.frontmatter.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug("posts", slug);
  if (!post) return notFound();

  // Tokenize markdown content
  const tokens = marked.lexer(post.content);

  // Map tokens to React elements
  const content = tokens.map((token, i) => {
    if (token.type === "code") {
      return (
        <SyntaxHighlighter
          key={i}
          language={token.lang || "plaintext"}
          style={dracula} // or gruvboxDark
          wrapLines
        >
          {token.text}
        </SyntaxHighlighter>
      );
    }
    return (
      <div
        key={i}
        dangerouslySetInnerHTML={{ __html: marked.parser([token]) }}
      />
    );
  });

  return (
    <div className="prose-enhanced max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{post.frontmatter.title}</h1>
      <div className="text-sm text-gray-500 mb-4">{post.frontmatter.date}</div>
      <article>{content}</article>
    </div>
  );
}

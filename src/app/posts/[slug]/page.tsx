import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { marked } from "marked";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

import "../../../styles/markdown.css"
type Props = { params: { slug: string } };

// Custom renderer that outputs JSX instead of HTML
const renderer = {
  code(code: string, infostring: string) {
    const lang = (infostring || "").trim();
    return (
      <SyntaxHighlighter
        key={Math.random()}
        language={lang || "plaintext"}
        style={vs2015}
        wrapLines
      >
        {code}
      </SyntaxHighlighter>
    );
  },
};

export async function generateStaticParams() {
  const posts = getAllPosts("posts");
  return posts.map((post) => ({
    slug: post.frontmatter.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug("posts", params.slug);
  if (!post) return notFound();

  // marked will now return a mix of strings + JSX
  marked.use({ renderer });

  // Convert markdown to tokens and manually map
  const tokens = marked.lexer(post.content);
  const content = tokens.map((token, i) => {
    if (token.type === "code") {
      return renderer.code(token.text, token.lang || "");
    }
    return <div key={i} dangerouslySetInnerHTML={{ __html: marked.parser([token]) }} />;
  });

  return (
    <div className="prose-enhanced max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{post.frontmatter.title}</h1>
      <div className="text-sm text-gray-500 mb-4">{post.frontmatter.date}</div>
      <article>{content}</article>
    </div>
  );
}

import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { marked } from "marked";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "../../../styles/markdown.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params
export async function generateStaticParams() {
  const posts = getAllPosts("posts");
  return posts.map((post) => ({
    slug: post.frontmatter.slug,
  }));
}

// Language mapping for better defaults
const langMap: Record<string, string> = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  py: "python",
  sh: "bash",
  bash: "bash",
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug("posts", slug);
  if (!post) return notFound();

  const tokens = marked.lexer(post.content);

  const content = tokens.map((token, i) => {
    if (token.type === "code") {
      const lang =
        langMap[token.lang?.toLowerCase() || ""] ||
        token.lang ||
        "javascript"; // default to javascript

      return (
        <SyntaxHighlighter
          key={i}
          language={lang}
          style={vs2015}
          wrapLines
          PreTag="div"
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
    <div className="prose-enhanced max-w-4xl  mx-auto p-4">
      <h1 className="font-medium ">{post.frontmatter.title}</h1>
      <div className="text-[#999] text-[15px] ">On {post.frontmatter.date}</div>
      <article >{content}</article>
    </div>
  );
}

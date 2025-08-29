import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { marked } from "marked";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  vs2015,
  stackoverflowLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import "../../../styles/markdown.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content", "posts");
  if (!fs.existsSync(postsDir)) return [];

  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  const slugs = files.map((file) => {
    const filePath = path.join(postsDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    // Use the slug from frontmatter if available, otherwise use filename without extension
    return data.slug || file.replace(/\.mdx?$/, "");
  });

  return slugs.map((slug) => ({
    slug,
  }));
}

// Language mapping for better defaults
const langMap: Record<string, string> = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  py: "python",
  CS: "csharp",
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
        langMap[token.lang?.toLowerCase() || ""] || token.lang || "javascript";

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
    <div className="mt-15 prose-enhanced max-w-4xl  mx-auto ">
      <div className="page-header">{post.frontmatter.title}</div>
      <span className="text-[#999] text-[1.5em] ">
        On {post.frontmatter.date}
      </span>
      <article>{content}</article>
    </div>
  );
}

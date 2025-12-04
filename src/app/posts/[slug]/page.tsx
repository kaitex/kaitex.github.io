import { getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { marked } from "marked";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
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

    return data.slug || file.replace(/\.mdx?$/, "");
  });

  return slugs.map((slug) => ({ slug }));
}

const langMap: Record<string, string> = {
  JS: "JS",
  JSX: "JSX",
  TS: "TS",
  TSX: "TSX",
  py: "Py",
  CS: "csharp",
  sh: "BASH",
  BASH: "BASH",
};

const langDisplay: Record<string, string> = {
  javascript: "JS",
  typescript: "TypeScript",
  python: "Python",
  bash: "BASH",
  csharp: "CS",
  cs: "CS",
  Cs: "CS",
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
        <div
          key={i}
          className="relative mb-6 w-full overflow-x-auto rounded-md border border-neutral-700"
        >
          <div className="absolute top-1 right-1 px-2 py-0.5 text-xs font-medium text-neutral-100 bg-neutral-700 rounded">
            {langDisplay[lang.toLowerCase()] || lang.toUpperCase()}
          </div>

          <SyntaxHighlighter
            language={lang}
            style={vs2015}
            PreTag="div"
            customStyle={{
              fontSize: "1rem",
              padding: "1rem",
              borderRadius: "0.5rem",
              margin: 0,
              whiteSpace: "pre-wrap", // prevents horizontal overflow
              wordBreak: "break-word",
            }}
          >
            {token.text}
          </SyntaxHighlighter>
        </div>
      );
    }

    return (
      <div
        key={i}
        className="prose prose-invert max-w-full break-words"
        dangerouslySetInnerHTML={{ __html: marked.parser([token]) }}
      />
    );
  });

  return (
    <div className="mt-14 px-4 md:px-0">
      <h1 className="text-[2rem] font-medium mb-4 leading-tight">{post.frontmatter.title}</h1>

      <span className="text-neutral-400 text-[1rem] block mb-10">
        On {post.frontmatter.date}
      </span>

      <article className="prose prose-invert max-w-full">{content}</article>
    </div>
  );
}

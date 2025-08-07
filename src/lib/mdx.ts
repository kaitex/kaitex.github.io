import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Frontmatter = {
  title: string;
  slug: string;
  date: string;
  description?: string;
  language?: string;
  languageColor?: string;
  stars?: number;
  forks?: number;
  repo?: string;
  live?: string;
};

export function getAllPosts(folder: "posts" | "talks" | "projects") {
  const dir = path.join(process.cwd(), "content", folder);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(file => file.endsWith(".md") || file.endsWith(".mdx"));
  const seenSlugs = new Set<string>();

  return files.map((filename) => {
    const filePath = path.join(dir, filename);
    const file = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(file);

    const fallbackSlug = filename.replace(/\.mdx?$/, "");
    const slug = (data.slug ?? fallbackSlug).trim();

    if (seenSlugs.has(slug)) {
      console.warn(`⚠️ Duplicate slug detected: "${slug}" in ${filename}`);
    }
    seenSlugs.add(slug);

    return {
      frontmatter: {
        ...(data as Omit<Frontmatter, "slug">),
        slug,
      },
      content,
    };
  });
}

export function getPostBySlug(folder: string, slug: string) {
  const dir = path.join(process.cwd(), "content", folder);
  
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter(file => file.endsWith(".md") || file.endsWith(".mdx"));
  
  for (const filename of files) {
    const filePath = path.join(dir, filename);
    const file = fs.readFileSync(filePath, "utf8");
    const { data } = matter(file);

    const fallbackSlug = filename.replace(/\.mdx?$/, "");
    const fileSlug = (data.slug ?? fallbackSlug).trim();
    
    if (fileSlug === slug) {
      const { content } = matter(file);
      return {
        frontmatter: {
          ...(data as Omit<Frontmatter, "slug">),
          slug,
        },
        content,
      };
    }
  }
  
  return null;
}

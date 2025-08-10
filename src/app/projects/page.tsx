import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { FaGithub, FaStar, FaCodeBranch, FaBook, FaExternalLinkAlt } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";

export default function ProjectsPage() {
  const posts = getAllPosts("projects");

  return (
    <div className="mt-20  max-w-4xl mx-auto  cursor-pointer">
      <h2 className="text-3xl font-medium mb-4">
        Projects<span>.</span>
      </h2>
      <p className="mb-1 text-md md:text-xl">
        These are my open source projects which are fetched directly from GitHub.
      </p>
      <p className="text-md md:text-xl">If you're a developer, feel free to make a pull request!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {posts.map(({ frontmatter }) => (
          <div
            key={frontmatter.slug}
            className="border border-gray-700 rounded-md p-4 hover:shadow transition-shadow duration-300"
          >
            <div className="flex items-center mb-2">
            
              <h3 className="links">{frontmatter.title}</h3>
            </div>

            <p className="text-md mb-4">{frontmatter.description}</p>

            <div className="flex flex-wrap items-center justify-between text-sm gap-2">
              <span className="flex items-center">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: frontmatter.languageColor }}
                />
                {frontmatter.language}
              </span>

              <div className="flex items-center space-x-3">
             
    
                <a
                  href={frontmatter.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="links"
                >
                  <FaGithub size={18} />
                </a>
                {frontmatter.live && (
                 <a
  href={frontmatter.live?.replace(/^"+|"+$/g, "")}
  target="_blank"
  rel="noopener noreferrer"
  className="links"
  aria-label="Live demo"
>
  <HiExternalLink size={20} />
</a>

                )}
    
       </div>
              </div>
            </div>
        
        ))}
      </div>
    </div>
  );
}

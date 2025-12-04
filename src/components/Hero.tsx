export default function Hero() {
  return (
    <section className="mt-10 min-h-[70vh] flex items-center">
      <div className="flex flex-col max-w-2xl">

        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src="https://avatars.githubusercontent.com/u/106853078?v=4"
            alt="Bidur Majgainya"
            className="w-full h-full object-cover"
          />
        </div>


        <p className="text-xl md:text-4xl mt-5 font-medium text-[var(--text-color)] leading-tight">
          Bidur Majgainya
        </p>


        <p className="mt-5 text-[var(--text-color)] opacity-80 text-lg leading-relaxed">
          Senior Full Stack Engineer specializing in React, Next.js, Node.js, and .Net .
        </p>
        <p className="mt-5 text-[var(--text-color)] opacity-80 text-lg leading-relaxed">
         I build end-to-end applications — from scalable web platforms to APIs that power real-time business solutions.
        </p>

        <div className="flex flex-wrap gap-4 mt-5 text-base">
          <a
            href="https://www.linkedin.com/in/bidur-majgianya-196318248/"
            className="text-[var(--text-color)] opacity-70 hover:opacity-100 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn 
          </a>
          <a
            href="https://github.com/kaitex"
            className="text-[var(--text-color)] opacity-70 hover:opacity-100 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub 
          </a>
          <a
            href="mailto:majgianyabidur02@gmail.com"
            className="text-[var(--text-color)] opacity-70 hover:opacity-100 transition-opacity"
          >
            Email 
          </a>
          <a
            href="/posts"
            className="text-[var(--text-color)] opacity-70 hover:opacity-100 transition-opacity"
          >
            Blog 
          </a>
        </div>
      </div>
    </section>
  );
}

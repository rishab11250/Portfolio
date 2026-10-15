import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '../../../data/projects';
import { getSkillBadge } from '../../../data/skills';

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found | Rishab',
    };
  }

  return {
    title: `${project.title} — Case Study | Rishab`,
    description: project.summary || project.description,
    openGraph: {
      title: `${project.title} — Case Study | Rishab Chandgothia`,
      description: project.summary || project.description,
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Case Study | Rishab Chandgothia`,
      description: project.summary || project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }) {
  const { slug } = await params;
  const currentIndex = projects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="case-study-container">
      {/* Back button header */}
      <nav className="case-study-nav">
        <Link href="/#projects" className="case-study-back-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back to Projects
        </Link>
        <span className="case-study-badge">{project.category}</span>
      </nav>

      {/* Hero Header */}
      <header className="case-study-header">
        <h1 className="case-study-title">{project.title}</h1>
        <p className="case-study-summary">{project.summary || project.description}</p>

        {/* Action CTAs */}
        <div className="case-study-actions">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study-btn case-study-btn-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Live Demo
            </a>
          )}
          {project.codeLink && (
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study-btn case-study-btn-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              Source Code
            </a>
          )}
        </div>
      </header>

      {/* Featured Showcase Image */}
      <div className="case-study-image-wrapper">
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={675}
          priority
          sizes="(max-width: 768px) 100vw, 1100px"
          className="case-study-image"
        />
      </div>

      {/* Details & Tech Stack */}
      <section className="case-study-details-grid">
        <div className="case-study-card">
          <h2>About the Project</h2>
          <p>{project.description}</p>
        </div>

        <div className="case-study-card">
          <h2>Technologies Used</h2>
          <div className="case-study-skills">
            {project.skills.map((skill, i) => (
              <img
                key={i}
                src={getSkillBadge(skill)}
                alt={skill}
                className="skill-badge"
                loading="lazy"
              />
            ))}
          </div>

          {project.stack && project.stack.length > 0 && (
            <div className="case-study-stack-tags">
              {project.stack.map((item, idx) => (
                <span key={idx} className="stack-tag">
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Navigation */}
      <footer className="case-study-pagination">
        {prevProject ? (
          <Link href={`/projects/${prevProject.slug}`} className="pagination-link prev">
            <span className="pagination-dir">← Previous Project</span>
            <span className="pagination-title">{prevProject.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject && (
          <Link href={`/projects/${nextProject.slug}`} className="pagination-link next">
            <span className="pagination-dir">Next Project →</span>
            <span className="pagination-title">{nextProject.title}</span>
          </Link>
        )}
      </footer>
    </main>
  );
}

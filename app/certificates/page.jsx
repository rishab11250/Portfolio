import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import certificates from '@/data/certificates';

export const metadata = {
  title: 'Certificates & Credentials | Rishab Chandgothia',
  description:
    'Verified certifications across HackerRank JavaScript, national hackathons, open-source initiatives (ECSOC), and technical coursework.',
  alternates: { canonical: '/certificates' },
  openGraph: {
    url: '/certificates',
    title: 'Certificates & Credentials | Rishab Chandgothia',
    description:
      'Verified certifications across HackerRank JavaScript, national hackathons, open-source initiatives (ECSOC), and technical coursework.',
  },
};

const hackathonCerts = certificates.filter(
  (c) => c.category === 'Hackathons' || c.category === 'Open Source'
);
const courseAndIndustryCerts = certificates.filter(
  (c) => c.category === 'Courses' || c.issuer === 'HackerRank'
);

export default function CertificatesPage() {
  return (
    <main id="main-content" className="flex-1 max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
      {/* 1. Header Banner */}
      <section className="relative p-6 sm:p-10 mb-12 rounded-3xl bg-paper text-ink border border-ink/20 overflow-hidden">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seal/10 text-seal border border-seal/20 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-seal" />
            <span>Verified Credentials &bull; Official Proof Archive</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight">
            Certificates
          </h1>

          <p className="font-body text-mist text-sm sm:text-base leading-relaxed max-w-2xl">
            Official credentials, hackathon finalist awards, open-source program recognition, and industry skill assessments complete with preview images and verifiable proofs.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-body font-medium text-mist">
            <span className="font-semibold text-seal">HackerRank (100% Score)</span>
            <span>&bull;</span>
            <span className="text-ink font-semibold">{hackathonCerts.length} Hackathon &amp; Open Source Awards</span>
            <span>&bull;</span>
            <span className="text-indigo font-semibold">{courseAndIndustryCerts.length} Technical Certifications</span>
          </div>
        </div>
      </section>

      {/* 2. Hackathons & Open Source Honors Section */}
      <section className="space-y-6 mb-16 content-visibility-auto" aria-label="Competitive Hackathon & Open Source Honors">
        <div className="flex items-center justify-between pb-3">
          <div>
            <h2 className="font-display font-bold text-2xl text-ink">
              Competitive Hackathons &amp; Open Source Honors ({hackathonCerts.length})
            </h2>
          </div>
          <span className="font-body text-xs font-semibold text-seal hidden sm:inline">
            Official Podiums
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathonCerts.map((cert, idx) => (
            <article
              key={cert.id}
              className="group flex flex-col bg-paper rounded-2xl border border-ink/20 hover:border-seal transition-colors overflow-hidden justify-between"
            >
              <div>
                {/* Contact-sheet Film Header */}
                <div
                  aria-hidden="true"
                  className="flex items-center justify-between px-4 py-2 bg-ink/5 text-xs font-body font-medium text-mist"
                >
                  <span className="font-semibold text-seal">Frame {idx + 1}</span>
                  <span className="font-medium text-ink">{cert.issuer}</span>
                </div>

                {/* Certificate Preview Image */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-ink/10">
                  <Image
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs font-body font-semibold bg-paper/95 text-ink border border-ink/20">
                    {cert.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-ink mb-1.5 group-hover:text-seal transition-colors">
                    {cert.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-mist leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-2 flex items-center justify-between text-xs font-body font-medium">
                <span className="font-semibold text-ink">{cert.issuer}</span>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-seal hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    View Official Proof ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Industry & Course Certifications Grid */}
      <section className="space-y-6 mb-16 content-visibility-auto" aria-label="Industry & Technical Course Certifications">
        <div className="flex items-center justify-between pb-3">
          <div>
            <h2 className="font-display font-bold text-2xl text-ink">
              Industry Certifications &amp; Courses ({courseAndIndustryCerts.length})
            </h2>
          </div>
          <span className="font-body text-xs font-semibold text-indigo hidden sm:inline">
            Verified Credentials
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseAndIndustryCerts.map((cert, idx) => (
            <article
              key={cert.id}
              className="group flex flex-col bg-paper rounded-2xl border border-ink/20 hover:border-indigo transition-colors overflow-hidden justify-between"
            >
              <div>
                {/* Contact-sheet Film Header */}
                <div
                  aria-hidden="true"
                  className="flex items-center justify-between px-4 py-2 bg-ink/5 text-xs font-body font-medium text-mist"
                >
                  <span className="font-semibold text-indigo">Proof {idx + 1}</span>
                  <span className="font-medium text-ink">{cert.issuer}</span>
                </div>

                {/* Certificate Preview Image */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-ink/10">
                  <Image
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs font-body font-semibold bg-paper/95 text-ink border border-ink/20">
                    {cert.issuer}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-ink mb-1.5 group-hover:text-indigo transition-colors">
                    {cert.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-mist leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-2 flex items-center justify-between text-xs font-body font-medium">
                <span className="font-semibold text-ink">Verified</span>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    Verify Credential ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Navigation CTA to Contact */}
      <div className="p-8 rounded-3xl bg-paper border border-ink/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-seal font-body">Next Section</span>
          <h3 className="font-display font-bold text-xl text-ink">
            Send a Direct Message or Inquiry
          </h3>
        </div>
        <Link
          href="/contact"
          className="h-11 px-6 rounded-xl bg-ink text-paper font-body text-sm font-semibold hover:bg-seal transition-colors flex items-center gap-2 cursor-pointer"
        >
          Open Contact &rarr;
        </Link>
      </div>
    </main>
  );
}

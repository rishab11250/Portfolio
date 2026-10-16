import React from 'react';
import SealMark from './primitives/SealMark';
import SeasonTag from './SeasonTag';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/rishab11250' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rishab-chandgothia-8823112a4/' },
  { label: 'X (Twitter)', href: 'https://x.com/Rishab25361722' },
  { label: 'Email', href: 'mailto:rishab.chandgothia.cg@gmail.com' },
];

export default function Footer({ seasonTag = null }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="relative bg-prussian text-paper pt-20 pb-16 overflow-hidden select-none"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12">
          {/* Identity & Seal */}
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <SealMark size={40} interactive={false} />
              <span className="font-display font-bold text-xl text-paper tracking-tight">
                Rishab Chandgothia
              </span>
            </div>
            <p className="font-body text-paper/75 text-sm sm:text-base leading-relaxed">
              Full-Stack Developer crafting reliable, high-performance web applications with clean design and solid foundations.
            </p>
          </div>

          {/* Social & Resume Links */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
            <ul className="flex flex-wrap items-center gap-5 list-none">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm font-medium text-paper/80 hover:text-paper hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-paper rounded-sm py-1 transition-colors duration-150 ease-[var(--ease-twos)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="/Rishab-Chandgothia-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-paper/10 hover:bg-paper/20 text-paper font-body text-sm font-medium border border-paper/20 transition-colors duration-150 ease-[var(--ease-twos)] focus-visible:ring-2 focus-visible:ring-paper motion-reduce:transition-none"
            >
              Resume PDF
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Season Tag Slot */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-paper/60 font-body">
          <p>© {currentYear} Rishab Chandgothia. All rights reserved.</p>

          {/* Season Tag Slot */}
          <div id="season-tag-container" className="flex items-center gap-2">
            {seasonTag || <SeasonTag />}
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';
import SealMark from '@/components/primitives/SealMark';

const directPostLines = [
  { label: 'Direct Email', value: 'rishab.chandgothia.cg@gmail.com', href: 'mailto:rishab.chandgothia.cg@gmail.com' },
  { label: 'LinkedIn', value: 'rishab-chandgothia', href: 'https://www.linkedin.com/in/rishab-chandgothia-8823112a4/' },
  { label: 'GitHub', value: 'rishab11250', href: 'https://github.com/rishab11250' },
  { label: 'X / Twitter', value: '@Rishab25361722', href: 'https://x.com/Rishab25361722' },
  { label: 'Direct Phone', value: '+91 8469190331', href: 'tel:+918469190331' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [stampActive, setStampActive] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (honeypot) {
      setStatus({ type: 'success', message: 'Letter received and safely archived.' });
      setFormData({ name: '', email: '', message: '' });
      return;
    }

    if (cooldown > 0) {
      setStatus({ type: 'error', message: `Please wait ${cooldown}s before sending another message.` });
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({ type: 'error', message: 'Email dispatch is not configured. Please contact via direct email.' });
      return;
    }

    setStatus({ type: 'sending', message: 'Inscribing dispatch...' });

    try {
      setStampActive(true);
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Rishab Chandgothia',
        },
        publicKey
      );

      setStatus({ type: 'success', message: 'Message dispatched and archived.' });
      setFormData({ name: '', email: '', message: '' });
      setCooldown(60);
      setTimeout(() => setStampActive(false), 2500);
    } catch {
      setStatus({ type: 'error', message: 'Failed to transmit message. Please send via direct email.' });
    }
  };

  return (
    <main id="main-content" className="flex-1 max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
      {/* 1. Header Banner */}
      <section className="relative p-6 sm:p-10 mb-12 rounded-3xl bg-paper text-ink border border-ink/20 overflow-hidden">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seal/10 text-seal font-body text-xs font-semibold border border-seal/20">
            <span className="w-2 h-2 rounded-full bg-seal" />
            <span>Direct Dispatch • Vermilion Seal</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight">
            Contact
          </h1>

          <p className="font-body text-mist text-sm sm:text-base leading-relaxed max-w-2xl">
            Have an engineering opportunity, architectural question, or collaborative project? Inscribe your dispatch onto the stationery below or reach out directly.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-body font-medium text-mist">
            <span className="font-semibold text-seal">TLS Encrypted Dispatch</span>
            <span>&bull;</span>
            <span className="text-ink font-semibold">EmailJS Routing</span>
            <span>&bull;</span>
            <span>Spam Protected</span>
          </div>
        </div>
      </section>

      {/* 2. Main Grid: Direct Channels (Left) + Stationery Letter Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
        {/* Left: Direct Postlines */}
        <div className="lg:col-span-5 space-y-4">
          <div className="pb-3">
            <h2 className="font-display font-bold text-xl text-ink">
              Direct Channels
            </h2>
          </div>

          <ul className="space-y-3 list-none">
            {directPostLines.map((line) => (
              <li key={line.label}>
                <a
                  href={line.href}
                  target={line.href.startsWith('mailto:') || line.href.startsWith('tel:') ? undefined : '_blank'}
                  rel={line.href.startsWith('mailto:') || line.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                  className="p-4 rounded-2xl bg-paper border border-ink/20 hover:border-seal transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <span className="block font-body text-xs font-semibold text-mist">
                      {line.label}
                    </span>
                    <span className="font-body text-xs sm:text-sm font-semibold text-ink group-hover:text-seal transition-colors break-all">
                      {line.value}
                    </span>
                  </div>
                  <span aria-hidden="true" className="text-mist group-hover:text-ink text-sm font-bold">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Cotton Stationery Sheet with Ruled Lines & Wax Stamp */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl bg-paper p-6 sm:p-8 border border-ink/20">
            {/* Wax Seal Press Animation Overlay on transmission */}
            {stampActive && (
              <div
                aria-hidden="true"
                className="absolute top-6 right-6 z-20 pointer-events-none"
              >
                <SealMark size={64} interactive={false} />
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              {/* Form Feedback Status */}
              <div
                role="status"
                aria-live="polite"
                className={`min-h-[22px] text-xs font-semibold tracking-wide font-body ${
                  status.type === 'error'
                    ? 'text-seal'
                    : status.type === 'success'
                    ? 'text-pine'
                    : 'text-mist'
                }`}
              >
                {status.message}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-body text-xs font-semibold text-ink mb-1.5"
                  >
                    Your Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="e.g. Alex Mercer"
                    className="w-full h-11 px-3.5 rounded-xl bg-ink/5 border border-ink/20 text-ink placeholder-mist/60 text-sm font-body focus:bg-paper focus:border-seal focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-body text-xs font-semibold text-ink mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="e.g. alex@example.com"
                    className="w-full h-11 px-3.5 rounded-xl bg-ink/5 border border-ink/20 text-ink placeholder-mist/60 text-sm font-body focus:bg-paper focus:border-seal focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-body text-xs font-semibold text-ink mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Inscribe your project scope, inquiry, or collaboration message here..."
                  className="w-full p-3.5 rounded-xl bg-ink/5 border border-ink/20 text-ink placeholder-mist/60 text-sm font-body focus:bg-paper focus:border-seal focus:outline-none leading-relaxed transition-colors"
                />
              </div>

              {/* Honeypot field for bot suppression */}
              <input
                type="text"
                name="user_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="sr-only"
                aria-hidden="true"
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status.type === 'sending' || cooldown > 0}
                  className={`w-full sm:w-auto px-7 h-11 rounded-xl font-body text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    status.type === 'sending' || cooldown > 0
                      ? 'bg-ink/20 text-ink/40 cursor-not-allowed'
                      : 'bg-seal text-paper hover:bg-seal/90 active:scale-95'
                  }`}
                >
                  {status.type === 'sending' ? (
                    'Transmitting Message...'
                  ) : cooldown > 0 ? (
                    `Cooldown (${cooldown}s)`
                  ) : (
                    <>
                      <span>Send Sealed Message</span>
                      <span>&rarr;</span>
                    </>
                  )}
                </button>

                <span className="font-body text-xs text-mist font-medium">
                  Confidential • TLS Encrypted
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Navigation CTA to Home */}
      <div className="p-8 rounded-3xl bg-paper border border-ink/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-body text-xs font-semibold text-seal">Return</span>
          <h3 className="font-display font-bold text-xl text-ink">
            Return to Traditional Ink Home
          </h3>
        </div>
        <Link
          href="/"
          className="h-11 px-6 rounded-xl bg-ink text-paper font-body text-sm font-semibold hover:bg-seal transition-colors flex items-center gap-2 cursor-pointer"
        >
          Return Home &rarr;
        </Link>
      </div>
    </main>
  );
}

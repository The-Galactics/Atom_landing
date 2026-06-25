"use client";

import Image from "next/image";

const linkColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#containers" },
      { label: "Atom IA", href: "#atom-ia" },
      { label: "Docs", href: "/docs" },
      { label: "Get started", href: "#hero" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Community", href: "#" },
      { label: "Support", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

const socials = [
  { icon: "fi fi-brands-github", href: "https://github.com", label: "GitHub" },
  { icon: "fi fi-brands-twitter-alt", href: "#", label: "Twitter" },
  { icon: "fi fi-brands-linkedin", href: "#", label: "LinkedIn" },
  { icon: "fi fi-brands-instagram", href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative w-full overflow-hidden border-t border-white/10 bg-black"
    >
      {/* Subtle top glow */}
      <div className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[60%] -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logoAtomBorder.png"
                alt="Atom logo"
                width={16}
                height={26}
                className="h-10 w-10 shrink-0 object-contain"
              />
              <span className="text-xl font-bold tracking-[0.25em] text-white">
                ATOM
              </span>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              Your Android, powered by intelligence. Atom understands natural
              language and automates complex tasks across every Android
              ecosystem.
            </p>

            <div className="mt-2 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <i className={`${s.icon} text-base leading-none`} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {linkColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center text-sm text-white/60 transition-colors duration-200 hover:text-white"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Atom. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-white/40 transition-colors hover:text-white/70"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-white/40 transition-colors hover:text-white/70"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

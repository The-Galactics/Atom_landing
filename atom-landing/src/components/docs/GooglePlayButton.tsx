type GooglePlayButtonProps = {
  href: string;
  className?: string;
};

/** Official-style "Get it on Google Play" badge as a reusable button. */
export default function GooglePlayButton({
  href,
  className = "",
}: GooglePlayButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get it on Google Play"
      className={`inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 transition-all duration-300 hover:border-white/30 hover:bg-white/10 ${className}`}
    >
      <svg
        viewBox="0 0 512 512"
        className="h-7 w-7 shrink-0"
        aria-hidden="true"
      >
        <path
          fill="#00d3ff"
          d="M47 24.4c-4.3 4.6-6.8 11.7-6.8 20.9v421.4c0 9.2 2.5 16.3 6.8 20.9l1.4 1.4 236-236v-5.6l-236-236z"
        />
        <path
          fill="#00f076"
          d="M363.6 334.6l-78.8-78.8v-5.6l78.8-78.8 1.8 1 93.3 53c26.6 15.1 26.6 39.9 0 55.1l-93.3 53z"
        />
        <path
          fill="#ff3a44"
          d="M365.4 333.6L284.8 253 47 490.8c8.8 9.3 23.3 10.4 39.6 1.2z"
        />
        <path
          fill="#ffc900"
          d="M365.4 172.4L86.6 14c-16.3-9.3-30.8-8.1-39.6 1.2L284.8 253z"
        />
      </svg>

      <span className="flex flex-col text-left leading-tight">
        <span className="text-[10px] uppercase tracking-wide text-white/60">
          Get it on
        </span>
        <span className="text-base font-semibold text-white">Google Play</span>
      </span>
    </a>
  );
}

/** Tech Cogniverse mark: a waveform resolving into connected nodes — friction into a working system. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M3 16h3l2-6 3 12 3-9 2 3" fill="none" stroke="#0f8c80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 16h5M21 16l5-6M21 16l5 6" fill="none" stroke="#3445d9" strokeWidth="2" strokeLinecap="round" />
      <circle cx="21" cy="16" r="2.4" fill="#3445d9" />
      <circle cx="26.5" cy="9.5" r="2.4" fill="#3445d9" />
      <circle cx="26.5" cy="22.5" r="2.4" fill="#c9622a" />
    </svg>
  );
}

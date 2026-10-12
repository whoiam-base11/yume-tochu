export default function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="12" fill="#1ED760" />
      <path
        d="M6 9.2c4-1.2 8.6-.9 12 1M6.6 12.4c3.4-1 7.2-.7 10.2 1M7.2 15.4c2.8-.8 5.8-.5 8.2.9"
        stroke="#0E0E11"
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

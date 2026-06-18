export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-label="Total Alarme">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2l8 3v7c0 5-3.5 8-8 10-4.5-2-8-5-8-10V5l8-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M8 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="text-[17px] font-extrabold tracking-tight">
        total<span className="font-medium text-muted"> alarme</span>
      </span>
    </span>
  );
}

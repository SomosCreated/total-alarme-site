export function BrandWatermark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 252" className={className} fill="none" aria-hidden="true">
      <path d="M120 8 L212 42 V120 C212 188 168 224 120 244 C72 224 28 188 28 120 V42 Z" stroke="currentColor" strokeWidth="3" />
      <path d="M64 72 a60 60 0 0 1 112 0" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
      <path d="M82 176 l38 30 38 -30" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BrandArcPattern({ id = "ta-arcs", className = "" }: { id?: string; className?: string }) {
  return (
    <svg className={className} aria-hidden="true" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M0 64 A64 64 0 0 1 64 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

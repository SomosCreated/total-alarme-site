import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  featured = false,
}: {
  children: ReactNode;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-7 transition ${
        featured
          ? "border-brand/40 bg-brand/[0.04]"
          : "border-border bg-surface hover:shadow-lg hover:shadow-black/5"
      } ${className}`}
    >
      {children}
    </div>
  );
}

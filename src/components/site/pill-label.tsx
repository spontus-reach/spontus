import type { ReactNode } from "react";

export function PillLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        fontSize: 12,
        fontWeight: 500,
        color: "#6b6960",
        letterSpacing: "0.04em",
        background: "#e8e6e0",
        border: "0.5px solid #d5d3cd",
        padding: "5px 12px",
        borderRadius: 999,
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}

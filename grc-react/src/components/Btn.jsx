import React from "react";

export default function Btn({ children, variant = "default", onClick, style }) {
  const isPrimary = variant === "primary";
  const isDanger = variant === "danger";
  const isTeal = variant === "teal";
  const isGhost = variant === "ghost";

  let bg = "#fff";
  let color = "var(--gray-700)";
  let border = "1px solid var(--gray-200)";
  let hoverBg = "var(--gray-50)";

  if (isPrimary) {
    bg = "var(--gray-800)";
    color = "#fff";
    border = "1px solid var(--gray-800)";
    hoverBg = "var(--gray-900)";
  } else if (isDanger) {
    bg = "var(--red)";
    color = "#fff";
    border = "1px solid var(--red)";
    hoverBg = "#dc2626";
  } else if (isTeal) {
    bg = "var(--teal)";
    color = "#fff";
    border = "1px solid var(--teal)";
    hoverBg = "var(--teal-dark)";
  } else if (isGhost) {
    bg = "transparent";
    color = "var(--gray-600)";
    border = "1px solid transparent";
    hoverBg = "var(--gray-100)";
  }

  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        background: bg,
        color: color,
        border: border,
        outline: "none",
        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: (isPrimary || isDanger || isTeal) ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = hoverBg;
        if (isPrimary || isDanger || isTeal) {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.15)";
        } else {
          e.currentTarget.style.borderColor = "var(--gray-300)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = bg;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = (isPrimary || isDanger || isTeal) ? "0 2px 4px rgba(0,0,0,0.1)" : "none";
        e.currentTarget.style.borderColor = border;
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translateY(1px)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
    >
      {children}
    </button>
  );
}

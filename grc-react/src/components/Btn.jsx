import React from "react";

export default function Btn({ children, variant = "default", onClick, style }) {
  const isPrimary = variant === "primary";
  const isDanger = variant === "danger";
  const isTeal = variant === "teal";
  const isGhost = variant === "ghost";

  let bg = "#ffffff";
  let color = "var(--gray-700)";
  let border = "1px solid rgba(0,0,0,0.1)";
  let hoverBg = "#f9fafb";
  let shadow = "0 1px 2px rgba(0,0,0,0.04)";
  let hoverShadow = "0 4px 6px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)";

  if (isPrimary) {
    bg = "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)";
    color = "#ffffff";
    border = "1px solid #0F172A";
    hoverBg = "linear-gradient(180deg, #334155 0%, #1E293B 100%)";
    shadow = "0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)";
    hoverShadow = "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)";
  } else if (isDanger) {
    bg = "linear-gradient(180deg, #EF4444 0%, #DC2626 100%)";
    color = "#ffffff";
    border = "1px solid #B91C1C";
    hoverBg = "linear-gradient(180deg, #F87171 0%, #EF4444 100%)";
    shadow = "0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)";
    hoverShadow = "0 4px 12px rgba(220,38,38,0.3), inset 0 1px 0 rgba(255,255,255,0.2)";
  } else if (isTeal) {
    bg = "linear-gradient(180deg, #14B8A6 0%, #0F766E 100%)";
    color = "#ffffff";
    border = "1px solid #0F766E";
    hoverBg = "linear-gradient(180deg, #2DD4BF 0%, #14B8A6 100%)";
    shadow = "0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)";
    hoverShadow = "0 4px 12px rgba(20,184,166,0.3), inset 0 1px 0 rgba(255,255,255,0.2)";
  } else if (isGhost) {
    bg = "transparent";
    color = "var(--gray-600)";
    border = "1px solid transparent";
    hoverBg = "rgba(0,0,0,0.04)";
    shadow = "none";
    hoverShadow = "none";
  }

  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: "600",
        letterSpacing: "-0.01em",
        cursor: "pointer",
        background: bg,
        color: color,
        border: border,
        outline: "none",
        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: shadow,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = hoverBg;
        e.currentTarget.style.boxShadow = hoverShadow;
        if (!isGhost) e.currentTarget.style.transform = "translateY(-1px)";
        if (variant === "default") e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = bg;
        e.currentTarget.style.boxShadow = shadow;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = border;
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translateY(1px)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onMouseUp={(e) => {
        if (!isGhost) e.currentTarget.style.transform = "translateY(-1px)";
      }}
    >
      {children}
    </button>
  );
}

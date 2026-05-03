import React from "react";

export default function Card({ children, style, noPad, onClick }) {
  return (
    <div
      onClick={onClick}
      className="animate-slide-up"
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: noPad ? 0 : "28px",
        border: "1px solid rgba(0,0,0,0.04)",
        boxShadow: "0 6px 16px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.02)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: onClick ? "pointer" : "default",
        position: "relative",
        overflow: noPad ? "hidden" : "visible",
        ...style
      }}
      onMouseEnter={e => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.03)";
          e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
        }
      }}
      onMouseLeave={e => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.02)";
          e.currentTarget.style.borderColor = "rgba(0,0,0,0.04)";
        }
      }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

// ✅ Premium CardTitle
export function CardTitle({ children, style }) {
  return (
    <h2 style={{
      fontSize: "18px",
      fontWeight: "600",
      letterSpacing: "-0.01em",
      marginBottom: "16px",
      color: "var(--gray-800)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      ...style
    }}>
      {children}
    </h2>
  );
}
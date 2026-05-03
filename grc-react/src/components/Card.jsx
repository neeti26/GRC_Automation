import React from "react";

export default function Card({ children, style, noPad, onClick }) {
  return (
    <div
      onClick={onClick}
      className="animate-slide-up"
      style={{
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "20px",
        padding: noPad ? 0 : "28px",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.04), inset 0 2px 0 rgba(255, 255, 255, 1)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: onClick ? "pointer" : "default",
        position: "relative",
        overflow: noPad ? "hidden" : "visible",
        ...style
      }}
      onMouseEnter={e => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(-6px) scale(1.01)";
          e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.08), inset 0 2px 0 rgba(255, 255, 255, 1)";
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.85)";
        }
      }}
      onMouseLeave={e => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.04), inset 0 2px 0 rgba(255, 255, 255, 1)";
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.7)";
        }
      }}
    >
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)",
        pointerEvents: "none",
        borderRadius: "inherit",
        zIndex: 0
      }} />
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
      fontWeight: "700",
      letterSpacing: "-0.02em",
      marginBottom: "16px",
      color: "#111827", // Rich dark gray
      display: "flex",
      alignItems: "center",
      gap: "10px",
      ...style
    }}>
      {children}
    </h2>
  );
}
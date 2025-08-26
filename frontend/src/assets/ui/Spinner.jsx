// components/Spinner.jsx
import React from "react";

export default function Spinner({
  size = 36,           // px
  thickness = 3,       // px
  color = "border-blue-600",
  speed = "0.35s",     // lower = faster
}) {
  return (
    <div
      className={`inline-block rounded-full border ${color} border-t-transparent animate-spin`}
      style={{
        width: size,
        height: size,
        borderWidth: thickness,
        animationDuration: speed,
      }}
      aria-label="Loading"
      role="status"
    />
  );
}

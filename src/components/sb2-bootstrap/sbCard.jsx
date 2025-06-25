import React from "react";

export default function SBCard({
  title,
  children,
  color = "primary",
  className = "",
}) {
  return (
    <div className={`card border-left-${color} shadow h-100 py-2 ${className}`}>
      <div className="card-body">
        {title && (
          <div
            className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}
          >
            {title}
          </div>
        )}
        <div className="h5 mb-0 font-weight-bold text-gray-800">{children}</div>
      </div>
    </div>
  );
}

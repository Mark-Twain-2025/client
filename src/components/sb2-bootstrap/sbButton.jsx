import React from "react";

export function CircleButton({
  color = "primary",
  size = "",
  icon,
  className = "",
  ...props
}) {
  const sizeClass = size ? `btn-${size}` : "";
  return (
    <a
      href="#"
      className={`btn btn-${color} btn-circle ${sizeClass} ${className}`}
      {...props}
    >
      <i className={icon}></i>
    </a>
  );
}

export function SplitButton({
  color = "primary",
  size = "",
  icon,
  text,
  iconColorClass = "text-white-50",
  className = "",
  ...props
}) {
  const sizeClass = size ? `btn-${size}` : "";
  return (
    <a
      href="#"
      className={`btn btn-${color} btn-icon-split ${sizeClass} ${className}`}
      {...props}
    >
      <span className={`icon ${iconColorClass}`}>
        <i className={icon}></i>
      </span>
      <span className="text">{text}</span>
    </a>
  );
}

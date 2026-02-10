import React from "react";

const Card = ({
  children,
  variant = "default",
  padding = "md",
  hover = false,
  className = "",
  onClick,
}) => {
  // Base styles
  const baseStyles = "rounded-lg transition-all duration-300";

  // Variant styles
  const variants = {
    default: "bg-white shadow-soft",
    bordered: "bg-white border-2 border-gray-200",
    primary: "bg-primary-50 border-2 border-primary-200",
    navy: "bg-navy-500 text-white",
    light: "bg-light-100 border border-light-300",
    gradient:
      "bg-gradient-to-br from-primary-500 to-navy-500 text-white shadow-medium",
  };

  // Padding styles
  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  // Hover effect
  const hoverStyles = hover
    ? "cursor-pointer hover:shadow-medium hover:-translate-y-1 hover:scale-[1.02]"
    : "";

  // Combine styles
  const cardStyles = `${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${className}`;

  return (
    <div className={cardStyles} onClick={onClick}>
      {children}
    </div>
  );
};

// Optional: Card sub-components for better structure
Card.Header = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

Card.Body = ({ children, className = "" }) => (
  <div className={`${className}`}>{children}</div>
);

Card.Footer = ({ children, className = "" }) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

Card.Image = ({ src, alt, className = "" }) => (
  <img
    src={src}
    alt={alt}
    className={`w-full h-48 object-cover rounded-t-lg ${className}`}
  />
);

export default Card;

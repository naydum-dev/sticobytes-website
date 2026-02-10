import React from "react";

const Badge = ({
  children,
  variant = "default",
  size = "md",
  rounded = "md",
  icon: Icon,
  removable = false,
  onRemove,
  className = "",
}) => {
  // Base styles
  const baseStyles =
    "inline-flex items-center gap-1.5 font-medium transition-all duration-200";

  // Variant styles
  const variants = {
    default: "bg-gray-100 text-gray-700 border border-gray-300",
    primary: "bg-primary-100 text-primary-700 border border-primary-300",
    secondary: "bg-navy-100 text-navy-700 border border-navy-300",
    success: "bg-green-100 text-green-700 border border-green-300",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    error: "bg-red-100 text-red-700 border border-red-300",
    info: "bg-light-200 text-navy-600 border border-light-400",

    // Solid variants
    primarySolid: "bg-primary-500 text-white shadow-sm",
    secondarySolid: "bg-navy-500 text-white shadow-sm",
    successSolid: "bg-green-500 text-white shadow-sm",
    warningSolid: "bg-yellow-500 text-white shadow-sm",
    errorSolid: "bg-red-500 text-white shadow-sm",
  };

  // Size styles
  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  // Rounded styles
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  // Combine styles
  const badgeStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${roundedStyles[rounded]} ${className}`;

  return (
    <span className={badgeStyles}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
          aria-label="Remove badge"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Badge;

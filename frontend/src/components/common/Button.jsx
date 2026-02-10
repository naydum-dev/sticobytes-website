import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
  icon: Icon,
  iconPosition = "left",
}) => {
  // Base styles (common to all buttons)
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variant styles
  const variants = {
    primary:
      "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-md hover:shadow-lg hover:scale-105",
    secondary:
      "bg-navy-500 text-white hover:bg-navy-600 focus:ring-navy-500 shadow-md hover:shadow-lg hover:scale-105",
    outline:
      "border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500",
    outlineNavy:
      "border-2 border-navy-500 text-navy-500 hover:bg-navy-500 hover:text-white focus:ring-navy-500",
    ghost: "text-primary-500 hover:bg-primary-50 focus:ring-primary-500",
    light:
      "bg-light-500 text-navy-500 hover:bg-light-600 focus:ring-light-500 shadow-sm hover:shadow-md",
    danger:
      "bg-error text-white hover:bg-red-600 focus:ring-error shadow-md hover:shadow-lg",
  };

  // Size styles
  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
  };

  // Width styles
  const widthStyles = fullWidth ? "w-full" : "";

  // Combine all styles
  const buttonStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyles} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
    >
      {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
    </button>
  );
};

export default Button;

import React from "react";

const Input = ({
  type = "text",
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  icon: Icon,
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-navy-500 mb-2"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Icon (if provided) */}
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}

        {/* Input Field */}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            w-full rounded-lg border-2 transition-all duration-200
            ${Icon ? "pl-11 pr-4" : "px-4"} py-3
            ${
              error
                ? "border-error focus:border-error focus:ring-error"
                : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
            }
            ${
              disabled
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : "bg-white"
            }
            focus:outline-none focus:ring-2 focus:ring-offset-0
            placeholder:text-gray-400
            text-gray-900
          `}
          {...props}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-error flex items-center gap-1">
          <span>⚠️</span>
          {error}
        </p>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;

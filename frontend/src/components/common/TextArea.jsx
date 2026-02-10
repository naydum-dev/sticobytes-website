import React from "react";

const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  rows = 4,
  maxLength,
  showCount = false,
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

      {/* TextArea Field */}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={`
          w-full rounded-lg border-2 px-4 py-3 transition-all duration-200
          ${
            error
              ? "border-error focus:border-error focus:ring-error"
              : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
          }
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "bg-white"}
          focus:outline-none focus:ring-2 focus:ring-offset-0
          placeholder:text-gray-400
          text-gray-900
          resize-y
        `}
        {...props}
      />

      {/* Character Count */}
      {showCount && maxLength && (
        <div className="mt-1 text-right">
          <span
            className={`text-sm ${
              value?.length >= maxLength ? "text-error" : "text-gray-500"
            }`}
          >
            {value?.length || 0} / {maxLength}
          </span>
        </div>
      )}

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

export default TextArea;

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 variant?: "primary" | "secondary" | "outline";
 size?: "sm" | "md" | "lg";
 isLoading?: boolean;
 loadingText?: string;
 className?: string;
 children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", size = "md", isLoading = false, loadingText = "Loading...", className = "", children, disabled, ...props }) => {
 const baseClasses = "font-bold rounded-lg focus:outline-none focus:ring-4 focus:ring-opacity-50 transition-transform transform hover:scale-105";

 const variantClasses = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
  secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
  outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-indigo-500",
 };

 const sizeClasses = {
  sm: "py-2 px-3 text-sm",
  md: "py-3 px-4 text-base",
  lg: "py-4 px-6 text-lg",
 };

 const isDisabled = disabled || isLoading;

 return (
  <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isDisabled} {...props}>
   {isLoading ? loadingText : children}
  </button>
 );
};

export default Button;

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
 icon?: React.ReactNode;
 className?: string;
}

const Input: React.FC<InputProps> = ({ icon, className = "", ...props }) => {
 const baseClasses = "text-gray-600 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";
 const paddingClasses = icon ? "pl-10 pr-4" : "px-4";

 return (
  <div className="relative">
   {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
   <input className={`${baseClasses} ${paddingClasses} ${className}`} {...props} />
  </div>
 );
};

export default Input;

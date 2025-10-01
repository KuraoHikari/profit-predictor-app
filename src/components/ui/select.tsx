import React from "react";

interface SelectOption {
 value: string;
 label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
 icon?: React.ReactNode;
 options?: SelectOption[];
 children?: React.ReactNode;
 className?: string;
}

const Select: React.FC<SelectProps> = ({ icon, options, children, className = "", ...props }) => {
 const baseClasses = "text-gray-600 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition appearance-none";
 const paddingClasses = icon ? "pl-10 pr-4" : "px-4";

 return (
  <div className="relative">
   {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
   <select className={`${baseClasses} ${paddingClasses} ${className}`} {...props}>
    {options
     ? options.map((option) => (
        <option key={option.value} value={option.value}>
         {option.label}
        </option>
       ))
     : children}
   </select>
  </div>
 );
};

export default Select;

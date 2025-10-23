
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: (label: string) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '' }) => {
  return (
    <button
      onClick={() => onClick(label)}
      className={`flex items-center justify-center text-3xl font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-all duration-150 active:scale-95 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;

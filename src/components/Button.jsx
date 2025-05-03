import React from 'react';

const Button = ({ text, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition duration-200 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;

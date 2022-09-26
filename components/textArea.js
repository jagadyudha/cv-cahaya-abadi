import React from "react";

const TextArea = ({ title, ...props }) => {
  return (
    <div className="my-4">
      <label>
        {title && (
          <span className="block text-xs md text-gray-500 my-2 uppercase tracking-wide">
            {title}
          </span>
        )}
        <textarea
          className="p-4 min-h-[200px] text-sm outline-none transition-colors duration-300 rounded-lg w-full border focus:ring-0 focus:border-primary focus:border-opacity-50 border-black border-opacity-10"
          {...props}
        />
      </label>
    </div>
  );
};

export default TextArea;

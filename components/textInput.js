import React from "react";

const TextInput = ({ title, ...props }) => {
  return (
    <div className="my-2 md:my-4">
      {title && (
        <span className="block label-text text-gray-500 my-2 uppercase text-xs">
          {title}
        </span>
      )}
      <input
        {...props}
        className="p-4 rounded-lg w-full border focus:border-primary focus:ring-0 border-gray-200"
      />
    </div>
  );
};

export default TextInput;

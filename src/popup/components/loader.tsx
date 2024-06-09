import React from "react";

const Loader = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-4 border-t-gray-800 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;

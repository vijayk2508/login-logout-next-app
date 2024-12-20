import React from "react";

function Divider() {
  return (
    <div className="flex items-center my-4">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-gray-500">Or</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}

export default Divider;

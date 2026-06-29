import React from "react";
import { Rocket } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Spinning ring */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-[#162660]/10" />
        <div className="absolute inset-0 rounded-full border-4 border-t-[#162660] animate-spin" />
        {/* Logo in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Rocket className="text-[#162660] w-8 h-8" />
        </div>
      </div>
      {/* Brand name */}
      <p className="mt-4 text-[#162660] font-bold text-lg tracking-widest uppercase">
        Web <span className="text-green-500">Magpie</span>
      </p>
      <p className="text-gray-400 text-sm mt-1">Loading...</p>
    </div>
  );
};

export default PageLoader;
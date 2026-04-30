"use client";

import { Search, Upload, Shield } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 bg-[#020617] border-b border-gray-800 flex items-center justify-between px-6">
      
      {/* Search */}
      <div className="flex items-center bg-[#1E293B] px-3 py-2 rounded-lg w-1/3">
        <Search size={18} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search encrypted files..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        
        {/* Encryption Status */}
        <div className="flex items-center gap-2 bg-[#1E293B] px-3 py-1.5 rounded-lg">
          <Shield size={16} className="text-green-400" />
          <span className="text-sm text-gray-300">
            AES-256 Secured
          </span>
        </div>

        {/* Upload Button */}
        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-medium">
          <Upload size={16} />
          Upload
        </button>

        {/* Notifications */}
        <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
          notifications
        </button>

        {/* Profile */}
        <div className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer">
          <span className="text-sm font-bold">U</span>
        </div>
      </div>
    </header>
  );
}
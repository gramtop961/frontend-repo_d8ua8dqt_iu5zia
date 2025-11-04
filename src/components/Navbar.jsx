import React from 'react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-neutral-950/70 backdrop-blur border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-lg bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]"></span>
          <span className="font-semibold text-neutral-100 text-lg">Agrivision</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-neutral-300">
          <a href="#learn" className="hover:text-white transition-colors">Library</a>
          <a href="#dashboard" className="hover:text-white transition-colors">Dashboard</a>
          <a href="#profile" className="hover:text-white transition-colors">Profile</a>
        </nav>
        <a href="#dashboard" className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors">
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Navbar;

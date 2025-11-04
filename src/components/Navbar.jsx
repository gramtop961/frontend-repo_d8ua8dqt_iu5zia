import React from 'react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-lg bg-green-600"></span>
          <span className="font-semibold text-slate-900 text-lg">Agrivision</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-slate-700">
          <a href="#learn" className="hover:text-slate-900">Library</a>
          <a href="#dashboard" className="hover:text-slate-900">Dashboard</a>
          <a href="#profile" className="hover:text-slate-900">Profile</a>
        </nav>
        <a href="#dashboard" className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">Get Started</a>
      </div>
    </header>
  );
};

export default Navbar;

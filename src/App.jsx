import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Library from './components/Library.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />
      <main>
        <Hero />
        <Library />
        <Dashboard />
      </main>
      <footer className="py-10 border-t border-neutral-800 bg-neutral-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-400">© {new Date().getFullYear()} Agrivision. Helping farmers grow healthier crops.</p>
          <div className="text-sm text-neutral-400">Built for education and demonstration purposes.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;

import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section id="home" className="relative">
      <div className="relative h-[520px] w-full overflow-hidden rounded-b-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-white">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_60%)]" />
        <div className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
          <Spline scene="https://prod.spline.design/Z5bY0w5g1Z0m8JtR/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Detect plant diseases with a photo</h1>
              <p className="mt-4 text-lg text-slate-700">Agrivision helps farmers diagnose crop issues instantly and get actionable treatment plans. Learn from a growing library of real-world cases and datasets.</p>
              <div className="mt-6 flex items-center gap-3">
                <a href="#dashboard" className="px-5 py-3 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition">Try the demo</a>
                <a href="#learn" className="px-5 py-3 rounded-md border border-slate-300 text-slate-800 font-medium hover:bg-white/60 transition">Explore the library</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm">
          <h3 className="font-semibold text-slate-900">Fast photo analysis</h3>
          <p className="mt-2 text-slate-600">Upload a leaf photo and get a likely diagnosis plus recommended next steps.</p>
        </div>
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm">
          <h3 className="font-semibold text-slate-900">Your case history</h3>
          <p className="mt-2 text-slate-600">Keep track of past uploads and outcomes to monitor fields over time.</p>
        </div>
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm">
          <h3 className="font-semibold text-slate-900">Learn and improve</h3>
          <p className="mt-2 text-slate-600">Browse curated datasets and examples to better identify common diseases.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

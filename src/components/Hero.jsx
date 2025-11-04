import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section id="home" className="relative">
      <div className="relative h-[560px] w-full overflow-hidden rounded-b-2xl bg-neutral-950">
        {/* Spline background */}
        <div className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
          <Spline scene="https://prod.spline.design/vc19ejtcC5VJjy5v/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>

        {/* subtle vignette and gradient glow overlays (non-interactive) */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.2),transparent_60%)]" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />

        {/* content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                Detect plant diseases with a photo
              </h1>
              <p className="mt-4 text-lg text-neutral-300">
                Agrivision helps farmers diagnose crop issues instantly and get actionable treatment plans. Learn from a
                growing library of real-world cases and datasets.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a href="#dashboard" className="px-5 py-3 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition">
                  Try the demo
                </a>
                <a href="#learn" className="px-5 py-3 rounded-md border border-neutral-700 text-neutral-200 font-medium hover:bg-neutral-800 transition">
                  Explore the library
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/60 shadow-sm">
          <h3 className="font-semibold text-white">Fast photo analysis</h3>
          <p className="mt-2 text-neutral-300">Upload a leaf photo and get a likely diagnosis plus recommended next steps.</p>
        </div>
        <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/60 shadow-sm">
          <h3 className="font-semibold text-white">Your case history</h3>
          <p className="mt-2 text-neutral-300">Keep track of past uploads and outcomes to monitor fields over time.</p>
        </div>
        <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/60 shadow-sm">
          <h3 className="font-semibold text-white">Learn and improve</h3>
          <p className="mt-2 text-neutral-300">Browse curated datasets and examples to better identify common diseases.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

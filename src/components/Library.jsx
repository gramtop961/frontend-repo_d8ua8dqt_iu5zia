import React from 'react';

const DATASETS = [
  {
    name: 'PlantVillage Dataset',
    desc: '54,000+ images across 14 crop species and 26 diseases. Great for training classification models.',
    link: 'https://www.kaggle.com/datasets/emmarex/plantdisease',
    tags: ['Classification', 'Leaf Images', 'Benchmark'],
  },
  {
    name: 'PlantDoc',
    desc: 'Real-world images of plant diseases collected in the wild with varied backgrounds and lighting.',
    link: 'https://github.com/pratikkayal/PlantDoc-Dataset',
    tags: ['Detection', 'In-the-wild', 'Diverse'],
  },
  {
    name: 'AI Challenger Agriculture',
    desc: 'Large-scale agricultural dataset for disease and pest identification tasks.',
    link: 'https://ai-competitions.com/competitions/300',
    tags: ['Large-scale', 'Pests', 'Chinese'],
  },
  {
    name: 'Corn Leaf Disease',
    desc: 'Curated set focused on corn diseases like blight, rust, and leaf spot with labeled images.',
    link: 'https://www.kaggle.com/datasets/smaranjitghose/corn-or-maize-leaf-disease-dataset',
    tags: ['Corn', 'Leaf', 'Labeled'],
  },
];

const Tag = ({ children }) => (
  <span className="px-2 py-0.5 rounded-md text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">{children}</span>
);

const Library = () => {
  return (
    <section id="learn" className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Public datasets and learning</h2>
            <p className="mt-2 text-slate-600">Use these resources to train models, benchmark performance, or simply learn to spot issues faster.</p>
          </div>
          <a href="#dashboard" className="hidden md:inline-flex px-4 py-2 rounded-md border border-slate-300 text-slate-800 hover:bg-white/60">Analyze a photo</a>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DATASETS.map((d) => (
            <a key={d.name} href={d.link} target="_blank" rel="noreferrer" className="group p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-green-700">{d.name}</h3>
              </div>
              <p className="mt-2 text-slate-600">{d.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {d.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Library;

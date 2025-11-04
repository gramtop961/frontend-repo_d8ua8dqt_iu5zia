import React, { useEffect, useMemo, useRef, useState } from 'react';

const tabs = [
  { id: 'analyze', label: 'Analyze' },
  { id: 'history', label: 'History' },
  { id: 'profile', label: 'Profile' },
];

const exampleFindings = [
  {
    disease: 'Leaf Blight',
    confidence: 0.92,
    treatment:
      'Remove affected leaves, improve air circulation, avoid overhead watering, apply a copper-based fungicide as directed.',
  },
  {
    disease: 'Powdery Mildew',
    confidence: 0.88,
    treatment:
      'Increase spacing, water early in the day, use potassium bicarbonate spray, and prune to reduce humidity.',
  },
  {
    disease: 'Leaf Rust',
    confidence: 0.9,
    treatment:
      'Collect and destroy infected debris, rotate crops, and treat with an appropriate fungicide (e.g., triazoles).',
  },
  {
    disease: 'Bacterial Leaf Spot',
    confidence: 0.86,
    treatment:
      'Avoid working with wet plants, sanitize tools, and apply copper sprays. Consider resistant varieties next season.',
  },
];

function dataURLFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const Dashboard = () => {
  const [active, setActive] = useState('analyze');
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [profile, setProfile] = useState({ name: '', location: '', crops: '' });
  const fileRef = useRef(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('agrivision_history') || '[]');
      setHistory(saved);
    } catch {}
    try {
      const prof = JSON.parse(localStorage.getItem('agrivision_profile') || '{}');
      setProfile({ name: prof.name || '', location: prof.location || '', crops: prof.crops || '' });
    } catch {}
  }, []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const onSelectFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await dataURLFromFile(file);
    setImage({ name: file.name, url });
    setResult(null);
  };

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const picked = exampleFindings[Math.floor(Math.random() * exampleFindings.length)];
    const newResult = {
      ...picked,
      date: new Date().toISOString(),
      image: image.url,
    };
    setResult(newResult);
    const updated = [newResult, ...history].slice(0, 25);
    setHistory(updated);
    localStorage.setItem('agrivision_history', JSON.stringify(updated));
    setLoading(false);
    setActive('history');
  };

  const saveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('agrivision_profile', JSON.stringify(profile));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('agrivision_history');
  };

  return (
    <section id="dashboard" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Dashboard</h2>
            <p className="mt-1 text-neutral-300">{greeting}{profile.name ? `, ${profile.name}` : ''}. Manage analyses, history, and profile.</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
          <div className="border-b border-neutral-800 bg-neutral-900/70">
            <div className="flex">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`px-5 py-3 text-sm font-medium border-r border-neutral-800 transition ${
                    active === t.id ? 'bg-neutral-900 text-emerald-400' : 'text-neutral-300 hover:bg-neutral-800/60'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Analyze */}
          {active === 'analyze' && (
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 border border-dashed border-neutral-700 rounded-xl bg-neutral-900">
                {!image ? (
                  <div className="flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-300 grid place-items-center text-2xl">🌿</div>
                    <div>
                      <p className="font-medium text-white">Upload a leaf photo</p>
                      <p className="text-neutral-400 text-sm">JPG or PNG, clear close-up works best</p>
                    </div>
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="mt-2 inline-flex items-center px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500"
                    >
                      Choose image
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" onChange={onSelectFile} className="hidden" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img src={image.url} alt="upload preview" className="w-full h-64 object-cover rounded-lg border border-neutral-800" />
                      <div className="mt-3 flex gap-2">
                        <button onClick={() => setImage(null)} className="px-3 py-2 rounded-md border border-neutral-700 text-neutral-200 hover:bg-neutral-800">Change</button>
                        <button onClick={analyze} disabled={loading} className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-60">
                          {loading ? 'Analyzing…' : 'Analyze photo'}
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800">
                        <h4 className="font-semibold text-white">What you’ll get</h4>
                        <ul className="mt-2 text-sm text-neutral-300 list-disc list-inside space-y-1">
                          <li>Likely disease classification</li>
                          <li>Confidence estimate</li>
                          <li>Step-by-step treatment plan</li>
                          <li>Saved to your history</li>
                        </ul>
                      </div>
                      {result && (
                        <div className="mt-4 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                          <p className="font-semibold text-emerald-300">Latest result: {result.disease}</p>
                          <p className="text-emerald-300/90 text-sm">Confidence: {(result.confidence * 100).toFixed(0)}%</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <aside className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
                <h4 className="font-semibold text-white">Quick tips</h4>
                <ul className="mt-2 text-sm text-neutral-300 list-disc list-inside space-y-1">
                  <li>Take photos in good light, avoid harsh shadows.</li>
                  <li>Fill the frame with the affected leaf area.</li>
                  <li>Upload multiple angles for better assessment.</li>
                </ul>
              </aside>
            </div>
          )}

          {/* History */}
          {active === 'history' && (
            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">Recent analyses</h3>
                {history.length > 0 && (
                  <button onClick={clearHistory} className="px-3 py-2 rounded-md border border-neutral-700 text-neutral-200 hover:bg-neutral-800">Clear</button>
                )}
              </div>
              {history.length === 0 ? (
                <p className="mt-4 text-neutral-300">No history yet. Analyze a photo to see results here.</p>
              ) : (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {history.map((h, idx) => (
                    <div key={idx} className="rounded-xl border border-neutral-800 overflow-hidden bg-neutral-900/60">
                      <img src={h.image} alt="result" className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <p className="font-semibold text-white">{h.disease}</p>
                        <p className="text-sm text-neutral-300">Confidence {(h.confidence * 100).toFixed(0)}% • {new Date(h.date).toLocaleString()}</p>
                        <p className="mt-2 text-sm text-neutral-200"><span className="font-medium">Treatment:</span> {h.treatment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile */}
          {active === 'profile' && (
            <div id="profile" className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <form onSubmit={saveProfile} className="lg:col-span-2 p-6 rounded-xl border border-neutral-800 bg-neutral-900/60">
                <h3 className="text-lg font-semibold text-white">Profile</h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm text-neutral-300">Display name</span>
                    <input
                      value={profile.name}
                      onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                      className="mt-1 w-full rounded-md border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-500 focus:border-emerald-500 focus:ring-emerald-500"
                      placeholder="e.g., Maria from GreenFarm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-neutral-300">Location</span>
                    <input
                      value={profile.location}
                      onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
                      className="mt-1 w-full rounded-md border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-500 focus:border-emerald-500 focus:ring-emerald-500"
                      placeholder="City, Country"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-sm text-neutral-300">Primary crops</span>
                    <input
                      value={profile.crops}
                      onChange={(e) => setProfile((p) => ({ ...p, crops: e.target.value }))}
                      className="mt-1 w-full rounded-md border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-500 focus:border-emerald-500 focus:ring-emerald-500"
                      placeholder="Tomatoes, Corn, Wheat"
                    />
                  </label>
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="submit" className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500">Save changes</button>
                  <button type="button" onClick={() => setProfile({ name: '', location: '', crops: '' })} className="px-4 py-2 rounded-md border border-neutral-700 text-neutral-200 hover:bg-neutral-800">Reset</button>
                </div>
              </form>

              <aside className="p-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
                <h4 className="font-semibold text-emerald-300">Profile tips</h4>
                <p className="mt-2 text-sm text-emerald-200/90">Set your farm details and crops to personalize recommendations and track analyses by field.</p>
                <div className="mt-4 p-4 rounded-lg bg-neutral-900 border border-neutral-800">
                  <p className="text-sm text-neutral-200"><span className="font-medium">Name:</span> {profile.name || '—'}</p>
                  <p className="text-sm text-neutral-200"><span className="font-medium">Location:</span> {profile.location || '—'}</p>
                  <p className="text-sm text-neutral-200"><span className="font-medium">Crops:</span> {profile.crops || '—'}</p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

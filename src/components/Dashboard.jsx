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
    // Simulate analysis locally for demo purposes
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
            <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
            <p className="mt-1 text-slate-600">{greeting}{profile.name ? `, ${profile.name}` : ''}. Manage analyses, history, and profile.</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50/60">
            <div className="flex">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`px-5 py-3 text-sm font-medium border-r border-slate-200 transition ${
                    active === t.id ? 'bg-white text-green-700' : 'text-slate-700 hover:bg-white/50'
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
              <div className="lg:col-span-2 p-6 border border-dashed border-slate-300 rounded-xl bg-slate-50">
                {!image ? (
                  <div className="flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center text-2xl">🌿</div>
                    <div>
                      <p className="font-medium text-slate-900">Upload a leaf photo</p>
                      <p className="text-slate-600 text-sm">JPG or PNG, clear close-up works best</p>
                    </div>
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="mt-2 inline-flex items-center px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                    >
                      Choose image
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" onChange={onSelectFile} className="hidden" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img src={image.url} alt="upload preview" className="w-full h-64 object-cover rounded-lg border" />
                      <div className="mt-3 flex gap-2">
                        <button onClick={() => setImage(null)} className="px-3 py-2 rounded-md border border-slate-300 text-slate-800 hover:bg-white">Change</button>
                        <button onClick={analyze} disabled={loading} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-60">
                          {loading ? 'Analyzing…' : 'Analyze photo'}
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="p-4 rounded-lg bg-white border">
                        <h4 className="font-semibold text-slate-900">What you’ll get</h4>
                        <ul className="mt-2 text-sm text-slate-600 list-disc list-inside space-y-1">
                          <li>Likely disease classification</li>
                          <li>Confidence estimate</li>
                          <li>Step-by-step treatment plan</li>
                          <li>Saved to your history</li>
                        </ul>
                      </div>
                      {result && (
                        <div className="mt-4 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                          <p className="font-semibold text-emerald-800">Latest result: {result.disease}</p>
                          <p className="text-emerald-700 text-sm">Confidence: {(result.confidence * 100).toFixed(0)}%</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <aside className="p-4 bg-white border rounded-xl">
                <h4 className="font-semibold text-slate-900">Quick tips</h4>
                <ul className="mt-2 text-sm text-slate-600 list-disc list-inside space-y-1">
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
                <h3 className="text-lg font-semibold text-slate-900">Recent analyses</h3>
                {history.length > 0 && (
                  <button onClick={clearHistory} className="px-3 py-2 rounded-md border border-slate-300 text-slate-800 hover:bg-white">Clear</button>
                )}
              </div>
              {history.length === 0 ? (
                <p className="mt-4 text-slate-600">No history yet. Analyze a photo to see results here.</p>
              ) : (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {history.map((h, idx) => (
                    <div key={idx} className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                      <img src={h.image} alt="result" className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <p className="font-semibold text-slate-900">{h.disease}</p>
                        <p className="text-sm text-slate-600">Confidence {(h.confidence * 100).toFixed(0)}% • {new Date(h.date).toLocaleString()}</p>
                        <p className="mt-2 text-sm text-slate-700"><span className="font-medium">Treatment:</span> {h.treatment}</p>
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
              <form onSubmit={saveProfile} className="lg:col-span-2 p-6 rounded-xl border bg-white">
                <h3 className="text-lg font-semibold text-slate-900">Profile</h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm text-slate-700">Display name</span>
                    <input
                      value={profile.name}
                      onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                      className="mt-1 w-full rounded-md border-slate-300 focus:border-green-600 focus:ring-green-600"
                      placeholder="e.g., Maria from GreenFarm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-slate-700">Location</span>
                    <input
                      value={profile.location}
                      onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
                      className="mt-1 w-full rounded-md border-slate-300 focus:border-green-600 focus:ring-green-600"
                      placeholder="City, Country"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-sm text-slate-700">Primary crops</span>
                    <input
                      value={profile.crops}
                      onChange={(e) => setProfile((p) => ({ ...p, crops: e.target.value }))}
                      className="mt-1 w-full rounded-md border-slate-300 focus:border-green-600 focus:ring-green-600"
                      placeholder="Tomatoes, Corn, Wheat"
                    />
                  </label>
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="submit" className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">Save changes</button>
                  <button type="button" onClick={() => setProfile({ name: '', location: '', crops: '' })} className="px-4 py-2 rounded-md border border-slate-300 text-slate-800 hover:bg-white">Reset</button>
                </div>
              </form>

              <aside className="p-6 rounded-xl border bg-emerald-50 border-emerald-200">
                <h4 className="font-semibold text-emerald-900">Profile tips</h4>
                <p className="mt-2 text-sm text-emerald-800">Set your farm details and crops to personalize recommendations and track analyses by field.</p>
                <div className="mt-4 p-4 rounded-lg bg-white/70">
                  <p className="text-sm text-slate-700"><span className="font-medium">Name:</span> {profile.name || '—'}</p>
                  <p className="text-sm text-slate-700"><span className="font-medium">Location:</span> {profile.location || '—'}</p>
                  <p className="text-sm text-slate-700"><span className="font-medium">Crops:</span> {profile.crops || '—'}</p>
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

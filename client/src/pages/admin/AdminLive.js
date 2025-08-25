import React, { useMemo, useState, useEffect } from 'react';

export default function AdminLive() {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState('');
  const [room, setRoom] = useState('');
  const [subject, setSubject] = useState('');
  const [password, setPassword] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/courses');
        const data = (res.ok && (await res.json())) || [];
        setCourses(Array.isArray(data) ? data : []);
      } catch {}
    })();
  }, []);

  // Sort all courses by title (no dedup; show all options)
  const sorted = useMemo(() => {
    const arr = [...(courses || [])];
    arr.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    return arr;
  }, [courses]);

  // Filter by search query (title/category/class)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(c =>
      (c.title || '').toLowerCase().includes(q) ||
      (c.category || '').toLowerCase().includes(q) ||
      (c.classLevel || '').toLowerCase().includes(q)
    );
  }, [sorted, query]);

  const picked = useMemo(() => filtered.find(c => c._id === selected), [filtered, selected]);

  useEffect(() => {
    if (!picked) return;
    const cls = (picked.classLevel || 'general').toString();
    const clsSlug = cls.replace(/\s+/g, '-').toLowerCase();
    const titleSlug = (picked.title || 'course').toString().replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    const r = `${clsSlug}-${titleSlug}`.replace(/-+/g, '-').replace(/^-|-$/g, '');
    setRoom(r);
    setSubject(`${picked.title} (${picked.classLevel || ''})`.trim());
  }, [picked]);

  return (
    <div style={{ padding: '8rem 5rem' }}>
      <h1 className="fade-in" style={{ marginBottom: 12 }}>Admin: Live Sessions</h1>
      <div className="card-modern slide-up" style={{ display:'grid', gap: 12, maxWidth: 900, padding: 16, marginTop: 12 }}>
        <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search courses by title, category, class..." className="input-modern" />
        <select value={selected} onChange={(e)=>setSelected(e.target.value)} size={10} className="input-modern" style={{ height: 'auto' }}>
          <option value="">— Select a course —</option>
          {filtered.map(c => (
            <option key={c._id} value={c._id} title={c.description || ''}>
              {c.title} {c.classLevel ? `(${c.classLevel})` : ''} {c.category ? `• ${c.category}` : ''}
            </option>
          ))}
        </select>
        <input value={room} onChange={(e)=>setRoom(e.target.value)} placeholder="Room name" className="input-modern" />
        <input value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder="Session subject/title (shown in room)" className="input-modern" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Optional room password" className="input-modern" />
        {room && (
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <a href={`/live/room/${encodeURIComponent(room)}?host=1&subject=${encodeURIComponent(subject)}&password=${encodeURIComponent(password)}`} target="_blank" rel="noreferrer" className="btn-primary">Open as Host</a>
            <button
              className="btn-secondary"
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/live/room/${encodeURIComponent(room)}?host=1&subject=${encodeURIComponent(subject)}&password=${encodeURIComponent(password)}`)}
            >Copy Host Link</button>
            <button
              className="btn-secondary"
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/live/room/${encodeURIComponent(room)}?subject=${encodeURIComponent(subject)}`)}
            >Copy Student Link</button>
          </div>
        )}
      </div>
    </div>
  );
}

// themed styles applied via classes from assets/theme.css

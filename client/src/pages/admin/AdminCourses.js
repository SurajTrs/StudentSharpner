import React, { useEffect, useState } from 'react';

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', category: '', classLevel: '', path: '', image: '', isLive: false });

  const loadCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      const data = (res.ok && (await res.json())) || [];
      setCourses(Array.isArray(data) ? data : []);
    } catch (e) {
      // noop
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCourses(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          classLevel: form.classLevel,
          path: form.path,
          image: form.image,
          isLive: Boolean(form.isLive),
        }),
      });
      if (resp.ok) {
        setForm({ title: '', description: '', category: '', classLevel: '', path: '', image: '', isLive: false });
        loadCourses();
      }
    } catch {}
  };

  return (
    <div style={{ padding: '8rem 5rem' }}>
      <h1>Admin: Courses</h1>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 720, marginTop: 12 }}>
        <input placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} style={input} required />
        <textarea placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} style={input} />
        <input placeholder="Category" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} style={input} />
        <input placeholder="Class Level (e.g., Class 9)" value={form.classLevel} onChange={(e)=>setForm({...form,classLevel:e.target.value})} style={input} />
        <input placeholder="Course Path / URL" value={form.path} onChange={(e)=>setForm({...form,path:e.target.value})} style={input} />
        <input placeholder="Image URL (https://...)" value={form.image} onChange={(e)=>setForm({...form,image:e.target.value})} style={input} />
        <label style={{ display:'flex', alignItems:'center', gap:8 }}>
          <input type="checkbox" checked={form.isLive} onChange={(e)=>setForm({...form,isLive:e.target.checked})} /> Is Live
        </label>
        <button type="submit" style={btn}>Create Course</button>
      </form>

      <h2 style={{ marginTop: 24 }}>All Courses</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display:'grid', gap:12, marginTop: 8 }}>
          {courses.map((c) => (
            <div key={c._id} style={{ border:'1px solid #e5e7eb', borderRadius:10, padding:12 }}>
              <div style={{ display:'flex', gap:12 }}>
                {c.image ? (
                  <img src={c.image} alt={c.title} style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }} />
                ) : (
                  <div style={{ width: 80, height: 60, borderRadius: 8, background: '#f3f4f6', border: '1px solid #e5e7eb' }} />)
                }
                <div style={{ flex:1, display:'flex', justifyContent:'space-between' }}>
                  <div>
                    <div style={{ fontWeight:600 }}>{c.title}</div>
                    <div style={{ color:'#6b7280', fontSize:14 }}>{c.classLevel || '—'} • {c.category || '—'} {c.isLive ? '• Live' : ''}</div>
                  </div>
                  <div>
                    {/* Future: edit/delete */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const input = { padding:'10px 12px', borderRadius:10, border:'1px solid #e5e7eb' };
const btn = { padding:'10px 14px', borderRadius:10, border:'none', background:'#2563eb', color:'#fff', fontWeight:600, width:'fit-content' };

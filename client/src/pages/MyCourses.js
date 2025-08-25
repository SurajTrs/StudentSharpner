import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const container = {
  maxWidth: 1100,
  margin: '0 auto',
  padding: '24px',
  paddingTop: '8rem',
};

const header = {
  background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
  color: '#fff',
  borderRadius: 16,
  padding: '24px',
  marginBottom: 20,
  boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: 18,
};

const card = {
  borderRadius: 14,
  background: '#fff',
  border: '1px solid #eef0f3',
  overflow: 'hidden',
  boxShadow: '0 6px 16px rgba(17,24,39,0.06)'
};

const thumb = {
  width: '100%',
  height: 140,
  background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
  objectFit: 'cover',
  display: 'block',
};

const meta = { padding: 14 };
const title = { fontSize: 16, fontWeight: 700, margin: '0 0 6px', color: '#111827' };
const sub = { fontSize: 12, color: '#6b7280', margin: 0 };

const progressWrap = { marginTop: 12, background: '#f3f4f6', height: 8, borderRadius: 9999, overflow: 'hidden' };
const progressBar = (pct) => ({ width: `${pct}%`, height: '100%', background: '#10b981' });

const actions = { display: 'flex', gap: 10, padding: 14, paddingTop: 0 };
const primaryBtn = {
  flex: 1,
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  padding: '10px 12px',
  borderRadius: 10,
  fontWeight: 600,
  cursor: 'pointer'
};
const secondaryBtn = {
  flex: 1,
  background: '#eef2ff',
  color: '#3730a3',
  border: 'none',
  padding: '10px 12px',
  borderRadius: 10,
  fontWeight: 600,
  cursor: 'pointer'
};

const empty = {
  textAlign: 'center',
  background: '#fff',
  border: '1px dashed #d1d5db',
  borderRadius: 14,
  padding: 32,
};

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function cacheKey(email) {
  return `my_courses_${email}`;
}

function loadCached(email) {
  try {
    const raw = localStorage.getItem(cacheKey(email));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.timestamp || !Array.isArray(parsed.data)) return null;
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch { return null; }
}

function saveCached(email, data) {
  try {
    localStorage.setItem(cacheKey(email), JSON.stringify({ timestamp: Date.now(), data }));
  } catch {}
}

const MyCoursesPage = () => {
  const { user } = useAuth();
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let aborted = false;
    const fetchCourses = async () => {
      if (!user?.email) {
        setLoading(false);
        setPurchasedCourses([]);
        return;
      }

      // 1) Serve cached data instantly, if available
      const cached = loadCached(user.email.toLowerCase());
      if (cached && !aborted) {
        setPurchasedCourses(cached);
        setLoading(false);
      }

      // 2) Background refresh
      try {
        const url = `http://localhost:5001/api/courses/my?email=${encodeURIComponent(user.email.toLowerCase())}`;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 10000); // 10s timeout
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        if (aborted) return;
        const contentType = res.headers.get('content-type') || '';
        let data;
        if (contentType.includes('application/json')) data = await res.json();
        else data = [];
        if (!res.ok) throw new Error(data?.error || 'Failed to fetch purchased courses');
        const arr = Array.isArray(data) ? data : [];
        saveCached(user.email.toLowerCase(), arr);
        setPurchasedCourses(arr);
        setError(null);
      } catch (err) {
        if (!cached) setError(err.message);
      } finally {
        if (!cached) setLoading(false);
      }
    };

    fetchCourses();
    return () => { aborted = true; };
  }, [user?.email]);

  if (loading) {
    // skeleton grid
    return (
      <div style={{ ...container }}>
        <div style={header}>
          <h1 style={{ margin: 0, fontSize: 24 }}>My Courses</h1>
          <p style={{ margin: '6px 0 0', opacity: 0.9 }}>All your purchased courses in one place.</p>
        </div>
        <div style={grid}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={card}>
              <div style={{ ...thumb, background: '#e5e7eb' }} />
              <div style={{ padding: 14 }}>
                <div style={{ height: 18, background: '#e5e7eb', borderRadius: 6, width: '70%' }} />
                <div style={{ height: 12, background: '#eef0f3', borderRadius: 6, width: '50%', marginTop: 8 }} />
                <div style={{ ...progressWrap, marginTop: 12 }}>
                  <div style={{ width: '40%', height: '100%', background: '#ddd' }} />
                </div>
              </div>
              <div style={{ display:'flex', gap:10, padding:14, paddingTop:0 }}>
                <div style={{ flex:1, height:38, background:'#e5e7eb', borderRadius:10 }} />
                <div style={{ flex:1, height:38, background:'#e5e7eb', borderRadius:10 }} />
                <div style={{ flex:1, height:38, background:'#e5e7eb', borderRadius:10 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (!user?.email) return <p style={{ textAlign: 'center', padding: 24 }}>Please sign in to view your courses.</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', padding: 24 }}>{error}</p>;

  const getThumb = (c) => c?.image || null;
  const getSubtitle = (c) => [c?.classLevel, c?.category].filter(Boolean).join(' • ');
  const getProgress = () => 0; // placeholder until progress tracking exists

  return (
    <div style={container}>
      <div style={header}>
        <h1 style={{ margin: 0, fontSize: 24 }}>My Courses</h1>
        <p style={{ margin: '6px 0 0', opacity: 0.9 }}>All your purchased courses in one place.</p>
      </div>

      {purchasedCourses.length === 0 ? (
        <div style={empty}>
          <h3 style={{ marginTop: 0 }}>No courses yet</h3>
          <p style={{ marginTop: 6, color: '#6b7280' }}>Purchase a course to see it here.</p>
          <a href="/" style={{ display: 'inline-block', marginTop: 10, textDecoration: 'none', background: '#111827', color: '#fff', padding: '10px 14px', borderRadius: 10, fontWeight: 600 }}>Browse Courses</a>
        </div>
      ) : (
        <div style={grid}>
          {purchasedCourses.map((c) => {
            const pct = getProgress(c);
            const thumbUrl = getThumb(c);
            return (
              <div key={c._id} style={card}>
                {thumbUrl ? (
                  <img src={thumbUrl} alt={c.title || 'Course image'} style={thumb} loading="lazy" />
                ) : (
                  <div style={thumb} />
                )}
                <div style={meta}>
                  <h3 style={title}>{c.title || 'Untitled Course'}</h3>
                  <p style={sub}>{getSubtitle(c) || 'Self-paced course'}</p>
                  <div style={progressWrap}>
                    <div style={progressBar(pct)} />
                  </div>
                </div>
                <div style={actions}>
                  <button style={primaryBtn} onClick={() => window.location.href = c.path || '#'}>Continue</button>
                  <button
                    style={secondaryBtn}
                    onClick={() => {
                      const cls = (c.classLevel || 'general').toString();
                      const clsSlug = cls.replace(/\s+/g, '-').toLowerCase();
                      const titleSlug = (c.title || 'course').toString().replace(/[^a-z0-9]+/gi, '-').toLowerCase();
                      const room = `${clsSlug}-${titleSlug}`.replace(/-+/g, '-').replace(/^-|-$/g, '');
                      const subject = encodeURIComponent(`${c.title || ''}${c.classLevel ? ' (' + c.classLevel + ')' : ''}`.trim());
                      navigate(`/live/room/${encodeURIComponent(room)}?subject=${subject}`);
                    }}
                  >
                    Live Class
                  </button>
                  <button style={secondaryBtn} onClick={() => alert('Coming soon')}>Details</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;

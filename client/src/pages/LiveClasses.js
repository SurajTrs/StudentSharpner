import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LiveClasses = () => {
  const { user } = useAuth();
  const [liveClasses, setLiveClasses] = useState([]);
  const [room, setRoom] = useState('');
  const [purchased, setPurchased] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  // The server expects classLevel values like "Class 12"

  // Fetch purchased courses for the logged-in user
  useEffect(() => {
    const fetchPurchased = async () => {
      try {
        if (!user?.email) {
          setPurchased([]);
          return;
        }
        const url = `http://localhost:5001/api/courses/my?email=${encodeURIComponent(user.email.toLowerCase())}`;
        const res = await fetch(url);
        const data = (res.ok && (await res.json())) || [];
        const arr = Array.isArray(data) ? data : [];
        setPurchased(arr);
        // Auto-select first available classLevel
        const firstClass = arr.map(c => c.classLevel).filter(Boolean)[0] || '';
        setSelectedClass(firstClass);
      } catch (e) {
        console.warn('Failed to load purchased courses for live filter');
      }
    };
    fetchPurchased();
  }, [user?.email]);

  const preselectedClass = location?.state?.classLevel || '';

  const purchasedClasses = useMemo(() => {
    const set = new Set((purchased || []).map(c => c.classLevel).filter(Boolean));
    // Ensure preselected class appears even if purchases haven't loaded yet
    if (preselectedClass) set.add(preselectedClass);
    return Array.from(set);
  }, [purchased, preselectedClass]);

  // Fetch live classes for the selected class level only
  useEffect(() => {
    const cls = (selectedClass || '').trim();
    if (!cls) { setLiveClasses([]); return; }
    axios
      .get(`http://localhost:5001/api/courses/live/${encodeURIComponent(cls)}`)
      .then((res) => {
        setLiveClasses(res.data || []);
      })
      .catch((err) => console.error('Error fetching live classes:', err));
  }, [selectedClass]);

  // If navigated with a preselected class from MyCourses, set it
  useEffect(() => {
    const cls = preselectedClass;
    if (cls) setSelectedClass(cls);
  }, [preselectedClass]);

  const handleJoin = (e) => {
    e.preventDefault();
    const r = (room || '').trim();
    if (!r) return;
    navigate(`/live/room/${encodeURIComponent(r)}`, { state: { classLevel: selectedClass } });
  };

  return (
    <div style={{ padding: '7.5rem 1.5rem 3rem' }}>
      <section className="card-modern gradient-purple slide-up" style={{
        maxWidth: 1100,
        margin: '0 auto',
        borderRadius: 18,
        padding: '24px',
        color: '#fff'
      }}>
        <h1 style={{ margin: 0, fontSize: 26 }}>Free Live Classes</h1>
        <p style={{ margin: '8px 0 0', opacity: .95 }}>Join live sessions for the class levels included in your purchases.</p>
      </section>

      <section className="slide-up" style={{ maxWidth: 1100, margin: '14px auto 0' }}>
        {!user?.email && (
          <div className="card-modern" style={{ padding: 12, borderRadius: 12, color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)', background: 'rgba(245, 158, 11, 0.06)' }}>
            Please log in to see your purchased classes.
          </div>
        )}

        <div className="card-modern" style={{ padding: 16, borderRadius: 16, marginTop: 12 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{ fontWeight: 600 }}>Class Level</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="input-modern"
              style={{ minWidth: 220 }}
            >
              <option value="" disabled>
                {purchasedClasses.length ? 'Select your class' : 'No purchased classes yet'}
              </option>
              {purchasedClasses.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <form onSubmit={handleJoin} style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Enter room name (e.g., physics-12a)"
              className="input-modern"
              style={{ flex: 1, minWidth: 260 }}
            />
            <button type="submit" disabled={!selectedClass} className="btn-primary">
              Join
            </button>
          </form>
        </div>
      </section>

      <section className="slide-up" style={{ maxWidth: 1100, margin: '14px auto 0' }}>
        <h2 style={{ margin: '0 0 10px' }}>Live Courses for {selectedClass || '—'}</h2>
        {!selectedClass ? (
          <div className="card-modern" style={{ padding: 16, borderRadius: 16 }}>
            <p style={{ margin: 0 }}>Please select a class level from your purchased courses.</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
              <a href="/my-courses" className="btn-secondary">Go to My Courses</a>
              <a href="/courses" className="btn-secondary">Browse Courses</a>
            </div>
          </div>
        ) : liveClasses.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {liveClasses.map((course) => (
              <div key={course._id} className="card-modern hover-lift" style={{ padding: 14, borderRadius: 14 }}>
                <h3 style={{ margin: '0 0 6px' }}>{course.title}</h3>
                {course.description && <p style={{ margin: 0, color: 'var(--text-muted)' }}>{course.description}</p>}
                <div style={{ marginTop: 10 }}>
                  {course.path ? (
                    <a href={course.path} target="_blank" rel="noreferrer" className="btn-secondary">Open Course</a>
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>Currently live</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-modern" style={{ padding: 16, borderRadius: 16 }}>
            <p style={{ margin: 0 }}>No ongoing live classes right now.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default LiveClasses;

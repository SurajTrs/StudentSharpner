import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiBookOpen, FiVideo, FiTrendingUp, FiClock, FiArrowRight } from 'react-icons/fi';
import '../App.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const displayName = user?.name || (user?.email ? user.email.split('@')[0] : 'Student');

  const goCourses = () => navigate('/courses');
  const goMyCourses = () => navigate('/my-courses');
  const goLive = () => navigate('/live');

  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '3rem' }}>
      {/* Hero */}
      <section className="card-modern gradient-purple" style={{
        maxWidth: 1100,
        margin: '0 auto',
        borderRadius: 18,
        padding: '28px 24px',
        color: '#fff'
      }} aria-label="Welcome">
        <h1 className="fade-in" style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>Welcome back, {displayName}</h1>
        <p className="fade-in" style={{ margin: '8px 0 0', opacity: .95 }}>
          Your personalized learning hub. Access courses, track progress, and join live sessions.
        </p>
        <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={goMyCourses}><FiBookOpen /> My Courses</button>
          <button className="btn-secondary" onClick={goLive}><FiVideo /> Join Live</button>
          <button className="btn-secondary" onClick={goCourses}><FiArrowRight /> Browse Courses</button>
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: 1100, margin: '16px auto 0' }} className="slide-up" aria-label="Key metrics">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          <div className="card-modern" style={{ padding: 16, borderRadius: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
            <FiTrendingUp size={22} color="var(--purple-400)" />
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Learning Streak</div>
              <div style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>3 days</div>
            </div>
          </div>
          <div className="card-modern" style={{ padding: 16, borderRadius: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
            <FiBookOpen size={22} color="var(--purple-400)" />
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Active Courses</div>
              <div style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>2</div>
            </div>
          </div>
          <div className="card-modern" style={{ padding: 16, borderRadius: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
            <FiClock size={22} color="var(--purple-400)" />
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Hours Studied</div>
              <div style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>14.5 h</div>
            </div>
          </div>
          <div className="card-modern" style={{ padding: 16, borderRadius: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
            <FiVideo size={22} color="var(--purple-400)" />
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Upcoming Live</div>
              <div style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>Today 7:00 PM</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section style={{ maxWidth: 1100, margin: '16px auto 0' }} className="slide-up" aria-label="Quick actions">
        <div className="card-modern" style={{ padding: 16, borderRadius: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <h3 style={{ margin: 0 }}>Quick Actions</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            <button className="btn-primary" onClick={goMyCourses}><FiBookOpen /> Continue Learning</button>
            <button className="btn-secondary" onClick={goLive}><FiVideo /> Join Today’s Live</button>
            <button className="btn-secondary" onClick={goCourses}><FiArrowRight /> Explore New Courses</button>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section style={{ maxWidth: 1100, margin: '16px auto 0' }} className="slide-up" aria-label="Recommended courses">
        <div className="card-modern" style={{ padding: 16, borderRadius: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 10 }}>Recommended for You</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {[{
              title: 'JEE Main Crash', sub: 'High-yield practice sets'
            }, {
              title: 'NEET Foundation', sub: 'Strengthen your basics'
            }, {
              title: 'Class 9 Physics', sub: 'Concept clarity + PYQs'
            }].map((c, idx) => (
              <div key={idx} className="card-modern hover-lift" style={{ borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ height: 120, background: 'linear-gradient(135deg, var(--purple-700), var(--purple-500))' }} />
                <div style={{ padding: 14 }}>
                  <h4 style={{ margin: 0 }}>{c.title}</h4>
                  <p style={{ margin: '6px 0 0', color: 'var(--text-muted)' }}>{c.sub}</p>
                </div>
                <div style={{ padding: 14, paddingTop: 0 }}>
                  <button className="btn-secondary" onClick={goCourses}>View <FiArrowRight /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section style={{ maxWidth: 1100, margin: '16px auto' }} className="slide-up" aria-label="Recent activity">
        <div className="card-modern" style={{ padding: 16, borderRadius: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 10 }}>Recent Activity</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
            <li className="fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}>
              <span>Continued NEET Udaan 2028 – Class 9 Foundation</span>
              <span style={{ color: 'var(--text-muted)' }}>2h ago</span>
            </li>
            <li className="fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}>
              <span>Joined Live Class: Physics – Motion</span>
              <span style={{ color: 'var(--text-muted)' }}>Yesterday</span>
            </li>
            <li className="fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}>
              <span>Attempted Practice Test – Algebra</span>
              <span style={{ color: 'var(--text-muted)' }}>2 days ago</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

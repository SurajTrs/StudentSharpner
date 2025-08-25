import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiAward, FiBarChart2, FiUser, FiMail, FiMapPin, FiBookOpen, FiGrid, FiStar } from 'react-icons/fi';
import '../App.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({});
  const [avatar, setAvatar] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || 'NA',
        school: user.school || 'NA',
        studentClass: user.studentClass || 'NA',
        stream: user.stream || 'NA',
        exams: user.exams || 'NA',
      });
      setAvatar(user.avatar || user.name?.charAt(0).toUpperCase());
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);  // Create blob URL for the selected image
      setAvatar(previewUrl); // Update avatar state with the blob URL
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{ padding: '7.5rem 1.5rem 3rem' }}>
      {/* Hero / Header */}
      <section className="card-modern gradient-purple slide-up" style={{
        maxWidth: 1100,
        margin: '0 auto',
        borderRadius: 18,
        padding: 24,
        color: '#fff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22 }}>
            {avatar && avatar.startsWith('blob:') ? (
              <img src={avatar} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <span>{(formData.name || 'NA').charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 24, lineHeight: 1.2 }}>Profile</h1>
            <p style={{ margin: '6px 0 0', opacity: .95 }}>Manage your account details and track your progress.</p>
          </div>
          <div>
            <button className="btn-secondary" onClick={handleUploadClick}>Change Avatar</button>
            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          </div>
        </div>
      </section>

      <section className="slide-up" style={{ maxWidth: 1100, margin: '14px auto 0' }}>
        {/* Level Up Overview */}
        <div className="card-modern" style={{ padding: 16, borderRadius: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><FiAward color="var(--purple-400)" /> Level Up Overview</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            <div className="card-modern" style={{ padding: 14, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <FiBarChart2 color="var(--purple-400)" />
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Total XP</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>0</div>
              </div>
            </div>
            <div className="card-modern" style={{ padding: 14, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <FiStar color="var(--purple-400)" />
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Highest Level</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>NA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="card-modern" style={{ padding: 16, borderRadius: 16, marginTop: 12 }}>
          <h3 style={{ margin: 0, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}><FiUser color="var(--purple-400)" /> Profile Detail</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: 10, borderRadius: 12 }}><strong style={{ color: 'var(--text-muted)' }}><FiUser /> Name:</strong> {formData.name || 'NA'}</div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: 10, borderRadius: 12 }}><strong style={{ color: 'var(--text-muted)' }}><FiMail /> Email:</strong> {formData.email || 'NA'}</div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: 10, borderRadius: 12 }}><strong style={{ color: 'var(--text-muted)' }}><FiMapPin /> Address:</strong> {formData.address || 'NA'}</div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: 10, borderRadius: 12 }}><strong style={{ color: 'var(--text-muted)' }}><FiGrid /> Class:</strong> {formData.studentClass || 'NA'}</div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: 10, borderRadius: 12 }}><strong style={{ color: 'var(--text-muted)' }}><FiBookOpen /> Stream:</strong> {formData.stream || 'NA'}</div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: 10, borderRadius: 12 }}><strong style={{ color: 'var(--text-muted)' }}><FiAward /> Exams:</strong> {formData.exams || 'NA'}</div>
          </div>
        </div>

        {/* Performance */}
        <div className="card-modern" style={{ padding: 16, borderRadius: 16, marginTop: 12 }}>
          <h3 style={{ margin: 0, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}><FiBarChart2 color="var(--purple-400)" /> Performance as Doubt Solver</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            <div className="card-modern hover-lift" style={{ padding: 14, borderRadius: 14 }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Total Doubts Solved</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 2 }}>0</div>
            </div>
            <div className="card-modern hover-lift" style={{ padding: 14, borderRadius: 14 }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Satisfactory Rate</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 2 }}>0%</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;

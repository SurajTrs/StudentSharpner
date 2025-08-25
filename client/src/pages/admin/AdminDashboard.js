import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div style={{ padding: '8rem 5rem' }}>
      <h1>Admin Dashboard</h1>
      <p style={{ color: '#6b7280' }}>Manage courses and live sessions.</p>
      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        <Link to="/admin/courses" style={{ padding: '12px 14px', border: '1px solid #e5e7eb', borderRadius: 10 }}>Courses</Link>
        <Link to="/admin/live" style={{ padding: '12px 14px', border: '1px solid #e5e7eb', borderRadius: 10 }}>Live Sessions</Link>
      </div>
    </div>
  );
}

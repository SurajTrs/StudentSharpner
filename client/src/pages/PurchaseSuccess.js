import React from 'react';
import { Link } from 'react-router-dom';

const wrapper = {
  maxWidth: 700,
  margin: '0 auto',
  padding: '40px 24px',
  textAlign: 'center',
};

const card = {
  background: '#ffffff',
  border: '1px solid #eef0f3',
  borderRadius: 16,
  padding: 28,
  boxShadow: '0 10px 24px rgba(17,24,39,0.08)'
};

const big = { fontSize: 28, margin: 0 };
const sub = { color: '#6b7280', marginTop: 8 };

const actions = { marginTop: 18, display: 'flex', gap: 10, justifyContent: 'center' };
const primaryBtn = {
  display: 'inline-block',
  textDecoration: 'none',
  background: '#111827',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: 10,
  fontWeight: 600,
};
const secondaryBtn = {
  display: 'inline-block',
  textDecoration: 'none',
  background: '#eef2ff',
  color: '#3730a3',
  padding: '10px 16px',
  borderRadius: 10,
  fontWeight: 600,
};

export default function PurchaseSuccess() {
  return (
    <div style={wrapper}>
      <div style={card}>
        <h1 style={big}>Purchase Successful</h1>
        <p style={sub}>Your course has been added to My Courses. You can start learning right away.</p>
        <div style={actions}>
          <Link to="/my-courses" style={primaryBtn}>Go to My Courses</Link>
          <Link to="/courses" style={secondaryBtn}>Browse More</Link>
        </div>
      </div>
    </div>
  );
}

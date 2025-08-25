import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ADMIN_EMAILS } from '../config/admin';

// Simple Jitsi Meet embed using external_api.js
export default function LiveRoom() {
  const { room } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const apiRef = useRef(null);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [delayed, setDelayed] = useState(false);
  const delayTimer = useRef(null);
  const sp = new URLSearchParams(location.search);
  const isHost = sp.get('host') === '1' && (user?.email ? ADMIN_EMAILS.includes(user.email.toLowerCase()) : false);
  const subject = sp.get('subject') || '';
  const password = sp.get('password') || '';

  const displayName = useMemo(() => user?.displayName || user?.email?.split('@')[0] || 'Guest', [user?.displayName, user?.email]);

  useEffect(() => {
    let disposed = false;
    // Free access: ignore class level gating
    const requiredClass = '';

    const guard = async () => {
      if (!room) {
        navigate('/live');
        return;
      }
      if (!user?.email) {
        navigate('/live', { state: { message: 'Please log in to join live classes.' } });
        return;
      }
      // Admin host bypass or any logged-in user (free access)
      setAllowed(true);
      // Inject Jitsi script if not present
        const existing = document.querySelector('script[data-jitsi="1"]');
        const start = () => {
          if (!window.JitsiMeetExternalAPI || disposed) return;
          const domain = 'meet.jit.si';
          const options = {
            roomName: room,
            parentNode: containerRef.current,
            width: '100%',
            height: 600,
            userInfo: { displayName },
            configOverwrite: { startWithAudioMuted: true, prejoinPageEnabled: false },
            interfaceConfigOverwrite: { DEFAULT_REMOTE_DISPLAY_NAME: 'Participant' },
          };
          // start delayed timer (10s)
          try { if (delayTimer.current) clearTimeout(delayTimer.current); } catch {}
          setDelayed(false);
          delayTimer.current = setTimeout(() => setDelayed(true), 10000);
          apiRef.current = new window.JitsiMeetExternalAPI(domain, options);
          apiRef.current.addListener('videoConferenceJoined', async () => {
            try {
              if (subject) apiRef.current.executeCommand('subject', subject);
              if (password) {
                if (isHost) {
                  // Host sets the password on join
                  try { await apiRef.current.executeCommand('password', password); } catch {}
                }
              }
            } finally {
              try { if (delayTimer.current) clearTimeout(delayTimer.current); } catch {}
              setDelayed(false);
              setLoading(false);
            }
          });
          // If password protected, non-host participants will be prompted via 'passwordRequired'
          apiRef.current.addListener('passwordRequired', async () => {
            if (password) {
              try { await apiRef.current.executeCommand('password', password); } catch {}
            }
          });
        };
        if (!existing) {
          const script = document.createElement('script');
          script.src = 'https://meet.jit.si/external_api.js';
          script.async = true;
          script.dataset.jitsi = '1';
          script.onload = start;
          script.onerror = () => setLoading(false);
          document.body.appendChild(script);
        } else {
          start();
        }
    };
    guard();

    return () => {
      disposed = true;
      try { if (delayTimer.current) clearTimeout(delayTimer.current); } catch {}
      try { apiRef.current && apiRef.current.dispose(); } catch {}
    };
  }, [room, navigate, user?.email, location?.state?.classLevel]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Live Class: {room}</h1>
      {loading && allowed && (
        <div className="card-modern" style={{ padding: 16, borderRadius: 14, marginBottom: 12 }}>
          <p style={{ margin: 0 }}>Connecting to the live room...</p>
          {delayed && (
            <div style={{ marginTop: 8 }}>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>It's taking longer than usual.</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                <a className="btn-secondary" href={`https://meet.jit.si/${encodeURIComponent(room)}`} target="_blank" rel="noreferrer">Open in New Window</a>
                <button className="btn-primary" onClick={() => window.location.reload()}>Retry</button>
              </div>
            </div>
          )}
        </div>
      )}
      {!allowed && <p>Verifying your access...</p>}
      <div ref={containerRef} />
      {allowed && isHost && (
        <div style={{ marginTop: '1rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={() => apiRef.current?.executeCommand('muteEveryone')} style={hostBtn}>Mute All</button>
          <button onClick={() => apiRef.current?.executeCommand('toggleTileView')} style={hostBtn}>Toggle Tile View</button>
          <button onClick={() => apiRef.current?.executeCommand('toggleShareScreen')} style={hostBtn}>Share Screen</button>
          <button onClick={() => { try { apiRef.current?.dispose(); } catch {}; navigate('/admin/live'); }} style={{ ...hostBtn, background: '#dc2626' }}>End Session</button>
        </div>
      )}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => navigate('/live')} className="btn-secondary">Back to Live</button>
      </div>
    </div>
  );
}

const hostBtn = { padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#111827', color: '#fff' };

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const { success, error } = router.query;
  const [tokens, setTokens] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch token status
    fetch('/api/auth/status')
      .then((res) => res.json())
      .then((data) => {
        setTokens(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getStatusIcon = (provider) => {
    if (tokens[provider]) return '✅';
    return '❌';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🍽️ Lazy Chef Dashboard</h1>

        {success && (
          <div style={styles.success}>
            ✅ {success.replace(/_/g, ' ')}
          </div>
        )}

        {error && (
          <div style={styles.error}>
            ❌ {error.replace(/_/g, ' ')}
          </div>
        )}

        <div style={styles.section}>
          <h2>Connected Services</h2>
          <div style={styles.serviceList}>
            <div style={styles.serviceItem}>
              <span>{getStatusIcon('swiggy')} Swiggy</span>
              {!tokens.swiggy && (
                <button
                  onClick={() => router.push('/login')}
                  style={styles.connectBtn}
                >
                  Connect
                </button>
              )}
            </div>
            <div style={styles.serviceItem}>
              <span>{getStatusIcon('whatsapp')} WhatsApp</span>
              {!tokens.whatsapp && (
                <button
                  onClick={() => router.push('/login')}
                  style={styles.connectBtn}
                >
                  Connect
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2>Redirect URIs for Setup</h2>
          <p style={styles.info}>
            Use these URLs in your OAuth provider settings:
          </p>
          <div style={styles.uriBox}>
            <p>
              <strong>Swiggy Redirect URI:</strong><br />
              <code style={styles.codeBlock}>
                {typeof window !== 'undefined' && `${window.location.origin}/api/auth/swiggy-callback`}
              </code>
            </p>
          </div>
          <div style={styles.uriBox}>
            <p>
              <strong>WhatsApp (Meta) Redirect URI:</strong><br />
              <code style={styles.codeBlock}>
                {typeof window !== 'undefined' && `${window.location.origin}/api/auth/whatsapp-callback`}
              </code>
            </p>
          </div>
        </div>

        <div style={styles.section}>
          <h2>Environment Variables Needed</h2>
          <div style={styles.envBox}>
            <code style={styles.code}>
              NEXT_PUBLIC_SWIGGY_CLIENT_ID=your_swiggy_client_id<br />
              SWIGGY_CLIENT_SECRET=your_swiggy_client_secret<br />
              NEXT_PUBLIC_META_APP_ID=your_meta_app_id<br />
              META_APP_SECRET=your_meta_app_secret<br />
              WHATSAPP_TOKEN=your_whatsapp_token<br />
              WHATSAPP_PHONE_ID=your_phone_id<br />
              WHATSAPP_VERIFY_TOKEN=your_verify_token
            </code>
          </div>
        </div>

        <div style={styles.section}>
          <h2>Next Steps</h2>
          <ol style={styles.stepsList}>
            <li>Register the Redirect URIs in Swiggy MCP Builders dashboard</li>
            <li>Register the Redirect URIs in Meta App settings</li>
            <li>Add all environment variables to .env.local</li>
            <li>Click the "Connect" buttons above to authorize</li>
            <li>Start using the WhatsApp bot!</li>
          </ol>
        </div>

        <div style={styles.footer}>
          <button onClick={() => router.push('/')} style={styles.homeBtn}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    maxWidth: '700px',
    margin: '0 auto',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: '2em',
    margin: '0 0 20px 0',
    color: '#333',
  },
  success: {
    background: '#d4edda',
    color: '#155724',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '1em',
  },
  error: {
    background: '#f8d7da',
    color: '#721c24',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '1em',
  },
  section: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #eee',
  },
  serviceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  serviceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    background: '#f9f9f9',
    borderRadius: '6px',
    fontSize: '1.1em',
  },
  connectBtn: {
    padding: '6px 12px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9em',
  },
  info: {
    color: '#666',
    marginBottom: '15px',
  },
  uriBox: {
    background: '#f9f9f9',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '15px',
    border: '1px solid #ddd',
  },
  codeBlock: {
    display: 'block',
    background: '#fff',
    padding: '10px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '0.85em',
    wordBreak: 'break-all',
    color: '#333',
    border: '1px solid #ddd',
  },
  envBox: {
    background: '#1e1e1e',
    padding: '15px',
    borderRadius: '6px',
  },
  code: {
    color: '#00ff00',
    fontFamily: 'monospace',
    fontSize: '0.9em',
    display: 'block',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  stepsList: {
    color: '#333',
    lineHeight: '1.8',
  },
  footer: {
    textAlign: 'center',
    marginTop: '30px',
  },
  homeBtn: {
    padding: '10px 20px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1em',
  },
};

import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const handleSwiggyAuth = () => {
    const redirectUri = `${window.location.origin}/api/auth/swiggy-callback`;
    const state = Math.random().toString(36).substring(7);

    // Store state in localStorage for verification
    localStorage.setItem('swiggy_state', state);

    // Redirect to Swiggy OAuth endpoint (you'll get this from Swiggy dashboard)
    const swiggyAuthUrl = `https://auth.swiggy.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_SWIGGY_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&state=${state}&scope=orders+profile`;

    window.location.href = swiggyAuthUrl;
  };

  const handleWhatsAppAuth = () => {
    const redirectUri = `${window.location.origin}/api/auth/whatsapp-callback`;
    const state = Math.random().toString(36).substring(7);

    // Store state in localStorage for verification
    localStorage.setItem('whatsapp_state', state);

    // Redirect to Meta OAuth endpoint
    const metaAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_META_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&state=${state}&scope=whatsapp_business_messaging`;

    window.location.href = metaAuthUrl;
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🍽️ Lazy Chef</h1>
        <p style={styles.subtitle}>Connect your services to get started</p>

        <div style={styles.authButtons}>
          <button
            onClick={handleSwiggyAuth}
            style={{ ...styles.button, ...styles.swiggyButton }}
          >
            🛒 Connect with Swiggy
          </button>

          <button
            onClick={handleWhatsAppAuth}
            style={{ ...styles.button, ...styles.whatsappButton }}
          >
            💬 Connect with WhatsApp
          </button>
        </div>

        <div style={styles.info}>
          <h3>Redirect URIs</h3>
          <p style={styles.code}>
            <strong>Swiggy:</strong><br />
            {typeof window !== 'undefined' && `${window.location.origin}/api/auth/swiggy-callback`}
          </p>
          <p style={styles.code}>
            <strong>WhatsApp:</strong><br />
            {typeof window !== 'undefined' && `${window.location.origin}/api/auth/whatsapp-callback`}
          </p>
        </div>

        <div style={styles.footer}>
          <p style={styles.small}>Use these Redirect URIs in your OAuth provider settings</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: '2.5em',
    margin: '0 0 10px 0',
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: '1.1em',
    color: '#666',
    textAlign: 'center',
    marginBottom: '30px',
  },
  authButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px',
  },
  button: {
    padding: '12px 20px',
    fontSize: '1em',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: 'white',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  swiggyButton: {
    background: '#1F855F',
  },
  whatsappButton: {
    background: '#25D366',
  },
  info: {
    background: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  code: {
    background: '#fff',
    padding: '10px',
    borderRadius: '4px',
    fontSize: '0.9em',
    fontFamily: 'monospace',
    margin: '10px 0',
    wordBreak: 'break-all',
    color: '#333',
  },
  footer: {
    textAlign: 'center',
    color: '#999',
  },
  small: {
    fontSize: '0.9em',
    margin: 0,
  },
};

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>🍽️ Lazy Chef</h1>
        <p style={styles.subtitle}>AI-powered dinner recommendations on WhatsApp</p>

        <div style={styles.card}>
          <h2>Features</h2>
          <ul style={styles.list}>
            <li>✨ Personalized recipe suggestions</li>
            <li>🛒 Order missing ingredients via Swiggy</li>
            <li>🌱 Vegetarian and dietary preferences</li>
            <li>⚡ Real-time WhatsApp integration</li>
          </ul>
        </div>

        <div style={styles.card}>
          <h2>Getting Started</h2>
          <p>Message <strong>+1 234 567 8900</strong> on WhatsApp</p>
          <p>Say "recipe" to get started!</p>
        </div>

        <div style={styles.card}>
          <h2>API Status</h2>
          <p style={styles.status}>✅ All systems operational</p>
          <ul style={styles.list}>
            <li>Recipes: Ready</li>
            <li>WhatsApp Webhook: Ready</li>
            <li>Swiggy Integration: Configured</li>
          </ul>
        </div>

        <footer style={styles.footer}>
          <p>Made with ❤️ for lazy home cooks</p>
          <p style={styles.small}>
            <a href="https://github.com/yourusername/lazy-chef" style={styles.link}>GitHub</a>
          </p>
        </footer>
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
  content: {
    maxWidth: '600px',
    width: '100%',
  },
  title: {
    fontSize: '3em',
    color: 'white',
    margin: '0 0 10px 0',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.2em',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: '30px',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: '10px 0',
  },
  status: {
    color: '#22c55e',
    fontWeight: 'bold',
    fontSize: '1.1em',
  },
  footer: {
    textAlign: 'center',
    color: 'white',
    marginTop: '40px',
  },
  small: {
    fontSize: '0.9em',
    margin: '5px 0 0 0',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    borderBottom: '1px solid white',
  },
};

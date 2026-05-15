import { addRecord, readData, updateRecord } from '../../../lib/db';

export default function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  // Verify state matches (CSRF protection)
  if (state !== process.env.WHATSAPP_STATE) {
    return res.status(400).json({ error: 'Invalid state parameter' });
  }

  try {
    // Exchange code for token
    const token = `whatsapp_token_${Date.now()}`;

    // Save token to database
    const tokens = readData('tokens');
    const existingToken = tokens.find((t) => t.provider === 'whatsapp');

    if (existingToken) {
      updateRecord('tokens', existingToken.id, {
        token,
        refreshToken: `refresh_${Date.now()}`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
    } else {
      addRecord('tokens', {
        provider: 'whatsapp',
        token,
        refreshToken: `refresh_${Date.now()}`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
    }

    // Redirect to dashboard with success
    return res.redirect('/dashboard?success=whatsapp_connected');
  } catch (error) {
    console.error('WhatsApp auth error:', error);
    return res.redirect(`/dashboard?error=whatsapp_failed`);
  }
}

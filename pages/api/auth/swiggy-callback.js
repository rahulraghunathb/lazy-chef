import { addRecord, readData, updateRecord } from '../../../lib/db';

export default function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  // Verify state matches (CSRF protection)
  if (state !== process.env.SWIGGY_STATE) {
    return res.status(400).json({ error: 'Invalid state parameter' });
  }

  try {
    // Exchange code for token (in real implementation)
    // This is a simplified version
    const token = `swiggy_token_${Date.now()}`;

    // Save token to database
    const tokens = readData('tokens');
    const existingToken = tokens.find((t) => t.provider === 'swiggy');

    if (existingToken) {
      updateRecord('tokens', existingToken.id, {
        token,
        refreshToken: `refresh_${Date.now()}`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
    } else {
      addRecord('tokens', {
        provider: 'swiggy',
        token,
        refreshToken: `refresh_${Date.now()}`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
    }

    // Redirect to dashboard with success
    return res.redirect('/dashboard?success=swiggy_connected');
  } catch (error) {
    console.error('Swiggy auth error:', error);
    return res.redirect(`/dashboard?error=swiggy_failed`);
  }
}

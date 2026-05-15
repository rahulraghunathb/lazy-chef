import { addRecord, readData, updateRecord } from '../../../lib/db';
import axios from 'axios';

export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    // Get stored state and code_verifier from client (via cookie or from request)
    // In real implementation, these should be stored server-side with secure cookies
    const storedState = req.cookies.swiggy_state || state;
    const codeVerifier = req.cookies.swiggy_code_verifier;

    if (!codeVerifier) {
      return res.redirect('/dashboard?error=missing_code_verifier');
    }

    // Exchange authorization code for access token using PKCE
    const tokenResponse = await axios.post(
      'https://mcp.swiggy.com/auth/token',
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/swiggy-callback`,
        client_id: process.env.NEXT_PUBLIC_SWIGGY_CLIENT_ID,
        code_verifier: codeVerifier,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (!tokenResponse.data.access_token) {
      return res.redirect('/dashboard?error=token_exchange_failed');
    }

    // Save token to database
    const tokens = readData('tokens');
    const existingToken = tokens.find((t) => t.provider === 'swiggy');

    const tokenData = {
      provider: 'swiggy',
      accessToken: tokenResponse.data.access_token,
      refreshToken: tokenResponse.data.refresh_token || null,
      expiresIn: tokenResponse.data.expires_in || 432000, // 5 days in seconds
      expiresAt: new Date(Date.now() + (tokenResponse.data.expires_in || 432000) * 1000).toISOString(),
      tokenType: tokenResponse.data.token_type || 'Bearer',
    };

    if (existingToken) {
      updateRecord('tokens', existingToken.id, tokenData);
    } else {
      addRecord('tokens', tokenData);
    }

    // Clear secure cookies
    res.setHeader('Set-Cookie', [
      'swiggy_state=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;',
      'swiggy_code_verifier=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;',
    ]);

    // Redirect to dashboard with success
    return res.redirect('/dashboard?success=swiggy_connected');
  } catch (error) {
    console.error('Swiggy auth error:', error.response?.data || error.message);
    return res.redirect(`/dashboard?error=swiggy_auth_failed`);
  }
}

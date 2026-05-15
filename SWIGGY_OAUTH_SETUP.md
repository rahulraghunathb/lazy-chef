# Swiggy MCP OAuth 2.1 with PKCE - Setup Guide

Swiggy MCP uses **OAuth 2.1 with PKCE** (Proof Key for Code Exchange) - a more secure flow than traditional OAuth 2.0.

---

## 🔑 Key Differences from Standard OAuth 2.0

✅ **PKCE Enabled** - No client secret needed (more secure for public clients)
✅ **Code Challenge** - Uses SHA-256 hashing
✅ **5-day Token Expiry** - Access tokens valid for 5 days
✅ **HTTPS Required** - Except for localhost development

---

## 📋 OAuth Flow Steps

1. **Generate PKCE parameters:**
   - Create random `code_verifier` (43-128 chars)
   - Hash it to create `code_challenge` (SHA-256, Base64 URL-safe)

2. **Redirect to Swiggy auth:**
   ```
   https://mcp.swiggy.com/auth/authorize?
     client_id=YOUR_CLIENT_ID&
     redirect_uri=http://localhost:3000/api/auth/swiggy-callback&
     response_type=code&
     state=RANDOM_STATE&
     code_challenge=GENERATED_CHALLENGE&
     code_challenge_method=S256
   ```

3. **User authorizes** on Swiggy's consent page

4. **Swiggy redirects back** with `code` and `state`

5. **Exchange code for token:**
   ```bash
   POST https://mcp.swiggy.com/auth/token
   
   {
     "grant_type": "authorization_code",
     "code": CODE_FROM_REDIRECT,
     "redirect_uri": "http://localhost:3000/api/auth/swiggy-callback",
     "client_id": "YOUR_CLIENT_ID",
     "code_verifier": "THE_ORIGINAL_VERIFIER"
   }
   ```

---

## 🚀 Setup Instructions

### Step 1: Register with Swiggy

1. Go to [Swiggy MCP Builders](https://mcp.swiggy.com/builders/access/)
2. Create a new app or open existing one
3. In **OAuth Settings**, register your Redirect URI:
   ```
   http://localhost:3000/api/auth/swiggy-callback
   ```
4. Get your **Client ID** (no Client Secret needed for PKCE)

### Step 2: Update Environment Variables

Edit `.env.local`:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SWIGGY_CLIENT_ID=your_client_id_from_swiggy
```

### Step 3: Test Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/login` and click "Connect with Swiggy"

### Step 4: Check Token

After authorization, your token is saved in `data/tokens.json`:
```json
{
  "provider": "swiggy",
  "accessToken": "eyJ...",
  "expiresAt": "2026-05-21T12:00:00.000Z",
  "tokenType": "Bearer"
}
```

---

## 🔗 Redirect URI Requirements

**Local Development:**
```
http://localhost:3000/api/auth/swiggy-callback
```

**Vercel Production:**
```
https://your-app.vercel.app/api/auth/swiggy-callback
```

### Rules:
- ✅ HTTPS required (except localhost)
- ✅ Exact match (no wildcards)
- ✅ Port number must match
- ❌ NO query parameters in registered URI
- ❌ NO trailing slashes

---

## 🔄 Token Refresh

Access tokens expire in **5 days**. Before token expiry:

```bash
POST https://mcp.swiggy.com/auth/token

{
  "grant_type": "refresh_token",
  "refresh_token": "STORED_REFRESH_TOKEN",
  "client_id": "YOUR_CLIENT_ID"
}
```

---

## 📚 Swiggy API Endpoints

After getting the access token, use it to call Swiggy APIs:

```bash
# All requests need Authorization header
Authorization: Bearer {access_token}
```

### Available endpoints:
- `GET /v1/restaurants` - Search restaurants
- `GET /v1/instamart/merchants` - Get grocery stores
- `GET /v1/products/{id}` - Get product details
- `POST /v1/orders` - Create order

See [Swiggy MCP Documentation](https://mcp.swiggy.com/builders/docs/) for full API reference.

---

## 🐛 Troubleshooting

### "Invalid redirect_uri"
- Make sure exact match in Swiggy dashboard
- Check for trailing slashes
- Verify http vs https

### "code_verifier mismatch"
- Code verifier not stored properly
- Browser local storage not accessible
- Try clearing localStorage: `localStorage.clear()`

### "Invalid code"
- Authorization code expired (120 second window)
- Code already used (single-use only)
- Try the OAuth flow again

### "Token exchange failed"
- Check NEXT_PUBLIC_SWIGGY_CLIENT_ID is set
- Verify network connectivity to `mcp.swiggy.com`
- Check browser console for CORS errors

---

## ✅ Verification Checklist

- [ ] Client ID obtained from Swiggy dashboard
- [ ] Redirect URI registered in Swiggy
- [ ] `.env.local` has NEXT_PUBLIC_SWIGGY_CLIENT_ID
- [ ] Localhost dev server running on port 3000
- [ ] OAuth flow completes without errors
- [ ] Token saved to `data/tokens.json`
- [ ] Token has `accessToken` and `expiresAt` fields

---

## 📖 References

- [Swiggy MCP Authentication Docs](https://mcp.swiggy.com/builders/docs/start/authenticate/)
- [OAuth 2.1 with PKCE Specification](https://datatracker.ietf.org/doc/html/rfc7636)
- [RFC 8414 - OAuth Authorization Server Metadata](https://datatracker.ietf.org/doc/html/rfc8414)

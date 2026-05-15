# Lazy Chef - Setup Guide

This guide walks you through setting up the OAuth authentication flows for Swiggy and WhatsApp.

## 🚀 Quick Start (Local Dev)

```bash
cd C:\Users\Rahul\Desktop\HUSTLE\lazy-chef
npm install
npm run dev
```

Visit `http://localhost:3000/login` to see your **Redirect URIs**

---

## 📋 Redirect URIs

Once deployed (local or Vercel), your Redirect URIs are:

```
Swiggy:   http://localhost:3000/api/auth/swiggy-callback
WhatsApp: http://localhost:3000/api/auth/whatsapp-callback
```

Or on Vercel:
```
Swiggy:   https://your-app.vercel.app/api/auth/swiggy-callback
WhatsApp: https://your-app.vercel.app/api/auth/whatsapp-callback
```

---

## 🔗 Step 1: Swiggy MCP Setup

1. Go to [Swiggy MCP Builders](https://mcp.swiggy.com/builders/access/)
2. Log in to your account
3. Create a new application or edit existing one
4. Find **OAuth Settings** or **Redirect URIs**
5. Add: `http://localhost:3000/api/auth/swiggy-callback`
6. Copy your **Client ID** and **Client Secret**
7. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SWIGGY_CLIENT_ID=your_client_id
   SWIGGY_CLIENT_SECRET=your_client_secret
   ```

---

## 💬 Step 2: Meta WhatsApp Setup

1. Go to [Meta Developers Console](https://developers.facebook.com/)
2. Create or select your app
3. Go to **Settings** → **Basic**
4. Copy your **App ID** and **App Secret**
5. Go to **Products** → **WhatsApp** → **Configuration**
6. In **Webhook Callback URL**, add: `http://localhost:3000/api/webhooks/whatsapp`
7. In **Redirect URIs**, add: `http://localhost:3000/api/auth/whatsapp-callback`
8. Add to `.env.local`:
   ```
   NEXT_PUBLIC_META_APP_ID=your_app_id
   META_APP_SECRET=your_app_secret
   WHATSAPP_VERIFY_TOKEN=your_verify_token (create any random string)
   ```

---

## 🔐 Step 3: Environment Variables

Your `.env.local` should have:

```bash
# Swiggy OAuth
NEXT_PUBLIC_SWIGGY_CLIENT_ID=your_swiggy_client_id
SWIGGY_CLIENT_SECRET=your_swiggy_client_secret

# Meta/WhatsApp OAuth
NEXT_PUBLIC_META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
WHATSAPP_VERIFY_TOKEN=create_a_random_string

# WhatsApp Cloud API (for sending messages)
WHATSAPP_TOKEN=your_business_account_token
WHATSAPP_PHONE_ID=your_phone_number_id

# Swiggy API (for ordering)
SWIGGY_API_KEY=your_swiggy_api_key
```

---

## ✅ Step 4: Test OAuth Flow

1. Start the dev server: `npm run dev`
2. Go to `http://localhost:3000/login`
3. Click "Connect with Swiggy" button
4. You'll be redirected to Swiggy's OAuth page
5. After authorizing, you'll be redirected back to `/api/auth/swiggy-callback`
6. The token will be saved to `data/tokens.json`
7. Check `http://localhost:3000/dashboard` to see connection status

---

## 🌐 Deploy to Vercel

1. Push to GitHub:
   ```bash
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com) and import your GitHub repo

3. Add environment variables:
   - Go to **Settings** → **Environment Variables**
   - Add all `.env.local` variables

4. **Update Redirect URIs** in both Swiggy and Meta:
   - Change from `http://localhost:3000` to `https://your-app.vercel.app`

5. Deploy!

---

## 📂 File Structure

```
pages/
├── login.js                       # OAuth login page
├── dashboard.js                   # Connection status dashboard
└── api/auth/
    ├── swiggy-callback.js        # Swiggy OAuth callback
    ├── whatsapp-callback.js      # WhatsApp OAuth callback
    └── status.js                 # Check which services are connected

data/
├── tokens.json                   # Stored OAuth tokens
├── users.json                    # User profiles
├── orders.json                   # Order history
└── recommendations.json          # Recipe recommendations
```

---

## 🐛 Troubleshooting

### "Invalid Redirect URI"
- Make sure the Redirect URI exactly matches in the OAuth provider settings
- No trailing slashes
- Check http vs https

### "State mismatch" error
- Clear browser localStorage: `localStorage.clear()`
- Make sure `SWIGGY_STATE` and `WHATSAPP_STATE` are set in `.env.local`

### WhatsApp messages not sending
- Verify `WHATSAPP_TOKEN` and `WHATSAPP_PHONE_ID` are correct
- Make sure your phone number is verified in Meta Business Account

---

## 📞 WhatsApp Bot Commands

Once set up, users can message your bot with:

- `recipe` - Get dinner recommendation
- `vegetarian` - Switch to vegetarian only
- `order <ingredient>` - Order from Swiggy
- `pantry` - View saved ingredients
- `help` - Show all commands

---

## 🚦 Next Steps

1. ✅ Run locally and test OAuth flow
2. ✅ Get tokens from Swiggy and Meta
3. ✅ Deploy to Vercel
4. ✅ Update Redirect URIs in production
5. ✅ Test WhatsApp bot with real messages

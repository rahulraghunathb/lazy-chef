# Lazy Chef - Redirect URIs for OAuth Setup

Use these Redirect URIs when configuring OAuth in Swiggy MCP Builders and Meta App Dashboard.

---

## 🔗 Local Development (localhost:3000)

### Swiggy MCP OAuth Redirect URI
```
http://localhost:3000/api/auth/swiggy-callback
```

### Meta WhatsApp OAuth Redirect URI
```
http://localhost:3000/api/auth/whatsapp-callback
```

---

## 🌐 Production (Vercel Deployment)

Replace `your-app` with your actual Vercel deployment name.

### Swiggy MCP OAuth Redirect URI
```
https://your-app.vercel.app/api/auth/swiggy-callback
```

### Meta WhatsApp OAuth Redirect URI
```
https://your-app.vercel.app/api/auth/whatsapp-callback
```

---

## 📝 How to Register These URIs

### For Swiggy MCP Builders

1. Go to https://mcp.swiggy.com/builders/access/
2. Navigate to your application settings
3. Find "Redirect URIs" or "OAuth Configuration"
4. Add the Swiggy Redirect URI above
5. Save your **Client ID** and **Client Secret**

### For Meta (WhatsApp)

1. Go to https://developers.facebook.com/
2. Select your app
3. Go to **Settings** → **Basic** (for App ID and Secret)
4. Go to **Products** → **WhatsApp** → **Configuration**
5. Add the WhatsApp Redirect URI above
6. Add the webhook URL: `https://your-app.vercel.app/api/webhooks/whatsapp`

---

## 🔐 Next Steps After Registration

After registering the URIs:

1. Update your `.env.local` with credentials from Swiggy and Meta
2. Test the OAuth flow at `/login` page
3. Check connection status at `/dashboard`

---

## 💾 Environment Variables Template

```bash
# Swiggy OAuth
NEXT_PUBLIC_SWIGGY_CLIENT_ID=paste_from_swiggy_dashboard
SWIGGY_CLIENT_SECRET=paste_from_swiggy_dashboard

# Meta WhatsApp OAuth
NEXT_PUBLIC_META_APP_ID=paste_from_meta_dashboard
META_APP_SECRET=paste_from_meta_dashboard
WHATSAPP_VERIFY_TOKEN=create_any_random_string

# WhatsApp Cloud API
WHATSAPP_TOKEN=your_business_token
WHATSAPP_PHONE_ID=your_phone_number_id

# Swiggy API
SWIGGY_API_KEY=your_api_key
```

---

## ✅ Verification Checklist

- [ ] Swiggy Redirect URI registered
- [ ] Meta Redirect URI registered
- [ ] Swiggy Client ID in `.env.local`
- [ ] Swiggy Client Secret in `.env.local`
- [ ] Meta App ID in `.env.local`
- [ ] Meta App Secret in `.env.local`
- [ ] WhatsApp Verify Token in `.env.local`
- [ ] OAuth flow working locally (`/login` → `/dashboard`)
- [ ] Deployed to Vercel
- [ ] Updated URIs in dashboards for production
- [ ] WhatsApp webhook verified

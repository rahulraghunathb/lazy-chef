# Lazy Chef 🍽️

An AI-powered dinner recommendation bot integrated with WhatsApp and Swiggy. Get personalized meal suggestions and order missing ingredients on-demand.

## Features

- 💬 WhatsApp chatbot for dinner recommendations
- 📝 Preference-based recipe filtering (vegetarian, cuisine, cook time)
- 🛒 One-tap ingredient ordering via Swiggy Instamart
- 🍴 Restaurant recommendations when you don't want to cook
- 💾 Local JSON file database (no backend DB needed)

## Setup

### Prerequisites
- Node.js 16+
- WhatsApp Business Account (for Meta WhatsApp Cloud API)
- Swiggy MCP API access
- GitHub account (for deployment)

### Local Development

1. **Clone and install**
   ```bash
   npm install
   ```

2. **Configure environment**
   - Copy `.env.local` and fill in your credentials:
   ```
   WHATSAPP_TOKEN=your_token
   WHATSAPP_PHONE_ID=your_phone_id
   WHATSAPP_VERIFY_TOKEN=your_verify_token
   SWIGGY_API_KEY=your_api_key
   ```

3. **Run dev server**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:3000`

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Add environment variables in Settings → Environment Variables
   - Deploy!

3. **Update Webhooks**
   - WhatsApp: Set webhook URL to `https://your-vercel-url.vercel.app/api/webhooks/whatsapp`
   - Verify token matches `WHATSAPP_VERIFY_TOKEN`

## API Endpoints

- `GET /api/recipes/recommend?vegetarian=true&cuisine=Indian&maxCookTime=30` - Get recipe recommendations
- `POST /api/orders/create` - Create ingredient order
- `POST /api/webhooks/whatsapp` - WhatsApp webhook for incoming messages

## WhatsApp Commands

- **"recipe"** - Get a random dinner recommendation
- **"vegetarian"** - Switch to vegetarian recipes only
- **"order <ingredient>"** - Order ingredients via Swiggy
- **"pantry"** - View your pantry items
- **"help"** - See all available commands

## Data Structure

```
data/
├── users.json          # User profiles & preferences
├── recommendations.json # Recipe recommendation history
└── orders.json         # Order history
```

## Tech Stack

- **Frontend**: React 18
- **Backend**: Next.js 14 API Routes
- **Database**: Local JSON files
- **Integrations**: WhatsApp Cloud API, Swiggy MCP
- **Deployment**: Vercel

## Contributing

This is a side project! Feel free to fork and contribute.

## License

MIT

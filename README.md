This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Framework & Libraries
- **Next.js** (v15) for file-based routing
- **React** (hooks for state and lifecycle).
- **Tailwind** CSS for styling.

## Folder Strcuture
```
src
├── app
│   ├── city
│   │   └── [name]   # Dynamic route for city-weather information
│   ├── crypto
│   │   └── [coin]   # Dynamic route for cryptocurrency details
│   ├── dashboard    
│   └── news
│       └── [articleId]  # Dynamic route for news articles
├── components       # Reusable UI components
├── constants        # Static values (API endpoints, config, etc.)
└── utils            # Helper functions 
```

## Deployed on Vercel
 [vercelLink](https://crypto-weather-nexus-gamma.vercel.app/)
 
## API
 - **Weather Data**: OpenWeatherMap 
 - **Crypto Data**: CoinGecko, CoinCap
 - **News Headlines**: NewsData.io


 
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Setup
### 🚀 Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)
- [Yarn](https://yarnpkg.com/) or npm (Node package manager)

### 📥 Clone the Repository
1. Open a terminal and navigate to the directory where you want to clone the project.
2. Run the following command:
   ```sh
   git clone https://github.com/manish-gkv/CryptoWeather-Nexus.git
3. Navigate into the project directory:
    ```sh
    cd CryptoWeather-Nexus
    
### 📦 Install Dependencies
Depending on the package manager you're using, run:

- Using **npm**:
    ```sh
    npm install

- Using **yarn**:
    ```sh
    yarn install
    
### ⚙️ Configure Environment Variables
- .env file
    ```
    NEXT_PUBLIC_NEWS_DATA_API=
    NEXT_PUBLIC_OPENWEATHER_API = 
    NEXT_PUBLIC_COINGECKO_API =
    ```
    
### 🏃 Run the Development Server
- npm
    ```sh
    npm run dev
- yarn
    ```sh
    yarn dev

### 🌍 Open in Browser

Open [http://localhost:3000](http://localhost:3000) with your browser .

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


 
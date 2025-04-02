'use client';

import { useState, useEffect } from 'react';

import { formatNumber, calculate24hChange } from '../utils/crypto.jsx';
import { coinCap_ws, coinGeckoUrl } from '../constants/urls.jsx';

export default function CryptoSection() {
    const [prices, setPrices] = useState({});
    const [cryptos, setCryptos] = useState([]);
    const [usdToInr, setUsdToInr] = useState(83);

    useEffect(() => {
        const pricesWs = new WebSocket(coinCap_ws + '?assets=bitcoin,ethereum,solana');

        pricesWs.onmessage = function(event) {
            const data = JSON.parse(event.data);
            //console.log(data);
            setPrices((prev) => ({ ...prev, ...data }));
            //console.log(prices);
        }
        async function fetchConversionRate(coinGeckoUrl) {
            const response = await fetch(coinGeckoUrl + "exchange_rates");
            const data = await response.json();
            setUsdToInr((prev) => data.rates.inr.value)
        }
        async function fetchCryptoData() {

            const COINGECKO_API = process.env.NEXT_PUBLIC_COINGECKO_API;

            const url = coinGeckoUrl+'coins/markets?vs_currency=inr&ids=bitcoin%2Cethereum%2Csolana';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': COINGECKO_API
                }
            };

            const response = await fetch(url, options)
            const data = await response.json();
            const cryptoData = data.map(({ id, name, symbol, image, current_price, market_cap, price_change_24h }) => ({
                id,
                name,
                symbol,
                image,
                current_price,
                market_cap,
                price_change_24h
            }));

            setCryptos((prev) => cryptoData);
        }
        fetchCryptoData();

        return () => pricesWs.close();
    }, []);

    return (
        <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cryptos.map((crypto) => {
        const change = calculate24hChange(crypto.current_price, crypto.price_change_24h, crypto.id, usdToInr, prices);
         return (<div
          key={crypto.symbol}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full">
                <img src={crypto.image} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {crypto.name}
                </h3>
                <p className="text-gray-600">{crypto.symbol.toUpperCase()}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price</span>
              <span className="text-primary-green font-semibold">
                ₹{prices[crypto.id] ? (parseInt(prices[crypto.id])*usdToInr) : crypto.current_price}
              </span>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-gray-600">24h Change</span>
                <div className="inline-flex items-center gap-1">
                    <span className={change.isPositive ? "text-primary-green" : "text-red-500"}>{change.isPositive ? '▲' : '▼'}
                    </span>
                    <span className={`font-semibold ${change.isPositive ? "text-primary-green" : "text-red-500"}`}>
                        {change.value}
                    </span>
                </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Market Cap</span>
              <span className="text-gray-800 font-medium">
                {formatNumber(crypto.market_cap)}
              </span>
            </div>
          </div>
        </div>)
      })}
    </div>
    </div>
    );
}
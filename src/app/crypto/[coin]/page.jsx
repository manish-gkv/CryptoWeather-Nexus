'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiTwitter, FiGithub, FiUsers } from 'react-icons/fi';

import { coinCap_ws, coinGeckoUrl } from '../../../constants/urls.jsx';

export default function Page() {
    const { coin } = useParams();
    const [data, setData] = useState(null);

    const COINGECKO_API = process.env.NEXT_PUBLIC_COINGECKO_API;

    useEffect(() => {
        async function fetchData() {
            const url = coinGeckoUrl+`coins/${coin}?vs_currency=inr`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': COINGECKO_API
                }
            };

            const response = await fetch(url, options)
            const json = await response.json();
            console.log(json);
            setData((prev)=>json);
        }
        fetchData();
    }, [coin]);

    if (!data) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const formatNumber = (num) => {
        if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
        if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
        if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
        return num;
    };

    const PriceChange = ({ value }) => (
        <span className={`flex items-center ${value >= 0 ? 'text-primary-green' : 'text-red-500'}`}>
            {value >= 0 ? '▲' : '▼'} {Math.abs(value).toFixed(2)}%
        </span>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                            <img 
                                src={data.image.small} 
                                alt={data.name} 
                                className="w-16 h-16"
                            />
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-800">
                                    {data.name} ({data?.symbol?.toUpperCase()})
                                </h1>
                                <p className="text-gray-600">Rank #{data?.market_data?.market_cap_rank}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-primary-green">
                                ${data?.market_data?.current_price?.usd.toLocaleString()}
                            </div>
                            <PriceChange value={data?.market_data?.price_change_percentage_24h} />
                        </div>
                    </div>
                </div>

                

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Market Data */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Market Data</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Market Cap</span>
                                <span className="text-gray-800">
                                    ${data?.market_data?.market_cap?.usd?.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">24h Volume</span>
                                <span className="text-gray-800">
                                    ${data?.market_data?.total_volume?.usd?.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">All-Time High</span>
                                <div className="text-right">
                                    <div>${data?.market_data?.ath?.usd?.toLocaleString()}</div>
                                    <div className="text-sm">
                                        <PriceChange value={data?.market_data?.ath_change_percentage?.usd} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">All-Time Low</span>
                                <div className="text-right">
                                    <div>${data?.market_data?.atl?.usd?.toLocaleString()}</div>
                                    <div className="text-sm">
                                        <PriceChange value={data?.market_data?.atl_change_percentage?.usd} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Supply */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Supply</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Circulating</span>
                                <span className="text-gray-800">
                                    {data?.market_data?.circulating_supply?.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Supply</span>
                                <span className="text-gray-800">
                                    {data?.market_data?.total_supply?.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Max Supply</span>
                                <span className="text-gray-800">
                                    {data?.market_data?.max_supply?.toLocaleString() || '∞'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Community */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Community</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FiTwitter className="text-blue-500" />
                                    <span className="text-gray-600">Twitter Followers</span>
                                </div>
                                <span className="text-gray-800">
                                    {formatNumber(data?.community_data?.twitter_followers)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FiGithub className="text-gray-800" />
                                    <span className="text-gray-600">GitHub Stars</span>
                                </div>
                                <span className="text-gray-800">
                                    {formatNumber(data?.developer_data?.stars)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FiUsers className="text-purple-500" />
                                    <span className="text-gray-600">Reddit Subscribers</span>
                                </div>
                                <span className="text-gray-800">
                                    {formatNumber(data?.community_data?.reddit_subscribers)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Developer Activity */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Developer Activity</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-green">
                                {data?.developer_data?.forks}
                            </div>
                            <div className="text-gray-600">GitHub Forks</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-green">
                                {data?.developer_data?.pull_request_contributors}
                            </div>
                            <div className="text-gray-600">Contributors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-green">
                                {data?.developer_data?.commit_count_4_weeks}
                            </div>
                            <div className="text-gray-600">Monthly Commits</div>
                        </div>
                        <div className="text-center">
                            <div className="flex flex-col items-center">
                                <div className="flex gap-1 mb-1">
                                    <span className="text-primary-green">+{data?.developer_data?.code_additions_deletions_4_weeks?.additions}</span>
                                    <span className="text-red-500">-{Math.abs(data?.developer_data?.code_additions_deletions_4_weeks?.deletions)}</span>
                                </div>
                                <div className="text-gray-600">Code Changes</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
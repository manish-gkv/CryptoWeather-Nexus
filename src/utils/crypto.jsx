const formatNumber = (num) => {
    if (num >= 1_000_000_000_000) return `₹${(num / 1_000_000_000_000).toFixed(2)}T`;
    if (num >= 1_000_000_000) return `₹${(num / 1_000_000_000).toFixed(2)}B`;
    if (num >= 1_000_000) return `₹${(num / 1_000_000).toFixed(2)}M`;
    return `₹${num.toLocaleString()}`;
};

const calculate24hChange = (currentPrice, priceChange24h, id, usdToInr, prices) => {
        if (!currentPrice || !priceChange24h) return { value: "0.00%", isPositive: true }; 
        if(prices[id]) currentPrice = parseInt(prices[id])*usdToInr;
        const oldPrice = currentPrice - priceChange24h;
        const percentageChange = (priceChange24h / oldPrice) * 100;
        return {
            value: `${Math.abs(percentageChange).toFixed(2)}%`,
            isPositive: percentageChange > 0
        };
    };

export {formatNumber, calculate24hChange};
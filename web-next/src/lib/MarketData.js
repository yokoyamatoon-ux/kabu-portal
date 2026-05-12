import marketDataFallback from '../data/market.json';

export const getMarketData = async () => {
  try {
    // Attempt to fetch fresh data from the public data directory
    // Add a cache-busting timestamp to ensure we don't get a stale version
    const response = await fetch(`/data/market.json?t=${Date.now()}`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Fetch failed');
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch real-time market data, using fallback:', error);
    return marketDataFallback;
  }
}

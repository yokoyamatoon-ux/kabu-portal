// Mocking real-time market data for high performance
// In a real production environment, you would use an API like Twelve Data or Polygon.io

export const getMarketData = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    { 
      label: '日経平均 🇯🇵', 
      price: (38500 + Math.random() * 100).toFixed(2), 
      change: (Math.random() * 2 - 1).toFixed(2),
      history: Array.from({length: 20}, () => Math.random() * 100)
    },
    { 
      label: 'S&P500 🇺🇸', 
      price: (5120 + Math.random() * 20).toFixed(2), 
      change: (Math.random() * 1.5 - 0.75).toFixed(2),
      history: Array.from({length: 20}, () => Math.random() * 100)
    },
    { 
      label: 'ドル円 💴', 
      price: (150.25 + Math.random() * 0.5).toFixed(2), 
      change: (Math.random() * 0.4 - 0.2).toFixed(2),
      history: Array.from({length: 20}, () => Math.random() * 100)
    },
    { timestamp: new Date().toLocaleString('ja-JP') }
  ]
}

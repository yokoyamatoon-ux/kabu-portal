"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getMarketData } from "./MarketData";

const MarketContext = createContext([]);

export function MarketProvider({ children }) {
  const [marketData, setMarketData] = useState([]);
  useEffect(() => {
    const fetchMarket = async () => {
      const data = await getMarketData();
      setMarketData(data);
    };
    fetchMarket();
    const interval = setInterval(fetchMarket, 30000);
    return () => clearInterval(interval);
  }, []);
  return React.createElement(MarketContext.Provider, { value: marketData }, children);
}

export function useMarketData() {
  return useContext(MarketContext);
}

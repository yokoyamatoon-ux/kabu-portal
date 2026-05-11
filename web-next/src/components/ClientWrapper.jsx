"use client";

import React from "react";
import { Layout } from "./Layout";
import { MarketProvider, useMarketData } from "../lib/MarketContext";

function InnerLayout({ children }) {
  const marketData = useMarketData();
  return React.createElement(Layout, { marketData }, children);
}

export const ClientWrapper = ({ children }) => {
  return React.createElement(MarketProvider, null,
    React.createElement(InnerLayout, null, children)
  );
};

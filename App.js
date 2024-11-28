import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './Navigation/Navigation';
import { WatchlistProvider } from './context/WatchlistContext';

export default function App() {
  return (
    <WatchlistProvider>
     <StatusBar barStyle="light-content" backgroundColor="#171717" />
      <Navigation />
    </WatchlistProvider>
  );
}

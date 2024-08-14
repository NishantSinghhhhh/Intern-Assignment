"use client";
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'; // Import Provider with a different name
import store from './Store';

const AppProvider = ({ children }) => {
  return (
    <ReduxProvider store={store}> {/* Use the renamed Provider here */}
      {children}
    </ReduxProvider>
  );
}

export default AppProvider;

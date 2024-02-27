import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, ThemeConfig, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store/RootReducer.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({ config });

const queryClient = new QueryClient()

const stotre = configureStore({
  reducer: rootReducer
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
     <ChakraProvider theme={theme}>
      <Provider store={stotre}>
       <App />
      </Provider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

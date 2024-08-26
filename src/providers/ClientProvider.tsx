'use client'; // Ensures this component is treated as a client-side component

import React from 'react';
import { ReactQueryClientProvider } from '@/providers/queryClient';
import ReduxProvider from '@/providers/ReduxProvider'; // Ensure this path is correct
import { Toaster } from 'sonner';

const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReactQueryClientProvider>
      <ReduxProvider>
        <Toaster position="top-right" richColors />
        {children}
      </ReduxProvider>
    </ReactQueryClientProvider>
  );
};

export default ClientProviders;

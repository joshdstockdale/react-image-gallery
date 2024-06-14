import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";

import PhotosPage from "./pages/Photos";
import PhotoDetail from "./pages/PhotoDetail";
import ErrorBoundary from "@/components/ErrorBoundary";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<PhotosPage />} />
          <Route path=":id" element={<PhotoDetail />} />
        </Routes>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;

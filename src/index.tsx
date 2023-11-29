import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Home} from "./pages/Home";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const queryClient = new QueryClient();

const Index = () => {
  return ( 
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router>
            <Routes>
                  <Route path="/" element={<Home/>}/>
              </Routes> 
          </Router>
        </LocalizationProvider>
      </QueryClientProvider>
  ); 
};

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(<Index/>);
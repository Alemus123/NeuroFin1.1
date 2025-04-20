import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './theme/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import AppRoutes from './routes';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
        <ThemeToggle />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

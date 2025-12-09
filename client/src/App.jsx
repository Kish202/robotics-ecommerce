import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routesapp';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/ShoppingContext';
import './styles/index.css';


function App() {
  return (

    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

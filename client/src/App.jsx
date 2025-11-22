 import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routesapp';
import { AuthProvider} from './contexts/Authcontext';
import { ThemeProvider } from './contexts/Themecontext';
import { CartProvider } from './contexts/Cartcontext';
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

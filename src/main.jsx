import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { GuestProvider } from './context/GuestContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GuestProvider>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#FFF8F0',
              color: '#3D3D3D',
              border: '1px solid #F8E1E4',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#722F37', secondary: '#FFF8F0' } },
          }}
        />
      </GuestProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

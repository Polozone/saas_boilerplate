import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './output.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import Providers from './auth/Provider';
import { Toaster } from './components/ui/toaster';


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
      <Providers>
        <Router>
            <App />
            <Toaster />
        </Router>
      </Providers>
  </React.StrictMode>
);
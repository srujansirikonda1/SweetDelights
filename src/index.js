import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
const isProd = process.env.NODE_ENV === "production";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<HashRouter>
  <App />
</HashRouter>
  </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();
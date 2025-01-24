import React from 'react';
import ReactDOM from 'react-dom/client';
import './toolbar.css';
import './main.css';

import MainApp from './MainApp';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
reportWebVitals();

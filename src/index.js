import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Router from './Pages/Router';
import Switch from './Pages/Switch';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Router />} />
        <Route path="/switch" element={<Switch />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
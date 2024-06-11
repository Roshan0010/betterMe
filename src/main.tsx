import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // You need to import BrowserRouter
import App from './App';
import './index.css';
import { RecoilRoot } from 'recoil';

// Assuming you have an element with the ID 'root' in your index.html
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(

    <BrowserRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </BrowserRouter>
);

 



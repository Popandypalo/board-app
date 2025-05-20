import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

//нужен ли тут StrictMode?

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

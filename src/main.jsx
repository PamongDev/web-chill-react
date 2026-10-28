import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MyListProvider } from './hooks/useMyList.jsx';

import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyListProvider>
      <App />
    </MyListProvider> 
  </StrictMode>,
)

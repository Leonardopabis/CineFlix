import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AsideProvider } from './components/AsideProvider/index.jsx'
import { ApiProvider } from './components/ApiProvider/index.jsx'
import { AppRouter } from './router/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AsideProvider>
      <ApiProvider>
        <AppRouter/>
      </ApiProvider>
    </AsideProvider>
  </StrictMode>,
)

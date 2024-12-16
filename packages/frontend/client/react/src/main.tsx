import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GlobalProvider } from './context/Global.tsx'
import { UserProvider } from './context/User.tsx'
import { GameProvider } from './context/Game.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <UserProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </UserProvider>
    </GlobalProvider>
  </StrictMode>
)

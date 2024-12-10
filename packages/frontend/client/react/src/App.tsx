import Auth from './components/auth'
import Main from './components/main'

import { useUser } from '@/context/User.tsx'

function App() {
  const [userState] = useUser()

  return (
    <>
      <div>
        <Auth />
      </div>
      <div>{userState.isLoggedIn ? <Main /> : null}</div>
    </>
  )
}

export default App

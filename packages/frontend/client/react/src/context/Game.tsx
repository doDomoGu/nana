import { createContext, useContext, useReducer } from 'react'

// 玩家游玩的状态
const initialState = {
  isInRoom: false,
  room: null
  // user: null
}

// 定义reducer来处理状态变化
function gameReducer(state, action) {
  // console.log('userReducer', action)
  switch (action.type) {
    case 'ENTER_ROOM':
      return { ...state, isInRoom: true, room: action.payload }
    case 'LEAVE_ROOM':
      return { ...state, isInRoom: false, room: null }
    default:
      throw new Error()
  }
}

// 创建全局状态
export const GameContext = createContext(initialState)

// 创建包装组件
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

// 在App外层包裹Provider
//
// ReactDOM.render(
//   <UserProvider>
//     <App />
//   </UserProvider>,
//   document.getElementById('root')
// );

// 使用全局状态
export const useGame = () => {
  const { state, dispatch } = useContext(GameContext)
  return [state, dispatch]
}

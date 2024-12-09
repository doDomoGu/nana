import { createContext, useContext, useReducer } from 'react'

// 用户登录信息的初始状态
const initialState = {
  isLoggedIn: false,
  user: null
}

// 定义reducer来处理状态变化
function userReducer(state, action) {
  console.log('userReducer', action)
  switch (action.type) {
    case 'LOGIN':
      return { isLoggedIn: true, user: action.payload }
    case 'LOGOUT':
      return { isLoggedIn: false, user: null }
    default:
      throw new Error()
  }
}

// 创建全局状态
export const UserContext = createContext(initialState)

// 创建包装组件
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
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
export const useUser = () => {
  const { state, dispatch } = useContext(UserContext)
  return [state, dispatch]
}

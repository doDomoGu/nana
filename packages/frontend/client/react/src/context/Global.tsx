import { createContext, useContext, useReducer } from 'react'

// 全局
const initialState = {
  loading: false
}

// 定义reducer来处理状态变化
function globalReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      throw new Error()
  }
}

// 创建全局状态
export const GlobalContext = createContext(initialState)

// 创建包装组件
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState)
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
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
export const useGlobal = () => {
  const { state, dispatch } = useContext(GlobalContext)
  return [state, dispatch]
}

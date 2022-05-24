import { useReducer, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookie from 'js-cookie'

import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'

const AuthProvider = ({ children }) => {
  const initialState = {
    isLoggedIn: false,
    user: undefined,
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  const router = useRouter()

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    if (!Cookie.get('token')) {
      return
    }

    try {
      const { data } = await axios.get('/api/users/validate-token')
      const { token, user } = data
      Cookie.set('token', token)
      dispatch({
        type: 'AUTH_LOGIN',
        payload: user,
      })
    } catch (error) {
      Cookie.remove('token')
    }
  }

  // Methods
  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      })

      const { token, user } = data

      Cookie.set('token', token)
      dispatch({
        type: 'AUTH_LOGIN',
        payload: user,
      })
      return true
    } catch (error) {
      return false
    }
  }

  const registerUser = async (email, password, name) => {
    try {
      const { data } = await axios.post('/api/users/register', {
        email,
        password,
        name,
      })

      const { token, user } = data

      Cookie.set('token', token)
      dispatch({
        type: 'AUTH_LOGIN',
        payload: user,
      })
      return {
        hasError: false,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response.data.message,
        }
      }

      return {
        hasError: true,
        message: 'Could not create user, please try again',
      }
    }
  }

  const logout = () => {
    Cookie.remove('token')
    Cookie.remove('cart')
    router.reload()
  }

  return (
    <AuthContext.Provider value={{ ...state, login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

import React, { createContext, useContext, useState } from 'react'
import axiosInstance from './axiosInstance'
import { STORAGE_AUTH_TOKEN } from './defaults/storage_keys'

interface AuthContextProps {
  token: string | null
  setToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() => {
    const authToken = localStorage.getItem(STORAGE_AUTH_TOKEN)
    if (authToken) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${authToken}`
    }
    return authToken
  })

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: (value: string | null) => {
          if (value) {
            localStorage.setItem(STORAGE_AUTH_TOKEN, value)
          } else {
            localStorage.removeItem(STORAGE_AUTH_TOKEN)
          }
          setToken(value)
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }

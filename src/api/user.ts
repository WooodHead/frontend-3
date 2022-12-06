import { createQueryKeys } from '@lukemorales/query-key-factory'
import { post } from './api'

export const login = () => post('/login', {})

export const register = () => post('/register', {})

export default createQueryKeys('user', {
  login: {
    queryKey: null,
    queryFn: login,
  },
  register: {
    queryKey: null,
    queryFn: register,
  },
})

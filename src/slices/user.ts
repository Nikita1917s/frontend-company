import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string
  email: string
  isLoggedIn: boolean
}

const initialState: UserState = {
  name: '',
  email: '',
  isLoggedIn: false,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ name: string; email: string }>) {
      state.name = action.payload.name
      state.email = action.payload.email
      state.isLoggedIn = true
    },
    logout(state) {
      state.name = ''
      state.email = ''
      state.isLoggedIn = false
    },
  },
})

export const { login, logout } = usersSlice.actions
export default usersSlice.reducer

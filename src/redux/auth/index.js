import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    role: null,
    isLoggedIn: null,
  },
  reducers: {
    saveTokens: (state, { payload: { accessToken, refreshToken, role, } }) => {
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.role = role
      state.isLoggedIn = true

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('role', role)
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      state.isLoggedIn = false

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('role')
    }
  },
})

export const { saveTokens, logout } = authSlice.actions;
export default authSlice.reducer;

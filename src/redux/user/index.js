import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null
  },
  reducers: {
    saveUser: (state, { payload }) => {
      state.userData = payload
    },
  },
})

export const { saveUser } = userSlice.actions;
export default userSlice.reducer;

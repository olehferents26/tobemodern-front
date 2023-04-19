import { createSlice } from '@reduxjs/toolkit'

const currentProjectIdSlice = createSlice({
   name: 'currentProjectId',
   initialState: {
      currentProjectId: 0
   },
   reducers: {
      addCurrentProjectId(state, action) {
         state.currentProjectId = action.payload
      }
   },
})

export const { addCurrentProjectId } = currentProjectIdSlice.actions;
export default currentProjectIdSlice.reducer;

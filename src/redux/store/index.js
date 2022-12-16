import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '../../services/baseApi'
import authReducer from '../auth'

const store = configureStore({
  reducer: combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export default store

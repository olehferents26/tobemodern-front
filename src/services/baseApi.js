import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout, saveTokens } from '../redux/auth'

console.log(import.meta.env.VITE_API_URL)

const baseQuery = fetchBaseQuery(({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
}))

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      api.dispatch(logout())
    }
    const { data } = await baseQuery({
      url: '/auth/token/refresh',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
      },
    }, api, extraOptions)
    api.dispatch(saveTokens(data))
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})

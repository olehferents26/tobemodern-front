import { baseApi } from './baseApi'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: '/user/me',
        method: 'GET',
      }),
    }),
    overrideExisting: false,
  })
})

export const { useGetCurrentUserQuery } = userApi

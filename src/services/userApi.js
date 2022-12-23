import { baseApi } from './baseApi'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      })
    }),
    overrideExisting: false,
  })
})

export const { useGetCurrentUserQuery, useGetUsersQuery } = userApi

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
    updateUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'PUT',
        body: user,
      })
    }),
    overrideExisting: false,
  })
})

export const { useGetCurrentUserQuery, useGetUsersQuery, useUpdateUserMutation } = userApi

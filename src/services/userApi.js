import { baseApi } from './baseApi'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      })
    }),
    getUsers: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    updateCurrentUser: builder.mutation({
      query: (user) => ({
        url: '/users/me',
        method: 'PUT',
        body: user,
      })
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    overrideExisting: false,
  })
})

export const {
  useGetCurrentUserQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateCurrentUserMutation,
  useDeleteUserMutation,
} = userApi

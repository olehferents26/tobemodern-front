import { baseApi } from './baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: '/auth/login',
        method: 'POST',
        body: loginData,
      })
    }),
    forgotPasswordEmail: builder.mutation({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: {
          email,
        }
      })
    }),
    sendForgotPasswordToken: builder.mutation({
      query: ({ password, token }) => ({
        url: '/auth/forgot-password/token',
        method: 'POST',
        body: {
          password,
          token,
        }
      })
    }),
    overrideExisting: false,
  })
})

export const { useLoginMutation, useForgotPasswordEmailMutation, useSendForgotPasswordTokenMutation } = authApi;

import { baseApi } from './baseApi.js'

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (formData) => ({
        url: '/projects/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Projects'],
    }),
    getProjects: builder.query({
      query: () => ({
        url: '/projects',
        method: 'GET',
      }),
      providesTags: ['Projects'],
    }),
  }),
  overrideExisting: false,
})

export const { useCreateProjectMutation, useGetProjectsQuery } = projectApi

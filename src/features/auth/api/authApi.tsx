import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Auth } from './authApi.types'

export const densityApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_BASE_URL
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    getDensity: builder.query<{data: Auth[]}, void>({
      query: () => '/dens',
      providesTags: ['Auth'],
    }),
    saveDensity: builder.mutation({
      query: (densityData) => ({
        url: '/dens',
        method: 'POST',
        body: densityData,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

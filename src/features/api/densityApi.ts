import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Density20 } from './densityApi.types'

export const densityApi = createApi({
  reducerPath: 'densityApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_BASE_URL
  }),
  tagTypes: ['Density'],
  endpoints: (builder) => ({
    getDensity: builder.query<{data: Density20[]}, void>({
      query: () => '/dens',
      providesTags: ['Density'],
    }),
    saveDensity: builder.mutation({
      query: (densityData) => ({
        url: '/dens',
        method: 'POST',
        body: densityData,
      }),
      invalidatesTags: ['Density'],
    }),
    deleteDensity: builder.mutation<void, number>({
      query: (id) => ({
        url: `/dens/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Density'],
    }),
  }),
})

export const { useGetDensityQuery, useSaveDensityMutation, useDeleteDensityMutation } = densityApi



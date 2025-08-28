import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Density20 = {
  id: number
  densityFor20: string
}


export const densityApi = createApi({
  reducerPath: 'densityApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://server-calculator-react.vercel.app/' 
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
  }),
})

export const { useGetDensityQuery, useSaveDensityMutation } = densityApi
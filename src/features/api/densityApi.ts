import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const densityApi = createApi({
  reducerPath: 'densityApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://server-calculator-react.vercel.app/' 
  }),
  endpoints: (builder) => ({
    saveDensity: builder.mutation({
      query: (densityData) => ({
        url: '/dens',
        method: 'POST',
        body: densityData,
      }),
    }),
  }),
})

export const { useSaveDensityMutation } = densityApi
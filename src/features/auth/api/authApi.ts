import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Auth, AuthFormData } from "./types"


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getAuth: builder.query<{ data: Auth[] }, void>({
      query: () => "/auth",
      providesTags: ["Auth"],
    }),
    saveAuth: builder.mutation<{ data: Auth[] }, AuthFormData>({
      query: (densityData) => ({
        url: "/auth",
        method: "POST",
        body: densityData,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
})

export const { useGetAuthQuery, useSaveAuthMutation } = authApi

import { configureStore } from '@reduxjs/toolkit'
import { densityApi } from '../features/density/api/densityApi'
import { authApi } from '../features/auth/api/authApi'


export const store = configureStore({
  reducer: {
    [densityApi.reducerPath]: densityApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(densityApi.middleware)
  .concat(authApi.middleware),
})
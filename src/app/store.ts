import { configureStore } from '@reduxjs/toolkit'
import { densityApi } from '../features/density/api/densityApi'


export const store = configureStore({
  reducer: {
    [densityApi.reducerPath]: densityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(densityApi.middleware),
})
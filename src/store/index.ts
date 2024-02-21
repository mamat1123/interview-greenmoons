import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './modules/movies'
import authReducer from './modules/auth'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
// export point for everyting related to redux
import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from './slices/usersSlice'

// create store
//usersReducer is the combine reducer from usersSlice
export const store = configureStore({ reducer: { users: usersReducer } })

export * from './thunks/fetchUser'

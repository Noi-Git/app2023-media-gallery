import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '../thunks/fetchUser'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    // use extraReducer to watch for the action type made by thunk -- fulfilled, pending, rejected
    builder.addCase()
    builder.addCase()
    builder.addCase()
  },
})

export const usersReducer = usersSlice.reducer //export combine reducer

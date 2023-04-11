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
    // builder.addCase('users/fetch/pending') -- we can write addCase() this way but not recommended
    /* recommend -- addCase(fetchUsers.pending)
       - we can use fetchUsers because when we send the request 
         -- createAsyncThunk automatically give us the 3 properties: fulfilled, pending, rejected
    */
    builder.addCase(fetchUsers.pending)
    builder.addCase(fetchUsers.fulfilled)
    builder.addCase(fetchUsers.rejected)
  },
})

export const usersReducer = usersSlice.reducer //export combine reducer

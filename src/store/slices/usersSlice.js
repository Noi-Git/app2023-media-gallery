import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '../thunks/fetchUser'
import { addUser } from '../thunks/addUser'
import { removeUser } from '../thunks/removeUser'

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
    builder.addCase(fetchUsers.pending, (state, action) => {
      // Update state object: to show the user that we are loading data
      state.isLoading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // Update state object: to show request is finished
      state.isLoading = false
      // get access the data we fetch from API
      state.data = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      // Update state object: to show the request is failed
      // when the request failed -- the error message is automatically created for us
      // we will assign the action from the request
      // --to the error key_value pair in the initialState
      // -- update 'null' to the message we get from api calls
      state.isLoading = false
      state.error = action.error
    })
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false
      // push new user to the data[]
      state.data.push(action.payload)
    })
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    builder.addCase(removeUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.data.filter((user) => user.id !== action.payload.id)
      console.log(action)
    })
    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  },
})

export const usersReducer = usersSlice.reducer //export combine reducer

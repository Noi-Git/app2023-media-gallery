import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// ('users/fetch') --- is create base type --- to discribe the purpose of the thunk
const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get('http://localhost:3005/users')

  // what we are returning from: -- response.data -- during fetching
  // the data will be automatically assigned to the payload property of the action: pending, fulfilled, rejected
  // payload is the array of users we fetch form API
  return response.data
})

// create helper function to delay the handling and returning response --- so we can see the loading message
// DEV ONLY! -- DELETE BEFORE GOTO PRODUCTION
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export { fetchUsers }

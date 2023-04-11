import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// ('users/fetch') --- is create base type --- to discribe the purpose of the thunk
const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get('http://localhost:3005/users')

  return response.data
})

export { fetchUsers }

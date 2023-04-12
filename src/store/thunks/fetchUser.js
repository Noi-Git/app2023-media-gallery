import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { pause } from '../../hooks/pause'

// ('users/fetch') --- is create base type --- to discribe the purpose of the thunk
const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get('http://localhost:3005/users')

  // DEV ONLY! -- DELETE BEFORE GOTO PRODUCTION
  await pause(1000)

  return response.data
})

export { fetchUsers }
